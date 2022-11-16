import Tranfer from './TranserBox/Tranfer'
import Carousel from './CarouselView/Carousel'
import ViewItem from './CarouselView/item'
import Magnifier from './MagnifierView/Magnifier'
import Rate from './RateView/Rate';
import Tree from './TreeView/Tree'

const components = {
  'transfer': Tranfer,
  'carousel': Carousel,
  'viewItem': ViewItem,
  'magnifier': Magnifier,
  'rate': Rate,
  'tree': Tree
}

// global
export default {
  install(app) {
    Object.keys(components).forEach(key => {
      app.component(key, components[key])
    })
  }
}