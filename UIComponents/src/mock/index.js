export const mock_data_transfer = [
  {
    title: 'UK',
    data: [
      {
        id: 1,
        name: 'UCL',
        disabled: false,
      },
      {
        id: 2,
        name: 'LSE',
        disabled: true,
      },
      {
        id: 3,
        name: 'Oxford',
        disabled: false,
      },
      {
        id: 4,
        name: 'Cambridge',
        disabled: false
      },
      {
        id: 5,
        name: 'Edinburgh',
        disabled: false
      },
      {
        id: 6,
        name: 'Manchester',
        disabled: false,
      },
      {
        id: 7,
        name: 'KCL',
        disabled: false,
      },
      {
        id: 8,
        name: 'Bristol',
        disabled: false,
      },
      {
        id: 9,
        name: 'Warwick',
        disabled: false,
      },
      {
        id: 10,
        name: 'IC',
        disabled: false,
      },

    ]
  },
  {
    title: 'Ireland',
    data: [
      {
        id: 11,
        name: 'Trinity',
        disabled: true,
      },
      {
        id: 12,
        name: 'UCD',
        disabled: false,
      },
      {
        id: 13,
        name: 'Galway',
        disabled: false
      },
      {
        id: 14,
        name: 'UCC',
        disabled: false
      }
    ]
  },
  {
    title: 'US',
    data: [
      {
        id: 15,
        name: 'MIT',
        disabled: false,
      },
      {
        id: 16,
        name: 'Stanford',
        disabled: true,
      },
      {
        id: 17,
        name: 'Harvard',
        disabled: false
      },
      {
        id: 18,
        name: 'UCLA',
        disabled: false
      }
    ]
  }
]


// vite must use this URL object, cannot use require
export const get_image_url = () => {
  return new URL('../assets/img', import.meta.url).href;
}

export const carousel_imgs = [
  '/1.jpg',
  '/2.jpg',
  '/3.jpg',
  '/4.jpg',
  '/5.jpg',
  '/6.jpg',
  '/7.jpg',
]

export const mock_data_tree = [
  {
    id: 0,
    text: 'Title 1',
    children: [
      {
        id: 1,
        pid: 0,
        text: 'Title 1-1',
        children: [
          {
            id: 2,
            pid: 1,
            text: 'Title 1-1-1',
          },
          {
            id: 3,
            pid: 1,
            text: 'Title 1-1-2'
          }
        ]
      },
      {
        id: 4,
        pid: 0,
        text: 'Title 1-2',
        children: [
          {
            id: 5,
            pid: 4,
            text: 'Title 1-2-1'
          }
        ]
      },
      {
        id: 6,
        pid: 0,
        text: 'Title 1-3'
      }
    ],
  },
  {
    id: 7,
    text: 'Title 2',
    children: [
      {
        id: 8,
        pid: 7,
        text: 'Title 2-1',
        children: [
          {
            id: 9,
            pid: 8,
            text: 'Title 2-1-1'
          }
        ]
      },
      {
        id: 10,
        pid: 7,
        text: 'Title 2-2'
      },
      {
        id: 11,
        pid: 7,
        text: 'Title 2-3',
        children: [
          {
            id: 12,
            pid: 11,
            text: 'Title 2-3-1'
          }
        ]
      }
    ]
  },
  {
    id: 13,
    pid: 0,
    text: 'Title 3',
    children: [
      {
        id: 14,
        pid: 13,
        text: 'Title 3-1',
        children: [
          {
            id: 15,
            pid: 14,
            text: 'Title 3-3-1'
          },
          {
            id: 16,
            pid: 14,
            text: 'Title 3-3-2'
          },
          {
            id: 17,
            pid: 14,
            text: 'Title 3-3-3'
          }
        ]
      }
    ]
  }
]