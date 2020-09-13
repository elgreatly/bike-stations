import { ApiProperty } from '@nestjs/swagger';

export class BikeModel {

    @ApiProperty()
    dockNumber: number;

    @ApiProperty()
    isElectric: boolean;

    @ApiProperty()
    isAvailable: boolean;

    @ApiProperty()
    battery: number;

    constructor(data?: any) {
        Object.assign(this, data);
    }
}
