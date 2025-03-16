export type WorkHistory = WorkPlaceItem[];

export interface WorkPlaceItem {
    title: string;
    company: string;
    from: Date;
    to: Date | 'Present';
    description: string;
    companyUrl?: string;
}

const filler =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';

const workHistory: WorkHistory = [
    {
        title: 'Senior Software Engineer',
        company: 'Lionwood.software',
        from: new Date('2021-06-01'),
        to: 'Present',
        description: filler,
        companyUrl: 'https://lionwood.software',
    },
    {
        title: 'Software Engineer',
        company: 'unicrew (former Artelogic)',
        from: new Date('2018-06-01'),
        to: new Date('2021-06-01'),
        description: filler,
        companyUrl: 'https://unicrew.com',
    },
    {
        title: 'Software engineer',
        company: 'Exoft',
        from: new Date('2017-10-01'),
        to: new Date('2018-06-01'),
        description: filler,
        companyUrl: 'https://exoft.net',
    },
    {
        title: 'Junior software engineer',
        company: 'StartupSoft',
        from: new Date('2016-12-01'),
        to: new Date('2017-10-01'),
        description: filler,
        companyUrl: 'https://startupsoft.com/',
    },
];

export default workHistory;
