import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
})
export class Projects {
  projects = signal([
    {
      title: 'Tax & Portfolio Reconciliation',
      description: 'A comprehensive system to simulate broker operations, reconcile transactions with real-time market data, and calculate tax liabilities including wash-sale implications.',
      tags: ['Python', 'Pandas', 'IBKR API'],
      period: 'Oct 2024 - Present',
      icon: '💰',
      gradient: 'from-purple-900/60 to-slate-900'
    },
    {
      title: 'Wi-Fi Health Score System',
      description: 'Cloud-based analytics platform quantifying access point performance. Features real-time monitoring dashboards and distributed data processing on AWS.',
      tags: ['AWS', 'Docker', 'Athena'],
      period: 'May 2025 - Dec 2025',
      icon: '📶',
      gradient: 'from-cyan-900/60 to-slate-900'
    },
    {
      title: 'NLP-to-SQL Pipeline',
      description: 'Intelligent system automating SQL query generation from natural language prompts with 80% semantic accuracy.',
      tags: ['NLP', 'Deep Learning', 'Python'],
      period: 'Jun 2023 - Aug 2023',
      icon: '🤖',
      gradient: 'from-blue-900/60 to-slate-900'
    },
    {
      title: 'Marketing Analytics Dashboard',
      description: 'Dynamic web platform analyzing sales data and advertising ROI for mobile apps. Boosted ad ROI by 30% through data-driven insights.',
      tags: ['Django', 'MySQL', 'Visualization'],
      period: 'Jun 2021 - Aug 2021',
      icon: '📊',
      gradient: 'from-green-900/60 to-slate-900'
    }
  ]);
}
