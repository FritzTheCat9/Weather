import { Component } from '@angular/core';
import { CityDto } from '../models/CityDto';
import { CityService } from '../services/city.service';
import { GetAllCitiesQuery } from '../models/GetAllCitiesQuery';
import { CreateCityDialogComponent } from '../create-city-dialog/create-city-dialog.component';
import { CreateCityCommand } from '../models/CreateCityCommand';
import { UpdateCityCommand } from '../models/UpdateCityCommand';
import { UpdateCityDialogComponent } from '../update-city-dialog/update-city-dialog.component';

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
        console.log(data);
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

  createCity(command: CreateCityCommand) {
    this.cityService.createCity(command).subscribe({
      next: () => {
        this.getAllCities();
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }

  updateCity(command: UpdateCityCommand) {
    this.cityService.updateCity(command).subscribe({
      next: () => {
        this.getAllCities();
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
