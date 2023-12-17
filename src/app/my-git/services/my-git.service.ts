import { computed, inject, Injectable, Signal } from '@angular/core';
import {
  catchError,
  first,
  from,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  toArray,
} from 'rxjs';
import { marked } from 'marked';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { GitHubRepo } from '../types/git-hub-repo';
import { GitHubContent } from '../types/git-hub-content';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class MyGitService {
  private static readonly headers: HttpHeaders = new HttpHeaders()
    .set('Authorization', `Bearer ${environment.githubToken}`)
    .set('X-GitHub-Api-Version', '2022-11-28');

  private httpClient: HttpClient = inject(HttpClient);
  private _readmeFiles: Signal<string[]> = toSignal(this.getRepos(), {
    initialValue: [],
  });

  public get readmeFiles(): Signal<string[]> {
    return computed(() => this._readmeFiles());
  }

  private getRepos() {
    return this.httpClient
      .get<GitHubRepo[]>(
        'https://api.github.com/users/devLukaszMichalak/repos',
        { headers: MyGitService.headers },
      )
      .pipe(
        map((repoList: GitHubRepo[]) => repoList.sort(this.sortByLastCommit())),
        switchMap((repoList: GitHubRepo[]) =>
          from(repoList).pipe(
            map(
              (repo: GitHubRepo) =>
                repo.contents_url.substring(0, repo.contents_url.length - 7) +
                'README.md?ref=main',
            ),
            mergeMap((url: string) => this.getFileContent(url)),
            map((readmeObj: GitHubContent) =>
              this.b64DecodeUnicode(readmeObj.content),
            ),
            mergeMap((markdown: string) => this.parseMarkdown(markdown)),
            toArray(),
          ),
        ),
        first(),
      );
  }

  private sortByLastCommit() {
    return (a: GitHubRepo, b: GitHubRepo): number => {
      const dateA = new Date(a.pushed_at).getTime();
      const dateB = new Date(b.pushed_at).getTime();
      return dateB - dateA;
    };
  }

  private getFileContent = (url: string): Observable<GitHubContent> =>
    this.httpClient
      .get<GitHubContent>(url, { headers: MyGitService.headers })
      .pipe(catchError(() => of({ content: btoa('### Brak readme.md') })));

  private b64DecodeUnicode = (str: string): string =>
    decodeURIComponent(
      atob(str)
        .split('')
        .map(
          (char: string): string =>
            '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2),
        )
        .join(''),
    );

  private parseMarkdown = (markdown: string): Observable<string> => {
    const parsed: string | Promise<string> = marked.parse(markdown);
    return parsed instanceof Promise ? fromPromise(parsed) : of(parsed);
  };
}
