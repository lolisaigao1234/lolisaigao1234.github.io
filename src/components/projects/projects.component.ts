import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { Project } from '../../models/project.model';
import { NgOptimizedImage } from '@angular/common';

interface ExperienceCategory {
  name: string;
  projects: Project[];
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  experiences = signal<ExperienceCategory[]>([
    {
      name: 'Quantitative Finance & AI',
      projects: [
        {
          company: 'AiFinSphere Co., LTD – AI Quantitative Hedge Fund',
          role: 'Data Analyst and Model Building Intern',
          duration: 'August 2024 - October 2024',
          image: 'https://picsum.photos/seed/aifinsphere/600/400',
          title: 'Quantitative Trading Models & Tax Analysis',
          description: [
            "Implemented a Black-Scholes Model integrating Interactive Brokers' Trader Workstation API and implied volatility calculations via Newton-Raphson method.",
            'Analyzed market prices and temporal data, leveraging Spark-based data warehousing to expedite parallel data processing.',
            'Orchestrated the ingestion and unification of hundreds of millions of transaction records, improving computational efficiency by 10%.',
            'Emulated a broker environment to calculate potential tax liabilities and generate reconciliation reports.',
            'Employed Generative AI tools (ChatGPT, Claude) for adaptive learning and refining quant strategies.'
          ],
          tags: ['Python', 'Black-Scholes', 'Spark', 'Generative AI', 'Tax Accounting', 'Interactive Brokers API'],
          repoUrl: 'https://github.com/lolisaigao1234'
        },
        {
          company: 'SDIC Securities Co., LTD',
          role: 'Data Analyst and Software Development Engineer Intern',
          duration: 'June 2024 - August 2024',
          image: 'https://picsum.photos/seed/sdic/600/400',
          title: 'Quantitative Model Pipeline',
          description: [
            'Built a multiprocessing Python pipeline consolidating data from MySQL and Oracle for quantitative model building.',
            'Integrated massive cross-asset datasets (ETFs, stocks, profit data) and generated visual dashboards.',
            'Enhanced program performance by 15% through multiprocessing, error handling queues, and well-structured helper functions.',
            'Leveraged Generative AI (ChatGPT) to automate code QA and query optimization.'
          ],
          tags: ['Python', 'Multiprocessing', 'MySQL', 'Oracle', 'Pandas', 'Generative AI'],
          repoUrl: 'https://github.com/lolisaigao1234'
        },
      ]
    },
    {
      name: 'Data Science & Analytics',
      projects: [
        {
          company: 'ActionTec Electronics Co., LTD',
          role: 'Data Analyst and Model Building Intern',
          duration: 'August 2025 - December 2025',
          image: 'https://picsum.photos/seed/actiontec2/600/400',
          title: 'Cloud-Based Wi-Fi Health Score System (v2)',
          description: [
            'Developed the second version of the User Experience Quality (QoE) Wi-Fi Health Score System, refactoring the architecture for cloud deployment.',
            'Designed and implemented a cloud-based data processing pipeline using AWS Docker EC2 container services with Athena.',
            'Constructed an end-to-end data pipeline with automated data collection and SQL-optimized processing for real-time analysis.',
            'Developed a real-time monitoring dashboard, boosting Wi-Fi health assessment efficiency by 60%.'
          ],
          tags: ['Cloud', 'AWS EC2', 'Docker', 'Athena', 'Python', 'SQL'],
          repoUrl: 'https://github.com/lolisaigao1234'
        },
        {
          company: 'ActionTec Electronics Co., LTD',
          role: 'Data Analyst and Model Building Intern',
          duration: 'May 2025 - August 2025',
          image: 'https://picsum.photos/seed/actiontec1/600/400',
          title: 'Wi-Fi Health Score System (v1)',
          description: [
            'Developed a comprehensive Quality of Experience (QoE) Wi-Fi Health Score system to quantify and analyze Wi-Fi access point performance.',
            'Utilized Python for in-depth data analysis, cleaning, and visualization to validate statistical models.',
            'Innovated metric calculation to be more user-centric, transforming raw speed into "Performance Potential".',
            'Applied statistical algorithms, including ANOVA and PCA, to develop a holistic model combining multiple metrics into a single score.'
          ],
          tags: ['Python', 'Data Analysis', 'Statistical Modeling', 'ANOVA', 'PCA', 'Shell Scripting'],
          repoUrl: 'https://github.com/lolisaigao1234'
        },
        {
          company: 'Actiontec Co. Ltd',
          role: 'Data Analyst Intern, Data & Analytics',
          duration: 'December 2023 – May 2024',
          image: 'https://picsum.photos/seed/actiontec/600/400',
          title: 'ML-Ready Data Modeling & Wi-Fi Analysis',
          description: [
            'Developed a data model integrating multi-source data (S3 Parquet, MySQL on AWS) and leveraged Athena Query for foundational ML evaluations.',
            'Consolidated and manipulated over 1 million records of product alarm data to help debug Wi-Fi modem issues.',
            'Created a comprehensive data dictionary detailing data flows, definitions, and integrity rules.',
            'Used ChatGPT and Claude to enhance understanding of analytics project scope and research best practices.'
          ],
          tags: ['AWS S3', 'MySQL', 'AWS Athena', 'Data Modeling', 'Python', 'Pandas'],
          repoUrl: 'https://github.com/lolisaigao1234'
        },
        {
          company: 'TENCENT Co. Ltd',
          role: 'Data Analyst Intern, Big Data Brain',
          duration: 'June 2023 - August 2023',
          image: 'https://picsum.photos/seed/tencent/600/400',
          title: 'NLP-Powered SQL Pipeline',
          description: [
            'Architected an SQL pipeline that automates query generation from human-language prompts with 80% accuracy.',
            'Managed data extraction and cleaning for large-scale text inputs, addressing missing values, outliers, and complex NLP transformations.',
            'Created and refined 100+ MySQL test cases for an NLP deep learning model, boosting efficiency by 20%.',
            'Adopted generative AI to explore advanced NLP/ML frameworks and accelerate test-case generation.'
          ],
          tags: ['SQL', 'NLP', 'Python', 'MySQL', 'Generative AI', 'Data Cleaning'],
          repoUrl: 'https://github.com/lolisaigao1234'
        },
      ]
    },
    {
      name: 'Web Development & Data Analysis',
      projects: [
        {
          company: 'FEISU TECHNOLOGY Co. Ltd',
          role: 'Data Analyst Intern, Investment & Marketing',
          duration: 'June 2021 - August 2021',
          image: 'https://picsum.photos/seed/feisu/600/400',
          title: 'Sales Data Analysis & UI Development',
          description: [
            'Created a dynamic user-interface website using Python, Django, and MySQL to analyze bi-annual sales data for Android apps.',
            'Strengthened data integrity with rigorous cleansing and validation processes for reliable product marketing.',
            'Identified trends and patterns through comprehensive data analysis, boosting advertisement ROI by 30% within the app ecosystem.'
          ],
          tags: ['Python', 'Django', 'MySQL', 'Data Analysis', 'UI/UX'],
          repoUrl: 'https://github.com/lolisaigao1234'
        }
      ]
    },
    {
      name: 'Independent Projects',
      projects: [
        {
          company: 'Independent Project',
          role: 'Developer',
          duration: 'October 2024 - Ongoing',
          image: 'https://picsum.photos/seed/taxproject/600/400',
          title: 'Tax and Portfolio Reconciliation System',
          description: [
            'Extended an internship project to simulate broker operations, performing trades and automatically calculating tax liabilities.',
            'Reconciled transaction data with real-time market data, generating daily statements for trade P&L.',
            'Used Generative AI (ChatGPT, Claude) to swiftly interpret intricate US tax guidelines and confirm alignment with standard accounting practices.',
            'Produced comprehensive documentation for data processing logic, focusing on tax considerations.'
          ],
          tags: ['Python', 'Pandas', 'Interactive Brokers API', 'Generative AI', 'Tax Accounting'],
          repoUrl: 'https://github.com/lolisaigao1234'
        }
      ]
    }
  ]);
}
