import unittest
from ..tasks import capture_repository_commits_task
from ..models import Repository
from common.services import GitHubService
from unittest.mock import patch
from django.utils import timezone


def get_mocked_git_commit(index):
    return {
        'sha': index,
        'url': 'http://github.com',
        'author': {
            'avatar_url': 'http//my-cloud/avatar'
        },
        'commit': {
            'message': 'Testing!',
            'commiter': {
                'name': 'John Doe',
                'avatar_url': 'http//my-cloud/avatar',
                'date': str(timezone.now())
            },
            'author': {
                'name': 'John Doe',
                'avatar_url': 'http//my-cloud/avatar',
                'date': str(timezone.now())
            }
        }
    }


def get_mocked_git_commit_without_author(index):
    return {
        'sha': index,
        'url': 'http://github.com',
        'author': {
            'avatar_url': 'http//my-cloud/avatar'
        },
        'commit': {
            'message': 'Testing!',
            'author':   None,
            'committer': {
                'name': 'John Doe',
                'avatar_url': 'http//my-cloud/avatar',
                'date': str(timezone.now())
            }
        }
    }


class CeleryTaskFunctionTests(unittest.TestCase):
    def setUp(self):
        self.repository = Repository.objects.create(name='cat-store')

    def tearDown(self):
        Repository.objects.filter(name='cat-store').delete()
    # Mock the Celery task function

    @patch.object(GitHubService, 'get_repository_commits')
    def test_capture_repository_commits_task(self, mock_get_repository_commits):
        # Set the return value for the mocked task
        mock_get_repository_commits.side_effect = [
            [get_mocked_git_commit(i) for i in range(1, 11)]]

        # Call the Celery task synchronously using `apply_async`
        result = capture_repository_commits_task(
            'some-user', self.repository.name)
        self.assertEqual(result['repository'], str(self.repository))
        self.assertEqual(result['captured_commits'], [*range(1, 11)])

    @patch.object(GitHubService, 'get_repository_commits')
    def test_capture_repository_commits_without_author_task(self, mock_get_repository_commits):
        # Set the return value for the mocked task
        mock_get_repository_commits.side_effect = [
            [get_mocked_git_commit_without_author(i) for i in range(1, 11)]]

        # Call the Celery task synchronously using `apply_async`
        result = capture_repository_commits_task(
            'some-user', self.repository.name)
        self.assertEqual(result['repository'], str(self.repository))
        self.assertEqual(result['captured_commits'], [*range(1, 11)])
