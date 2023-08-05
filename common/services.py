import requests
import json
from repositories.serializers import CommitSerializer
from repositories.models import Repository, Commit
from social_django.models import UserSocialAuth
import datetime


class GitHubService:
    def __init__(self):
        self.BASE_URL = 'https://api.github.com'
        self.ACCESS_TOKEN = None

    def get_request_headers(self, user):
        if self.ACCESS_TOKEN is None:
            self.set_access_token(user)

        return {
            'Authorization': f'token {self.ACCESS_TOKEN}'
        }

    def set_access_token(self, user):
        social_user_data = UserSocialAuth.objects.get(user__username=user)
        self.ACCESS_TOKEN = social_user_data.extra_data["access_token"]

    def repository_exists(self, user, repository):
        get_repository_response = requests.get(
            f"{self.BASE_URL}/repos/{user}/{repository}", headers=self.get_request_headers(user))

        return get_repository_response.status_code == 200

    def get_repository_commits(self, user, repository):
        # FIXME: these should be function parameters and not hardcoded
        NOW = datetime.date.today()
        THIRTY_DAYS_FROM_NOW = NOW - datetime.timedelta(30)

        params = {
            'since': THIRTY_DAYS_FROM_NOW.isoformat(),
            'until': NOW.isoformat(),
            'per_page': 10
        }

        page = 1
        all_commits = []
        request_url = f'{self.BASE_URL}/repos/{user}/{repository}/commits'

        while True:
            commits_page = requests.get(
                request_url, headers=self.get_request_headers(user), params={**params, 'page': page}).json()

            if len(commits_page):
                all_commits = all_commits + commits_page
                page = page + 1
            else:
                return all_commits
