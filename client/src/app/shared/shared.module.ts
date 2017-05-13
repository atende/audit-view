import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations"

import { ToolbarComponent } from './toolbar/index';
import { NavbarComponent } from './navbar/index';

import { CalendarModule, PaginatorModule, DataTableModule, GrowlModule } from "primeng/primeng"

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, CalendarModule, BrowserAnimationsModule],
  declarations: [ToolbarComponent, NavbarComponent],
  exports: [
    ToolbarComponent,
    NavbarComponent,
    CommonModule,
    FormsModule,
    RouterModule,
    CalendarModule,
    BrowserAnimationsModule,
    PaginatorModule,
    DataTableModule,
    GrowlModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
