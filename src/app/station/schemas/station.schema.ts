import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Bike } from './bike.schema';

@Schema()
export class Station extends Document {
    id: number;
    name: string;
    coordinates: number[];
    totalDocks: number;
    docksAvailable: number;
    bikesAvailable: number;
    classicBikesAvailable: number;
    smartBikesAvailable: number;
    electricBikesAvailable: number;
    rewardBikesAvailable: number;
    rewardDocksAvailable: number;
    kioskStatus: string;
    kioskPublicStatus: string;
    kioskConnectionStatus: string;
    kioskType: number;
    addressStreet: string;
    addressCity: string;
    addressState: string;
    addressZipCode: string;
    bikes: Bike[];
    closeTime: string;
    eventEnd: string;
    eventStart: string;
    isEventBased: boolean;
    isVirtual: boolean;
    kioskId: number;
    notes: string[];
    openTime: string;
    publicText: string;
    timeZone: string;
    trikesAvailable: number;
    latitude: number;
    longitude: number;

    constructor(data?: any) {
        super();
        Object.assign(this, data);
    }
}

export const StationsSchema = SchemaFactory.createForClass(Station);
