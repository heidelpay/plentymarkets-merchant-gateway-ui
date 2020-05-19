import {
    APP_INITIALIZER,
    NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PluginTerraBasicComponent } from './plugin-terra-basic.component';
import { HttpModule } from '@angular/http';
import {
    L10nLoader,
    TranslationModule
} from 'angular-l10n';
import { FormsModule } from '@angular/forms';
import { l10nConfig } from './core/localization/l10n.config';
import { TerraComponentsModule } from '@plentymarkets/terra-components/app';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {
    httpInterceptorProviders,
    TerraNodeTreeConfig
} from '@plentymarkets/terra-components';

import { BasicSettingsComponent } from './views/basic-settings/basic-settings.component';
import { BasicSettingsService } from './views/basic-settings/basic-settings.service';

import { InvoiceSettingsComponent } from './views/invoice-settings/invoice-settings.component';
import { InvoiceSettingsService } from './views/invoice-settings/invoice-settings.service';

import { InvoiceGuaranteedSettingsComponent } from './views/invoice-guaranteed-settings/invoice-guaranteed-settings.component';
import { InvoiceGuaranteedSettingsService } from './views/invoice-guaranteed-settings/invoice-guaranteed-settings.service';

import { InvoiceGuaranteedB2bSettingsComponent } from './views/invoice-guaranteed-b2b-settings/invoice-guaranteed-b2b-settings.component';
import { InvoiceGuaranteedB2bSettingsService } from './views/invoice-guaranteed-b2b-settings/invoice-guaranteed-b2b-settings.service';

import { CardsSettingsComponent } from './views/cards-settings/cards-settings.component';
import { CardsSettingsService } from './views/cards-settings/cards-settings.service';

import { SepaDirectDebitSettingsComponent } from './views/sepa-direct-debit-settings/sepa-direct-debit-settings.component';
import { SepaDirectDebitSettingsService } from './views/sepa-direct-debit-settings/sepa-direct-debit-settings.service';

import { SepaDirectDebitGuaranteedSettingsComponent } from './views/sepa-direct-debit-guaranteed-settings/sepa-direct-debit-guaranteed-settings.component';
import { SepaDirectDebitGuaranteedSettingsService } from './views/sepa-direct-debit-guaranteed-settings/sepa-direct-debit-guaranteed-settings.service';

import { PaypalSettingsComponent } from './views/paypal-settings/paypal-settings.component';
import { PaypalSettingsService } from './views/paypal-settings/paypal-settings.service';

import { IdealSettingsComponent } from './views/ideal-settings/ideal-settings.component';
import { IdealSettingsService } from './views/ideal-settings/ideal-settings.service';

import { SofortSettingsComponent } from './views/sofort-settings/sofort-settings.component';
import { SofortSettingsService } from './views/sofort-settings/sofort-settings.service';

import { FlexipayDirectSettingsComponent } from './views/flexipay-direct-settings/flexipay-direct-settings.component';
import { FlexipayDirectSettingsService } from './views/flexipay-direct-settings/flexipay-direct-settings.service';

@NgModule({
    imports:      [
        BrowserModule,
        HttpModule,
        FormsModule,
        HttpClientModule,
        TranslationModule.forRoot(l10nConfig),
        RouterModule.forRoot([]),
        TerraComponentsModule.forRoot(),
    ],
    declarations: [
        PluginTerraBasicComponent,
        BasicSettingsComponent,
        InvoiceSettingsComponent,
        InvoiceGuaranteedSettingsComponent,
        InvoiceGuaranteedB2bSettingsComponent,
        CardsSettingsComponent,
        SepaDirectDebitSettingsComponent,
        SepaDirectDebitGuaranteedSettingsComponent,
        PaypalSettingsComponent,
        IdealSettingsComponent,
        SofortSettingsComponent,
        FlexipayDirectSettingsComponent
    ],
    providers:    [
        {
            provide:    APP_INITIALIZER,
            useFactory: initL10n,
            deps:       [L10nLoader],
            multi:      true
        },
        httpInterceptorProviders,
        TerraNodeTreeConfig,
        BasicSettingsService,
        InvoiceSettingsService,
        InvoiceGuaranteedSettingsService,
        InvoiceGuaranteedB2bSettingsService,
        CardsSettingsService,
        SepaDirectDebitSettingsService,
        SepaDirectDebitGuaranteedSettingsService,
        PaypalSettingsService,
        IdealSettingsService,
        SofortSettingsService,
        FlexipayDirectSettingsService
    ],
    bootstrap:    [
        PluginTerraBasicComponent
    ]
})
export class PluginTerraBasicModule
{
    constructor(public l10nLoader:L10nLoader)
    {
        this.l10nLoader.load();
    }
}

function initL10n(l10nLoader:L10nLoader):Function
{
    return ():Promise<void> => l10nLoader.load();
}
