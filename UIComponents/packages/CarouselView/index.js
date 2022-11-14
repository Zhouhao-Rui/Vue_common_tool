import Carousel from './Carousel'
import ViewItem from './item'

export default {
  install(app) {
    app.component('carousel', Carousel)
    app.component('viewItem', ViewItem)
  }
}