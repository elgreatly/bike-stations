import { BikeModel } from './bike.model';
import { ApiProperty } from '@nestjs/swagger';

export class StationModel {

    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    coordinates: number[];

    @ApiProperty()
    totalDocks: number;

    @ApiProperty()
    docksAvailable: number;

    @ApiProperty()
    bikesAvailable: number;

    @ApiProperty()
    classicBikesAvailable: number;

    @ApiProperty()
    smartBikesAvailable: number;

    @ApiProperty()
    electricBikesAvailable: number;

    @ApiProperty()
    rewardBikesAvailable: number;

    @ApiProperty()
    rewardDocksAvailable: number;

    @ApiProperty()
    kioskStatus: string;

    @ApiProperty()
    kioskPublicStatus: string;

    @ApiProperty()
    kioskConnectionStatus: string;

    @ApiProperty()
    kioskType: number;

    @ApiProperty()
    addressStreet: string;

    @ApiProperty()
    addressCity: string;

    @ApiProperty()
    addressState: string;

    @ApiProperty()
    addressZipCode: string;

    @ApiProperty({ isArray: true, type: BikeModel })
    bikes: BikeModel[];

    @ApiProperty()
    closeTime: string;

    @ApiProperty()
    eventEnd: string;

    @ApiProperty()
    eventStart: string;

    @ApiProperty()
    isEventBased: boolean;

    @ApiProperty()
    isVirtual: boolean;

    @ApiProperty()
    kioskId: number;

    @ApiProperty()
    notes: string[];

    @ApiProperty()
    openTime: string;

    @ApiProperty()
    publicText: string;

    @ApiProperty()
    timeZone: string;

    @ApiProperty()
    trikesAvailable: number;

    @ApiProperty()
    latitude: number;

    @ApiProperty()
    longitude: number;

    constructor(data?: any) {
        Object.assign(this, data);
    }
}
