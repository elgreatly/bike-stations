import { StationModel } from './station.model';

export class IndegoGeometryModel {

    geometry: number[];
    type: string;

    constructor(data?: any) {
        Object.assign(this, data);
    }
}
