import { __decorate } from 'tslib'
import { Action, Module, VuexModule, getModule } from 'vuex-module-decorators'
import store from '@/store'
import ApiServices from '@/services/api'
const AuthModule = /** @class */ (() => {
  let AuthModule = class AuthModule extends VuexModule {
    constructor () {
      super(...arguments)
      this.api = new ApiServices()
    }

    sendSignUpData (data) {
      this.api.signup(data)
        .catch()
    }
  }
  __decorate([
    Action
  ], AuthModule.prototype, 'sendSignUpData', null)
  AuthModule = __decorate([
    Module({
      namespaced: true,
      store,
      name: 'auth',
      dynamic: true
    })
  ], AuthModule)
  return AuthModule
})()
export default getModule(AuthModule)
// # sourceMappingURL=auth.js.map
