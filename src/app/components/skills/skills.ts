import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.html',
})
export class Skills {
  skillCategories = signal([
    {
      name: 'Languages & Databases',
      colorClass: 'cyan',
      skills: ['Python', 'MySQL', 'C++', 'Java', 'AWS Athena']
    },
    {
      name: 'Data Science & ML',
      colorClass: 'purple',
      skills: ['Spark', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'NumPy', 'Pandas']
    },
    {
      name: 'Cloud & Tools',
      colorClass: 'blue',
      skills: ['AWS (EC2, S3)', 'Docker', 'Git', 'Tableau', 'Power BI']
    },
    {
      name: 'Domain Expertise',
      colorClass: 'green',
      skills: ['Generative AI (ChatGPT, Claude)', 'NLP', 'Statistical Modeling', 'ETL Pipelines', 'Tax/Accounting Concepts']
    }
  ]);
}
