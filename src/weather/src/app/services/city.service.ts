import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllCitiesQuery } from '../models/GetAllCitiesQuery';
import { CityDto } from '../models/CityDto';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private apiUrl = 'http://localhost:5000/api/cities';

  constructor(private http: HttpClient) {}

  getAllCities(query: GetAllCitiesQuery): Observable<CityDto[]> {
    return this.http.post<CityDto[]>(this.apiUrl + '/all', query);
  }
}
