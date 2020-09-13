import { IndegoGeometryModel } from './indego-geometry.model';
import { StationModel } from './station.model';

export class IndegoFeatureModel {

    geometry: IndegoGeometryModel;
    properties: StationModel;
    type: string;

    constructor(data?: any) {
        Object.assign(this, data);
    }
}
