import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface GitHubRepoList {
   name: string;
   html_url: string;
}

@Component({
  selector: 'app-my-git',
  templateUrl: './my-git.component.html',
  styleUrls: ['./my-git.component.css']
})
export class MyGitComponent implements OnInit {

  repos: GitHubRepoList[] =[{html_url: "test", name: "test1"}];
  displayedColumns: string[] = ['name', 'html_url-name'];
  dataSource = this.repos;

  constructor(public httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.repos.pop();
    this.getRepos();
  }

  private getRepos() {
    this.httpClient.get<any>('https://api.github.com/users/devLukaszMichalak/repos').subscribe(
      response => {
        console.log(response);
        this.repos = response
      }
    )
  }
}
