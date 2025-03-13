const technologies: Technology[] = [
    {
        imageName: 'angular-icon.svg',
        title: 'Angular',
        description:
            'Modern front-end framework. Good for building big, complex and scalable web applications.',
        isHighlighted: false,
    },
    {
        imageName: 'next-js.svg',
        title: 'Next.js',
        description:
            'A React framework that enables functionality such as server-side rendering and generating static websites. Very good for SEO, fast loading and perfect for small projects.',
        isHighlighted: true,
    },
    {
        imageName: 'react.svg',
        title: 'React',
        description:
            'A JavaScript library for building user interfaces. Fast, scalable, and simple.',
        isHighlighted: false,
    },
    {
        imageName: 'net-core.svg',
        title: '.NET Core',
        description:
            'A free, cross-platform, open-source developer platform for building many different types of applications.',
        isHighlighted: true,
    },
    {
        imageName: 'c-sharp-c.svg',
        title: 'C#',
        description:
            'Modern, object-oriented programming language developed by Microsoft. Can be used for building web, desktop and mobile applications. Known for its performance, security, and versatility. ',
        isHighlighted: false,
    },
    {
        imageName: 'microsoft-azure.svg',
        title: 'Microsoft Azure',
        description:
            'A cloud computing service created by Microsoft for building, testing, deploying, and managing applications and services.',
        isHighlighted: true,
    },
    {
        imageName: 'microsoft-sql-server.svg',
        title: 'Microsoft SQL Server',
        description:
            'A relational database management system developed by Microsoft.',
        isHighlighted: true,
    },
    {
        imageName: 'npm-node-package-manager.svg',
        title: 'NPM',
        description:
            'A package manager for the JavaScript programming language. Benefits include reusability, scalability, and efficiency.',
        isHighlighted: false,
    },
    {
        imageName: 'javascript-js.svg',
        title: 'JavaScript',
        description:
            'A high-level, just-in-time compiled, object-oriented programming language.',
        isHighlighted: false,
    },
    {
        imageName: 'typescript.svg',
        title: 'TypeScript',
        description:
            'A typed superset of JavaScript that compiles to plain JavaScript. Speed up delivery and improve the quality of the code.',
        isHighlighted: false,
    },
    {
        imageName: 'tailwind-css.svg',
        title: 'Tailwind CSS',
        description:
            'A utility-first CSS framework for rapidly building custom user interfaces.',
        isHighlighted: false,
    },
];

export interface Technology {
    imageName: string;
    title: string;
    description: string;
    isHighlighted: boolean;
}

export default technologies;
