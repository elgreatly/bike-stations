import { Controller, Get, Post, HttpStatus, Query, Param, ParseIntPipe, HttpException } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiQuery, ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { StationService } from './services/station.service';
import * as moment from 'moment';
import { WetherService } from './services/weather.service';
import { GetStationsSnapshotResponse } from './dto/response/get-stations-snapshot.response';
import { GetStationByIdInSnapshotResponse } from './dto/response/get-station-by-id-in-snapshot.response';

@Controller('')
@ApiBearerAuth('AbCdEf123456')
@ApiTags('Bike Stations')
export class StationController {

    constructor(
        private stationService: StationService,
        private wetherService: WetherService,
    ) {}

    /**
     * Take stations snapshot from indego and add it to the database.
     * @return {string}
     */
    @Post('indego-data-fetch-and-store-it-db')
    @ApiOperation({ description: 'take stations snapshot from indego and add it to the database.' })
    @ApiResponse({ status: 201, description: 'take stations snapshot from indego and add it to the database.', type: String})
    async storeStationsSnaption(): Promise<string> {
        await this.stationService.takeSnapshot();

        return 'Snapshot Created Successfully';
    }

    /**
     * Get first snapshot of stations on or after the requested time.
     * @param {Date} at - requested time.
     * @return {GetStationsSnapshotResponse}
     */
    @Get('stations')
    @ApiOperation({ description: 'Get first snapshot of stations on or after the requested time.' })
    @ApiResponse({ status: 200, description: 'Get first snapshot of stations on or after the requested time.', type: GetStationsSnapshotResponse})
    @ApiResponse({ status: 404, description: 'No Snapshot Found.'})
    @ApiQuery({ name: 'at', type: String, description: 'ex: 2020-09-10T07:22:50' })
    async getStationsSnapshot(@Query('at') at: Date): Promise<GetStationsSnapshotResponse> {
        const snapshot = await this.stationService.getStationsSnapshot(at);

        if (!snapshot) {
            throw new HttpException('No Snapshot Found', HttpStatus.NOT_FOUND);
        }

        const weather = await this.wetherService.getWeatherByCityName('Philadelphia,US');

        return {
            at: moment(snapshot.createdAt).format('YYYY-MM-DDThh:mm:ss'),
            stations: snapshot.stations,
            weather,
        };
    }

    /**
     * Get first snapshot of specific station by station id on or after the requested time.
     * @param {number} stationId - id of specific station.
     * @param {Date} at - requested time.
     * @return {GetStationByIdInSnapshotResponse}
     */
    @Get('stations/:stationId')
    @ApiOperation({ description: 'Get first snapshot of specific station by station id on or after the requested time.' })
    @ApiResponse({
        status: 200,
        description: 'Get first snapshot of specific station by station id on or after the requested time.',
        type: GetStationByIdInSnapshotResponse,
    })
    @ApiResponse({ status: 404, description: 'No Snapshot Found.'})
    @ApiQuery({ name: 'at', type: String, description: 'ex: 2020-09-10T07:22:50' })
    @ApiParam({ name: 'stationId', type: Number, description: 'ex: 3004' })
    async getStationByIdInSnapshot(
        @Param('stationId', new ParseIntPipe()) stationId: number,
        @Query('at') at: Date): Promise<GetStationByIdInSnapshotResponse> {
        const snapshot = await this.stationService.getStationByIdInSnapshot(stationId, at);

        if (!snapshot) {
            throw new HttpException('No Snapshot Found', HttpStatus.NOT_FOUND);
        }

        if (!snapshot.stations.length) {
            throw new HttpException(`${stationId} ID Station Not Found`, HttpStatus.NOT_FOUND);
        }

        const weather = await this.wetherService.getWeatherByCityName('Philadelphia,US');

        return {
            at: moment(snapshot.createdAt).format('YYYY-MM-DDThh:mm:ss'),
            station: snapshot.stations[0],
            weather,
        };
    }
}
