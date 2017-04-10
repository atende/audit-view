import {Injectable} from "@angular/core";
import {Message} from "primeng/primeng";

import {Subject} from "rxjs";

@Injectable()
export class AppService {
  events = {
    message: new Subject<Message>()
  }
}
