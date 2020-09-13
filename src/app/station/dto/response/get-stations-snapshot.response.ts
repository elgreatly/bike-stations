import { ApiProperty } from '@nestjs/swagger';
import { StationModel } from '../../models/station.model';

export class GetStationsSnapshotResponse {

    @ApiProperty()
    at: string;

    @ApiProperty({ isArray: true, type: StationModel })
    stations: StationModel[];

    @ApiProperty()
    weather: any;

    constructor(data?: any) {
        Object.assign(this, data);
    }
}
