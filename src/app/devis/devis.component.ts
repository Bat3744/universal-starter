import { Component } from '@angular/core';
import { Devis } from './devis';
import { DevisService } from './devis.service';
import { RecaptchaModule } from 'ng-recaptcha';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'devis',
	templateUrl: 'devis.component.html'
})

export class DevisComponent {

	public textareaValue: string;

	constructor(private devisService: DevisService) {
	}

	model = new Devis();

	natures = [
		'Essais de réception - sorbonnes de laboratoire',
		'Essais de routine - sorbonnes de laboratoire',
		'Hottes - Armoires ventilées - Bras aspirants',
		'Audit aéraulique - réseau de ventilation',
		'Formation'
	];

	captchaResponse = null;
	formErrors = '';
	formSuccess = '';
	envoiEnCours = false;

	resolved(captchaResponse: string) {
		this.captchaResponse = captchaResponse;
	}

	textareaValueChange(ev) {
		this.model._infoComplementaire = ev.target.value;
	}

	onSubmit() {
		this.showLoading();

		this.devisService.submitForm({
			form: this.model,
			captchaResponse: this.captchaResponse
		}).then(formError => {
			if (Object.keys(formError).length > 0) {
				this.displayFormErrors(formError);
			} else {
				this.displayOKResult();
				this.model = new Devis();
			}

			this.hideLoading();
		});

		grecaptcha.reset();
	}

	showLoading() {
		this.envoiEnCours = true;
	}

	hideLoading() {
		this.envoiEnCours = false;
	}

	displayFormErrors(formError: Object) {
		this.formErrors = '';

		for (let key of Object.keys(formError)) {
			this.formErrors += formError[key];
			this.formErrors += '<br/>';
		}

	}

	displayOKResult() {
		this.formSuccess = 'Votre demande de devis à bien été envoyé';
	}

}
