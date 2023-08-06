from rest_framework import status
from rest_framework.test import APITestCase
from unittest.mock import patch

from repositories.models import Commit, Repository
from repositories.serializers import CommitSerializer, RepositorySerializer

from common.services import GitHubService

from django.utils import timezone
from django.contrib.auth.models import User


class CommitViewTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='fast_committer', password='s3cR3t')
        self.client.force_authenticate(user=self.user)
        self.repository = Repository.objects.create(name='cat-store')
        self.commit = Commit.objects.create(
            repository=self.repository, author='fast_committer', message='test: working version of a DRF view', date=timezone.now())

    def test_get_commits(self):
        response = self.client.get('/api/commits/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        expected_data = CommitSerializer(self.commit).data
        self.assertEqual(response.data['results'][0], expected_data)

    def test_get_commits_with_filters(self):
        response = self.client.get(
            '/api/commits/?repository=cat-store&author=fast_committer')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

        expected_data = CommitSerializer(self.commit).data
        self.assertEqual(response.data['results'][0], expected_data)


class RepositoryViewTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='fast_committer', password='s3cR3t')
        self.client.force_authenticate(user=self.user)
        self.repository = Repository.objects.create(name='cat-store')

    def test_get_repositories(self):
        response = self.client.get('/api/repositories/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        expected_data = RepositorySerializer(self.repository).data
        self.assertEqual(response.data['results'][0], expected_data)

    @patch.object(GitHubService, 'repository_exists')
    def test_create_repeated_repository(self, mock_service_call):
        data = {'name': 'cat-store'}
        mock_service_call.return_value = True
        response = self.client.post(
            '/api/repositories/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)

    @patch.object(GitHubService, 'repository_exists')
    def test_repository_not_on_git(self, mock_service_call):
        data = {'name': 'cat-store'}
        mock_service_call.return_value = False
        response = self.client.post(
            '/api/repositories/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @patch.object(GitHubService, 'repository_exists')
    def test_create_valid_repository(self, mock_service_call):
        data = {'name': 'cat-store-2'}
        mock_service_call.return_value = True
        response = self.client.post(
            '/api/repositories/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
