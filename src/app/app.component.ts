import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(meta: Meta, title: Title) {
    // Sets the <title></title>
    title.setTitle('Control Air');

    // Sets the <meta> tag for the page
    meta.addTags([
      { name: 'author', content: 'ControlAir' },
      { name: 'description', content: 'Spécialiste en mesure et analyse des comportements aérauliques.' },
    ]);
  }

}