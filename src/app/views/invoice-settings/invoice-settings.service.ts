import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {
    TerraBaseService,
    TerraLoadingSpinnerService
} from '@plentymarkets/terra-components';
import { Observable } from 'rxjs';
import { localConfig } from '../../../../config/localConfig';

@Injectable()
export class InvoiceSettingsService extends TerraBaseService
{
    private bearer:string = '';

    constructor(loadingSpinnerService:TerraLoadingSpinnerService, http:Http)
    {
        super(loadingSpinnerService, http, '');

        if (location.hostname === 'localhost')
        {
            this.bearer = localConfig.bearer;
            this.url = localConfig.url;
        }
    }

    public getBasicSettings():Observable<any>
    {
        this.setAuthorization();
        this.setHeader();

        let url:string = this.url + '/rest/' + localConfig.pluginName + '/invoice-settings';

        return this.mapRequest(
            this.http.get(url, {
                headers: this.headers,
                body:    ''
            })
        );
    }

    public saveBasicSettings(data:any):Observable<any>
    {
        this.setAuthorization();
        this.setHeader();

        let url:string = this.url + '/rest/' + localConfig.pluginName + '/invoice-settings';

        return this.mapRequest(
            this.http.post(url, data, {headers: this.headers}));
    }

    private setHeader():void
    {
        if (this.bearer !== null && this.bearer.length > 0) {
            this.headers.set('Authorization', 'Bearer ' + this.bearer);
        }
    }


}
