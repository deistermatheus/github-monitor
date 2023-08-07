from repositories.models import Commit, Repository

from githubmonitor.celery import app
from celery import shared_task
from common.services import GitHubService
from common.utils import get_dict_key_by_path

DUMMY_GIT_AVATAR = 'https://github.githubassets.com/images/modules/open_graph/github-octocat.png'


@shared_task()
def capture_repository_commits_task(user, repository):
    repository_object = Repository.objects.get(name=repository)
    github_client = GitHubService()
    commits_raw_data = github_client.get_repository_commits(user, repository)
    for commit in commits_raw_data:
        Commit(
            message=get_dict_key_by_path(commit, 'commit.message'),
            sha=get_dict_key_by_path(commit, 'sha'),
            author=get_dict_key_by_path(commit, 'commit.author.name') or get_dict_key_by_path(
                commit, 'commit.committer.name'),
            url=get_dict_key_by_path(commit, 'url'),
            avatar=get_dict_key_by_path(commit, 'author.avatar_url') or get_dict_key_by_path(
                commit, 'committer.avatar_url') or DUMMY_GIT_AVATAR,   # just an octocat if not found
            date=get_dict_key_by_path(commit, 'commit.author.date') or get_dict_key_by_path(
                commit, 'commit.committer.date'),
            repository=repository_object
        ).save()

    return {'repository': repository, 'captured_commits': [commit['sha'] for commit in commits_raw_data]}
