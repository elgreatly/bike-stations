import { StationModel } from './station.model';

export class SnapshotModel {

    id: string;
    stations: StationModel[];
    createdAt: string;

    constructor(data?: any) {
        Object.assign(this, data);
    }
}
