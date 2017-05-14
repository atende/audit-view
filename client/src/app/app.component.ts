import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {Message} from "primeng/primeng";
import {AppService} from "./app.service";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  msgs: Message[] = []

  constructor(private appService: AppService,
              private changeDetectionRef: ChangeDetectorRef,
              private slimBarService: SlimLoadingBarService
  ) {
  }

  ngOnInit() {
    this.slimBarService.interval = 50;
    this.appService.events.message.subscribe(e => {

      // For some reason the change detection for the first item in array doesn't work
      // Create a copy of array then empty array, trigger the detection and then put the previous copy
      // + new message and detect again :-)
      let previous = this.msgs.slice()
      this.msgs = []
      setTimeout(() => {
        previous.push(e)
        this.msgs = previous
        this.changeDetectionRef.detectChanges()
      })

      this.changeDetectionRef.detectChanges()

    })

  }

}
