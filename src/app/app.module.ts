import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {ModalModule} from 'ngx-modialog';
import {BootstrapModalModule} from 'ngx-modialog/plugins/bootstrap';
import {RecaptchaModule} from 'ng-recaptcha';

import {AppComponent} from './app.component';

import {MenuComponent} from './menu/menu.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {SorbonneComponent} from './sorbonne/sorbonne.component';

import {ValeursComponent} from './valeurs/valeurs.component';
import {ValeursService} from './valeurs/valeurs.service';
import {ReglementationComponent} from './reglementation/reglementation.component';
import {PrestationsComponent} from './prestations/prestations.component';
import {DevisComponent} from './devis/devis.component';
import {DevisService} from './devis/devis.service';
import {ContactComponent} from './contact/contact.component';

@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        HeaderComponent,
        FooterComponent,
        SorbonneComponent,
        ValeursComponent,
        ReglementationComponent,
        PrestationsComponent,
        DevisComponent,
        ContactComponent
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'control-air'}),
        RouterModule.forRoot([]),
        RecaptchaModule.forRoot(),
        HttpModule,
        ModalModule.forRoot(),
        BootstrapModalModule,
        FormsModule,
        ReactiveFormsModule
    ],
    bootstrap: [ AppComponent ],
    providers: [ ValeursService, DevisService ]
})
export class AppModule {
}
