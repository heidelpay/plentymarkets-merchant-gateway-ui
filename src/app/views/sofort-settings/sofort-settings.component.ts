import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import {
    TranslationService
} from 'angular-l10n';
import {
    TerraAlertComponent,
    TerraCheckboxComponent
} from '@plentymarkets/terra-components';
import { SofortSettingsService } from './sofort-settings.service';

@Component({
    selector: 'sofort-settings',
    template: require('./sofort-settings.component.html'),
    styles:   [require('./sofort-settings.component.scss')],
})
export class SofortSettingsComponent implements OnInit
{
    @ViewChild('viewChildUsePaymentCb')
    public viewChildUsePaymentCb:TerraCheckboxComponent;

    private isLoading:boolean = true;
    private alert:TerraAlertComponent;
    private service:SofortSettingsService;

    private displayName:string = '';
    private basketMinTotal:Number;
    private basketMaxTotal:Number;
    private iconURL:string = '';

    constructor(
        public translation:TranslationService,
        private sofortSettingsService:SofortSettingsService
    ) {
        this.alert = TerraAlertComponent.getInstance();
        this.service = sofortSettingsService;
    }

    public ngOnInit():void
    {
        this.loadSettings();
    }

    private loadSettings():void
    {
        this.isLoading = true;

        this.service.getBasicSettings().subscribe(
            (response:any) => {
                if (response.success === true) {
                    this.viewChildUsePaymentCb.value = !!+response.settings.isActive;
                    this.displayName = response.settings.displayName;
                    this.iconURL = response.settings.iconURL;
                    this.basketMinTotal = Number(response.settings.basketMinTotal);
                    this.basketMaxTotal = Number(response.settings.basketMaxTotal);
                } else {
                    this.alert.addAlertForPlugin(
                        {
                            msg:this.translation.translate('errorWhileSavingSettings') + ': ' + response.message,
                            type:'danger',
                            dismissOnTimeout:3000,
                        });
                        console.log(this.translation.translate('errorWhileSavingSettings') + ': ' + response.message);
                }

                this.isLoading = false;
            },
            (error:any) => {
                this.isLoading = false;
                this.alert.addAlertForPlugin(
                {
                    msg:this.translation.translate('errorOnLoadingSettings') + ': ' + JSON.parse(error._body)['error']['message'],
                    type:'danger',
                    dismissOnTimeout:3000,
                });
                console.log(this.translation.translate('errorOnLoadingSettings') + ': ' + JSON.parse(error._body)['error']['message']);
            }
        );
    }

    private saveSettings():void
    {
        this.isLoading = true;
        let data:Object = {
            isActive: this.viewChildUsePaymentCb.value,
            iconURL: this.iconURL,
            displayName: this.displayName,
            basketMinTotal: this.basketMinTotal,
            basketMaxTotal: this.basketMaxTotal,
        };
        
        this.service.saveBasicSettings(data).subscribe(
            (response:any) => {
                if(response.success === true) {
                    this.alert.addAlertForPlugin(
                    {
                        msg:this.translation.translate('successSaveSettings'),
                        type:'success',
                        dismissOnTimeout:3000,
                    });
                    console.log(this.translation.translate('successSaveSettings'));

                    this.loadSettings();
                } else {
                    this.alert.addAlertForPlugin(
                    {
                        msg:this.translation.translate('errorWhileSavingSettings') + ': ' + response.message,
                        type:'danger',
                        dismissOnTimeout:3000,
                    });
                    console.log(this.translation.translate('errorWhileSavingSettings') + ': ' + response.message);
                }

                this.isLoading = false;
            },
            (error:any) => {
                this.alert.addAlertForPlugin(
                {
                    msg:this.translation.translate('errorWhileSavingSettings') + ': ' + JSON.parse(error._body)['error']['message'],
                    type:'danger',
                    dismissOnTimeout:3000,
                });
                console.log(this.translation.translate('errorWhileSavingSettings') + ': ' + JSON.parse(error._body)['error']['message']);

                this.isLoading = false;
            }
        );
    }
}