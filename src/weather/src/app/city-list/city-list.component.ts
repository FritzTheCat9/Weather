import { Component } from '@angular/core';
import { CityDto } from '../models/CityDto';
import { CityService } from '../services/city.service';
import { GetAllCitiesQuery } from '../models/GetAllCitiesQuery';
import { CreateCityDialogComponent } from '../create-city-dialog/create-city-dialog.component';
import { CreateCityCommand } from '../models/CreateCityCommand';
import { UpdateCityCommand } from '../models/UpdateCityCommand';
import { UpdateCityDialogComponent } from '../update-city-dialog/update-city-dialog.component';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-city-list',
  imports: [CreateCityDialogComponent, UpdateCityDialogComponent],
  templateUrl: './city-list.component.html',
  styleUrl: './city-list.component.css',
})
export class CityListComponent {
  cities: CityDto[] | null = null;
  query: GetAllCitiesQuery = {};

  constructor(private cityService: CityService) {}

  ngOnInit(): void {
    this.getAllCities();
  }

  // api

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

  getCity(id: number): Observable<CityDto | null> {
    return this.cityService.getCity(id).pipe(
      catchError((err) => {
        console.error('Error:', err);
        return of(null);
      })
    );
  }

  deleteCity(id: number) {
    this.cityService.deleteCity(id).subscribe({
      next: () => {
        this.cities = this.cities?.filter((city) => city.id !== id) ?? null;
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }

  createCity(command: CreateCityCommand) {
    this.cityService.createCity(command).subscribe({
      next: (id: number) => {
        this.getCity(id).subscribe((city) => {
          if (city) {
            this.cities?.push(city);
          } else {
            console.log('City not found or error occurred.');
          }
        });
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }

  updateCity(command: UpdateCityCommand) {
    this.cityService.updateCity(command).subscribe({
      next: () => {
        this.getCity(command.id).subscribe((updatedCity) => {
          if (updatedCity) {
            this.cities =
              this.cities?.map((city) =>
                city.id === command.id ? updatedCity : city
              ) ?? null;
          } else {
            console.log('City not found or error occurred.');
          }
        });
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }

  // create

  showCreateCityDialog: boolean = false;
  createCityDialogTitle: string = 'Create city';

  openCreateCityDialog() {
    this.showCreateCityDialog = true;
  }

  closeCreateCityDialog() {
    this.showCreateCityDialog = false;
  }

  onCityCreated(command: CreateCityCommand) {
    this.createCity(command);
    this.closeCreateCityDialog();
  }

  // update

  selectedCityId: number | null = null;
  selectedCityName: string = '';

  showUpdateCityDialog: boolean = false;
  updateCityDialogTitle: string = 'Update city';

  openUpdateCityDialog(id: number, name: string) {
    this.selectedCityId = id;
    this.selectedCityName = name;
    this.showUpdateCityDialog = true;
  }

  closeUpdateCityDialog() {
    this.selectedCityId = null;
    this.selectedCityName = '';
    this.showUpdateCityDialog = false;
  }

  onCityUpdated(command: UpdateCityCommand) {
    this.updateCity(command);
    this.closeUpdateCityDialog();
  }
}
