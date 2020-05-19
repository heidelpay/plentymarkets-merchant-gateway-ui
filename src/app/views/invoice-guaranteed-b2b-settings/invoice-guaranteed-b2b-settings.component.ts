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
    TerraCheckboxComponent,
    TerraSelectBoxValueInterface
} from '@plentymarkets/terra-components';
import { InvoiceGuaranteedB2bSettingsService } from './invoice-guaranteed-b2b-settings.service';

@Component({
    selector: 'invoice-guaranteed-b2b-settings',
    template: require('./invoice-guaranteed-b2b-settings.component.html'),
    styles:   [require('./invoice-guaranteed-b2b-settings.component.scss')],
})
export class InvoiceGuaranteedB2bSettingsComponent implements OnInit
{
    @ViewChild('viewChildUsePaymentCb')
    public viewChildUsePaymentCb:TerraCheckboxComponent;
    // @ViewChild('viewGuaranteedOrFactoringCb')
    // public viewGuaranteedOrFactoringCb:TerraCheckboxComponent;

    private isLoading:boolean = true;
    private alert:TerraAlertComponent;
    private service:InvoiceGuaranteedB2bSettingsService;

    private displayName:string = '';
    private basketMinTotal:Number;
    private basketMaxTotal:Number;
    private iconURL:string = '';
    private reasonCodeCancel:Number;
    private reasonCodeReturn:Number;
    private reasonCodeCredit:Number;
    private returnReasonList:Array<TerraSelectBoxValueInterface> = [];

    constructor(
        public translation:TranslationService,
        private invoiceGuaranteedB2bSettingsService:InvoiceGuaranteedB2bSettingsService
    ) {
        this.alert = TerraAlertComponent.getInstance();
        this.service = invoiceGuaranteedB2bSettingsService;
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
                    this.returnReasonList.push({
                        caption: '---',
                        value: ''
                });
                response.returnReasonList.forEach(element => {
                    this.returnReasonList.push({
                        caption: element.reason,
                        value: element.id
                    });
                });
                    this.viewChildUsePaymentCb.value = !!+response.settings.isActive;
                    // this.viewGuaranteedOrFactoringCb.value = !!+response.settings.guaranteedOrFactoring;
                    this.displayName = response.settings.displayName;
                    this.iconURL = response.settings.iconURL;
                    this.basketMinTotal = Number(response.settings.basketMinTotal);
                    this.basketMaxTotal = Number(response.settings.basketMaxTotal);
                    this.reasonCodeCancel = Number(response.settings.reasonCodeCancel);
                    this.reasonCodeReturn = Number(response.settings.reasonCodeReturn);
                    this.reasonCodeCredit = Number(response.settings.reasonCodeCredit);
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
        let data:InvoiceSettings = {
            isActive: this.viewChildUsePaymentCb.value,
            guaranteedOrFactoring: false, //this.viewGuaranteedOrFactoringCb.value,
            iconURL: this.iconURL,
            displayName: this.displayName,
            basketMinTotal: this.basketMinTotal,
            basketMaxTotal: this.basketMaxTotal,
            reasonCodeCancel: this.reasonCodeCancel,
            reasonCodeReturn: this.reasonCodeReturn,
            reasonCodeCredit: this.reasonCodeCredit,
        };
        
        // if (this.viewGuaranteedOrFactoringCb.value) {
        //     if (!data.reasonCodeCancel || !data.reasonCodeReturn || !data.reasonCodeCredit) {
        //         this.alert.addAlertForPlugin(
        //             {
        //                 msg:this.translation.translate('errorWhileSavingSettings') + ': ' + this.translation.translate('missingReasonCodes'),
        //                 type:'danger',
        //                 dismissOnTimeout:3000,
        //             });
        //         console.log(this.translation.translate('errorWhileSavingSettings') + ': ' + this.translation.translate('missingReasonCodes'));
        //         this.isLoading = false;
        //         return;
        //     }
        // }
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

interface InvoiceSettings {
    isActive: boolean,
    guaranteedOrFactoring: boolean,
    iconURL: string,
    displayName: string,
    basketMinTotal: Number,
    basketMaxTotal: Number,
    reasonCodeCancel?: Number,
    reasonCodeReturn?: Number,
    reasonCodeCredit?: Number,
  }
