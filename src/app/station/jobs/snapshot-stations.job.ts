import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { StationService } from '../services/station.service';

@Injectable()
export class SnapshotStationsJob {

    constructor(private stationService: StationService) {}

    /**
     * Job to take snapshot of stations every hour.
     * @return {void}.
     */
    @Cron(CronExpression.EVERY_HOUR)
    async tackSnapshot(): Promise<void> {
        Logger.log('Start Job to take stations snapshot');

        await this.stationService.takeSnapshot();

        Logger.log('taked snapshot successfully');
    }
}
