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