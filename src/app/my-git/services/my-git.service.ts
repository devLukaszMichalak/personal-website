import { inject, Injectable } from '@angular/core';
import { catchError, first, from, map, mergeMap, Observable, of, switchMap, toArray } from 'rxjs';
import { marked } from 'marked';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { GitHubRepo } from '../types/git-hub-repo';
import { GitHubContent } from '../types/git-hub-content';

@Injectable({
  providedIn: 'root'
})
export class MyGitService {
  
  private httpClient = inject(HttpClient);
  
  private readonly headers = new HttpHeaders({
    'Authorization': `Bearer ${environment.githubToken}`,
    'X-GitHub-Api-Version': '2022-11-28'
  });
  
  public get repos() {
    return this.httpClient.get<any[]>('https://api.github.com/users/devLukaszMichalak/repos', {headers: this.headers})
      .pipe(
        map((reposList: GitHubRepo[]) => {
          return reposList.sort((a, b) => {
            const dateA = new Date(a.pushed_at).getTime();
            const dateB = new Date(b.pushed_at).getTime();
            return dateB - dateA;
          });
        }),
        switchMap((reposList: GitHubRepo[]) =>
          from(reposList).pipe(
            map(repo => repo.contents_url.substring(0, repo.contents_url.length - 7) + 'README.md?ref=main'),
            mergeMap(url => this.getFileContent(url)),
            map(readmeObj => this.b64DecodeUnicode(readmeObj.content)),
            mergeMap(markdown => this.parseMarkdown(markdown)),
            toArray()
          )
        ),
        first()
      );
  }
  
  private getFileContent = (url: string) => this.httpClient.get<GitHubContent>(url, {headers: this.headers})
    .pipe(catchError(() => of({content: btoa('### Brak readme.md')})));
  
  private b64DecodeUnicode = (str: string) => decodeURIComponent(
    atob(str)
      .split('')
      .map((char: string): string => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  
  private parseMarkdown = (markdown: string): Observable<string> => {
    const parsed = marked.parse(markdown);
    return parsed instanceof Promise ? fromPromise(parsed) : of(parsed);
  };
  
}
