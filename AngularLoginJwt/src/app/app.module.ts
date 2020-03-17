import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogonComponent } from './logon/logon.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';

@NgModule({
  declarations: [
    AppComponent,
    LogonComponent,
    WeatherDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HttpClient, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

