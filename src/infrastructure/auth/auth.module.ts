import { HttpModule, Module } from '@nestjs/common';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { UnauthorizedExceptionFilter } from '../exception-filter/unauthorized-exception-filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
    imports: [HttpModule],
    providers: [
        AuthMiddleware,
        {
            provide: APP_FILTER,
            useClass: UnauthorizedExceptionFilter,
        },
    ],
    exports: [AuthMiddleware],
})
export class AuthModule {
}
