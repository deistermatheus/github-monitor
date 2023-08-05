from django_filters import rest_framework as filters
from .models import Commit


class CommitFilter(filters.FilterSet):
    repository = filters.CharFilter(field_name='repository__name')

    class Meta:
        model = Commit
        fields = ['author', 'repository']
