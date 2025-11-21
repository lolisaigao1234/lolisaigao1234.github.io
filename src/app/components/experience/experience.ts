import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  templateUrl: './experience.html',
})
export class Experience {
  experiences = signal([
    {
      company: 'ActionTec Electronics Co., LTD',
      role: 'Data Analyst & Model Building Intern',
      period: 'Aug 2025 - Dec 2025',
      description: 'Developing cloud-based Wi-Fi Health Score systems and real-time monitoring dashboards on AWS.',
      achievements: [
        'Built end-to-end data pipelines on AWS (EC2, S3, Athena).',
        'Boosted network assessment efficiency by 60% with real-time dashboards.',
        'Refactored architecture for cloud deployment and concurrent processing.'
      ],
      icon: '💼',
      colorClass: 'cyan'
    },
    {
      company: 'AiFinSphere Co., LTD',
      role: 'Data Analyst Intern',
      period: 'Aug 2024 - Oct 2024',
      description: 'AI Quantitative Hedge Fund - Implemented Black-Scholes Model and analyzed market data.',
      achievements: [
        'Implemented Black-Scholes Model using Python and Newton-Raphson method.',
        'Processed high-volume stock data (AMD, NVIDIA) using Spark.',
        'Improved computational efficiency by 10% through data unification.'
      ],
      icon: '📈',
      colorClass: 'purple'
    },
    {
      company: 'SDIC Securities Co., LTD',
      role: 'Data Analyst & SDE Intern',
      period: 'June 2024 - Aug 2024',
      description: 'Built multiprocessing Python pipelines for quantitative model building.',
      achievements: [
        'Consolidated data from MySQL and Oracle for quantitative models.',
        'Enhanced performance by 15% using multiprocessing and error handling.',
        'Generated visual dashboards for profit distributions and transaction frequency.'
      ],
      icon: '💻',
      colorClass: 'blue'
    }
  ]);
}
