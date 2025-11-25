import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OpeningScreenComponent } from './components/opening-screen/opening-screen.component';

import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    OpeningScreenComponent,
    HeaderComponent,
    HeroComponent,
    ProjectsComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio-website';
  showOpeningScreen = signal(true);

  onOpeningAnimationComplete() {
    this.showOpeningScreen.set(false);
  }
}
