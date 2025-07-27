export type WorkHistory = WorkPlaceItem[];

export interface WorkPlaceItem {
    title: string;
    company: string;
    from: Date;
    to: Date | 'Present';
    responsibilities: string[];
    companyUrl?: string;
    techStack?: string;
    achievements?: string[];
    description?: string;
}

const workHistory: WorkHistory = [
    {
        description:
            'Senior Software Engineer with deep experience in designing scalable enterprise web applications. Participated in architecture decisions, implemented robust CI/CD pipelines, and migrated legacy systems to Azure cloud. Strong background in .NET, Angular, React, and DevOps practices. Proven ability to mentor teams, drive code quality, and deliver high-impact solutions in complex environments.',
        title: 'Senior Software Engineer',
        company: 'Lionwood.software',
        from: new Date('2021-06-01'),
        to: 'Present',
        responsibilities: [
            'Designing and implementing scalable features for enterprise education web applications.',
            'Leading or participating architecture discussions, planning, and technical reviews with cross-functional teams.',
            'Developing RESTful APIs and front-end components with a focus on performance and test coverage.',
            'Creating and maintaining CI/CD pipelines using Azure DevOps and Terraform.',
            'Migrating legacy projects and infrastructure to modern cloud environments (Azure Container Apps).',
            'Mentoring team members and promoting best practices in development workflows.',
        ],
        achievements: [
            'Implemented advanced Azure Cognitive Search solutions across microservices.',
            'Increased test coverage to 70%+ across services and front-end.',
            'Reduced deployment risks via automated validations.',
            'Improved code maintainability and CI/CD automation.',
        ],
        companyUrl: 'https://lionwood.software',
        techStack:
            '.NET (5+), Angular, React, Next.js, Azure, ACA, Docker, Terraform, CQRS, Tailwind, Contentful',
    },
    {
        description:
            'Software Engineer modernizing legacy systems with Angular 7–9 and .NET, building real-time IoT dashboards and workforce management tools. Improved app performance, stability, and code quality through UI redesigns and enhanced testing.',
        title: 'Software Engineer',
        company: 'unicrew (former Artelogic)',
        from: new Date('2018-06-01'),
        to: new Date('2021-06-01'),
        responsibilities: [
            'Modernizing legacy systems by rewriting UI components in Angular 7–9.',
            'Developing real-time IoT dashboards for a logistics company.',
            'Building time-tracking and workforce management tools for a client in the retail domain.',
            'Collaborating closely with stakeholders to gather requirements and provide technical input.',
            'Participating in estimation, planning, and delivery of full-stack features.',
            'Maintaining and extending enterprise applications with .NET backend services.',
        ],
        achievements: [
            'Improved application performance and stability, leading to faster (x2-x5) load times and a smoother user experience with a redesigned UI.',
            'Introduced testing strategies that enhanced code quality and team confidence in releases.',
        ],
        companyUrl: 'https://unicrew.com',
        techStack:
            '.NET (4.x), .NET Core, Angular 7–9, Angular Material, Ag-Grid',
    },
    {
        description:
            'Software Engineer developing real-time IoT dashboards with ASP.NET Core and AngularJS, implementing microservices with Docker and RabbitMQ, and migrating legacy systems to .NET Core. Enhanced testing strategy and code quality during migrations.',
        title: 'Software engineer',
        company: 'Exoft',
        from: new Date('2017-10-01'),
        to: new Date('2018-06-01'),
        techStack: '',
        responsibilities: [
            'Building real-time dashboards for IoT monitoring using ASP.NET Core and AngularJS.',
            'Implementing microservice-based solutions using Docker containers and RabbitMQ for asynchronous communication.',
            'Migrating legacy applications to modern architectures using modern frameworks (.NET Core at that time)',
        ],
        achievements: [
            'Improved testing strategy and code quality during application migration.',
        ],
        companyUrl: 'https://exoft.net',
    },
    {
        description:
            'Junior Software Engineer developing front-end and backend features for sports and social media applications using .NET and AngularJS.',
        title: 'Junior software engineer',
        company: 'StartupSoft',
        from: new Date('2016-12-01'),
        to: new Date('2017-10-01'),
        responsibilities: [
            'Developing front-end and backend features for a sport domain application.',
        ],
        achievements: [
            'Designed and implemented complex data flows and business logic across multiple modules.',
            'Contributed to complex caching strategy for multilayer data structures.',
        ],
        companyUrl: 'https://startupsoft.com/',
    },
];

export default workHistory;
