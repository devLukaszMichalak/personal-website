import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  mailText: string =
    'mailto:lukaszmichalak0402@gmail.com?subject=Dev-contact&body=';
}
