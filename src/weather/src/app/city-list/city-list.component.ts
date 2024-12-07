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
import { finalize, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-city-list',
  imports: [CreateCityDialogComponent, UpdateCityDialogComponent],
  templateUrl: './city-list.component.html',
  styleUrl: './city-list.component.css',
})
export class CityListComponent {
  cities: CityDto[] = [];
  isLoading: boolean = false;
  query: GetAllCitiesQuery = {};

  constructor(private cityService: CityService) {}

  ngOnInit(): void {
    this.getAllCities();
  }

  // api

  getAllCities() {
    this.isLoading = true;
    this.cityService
      .getAllCities(this.query)
      .pipe(
        catchError((err) => {
          console.error('Error fetching cities:', err);
          return of([]);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data) => {
        this.cities = data;
      });
  }

  getCity(id: number): Observable<CityDto | null> {
    return this.cityService.getCity(id).pipe(
      catchError((err) => {
        console.error('Error getting city:', err);
        return of(null);
      })
    );
  }

  deleteCity(id: number) {
    this.cityService
      .deleteCity(id)
      .pipe(
        tap(() => {
          this.cities = this.cities.filter((city) => city.id !== id);
        }),
        catchError((err) => {
          console.error('Error deleting city:', err);
          return of(null);
        })
      )
      .subscribe();
  }

  createCity(command: CreateCityCommand) {
    this.cityService
      .createCity(command)
      .pipe(
        switchMap((id: number) => this.getCity(id)),
        tap((city) => {
          if (city) {
            this.cities.push(city);
          } else {
            console.error('Error creating city');
          }
        }),
        catchError((err) => {
          console.error('Error creating city:', err);
          return of(null);
        })
      )
      .subscribe();
  }

  updateCity(command: UpdateCityCommand) {
    this.cityService
      .updateCity(command)
      .pipe(
        switchMap(() => this.getCity(command.id)),
        tap((updatedCity) => {
          if (updatedCity) {
            this.cities = this.cities.map((city) =>
              city.id === command.id ? updatedCity : city
            );
          } else {
            console.error('Error updating city:');
          }
        }),
        catchError((err) => {
          console.error('Error updating city:', err);
          return of(null);
        })
      )
      .subscribe();
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
