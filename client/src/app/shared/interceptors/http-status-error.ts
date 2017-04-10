import {Interceptor} from 'angular-http-interceptor'
import {Injectable} from "@angular/core";
import {Request, Response} from "@angular/http"
import {Observable} from "rxjs/Observable";

import "rxjs/add/observable/of"
import {AppService} from "../../app.service";

@Injectable()
export class HttpStatusErrorInterceptor implements Interceptor {
  constructor(private appService: AppService) {}
  before(request: Request): Observable<any> {
    return Observable.of(request);
  }

  after(response: Response): void {

  }

  error(err: Response): void {
    const severity = err.status == 404 ? 'info': 'error'
    this.appService.events.message.next({summary: err.statusText, detail: err.text(), severity: severity})
  }

}
