import Tranfer from './TranserBox/Tranfer'
import Carousel from './CarouselView/Carousel'
import ViewItem from './CarouselView/item'

const components = {
  'transfer': Tranfer,
  'carousel': Carousel,
  'viewItem': ViewItem
}

// global
export default {
  install(app) {
    Object.keys(components).forEach(key => {
      app.component(key, components[key])
    })
  }
}