import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllCitiesQuery } from '../models/GetAllCitiesQuery';
import { CreateCityCommand } from '../models/CreateCityCommand';
import { CityDto } from '../models/CityDto';
import { UpdateCityCommand } from '../models/UpdateCityCommand';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private apiUrl = 'http://localhost:5000/api/cities';

  constructor(private http: HttpClient) {}

  getAllCities(query: GetAllCitiesQuery): Observable<CityDto[]> {
    return this.http.post<CityDto[]>(`${this.apiUrl}/all`, query);
  }

  deleteCity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  createCity(command: CreateCityCommand): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}`, command);
  }

  updateCity(command: UpdateCityCommand): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${command.id}`, command);
  }

  getCity(id: number): Observable<CityDto> {
    return this.http.get<CityDto>(`${this.apiUrl}/${id}`);
  }
}
