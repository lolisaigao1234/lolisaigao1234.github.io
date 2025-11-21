import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

interface SkillCategory {
  category: string;
  list: string[];
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  skills = signal<SkillCategory[]>([
    { category: 'Programming Languages', list: ['Python', 'MySQL', 'C++', 'Java'] },
    { category: 'Data Analytics & ML', list: ['Spark', 'NumPy', 'Pandas', 'Tableau', 'Power BI', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'Alteryx'] },
    { category: 'Cloud & DevOps', list: ['AWS (EC2, S3)', 'Docker', 'Git', 'AWS Athena'] },
    { category: 'Generative AI', list: ['ChatGPT', 'Claude', 'Prompt Engineering'] },
    { category: 'Other Skills', list: ['ETL Pipelines', 'Data Warehousing', 'Statistical Modeling', 'NLP'] }
  ]);
}