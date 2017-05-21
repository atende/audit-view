import { Interceptor } from 'angular-http-interceptor'
import { Injectable } from '@angular/core'
import { Request, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import 'rxjs/add/observable/of'
import { AppService } from '../../app.service'
import { SlimLoadingBarService } from 'ng2-slim-loading-bar'

@Injectable()
export class HttpStatusErrorInterceptor implements Interceptor {
  constructor(private appService: AppService) {}
  before(request: Request): Observable<any> {
    return Observable.of(request);
  }

  after(response: Response): void {

  }

  error(err: Response): void {
    const severity = err.status === 404 ? 'info' : 'error'
    this.appService.showMessage({summary: err.statusText, detail: err.text(), severity: severity})
  }

}

@Injectable()
export class LoadingBarInterceptor implements Interceptor {

  constructor(private loadingBarService: SlimLoadingBarService) {}

  before(request: Request): Observable<any> {
    this.loadingBarService.start(() => {
    })
    return Observable.of('');
  }

  after(response: Response): void {
    this.loadingBarService.complete()
    this.loadingBarService.stop()
  }

  error(err: any): void {
    this.loadingBarService.complete()
  }

}
