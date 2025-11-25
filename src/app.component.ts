import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OpeningScreenComponent } from './components/opening-screen/opening-screen.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OpeningScreenComponent],
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
