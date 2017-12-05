import * as $ from 'jquery';
import { Component, AfterViewInit } from '@angular/core';

@Component({
	selector:    'footer',
	templateUrl: 'footer.component.html'
})

export class FooterComponent implements AfterViewInit {

	ngAfterViewInit() {
		$('#mentionsLegalesCollapse').on('show.bs.collapse', function () {
			$('html,body').animate({scrollTop: document.body.scrollHeight}, 'slow');
		});
	}

}
