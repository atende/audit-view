import {Component, OnInit} from '@angular/core';
import {Message} from 'primeng/primeng'
import {AppService} from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  messages: Message[] = []

  constructor(private appService: AppService) {

  }
  ngOnInit() {
    this.appService.onMessage.subscribe(message => {
      this.messages.push(message)
    })
  }

}
