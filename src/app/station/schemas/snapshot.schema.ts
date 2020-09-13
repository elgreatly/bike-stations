import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Station } from './station.schema';

@Schema({timestamps: true})
export class SnapshotStations extends Document {

    @Prop()
    stations: Station[];

    @Prop()
    readonly createdAt: Date;
}

export const SnapshotStationsSchema = SchemaFactory.createForClass(SnapshotStations);
