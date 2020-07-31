import Vue from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import VueCurrencyFilter from 'vue-currency-filter'
import VueFilterDateFormat from 'vue-filter-date-format';

Vue.config.productionTip = false

Vue.use(VueFilterDateFormat);

Vue.use(VueCurrencyFilter, [{
    symbol: '$',
    thousandsSeparator: ',',
    fractionCount: 0,
    fractionSeparator: '.',
    symbolPosition: 'front',
    symbolSpacing: false
}])

new Vue({
  render: h => h(App),
}).$mount('#app')
