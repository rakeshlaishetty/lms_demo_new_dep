import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'dashboard',
    icon: 'iconsminds-home',
    label: 'Dashboard',
    to: `/app/dashboards/default`,
  },
  {
    id: 'admissions',
    icon: 'iconsminds-student-hat',
    label: 'Admissions',
    to: `${adminRoot}/admissions`,
    subs: [
      {
        label: 'Admit Student',
        icon: 'iconsminds-add-user',
        to: `${adminRoot}/admissions/admit-student`,
      },
      {
        label: 'View Admissions',
        icon: 'simple-icon-doc',
        to: `${adminRoot}/admissions/view-admissions`,
      },
      {
        label: 'Recent Admissions',
        icon: 'simple-icon-refresh',
        to: `${adminRoot}/admissions/recent-admissions`,
      },
      {
        label: 'Analytics',
        icon: 'iconsminds-pie-chart-3',
        to: `${adminRoot}/admissions/analytics`,
      }
    ]
  },
  {
    id: 'attendance',
    icon: 'iconsminds-file-clipboard-file---text',
    label: 'Attendance',
    to: `${adminRoot}/attendance`,
    subs: [
      {
        label: 'Student Attendance',
        to: `${adminRoot}/attendance/student-attendance`
      },
      {
        label: 'Teacher Attendance',
        to: `${adminRoot}/attendance/teacher-attendance`
      },
      {
        label: 'Staff Attendance',
        to: `${adminRoot}/attendance/staff-attendance`
      }
    ]
  },
  {
    id: 'fees',
    icon: 'iconsminds-wallet',
    label: 'Fees',
    to: `${adminRoot}/fees`,
    subs: [
      {
        icon: 'iconsminds-coins',
        label: 'View Fee Structure',
        to: `${adminRoot}/fees/fee-structure`
      },
      {
        icon: 'iconsminds-pen-2',
        label: 'Edit Fee Structure',
        to: `${adminRoot}/fees/edit-fee-structure`
      },
      {
        icon: 'simple-icon-exclamation',
        label: 'Transactions & Dues',
        to: `${adminRoot}/fees/dues`
      },
      {
        icon: 'simple-icon-exclamation',
        label: 'Update transaction',
        to: `${adminRoot}/fees/add-transaction`
      }
    ]
  },
  {
    id: 'staff',
    icon: 'iconsminds-male-female',
    to: `${adminRoot}/staff`,
    label: 'Staff',
    subs: [
      {
        icon: 'simple-icon-list',
        label: 'View Employee list',
        to: `${adminRoot}/staff/employee-list`
      },
      {
        icon: 'iconsminds-add-user',
        label: 'Add Staff',
        to: `${adminRoot}/staff/add-staff`
      },
      {
        icon: 'iconsminds-money-bag',
        label: 'Salary',
        to: `${adminRoot}/staff/salary`
      },
      {
        icon: 'simple-icon-star',
        label: 'Feedback report',
        to: `${adminRoot}/feedback/reports`
      },
      {
        icon: 'iconsminds-letter-close',
        label: 'Offer letter',
        to: `${adminRoot}/staff/offer-letter`
      }
    ]
  },
  {
    id: 'setup',
    icon: 'simple-icon-settings',
    to: `${adminRoot}/setup`,
    label: 'Setup',
    subs: [
      {
        icon: 'iconsminds-blackboard',
        label: 'Create Class',
        to: `${adminRoot}/setup/create-class`
      },
      {
        icon: 'iconsminds-atom',
        label: 'Create Subject',
        to: `${adminRoot}/setup/create-subject`
      }
    ]
  },
  {
    id: 'dashboards',
    icon: 'iconsminds-shop-4',
    label: 'menu.dashboards',
    to: `${adminRoot}/dashboards`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'simple-icon-briefcase',
        label: 'menu.default',
        to: `${adminRoot}/dashboards/default`,
        // roles: [UserRole.Admin],
      },
      {
        icon: 'simple-icon-pie-chart',
        label: 'menu.analytics',
        to: `${adminRoot}/dashboards/analytics`,
        // roles: [UserRole.Admin],
      },
      {
        icon: 'simple-icon-basket-loaded',
        label: 'menu.ecommerce',
        to: `${adminRoot}/dashboards/ecommerce`,
        // roles: [UserRole.Editor],
      },
      {
        icon: 'simple-icon-doc',
        label: 'menu.content',
        to: `${adminRoot}/dashboards/content`,
        // roles: [UserRole.Editor],
      },
    ],
  },
  {
    id: 'pages',
    icon: 'iconsminds-digital-drawing',
    label: 'menu.pages',
    to: `${adminRoot}/pages`,
    subs: [
      {
        id: 'pages-authorization',
        label: 'menu.authorization',
        to: '/user',
        subs: [
          {
            icon: 'simple-icon-user-following',
            label: 'menu.login',
            to: '/user/login',
            newWindow: true,
          },
          {
            icon: 'simple-icon-user-follow',
            label: 'menu.register',
            to: '/user/register',
            newWindow: true,
          },
          {
            icon: 'simple-icon-user-following',
            label: 'menu.forgot-password',
            to: '/user/forgot-password',
            newWindow: true,
          },
          {
            icon: 'simple-icon-user-unfollow',
            label: 'menu.reset-password',
            to: '/user/reset-password',
            newWindow: true,
          },
        ],
      },
      {
        id: 'pages-product',
        label: 'menu.product',
        to: `${adminRoot}/pages/product`,
        subs: [
          {
            icon: 'simple-icon-credit-card',
            label: 'menu.data-list',
            to: `${adminRoot}/pages/product/data-list`,
          },
          {
            icon: 'simple-icon-list',
            label: 'menu.thumb-list',
            to: `${adminRoot}/pages/product/thumb-list`,
          },
          {
            icon: 'simple-icon-grid',
            label: 'menu.image-list',
            to: `${adminRoot}/pages/product/image-list`,
          },
          {
            icon: 'simple-icon-picture',
            label: 'menu.details',
            to: `${adminRoot}/pages/product/details`,
          },
          {
            icon: 'simple-icon-book-open',
            label: 'menu.details-alt',
            to: `${adminRoot}/pages/product/details-alt`,
          },
        ],
      },
      {
        id: 'pages-profile',
        label: 'menu.profile',
        to: `${adminRoot}/pages/profile`,
        subs: [
          {
            icon: 'simple-icon-share',
            label: 'menu.social',
            to: `${adminRoot}/pages/profile/social`,
          },
          {
            icon: 'simple-icon-link',
            label: 'menu.portfolio',
            to: `${adminRoot}/pages/profile/portfolio`,
          },
        ],
      },
      {
        id: 'pages-blog',
        label: 'menu.blog',
        to: `${adminRoot}/pages/blog`,
        subs: [
          {
            icon: 'simple-icon-share',
            label: 'menu.blog-list',
            to: `${adminRoot}/pages/blog/blog-list`,
          },
          {
            icon: 'simple-icon-link',
            label: 'menu.blog-detail',
            to: `${adminRoot}/pages/blog/blog-detail`,
          },
        ],
      },
      {
        id: 'pages-miscellaneous',
        label: 'menu.miscellaneous',
        to: `${adminRoot}/pages/miscellaneous`,
        subs: [
          {
            icon: 'simple-icon-question',
            label: 'menu.faq',
            to: `${adminRoot}/pages/miscellaneous/faq`,
          },
          {
            icon: 'simple-icon-graduation',
            label: 'menu.knowledge-base',
            to: `${adminRoot}/pages/miscellaneous/knowledge-base`,
          },

          {
            icon: 'simple-icon-diamond',
            label: 'menu.prices',
            to: `${adminRoot}/pages/miscellaneous/prices`,
          },
          {
            icon: 'simple-icon-magnifier',
            label: 'menu.search',
            to: `${adminRoot}/pages/miscellaneous/search`,
          },
          {
            icon: 'simple-icon-envelope-open',
            label: 'menu.mailing',
            to: `${adminRoot}/pages/miscellaneous/mailing`,
          },
          {
            icon: 'simple-icon-bag',
            label: 'menu.invoice',
            to: `${adminRoot}/pages/miscellaneous/invoice`,
          },

          {
            icon: 'simple-icon-exclamation',
            label: 'menu.error',
            to: '/error',
            newWindow: true,
          },
        ],
      },
    ],
  },
  {
    id: 'applications',
    icon: 'iconsminds-air-balloon-1',
    label: 'menu.applications',
    to: `${adminRoot}/applications`,
    subs: [
      {
        icon: 'simple-icon-check',
        label: 'menu.todo',
        to: `${adminRoot}/applications/todo`,
      },
      {
        icon: 'simple-icon-calculator',
        label: 'menu.survey',
        to: `${adminRoot}/applications/survey`,
      },
      {
        icon: 'simple-icon-bubbles',
        label: 'menu.chat',
        to: `${adminRoot}/applications/chat`,
      },
    ],
  },
  {
    id: 'ui',
    icon: 'iconsminds-pantone',
    label: 'menu.ui',
    to: `${adminRoot}/ui`,
    subs: [
      {
        id: 'ui-forms',
        label: 'menu.forms',
        to: `${adminRoot}/ui/forms`,
        subs: [
          {
            icon: 'simple-icon-notebook',
            label: 'menu.layouts',
            to: `${adminRoot}/ui/forms/layouts`,
          },
          {
            icon: 'simple-icon-puzzle',
            label: 'menu.components',
            to: `${adminRoot}/ui/forms/components`,
          },
          {
            icon: 'simple-icon-check',
            label: 'menu.validations',
            to: `${adminRoot}/ui/forms/validations`,
          },
          {
            icon: 'simple-icon-magic-wand',
            label: 'menu.wizard',
            to: `${adminRoot}/ui/forms/wizard`,
          },
        ],
      },
      {
        id: 'ui-components',
        label: 'menu.components',
        to: `${adminRoot}/ui/components`,
        subs: [
          {
            icon: 'simple-icon-bell',
            label: 'menu.alerts',
            to: `${adminRoot}/ui/components/alerts`,
          },
          {
            icon: 'simple-icon-badge',
            label: 'menu.badges',
            to: `${adminRoot}/ui/components/badges`,
          },
          {
            icon: 'simple-icon-control-play',
            label: 'menu.buttons',
            to: `${adminRoot}/ui/components/buttons`,
          },
          {
            icon: 'simple-icon-layers',
            label: 'menu.cards',
            to: `${adminRoot}/ui/components/cards`,
          },
          {
            icon: 'simple-icon-picture',
            label: 'menu.carousel',
            to: `${adminRoot}/ui/components/carousel`,
          },
          {
            icon: 'simple-icon-chart',
            label: 'menu.charts',
            to: `${adminRoot}/ui/components/charts`,
          },
          {
            icon: 'simple-icon-arrow-up',
            label: 'menu.collapse',
            to: `${adminRoot}/ui/components/collapse`,
          },
          {
            icon: 'simple-icon-arrow-down',
            label: 'menu.dropdowns',
            to: `${adminRoot}/ui/components/dropdowns`,
          },
          {
            icon: 'simple-icon-book-open',
            label: 'menu.editors',
            to: `${adminRoot}/ui/components/editors`,
          },

          {
            icon: 'simple-icon-star',
            label: 'menu.icons',
            to: `${adminRoot}/ui/components/icons`,
          },
          {
            icon: 'simple-icon-note',
            label: 'menu.input-groups',
            to: `${adminRoot}/ui/components/input-groups`,
          },
          {
            icon: 'simple-icon-screen-desktop',
            label: 'menu.jumbotron',
            to: `${adminRoot}/ui/components/jumbotron`,
          },
          {
            icon: 'simple-icon-map',
            label: 'menu.maps',
            to: `${adminRoot}/ui/components/maps`,
          },
          {
            icon: 'simple-icon-docs',
            label: 'menu.modal',
            to: `${adminRoot}/ui/components/modal`,
          },
          {
            icon: 'simple-icon-cursor',
            label: 'menu.navigation',
            to: `${adminRoot}/ui/components/navigation`,
          },
          {
            icon: 'simple-icon-pin',
            label: 'menu.popover-tooltip',
            to: `${adminRoot}/ui/components/popover-tooltip`,
          },
          {
            icon: 'simple-icon-shuffle',
            label: 'menu.sortable',
            to: `${adminRoot}/ui/components/sortable`,
          },
          {
            icon: 'simple-icon-grid',
            label: 'menu.tables',
            to: `${adminRoot}/ui/components/tables`,
          },
        ],
      },
    ],
  },
  {
    id: 'menu',
    icon: 'iconsminds-three-arrow-fork',
    label: 'menu.menu',
    to: `${adminRoot}/menu`,
    subs: [
      {
        icon: 'simple-icon-logout',
        label: 'menu.types',
        to: `${adminRoot}/menu/types`,
      },
      {
        icon: 'simple-icon-layers',
        label: 'menu.levels',
        to: `${adminRoot}/menu/levels`,
        subs: [
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.third-level-1',
            to: `${adminRoot}/menu/levels/third-level-1`,
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.third-level-2',
            to: `${adminRoot}/menu/levels/third-level-2`,
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.third-level-3',
            to: `${adminRoot}/menu/levels/third-level-3`,
          },
        ],
      },
    ],
  },
  {
    id: 'blankpage',
    icon: 'iconsminds-bucket',
    label: 'menu.blank-page',
    to: `${adminRoot}/blank-page`,
  },
  {
    id: 'docs',
    icon: 'iconsminds-library',
    label: 'menu.docs',
    to: 'https://gogo-react-docs.coloredstrategies.com/',
    newWindow: true,
  },
];
export default data;
