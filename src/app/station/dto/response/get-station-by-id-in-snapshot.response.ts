import { ApiProperty } from '@nestjs/swagger';
import { StationModel } from '../../models/station.model';

export class GetStationByIdInSnapshotResponse {

    @ApiProperty()
    at: string;

    @ApiProperty()
    station: StationModel;

    @ApiProperty()
    weather: any;

    constructor(data?: any) {
        Object.assign(this, data);
    }
}
