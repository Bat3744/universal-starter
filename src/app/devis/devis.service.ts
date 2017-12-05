import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class DevisService {

	constructor(private http: Http) {
	}

	submitForm(data: Object): Promise<any> {
		return this.http.post('/api/submitDevis', {data})
			.toPromise()
			.then(response => response.json())
			.catch(this.handleError);
	}

	private handleError (error: any) {
		let errMsg = (error.message) ? error.message :
			error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg); // log to console instead
	}

}
