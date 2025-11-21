import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Hero } from './components/hero/hero';
import { Experience } from './components/experience/experience';
import { Skills } from './components/skills/skills';
import { Projects } from './components/projects/projects';
import { About } from './components/about/about';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Hero, Experience, Skills, Projects, About],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('rocky-portfolio');
}
