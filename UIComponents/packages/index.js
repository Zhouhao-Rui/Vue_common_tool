import Tranfer from './TranserBox/Tranfer'

const components = {
  'transfer': Tranfer
}

// global
export default {
  install(app) {
    Object.keys(components).forEach(key => {
      app.component(key, components[key])
    })
  }
}