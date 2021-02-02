import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MockApiModule } from './common/modules/mock-api.module';
import { SharedModule } from './common/modules/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    MockApiModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
