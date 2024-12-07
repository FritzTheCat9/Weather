import { WeatherInfoDto } from './WeatherInfoDto';

export interface CityDto {
  id: number;
  name: string;
  weatherInfoDto?: WeatherInfoDto;
}
