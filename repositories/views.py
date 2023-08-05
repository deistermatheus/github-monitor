from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from rest_framework.pagination import PageNumberPagination

from django_filters import rest_framework as filters

from .models import Commit, Repository
from .serializers import CommitSerializer, RepositorySerializer
from .filters import CommitFilter
from common.services import GitHubService
from repositories.tasks import capture_repository_commits_task


class LargePagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000


class RepositoryView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Repository.objects.all()
    serializer_class = RepositorySerializer
    github_client = GitHubService()
    pagination_class = LargePagination

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        repository = serializer.validated_data['name']

        if not self.github_client.repository_exists(request.user, repository):
            return Response("Repository does not exist in your GitHub account.", status=status.HTTP_404_NOT_FOUND)

        if self.queryset.filter(name=repository).exists():
            return Response("Repository is already added to GitHub monitor", status=status.HTTP_409_CONFLICT)

        serializer.save()
        capture_repository_commits_task.delay(str(request.user), repository)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CommitView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommitSerializer
    queryset = Commit.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CommitFilter
