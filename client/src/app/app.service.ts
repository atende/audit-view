import { Message } from 'primeng/primeng'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Observer } from 'rxjs/Observer'

@Injectable()
export class AppService {
  private observer: Observer<Message>

  onMessage: Observable<Message>

  constructor() {
    this.onMessage = Observable.create(observer => {
      this.observer = observer
    })
  }

  showMessage(message: Message) {
    this.observer.next(message)
  }
}
