import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
})
export class About {
  skills = signal([
    'Python', 'SQL', 'Machine Learning', 'Deep Learning',
    'Data Analysis', 'Cloud Computing', 'AWS', 'Azure',
    'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas'
  ]);
}
