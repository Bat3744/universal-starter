import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ValeursService {

	constructor(private http: Http) {
	}

	getData(): Promise<any> {
		return this.http.get('/api/test')
			.toPromise()
			.then(response => response.text())
			.catch(this.handleError);
	}

	private handleError (error: any) {
		let errMsg = (error.message) ? error.message :
			error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg); // log to console instead
	}

}
