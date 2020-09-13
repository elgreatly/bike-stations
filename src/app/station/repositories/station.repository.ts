import { Model, Mongoose } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { SnapshotStations } from '../schemas/snapshot.schema';
import { SnapshotModel } from '../models/snapshot.model';
import { StationModel } from '../models/station.model';

@Injectable()
export class StationRepository {

    constructor(@InjectModel('snapshotStations') private model: Model<SnapshotStations>) { }

    /**
     * Add snapshot to the database.
     * @return {void}
     */
    async create(stations: StationModel[]): Promise<void> {
        const snapshotStations: any = {
            stations: stations.map(station => {
                return station;
            }),
        };

        await this.model.create(snapshotStations);
    }

    /**
     * return first snapshot by date from the database.
     * @param {date} date - requested time.
     * @return {SnapshotModel}
     */
    async getSnapshotByDate(date: Date): Promise<SnapshotModel> {
        const snapshot = await this.model.findOne({createdAt: {$gte: date}});

        return snapshot ? new SnapshotModel({
            id: snapshot._id,
            stations: snapshot.stations,
            createdAt: snapshot.createdAt,
        }) : null;
    }

    /**
     * Get first snapshot of specific station by station id on or after the requested time from the database.
     * @param {number} stationId - id of specific station.
     * @param {Date} date - requested time.
     * @return {SnapshotModel}
     */
    async getStationByIdInSnapshot(stationId: number, date: Date): Promise<SnapshotModel> {
        const snapshots = await this.model.aggregate([
            { $match: { createdAt: {$gte: date} } },
            {
              $project: {
                createdAt: '$createdAt',
                stations: {
                  $filter: {
                    input: '$stations',
                    as: 'station',
                    cond: {
                        $eq: ['$$station.id', stationId] ,
                    },
                  },
                },
              },
            },
            { $limit : 1 },
        ]);

        return snapshots[0] ? new SnapshotModel({
            id: snapshots[0]._id,
            stations: snapshots[0].stations,
            createdAt: snapshots[0].createdAt,
        }) : null;
    }

}
