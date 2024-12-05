import { Component } from '@angular/core';
import { CityDto } from '../models/CityDto';
import { CityService } from '../services/city.service';
import { GetAllCitiesQuery } from '../models/GetAllCitiesQuery';

@Component({
  selector: 'app-city-list',
  imports: [],
  templateUrl: './city-list.component.html',
  styleUrl: './city-list.component.css',
})
export class CityListComponent {
  cities: CityDto[] = [];
  query: GetAllCitiesQuery = {};

  constructor(private cityService: CityService) {}

  ngOnInit(): void {
    this.getAllCities();
  }

  getAllCities() {
    this.cityService.getAllCities(this.query).subscribe({
      next: (data) => {
        this.cities = data;
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }

  deleteCity(id: number) {
    this.cityService.deleteCity(id).subscribe({
      next: () => {
        this.getAllCities();
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }
}
