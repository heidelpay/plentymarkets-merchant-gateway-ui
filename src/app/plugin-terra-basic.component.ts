import {
    Component,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector:      'terra-basic-app',
    template:      require('./plugin-terra-basic.component.html'),
    styles:        [require('./plugin-terra-basic.component.scss')],
    encapsulation: ViewEncapsulation.None
})
export class PluginTerraBasicComponent
{
    private action:any = this.getUrlVars()['action'];

    private getUrlVars()
    {
        var vars = {};

        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(substring:string, ...args:any[]):string
        {
            vars[args[0]] = args[1];
            return;
        });

        return vars;
    }

}
