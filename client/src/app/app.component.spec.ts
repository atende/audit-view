/* tslint:disable:no-unused-variable */

import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {AppService} from './app.service';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';

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
      schemas:      [ NO_ERRORS_SCHEMA ],
      imports: [
        SlimLoadingBarModule.forRoot(),
      ]
    }).compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));


  it('should contain a router-outlet', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  }));
});
