import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NextFieldDirectiveModule } from './next-field.directive';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule, NextFieldDirectiveModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
