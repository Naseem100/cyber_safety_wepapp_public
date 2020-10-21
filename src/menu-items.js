export default {
    items: [
        {
            id: 'navigation',
            title: 'Basis of Analysis',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'stepOne',
                    title: 'Step One',
                    type: 'collapse',
                    icon: 'feather icon-box',
                    children: [
                        {
                            id: 'system',
                            title: 'Target System',
                            type: 'item',
                            url: '/stepOne#system'
                        },
                        {
                            id: 'goals',
                            title: 'Goals',
                            type: 'item',
                            url: '/stepOne#goals'
                        },
                        {
                            id: 'losses',
                            title: 'Losses',
                            type: 'item',
                            url: '/stepOne#losses'
                        },
                        {
                            id: 'functions',
                            title: 'Functions',
                            type: 'item',
                            url: '/stepOne#functions'
                        },
                        {
                            id: 'hazards',
                            title: 'Hazards',
                            type: 'item',
                            url: '/stepOne#hazards'
                        },
                        {
                            id: 'constraints',
                            title: 'Constraints',
                            type: 'item',
                            url: '/stepOne#constraints'
                        },
                        {
                            id: 'interParent',
                            title: 'Interdependencies',
                            type: 'item',
                            url: '/stepOne#interParent'
                        }
                    ]
                }
            ]
        },
        {
            id: 'stepTwoParent',
            title: 'Functional Control Structure',
            type: 'group',
            icon: 'icon-group',
            children: [
                {
                    id: 'stepTwo',
                    title: 'Step Two',
                    type: 'item',
                    url: '/stepTwo',
                    icon: 'feather icon-file-text'
                }
            ]
        },
        {
            id: 'stepThreeParent',
            title: 'Unsafe Control Actions',
            type: 'group',
            icon: 'icon-group',
            children: [
                {
                    id: 'stepThree',
                    title: 'Step Three',
                    type: 'item',
                    url: '/stepThree',
                    icon: 'feather icon-file-text'
                }
            ]
        },
        {
            id: 'stepFourParent',
            title: 'Loss Scenarios',
            type: 'group',
            icon: 'icon-group',
            children: [
                {
                    id: 'stepFour',
                    title: 'Step Four',
                    type: 'item',
                    url: '/stepFour',
                    icon: 'feather icon-file-text'
                }
            ]
        }
    ]
}