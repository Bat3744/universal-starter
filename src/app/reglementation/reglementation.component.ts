import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  //moduleId: module.id,
  selector:    'reglementation',
  templateUrl: 'reglementation.component.html'
})

export class ReglementationComponent {

	constructor(private sanitized: DomSanitizer) {}

	diagramEssai1SVG = require('../../assets/images/diag_essais_1.svg');
	diagramEssai2SVG = require('../../assets/images/diag_essais_2.svg');
}
