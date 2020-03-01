import { Component, OnInit } from '@angular/core';
import { WeatherForecastService } from '../services/weather-forecast.service';
import { WeatherForecast } from '../models/WeatherForecast';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.css']
})
export class WeatherDisplayComponent implements OnInit {
  
  private weatherForecastArray: WeatherForecast[];
  private loginError: String;

  constructor(private weatherForecastService: WeatherForecastService) { }

  ngOnInit() {
  }

  onSubmitWeatherForm()
  {
    this.weatherForecastService.GetWeatherForecast()
    .subscribe(res => 
      {
        this.weatherForecastArray = res;
        console.log(res);
        this.loginError = '';
      },
      error => {
        this.loginError = JSON.stringify(error);
      });
  }
}
