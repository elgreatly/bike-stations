import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './Database/database.module';
import { APIService } from './api/api.service';

@Module({
    imports: [
        ConfigModule,
        HttpModule,
        DatabaseModule,
    ],
    providers: [APIService],
    exports: [APIService],
})
export class InfrastructureModule {
}
