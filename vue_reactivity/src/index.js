import Vue from './vue/index';

let vm = new Vue({
  el: '#app',
  data() {
    return {
      title: 'List',
      classNum: 3,
      teachers: [
        'Marc',
        'Luais'
      ],
      info: {
        floor: {
          classroom: 2
        }
      },
      students: [
        {
          id: 1,
          name: 'google'
        },
        {
          id: 2,
          name: 'facebook'
        }
      ]
    }
  }
});