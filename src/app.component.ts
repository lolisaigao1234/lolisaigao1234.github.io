import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // CRITICAL: This was missing!

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
    CommonModule, // CRITICAL: Required for *ngIf directive
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

  /**
   * Signal to control opening screen visibility.
   * Starts as true and is set to false when animation completes.
   */
  showOpeningScreen = signal(true);

  /**
   * Handler for when the opening screen animation completes.
   * Hides the opening screen to reveal main content.
   */
  onOpeningAnimationComplete(): void {
    this.showOpeningScreen.set(false);

    // Optionally, unlock body scroll if it was locked
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }
}