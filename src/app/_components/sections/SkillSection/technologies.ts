const technologies: Technology[] = [
    {
        imageName: 'angular-icon.svg',
        title: 'Angular',
        description:
            'A platform for building mobile and desktop web applications.',
        highlighted: false,
    },
    {
        imageName: 'c-sharp-c.svg',
        title: 'C#',
        description:
            'A modern, object-oriented programming language developed by Microsoft.',
        highlighted: false,
    },
    {
        imageName: 'javascript-js.svg',
        title: 'JavaScript',
        description:
            'A high-level, just-in-time compiled, object-oriented programming language.',
        highlighted: false,
    },
    {
        imageName: 'microsoft-azure.svg',
        title: 'Microsoft Azure',
        description:
            'A cloud computing service created by Microsoft for building, testing, deploying, and managing applications and services.',
        highlighted: true,
    },
    {
        imageName: 'microsoft-net-framework.svg',
        title: '.NET Framework',
        description:
            'A software framework developed by Microsoft that runs primarily on Microsoft Windows.',
        highlighted: false,
    },
    {
        imageName: 'microsoft-sql-server.svg',
        title: 'Microsoft SQL Server',
        description:
            'A relational database management system developed by Microsoft.',
        highlighted: true,
    },
    {
        imageName: 'net-core.svg',
        title: '.NET Core',
        description:
            'A free, cross-platform, open-source developer platform for building many different types of applications.',
        highlighted: true,
    },
    {
        imageName: 'next-js.svg',
        title: 'Next.js',
        description:
            'A React framework that enables functionality such as server-side rendering and generating static websites.',
        highlighted: true,
    },
    {
        imageName: 'npm-node-package-manager.svg',
        title: 'NPM',
        description:
            'A package manager for the JavaScript programming language.',
        highlighted: false,
    },
    {
        imageName: 'react.svg',
        title: 'React',
        description: 'A JavaScript library for building user interfaces.',
        highlighted: false,
    },
    {
        imageName: 'tailwind-css.svg',
        title: 'Tailwind CSS',
        description:
            'A utility-first CSS framework for rapidly building custom user interfaces.',
        highlighted: false,
    },
    {
        imageName: 'typescript.svg',
        title: 'TypeScript',
        description:
            'A typed superset of JavaScript that compiles to plain JavaScript.',
        highlighted: false,
    },
];

export interface Technology {
    imageName: string;
    title: string;
    description: string;
    highlighted: boolean;
}

export default technologies;
