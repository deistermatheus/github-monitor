import unittest
from unittest.mock import patch
import requests
from ..services import GitHubService

# FIXME: refactor to use responses module or a better mock


class MockResponse:
    def __init__(self, data):
        self.data = data

    def json(self):
        return self.data


class GitHubServiceTests(unittest.TestCase):
    @patch.object(requests, 'get')
    @patch.object(GitHubService, 'get_request_headers')
    def test_paginating_github_api(self, mocked_request_headers, mocked_requests_get):
        mocked_request_headers.return_value = True
        mocked_requests_get.side_effect = [
            MockResponse([i for i in range(0, 10)]), MockResponse(
                [i for i in range(10, 20)]), MockResponse([])
        ]
        instance = GitHubService()
        result = instance.get_repository_commits('any-user', 'some-repo')
        self.assertEqual(result, [i for i in range(0, 20)])
