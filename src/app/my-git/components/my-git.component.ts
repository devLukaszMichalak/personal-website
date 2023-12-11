import { Component, inject } from '@angular/core';
import { MyGitService } from '../services/my-git.service';

@Component({
  selector: 'app-my-git',
  templateUrl: './my-git.component.html',
  styleUrls: ['./my-git.component.scss']
})
export class MyGitComponent {
  
  public readmeFiles = inject(MyGitService).readmeFiles;
  
}
