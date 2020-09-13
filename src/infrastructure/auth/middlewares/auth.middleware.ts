import { Injectable, NestMiddleware, Response, UnauthorizedException, UseFilters } from '@nestjs/common';
import { UnauthorizedExceptionFilter } from '../../../infrastructure/exception-filter/unauthorized-exception-filter';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    @UseFilters(UnauthorizedExceptionFilter)
    async use(request: any, res: Response, next: () => void) {
        const authorization = request.headers.authorization?.replace('Bearer ', '');
        if (authorization !== 'AbCdEf123456') {
            throw new UnauthorizedException('Unauthorized');
        }

        next();
    }
}
