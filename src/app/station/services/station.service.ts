import { Injectable, Logger } from '@nestjs/common';
import { IndegoService } from './indego.service';
import { StationRepository } from '../repositories/station.repository';
import { SnapshotModel } from '../models/snapshot.model';

@Injectable()
export class StationService {

    constructor(
        private indego: IndegoService,
        private stationRepository: StationRepository,
    ) {}

    /**
     * Take stations snapshot from indego and add it to the database.
     * @return {void}
     */
    async takeSnapshot(): Promise<void> {
        const stations = await this.indego.getStations();
        await this.stationRepository.create(stations);
    }

    /**
     * Get first snapshot of stations on or after the requested time.
     * @param {date} date - requested time.
     * @return {SnapshotModel}
     */
    async getStationsSnapshot(date: Date): Promise<SnapshotModel> {
        return await this.stationRepository.getSnapshotByDate(date);
    }

    /**
     * Get first snapshot of specific station by station id on or after the requested time.
     * @param {number} stationId - id of specific station.
     * @param {Date} date - requested time.
     * @return {SnapshotModel}
     */
    async getStationByIdInSnapshot(stationId: number, date: Date): Promise<SnapshotModel> {
        return await this.stationRepository.getStationByIdInSnapshot(stationId, date);
    }
}
