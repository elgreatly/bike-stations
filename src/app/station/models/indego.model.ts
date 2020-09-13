import { IndegoFeatureModel } from './indego-feature.model';

export class IndegoModel {

    features: IndegoFeatureModel[];

    constructor(data?: any) {
        Object.assign(this, data);
    }
}
