import './js/common.js'
import './styles/styles.css'
import './assets/css/main.css'
import './assets/scss/main.scss'

window.Vue = require('vue')
import store from './store'
Vue.component('example-component', require('./components/Example.vue').default)

const app = new Vue({
  data() {
    return {
      component: false,
    }
  },
  store,
  el: '#app'
})