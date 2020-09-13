import { Module, MiddlewareConsumer } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ScheduleModule } from '@nestjs/schedule';
import { StationModule } from './app/station/station.module';
import { HttpExceptionFilter } from './infrastructure/exception-filter/exception-filter';
import { AuthMiddleware } from './infrastructure/auth/middlewares/auth.middleware';
import { UnauthorizedExceptionFilter } from './infrastructure/exception-filter/unauthorized-exception-filter';

@Module({
    imports: [
        InfrastructureModule,
        ScheduleModule.forRoot(),
        StationModule,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
        {
            provide: APP_FILTER,
            useClass: UnauthorizedExceptionFilter,
        },
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(AuthMiddleware).forRoutes('/*');
    }
}
