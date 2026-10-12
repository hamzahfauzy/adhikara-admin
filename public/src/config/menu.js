export default [
    {
        label: 'Dashboard',
        name: '',
        icon: 'bi bi-grid',
        permissions: [
            'dashboard.index'
        ],
        route: '/',
        activeState: '/',
        children: []
    },
    {
        label: 'Master Data',
        name: 'master-data',
        icon: 'bi bi-database',
        permissions: [
            'clients.index',
            'employees.index',
            'placements.index',
            'shifts.index'
        ],
        route: '/master-data',
        activeState: [
            '/clients/*',
            '/employees/*',
            '/placements/*',
            '/shifts/*'
        ],
        children: [
            {
                label: 'Clients',
                name: 'clients',
                icon: 'bi bi-building',
                permissions: ['clients.index'],
                route: '/clients',
                activeState: '/clients/*',
                children: []
            },
            {
                label: 'Employees',
                name: 'employees',
                icon: 'bi bi-people',
                permissions: ['employees.index'],
                route: '/employees',
                activeState: '/employees/*',
                children: []
            },
            {
                label: 'Placements',
                name: 'placements',
                icon: 'bi bi-geo-alt',
                permissions: ['placements.index'],
                route: '/placements',
                activeState: '/placements/*',
                children: []
            },
            {
                label: 'Shifts',
                name: 'shifts',
                icon: 'bi bi-clock-history',
                permissions: ['shifts.index'],
                route: '/shifts',
                activeState: '/shifts/*',
                children: []
            }
        ]
    },
    {
        label: 'Operations',
        name: 'operations',
        icon: 'bi bi-gear',
        permissions: [
            'schedules.index',
            'attendances.index',
            'leaves.index',
            'duties.index'
        ],
        route: '/operations',
        activeState: [
            '/schedules/*',
            '/attendances/*',
            '/leaves/*',
            '/duties/*'
        ],
        children: [
            {
                label: 'Schedules',
                name: 'schedules',
                icon: 'bi bi-calendar-week',
                permissions: ['schedules.index'],
                route: '/schedules',
                activeState: '/schedules/*',
                children: []
            },
            {
                label: 'Attendances',
                name: 'attendances',
                icon: 'bi bi-fingerprint',
                permissions: ['attendances.index'],
                route: '/attendances',
                activeState: '/attendances/*',
                children: []
            },
            {
                label: 'Leaves',
                name: 'leaves',
                icon: 'bi bi-calendar-x',
                permissions: ['leaves.index'],
                route: '/leaves',
                activeState: '/leaves/*',
                children: []
            },
            {
                label: 'Duties',
                name: 'duties',
                icon: 'bi bi-briefcase',
                permissions: ['duties.index'],
                route: '/duties',
                activeState: '/duties/*',
                children: []
            }
        ]
    }
]