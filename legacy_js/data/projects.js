/**
 * Project Data
 * Portfolio projects with metadata for filtering and display
 */

export const projects = [
    {
        id: 1,
        title: 'NYC Taxi Trip Analysis',
        description: 'Interactive data visualization analyzing 4.8M+ NYC taxi trips using Python, Pandas, and bqplot. Features heat maps, scatter plots, and time-series analysis.',
        technologies: ['Python', 'Pandas', 'bqplot', 'Data Visualization'],
        categories: ['data-science', 'visualization'],
        link: '/spring2022/IS445/FinalProject/IS445FinalProjectPart3.html',
        github: null,
        featured: true,
        date: '2022-05'
    },
    {
        id: 2,
        title: 'QoE Wi-Fi Health Score System',
        description: 'Cloud-based Wi-Fi health monitoring system on AWS with real-time dashboards. Improved assessment efficiency by 60% using Python, SQL, and statistical modeling.',
        technologies: ['Python', 'AWS', 'SQL', 'Dashboard'],
        categories: ['cloud', 'data-analytics'],
        link: null,
        github: null,
        featured: true,
        date: '2025-08'
    },
    {
        id: 3,
        title: 'NLP-to-SQL Pipeline',
        description: 'Deep learning system automating SQL query generation from natural language with 80% accuracy. Built at Tencent using NLP techniques and MySQL.',
        technologies: ['Python', 'NLP', 'MySQL', 'Deep Learning'],
        categories: ['ai', 'nlp'],
        link: null,
        github: null,
        featured: true,
        date: '2023-08'
    },
    {
        id: 4,
        title: 'Options Pricing Engine',
        description: 'Black-Scholes model implementation with Interactive Brokers API integration. Includes implied volatility calculations using Newton-Raphson method.',
        technologies: ['Python', 'Finance', 'APIs', 'Algorithms'],
        categories: ['finance', 'algorithms'],
        link: null,
        github: null,
        featured: true,
        date: '2024-10'
    },
    {
        id: 5,
        title: 'Interactive Mythology Website',
        description: 'Educational website about Greco-Roman mythology using nicepage.js framework. Features interactive content and responsive design.',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        categories: ['web-dev'],
        link: '/spring2022/CLCV115/CreativeProject/newpage.html',
        github: null,
        featured: false,
        date: '2022-05'
    },
    {
        id: 6,
        title: 'Online Privacy Research',
        description: 'Survey-based analysis of online privacy attitudes using Jupyter notebooks. Includes data cleaning, visualization, and statistical analysis.',
        technologies: ['Python', 'Pandas', 'Survey Analysis'],
        categories: ['data-science', 'research'],
        link: '/spring2022/INFO303/MP3/',
        github: null,
        featured: false,
        date: '2022-05'
    }
];

/**
 * Get all unique technologies across projects
 */
export function getAllTechnologies() {
    const techSet = new Set();
    projects.forEach(project => {
        project.technologies.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
}

/**
 * Get all unique categories
 */
export function getAllCategories() {
    const categoryMap = {
        'data-science': 'Data Science',
        'visualization': 'Visualization',
        'cloud': 'Cloud Computing',
        'data-analytics': 'Data Analytics',
        'ai': 'AI/ML',
        'nlp': 'NLP',
        'finance': 'Finance',
        'algorithms': 'Algorithms',
        'web-dev': 'Web Development',
        'research': 'Research'
    };

    const categories = new Set();
    projects.forEach(project => {
        project.categories.forEach(cat => categories.add(cat));
    });

    return Array.from(categories).map(cat => ({
        id: cat,
        label: categoryMap[cat] || cat
    }));
}

/**
 * Filter projects by category
 */
export function filterByCategory(category) {
    if (category === 'all') return projects;
    return projects.filter(project => project.categories.includes(category));
}

/**
 * Filter projects by technology
 */
export function filterByTechnology(tech) {
    if (tech === 'all') return projects;
    return projects.filter(project => project.technologies.includes(tech));
}

/**
 * Search projects by query
 */
export function searchProjects(query) {
    const lowerQuery = query.toLowerCase();
    return projects.filter(project =>
        project.title.toLowerCase().includes(lowerQuery) ||
        project.description.toLowerCase().includes(lowerQuery) ||
        project.technologies.some(tech => tech.toLowerCase().includes(lowerQuery))
    );
}

/**
 * Get featured projects
 */
export function getFeaturedProjects() {
    return projects.filter(p => p.featured);
}
