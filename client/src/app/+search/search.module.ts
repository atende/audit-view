import { NgModule } from '@angular/core'
import { SearchComponent } from './search.component'
import { SharedModule } from '../shared/shared.module'
import { SearchService } from './search.service'

@NgModule({
    imports: [SharedModule],
    declarations: [SearchComponent],
    providers: [
      SearchService
    ],
    exports: [SearchComponent]
})

export class SearchModule { }
