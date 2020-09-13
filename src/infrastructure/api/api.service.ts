import { HttpService, Injectable, Scope, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { BaseModel } from './base.model';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class APIService {

    constructor(private http: HttpService) { }

    get<T extends BaseModel>(url: string, data?: any, headers?: any, model?: new () => T): Observable<T> {
        return this.http.get(url, {
            headers: this.makeHeaders(headers),
            params: data,
        }).pipe(
            map((res) => {
                return res.data;
            }),
            map(resData => {
                return this.mapToModel(model, resData);
            }),
            catchError(e => {
                throw this.handleErrors(e);
            }),
        );
    }

    post<T extends BaseModel>(url: string, data?: any, headers?: any, model?: new () => T): Observable<T> {
        return this.http.post(url, data, {
            headers: this.makeHeaders(headers),
        }).pipe(
            map((res) => {
                return res.data;
            }),
            map(resData => {
                return this.mapToModel(model, resData);
            }),
            catchError(e => {
                throw this.handleErrors(e);
            }),
        );
    }

    put<T extends BaseModel>(url: string, data?: any, headers?: any, model?: new () => T): Observable<T> {
        return this.http.put(url, data, {
            headers: this.makeHeaders(headers),
        }).pipe(
            map((res) => {
                return res.data;
            }),
            map(resData => {
                return this.mapToModel(model, resData);
            }),
            catchError(e => {
                throw this.handleErrors(e);
            }),
        );
    }

    patch<T extends BaseModel>(url: string, data?: any, headers?: any, model?: new () => T): Observable<T> {
        return this.http.patch(url, data, {
            headers: this.makeHeaders(headers),
        }).pipe(
            map((res) => {
                return res.data;
            }),
            map(resData => {
                return this.mapToModel(model, resData);
            }),
            catchError(e => {
                throw this.handleErrors(e);
            }),
        );
    }

    delete(url: string, headers?: any) {
        return this.http.delete(url, {
            headers: this.makeHeaders(headers),
        }).pipe(
            map((res) => {
                return res.data;
            }),
            catchError(e => {
                throw this.handleErrors(e);
            }),
        );
    }

    private mapToModel(model: any, data: any) {
        if (!model) { return data; }

        if (Array.isArray(data)) {
            return data.map(item => new model(item));
        }

        return new model(data);
    }

    private makeHeaders(headers?: any) {
        return { 'content-type': 'application/json', ...headers };
    }

    private handleErrors(e) {
        if (e.response) {
            return new HttpException(e.response.data, e.response.status);
        }
        return new HttpException('General error occurs', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
