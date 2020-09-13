import { Injectable, Logger } from '@nestjs/common';
import { APIService } from '../../../infrastructure/api/api.service';
import { config } from '../../../infrastructure/config/config.service';

@Injectable()
export class WetherService {

    constructor(private http: APIService) {}

    /**
     * Get weather by city name.
     * @param {string} city - city name
     * @return {any}.
     */
    async getWeatherByCityName(city: string): Promise<any> {
        const url: string = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.getString('OPEN_WEATHER_API_KEY')}`;
        return await this.http.get<any>(url).toPromise();
    }

}
