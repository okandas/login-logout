import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { email, required, min, max } from 'vee-validate/dist/rules'
extend('email', email)
extend('max', max)
extend('min', min)
extend('mobile', {
  validate: value => {
    const phoneNumber = parsePhoneNumberFromString(value, 'ZW')
    if (phoneNumber !== undefined) {
      return phoneNumber.isValid()
    }
    return false
  },
  message: 'This is not a valid Zimbabwean number'
})
extend('required', {
  ...required,
  message: 'This field is required'
})
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// # sourceMappingURL=main.js.map
