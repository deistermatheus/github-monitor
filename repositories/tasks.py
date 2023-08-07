from repositories.models import Commit, Repository

from githubmonitor.celery import app
from celery import shared_task
from common.services import GitHubService

DUMMY_GIT_AVATAR = 'https://github.githubassets.com/images/modules/open_graph/github-octocat.png'


@shared_task()
def capture_repository_commits_task(user, repository):
    repository_object = Repository.objects.get(name=repository)
    github_client = GitHubService()
    # FIXME: this could be optimized as a bulk insert inside a db transaction, and probably should not be buffering a large commit list in memory
    commits = github_client.get_repository_commits(user, repository)
    for commit_raw_data in commits:
        commit_data = commit_raw_data['commit']
        commit_author = commit_data['author'] or {}

        Commit(
            message=commit_data.get('message', ''),
            sha=commit_raw_data['sha'],
            author=commit_author.get('name', ''),
            url=commit_raw_data['url'],
            # just an octocat if not found
            avatar=commit_author.get('avatar_url', DUMMY_GIT_AVATAR),
            date=commit_author.get('date', None),
            repository=repository_object
        ).save()

    return {'repository': repository, 'captured_commits': [commit['sha'] for commit in commits]}
