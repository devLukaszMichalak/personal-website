import { Component, inject, Signal } from '@angular/core';
import { MyGitService } from '../services/my-git.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-my-git',
  templateUrl: './my-git.component.html',
  styleUrls: ['./my-git.component.css']
})
export class MyGitComponent {
  
  private myGitService = inject(MyGitService);
  
  readonly readMeFiles: Signal<string[]> = toSignal(this.myGitService.repos, {initialValue: []});
}
