export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      
    },
    {

      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    
    {
      title: true,
      name: 'Components',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Rooms',
      url: '/base',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Rooms Dashboard',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Rooms Management',
          url: '/base/cards',
          icon: 'icon-puzzle',
        },
        {
          name: 'Building Management',
          url: '/base/carousels',
          icon: 'icon-puzzle',
        },
      ],
    },
    {
      name: 'Devices and Sensors',
      url: '/buttons',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Device List',
          url: '/buttons/buttons',
          icon: 'icon-rss',
        },
        {
          name: 'Sensor List',
          url: '/buttons/button-dropdowns',
          icon: 'icon-cursor',
        },
        
      ],
    },
    {
      name: 'Alert',
      url: '/alert',
      icon: 'icon-bell',
      children: [
        {
          name: 'Alert History',
          url: '/alert/history',
          icon: 'icon-bell',
        },
        {
          name: 'Alert Settings',
          url: '/alert/settings',
          icon: 'icon-bell',
        }, 
        
      ],
    },
    {
      name: 'Report',
      url: '/dashboard',
      icon: 'fa-file-o',
    },
    {
      name: 'Settings',
      url: '/pages',
      icon: 'icon-settings',
      children: [
        {
          name: 'Users Management',
          url: '/user-management',
          icon: 'icon-star',
        },
        {
          name: 'User Profile',
          url: '/profile',
          icon: 'icon-star',
        },  
        {
          name: 'Logout',
          url: '/logout',
          icon: 'icon-logout',
        },         
      ],
    },
  ],
};
