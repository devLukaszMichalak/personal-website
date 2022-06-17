import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  mailText:string = "";

  constructor() { }

  ngOnInit(): void {
      this.mailText = "mailto:lukaszmichalak0402@gmail.com?subject=Dev-contact&body=";
  }
}
