import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WeatherForecast } from '../models/WeatherForecast';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {
  private requestHeaders: HttpHeaders;
  constructor(private httpClient: HttpClient) { 
    this.requestHeaders = new HttpHeaders();
  }

  GetWeatherForecast() {
    let parsedToken = localStorage.getItem('auth_token');
    let tokenHeaderString = 'Bearer ' + parsedToken;
    
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', tokenHeaderString);

    return this.httpClient.get<WeatherForecast[]>
      ("https://localhost:44341/weatherforecast", {headers });
  }
}
