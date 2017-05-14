/* tslint:disable:no-unused-variable */

import {TestBed, async} from '@angular/core/testing';
import {AppModule} from './app.module';
import {AppComponent} from './app.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {AppService} from "./app.service";

describe('App: Notification Server', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: APP_BASE_HREF, useValue: '/'},
        AppService
      ],
      declarations: [
        AppComponent
      ],
      schemas:      [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));


  it('should contain a router-outlet', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  }));
});
