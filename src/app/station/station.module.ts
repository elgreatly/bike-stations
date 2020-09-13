import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { StationController } from './station.controller';
import { IndegoService } from './services/indego.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SnapshotStationsSchema } from './schemas/snapshot.schema';
import { StationService } from './services/station.service';
import { StationRepository } from './repositories/station.repository';
import { WetherService } from './services/weather.service';
import { SnapshotStationsJob } from './jobs/snapshot-stations.job';

@Module({
    controllers: [StationController],
    providers: [IndegoService, StationService, StationRepository, WetherService, SnapshotStationsJob],
    imports: [
        InfrastructureModule,
        MongooseModule.forFeature([
            {
                name: 'snapshotStations',
                schema: SnapshotStationsSchema,
                collection: 'snapshots',
            },
        ]),

    ],
})
export class StationModule {}
