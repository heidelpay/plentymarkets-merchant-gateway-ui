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
    TerraSelectBoxValueInterface
} from '@plentymarkets/terra-components';
import { BasicSettingsService } from './basic-settings.service';

@Component({
    selector: 'basic-settings',
    template: require('./basic-settings.component.html'),
    styles:   [require('./basic-settings.component.scss')],
})
export class BasicSettingsComponent implements OnInit
{
    private isLoading:boolean = true;
    private alert:TerraAlertComponent;
    private service:BasicSettingsService;

    private publicKey:string;
    private privateKey:string;
    private apiModeList:Array<TerraSelectBoxValueInterface> = [];
    private apiMode:string = 'sandbox';

    constructor(
        public translation:TranslationService,
        private basicSettingsService:BasicSettingsService
    ) {
        this.alert = TerraAlertComponent.getInstance();
        this.service = basicSettingsService;
    }

    public ngOnInit():void
    {
        this.apiModeList = [{
            caption: this.translation.translate('sandbox'),
            value: 'sandbox'
        },{
            caption: this.translation.translate('production'),
            value: 'production'
        }];
        this.loadSettings();
    }

    private loadSettings():void
    {
        this.isLoading = true;

        this.service.getBasicSettings().subscribe(
            (response:any) => {
                if (response.success === true) {
                    this.publicKey = response.settings.publicKey;
                    this.privateKey = response.settings.privateKey;
                    this.apiMode = response.settings.apiMode;
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
            publicKey: this.publicKey,
            privateKey: this.privateKey,
            apiMode: this.apiMode,
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
