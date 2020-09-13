import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Bike extends Document {
    dockNumber: number;
    isElectric: boolean;
    isAvailable: boolean;
    battery: number;
}

export const BikeSchema = SchemaFactory.createForClass(Bike);
