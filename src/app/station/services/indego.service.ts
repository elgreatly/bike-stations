import { Injectable, Logger } from '@nestjs/common';
import { APIService } from '../../../infrastructure/api/api.service';
import { StationModel } from '../models/station.model';
import { IndegoModel } from '../models/indego.model';

@Injectable()
export class IndegoService {

    constructor(private http: APIService) {}

    /**
     * Get stations snapshot from third-party.
     * @return {StationModel[]}.
     */
    async getStations(): Promise<StationModel[]> {
        const url: string = 'https://kiosks.bicycletransit.workers.dev/phl';
        const indgoResponse = await this.http.get<IndegoModel>(url).toPromise();
        return indgoResponse.features.map(data => data.properties);
    }

}
