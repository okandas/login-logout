import { Action, Mutation, Module, VuexModule, getModule } from 'vuex-module-decorators'
import router from '@/router'
import store from '@/store'
import { SignUp, SignIn, AuthenticatedUser, Mail } from '@/store/models'
import ApiServices from '@/services/api'
import Vue from 'vue'

@Module({
  namespaced: true,
  store,
  name: 'auth',
  dynamic: true
})
class AuthModule extends VuexModule {
 error = ''

 submitted = false

 reserved = false

 user = {}

 @Action
 sendSignUpData (data: SignUp) {
   this.context.commit('clearError')
   this.context.commit('handleSubmission', true)
   ApiServices.signup(data)
     .then(response => {
       const authenticated = ApiServices.tokenService.decode(response.data)

       Vue.toasted.show('Signup successful', {
         duration: 1000
       })

       this.context.commit('handleAuthenticatedUser', authenticated)

       router.push({ name: 'home' })
     })
     .catch(e => {
       this.context.commit('handleError', e.response.data.errored)
       this.context.commit('handleSubmission', false)
     })
 }

 @Action
 sendSignInData (data: SignIn) {
   this.context.commit('clearError')
   this.context.commit('handleSubmission', true)
   ApiServices.signin(data)
     .then(response => {
       const authenticated = ApiServices.tokenService.decode(response.data)

       Vue.toasted.show('Login successful', {
         duration: 1000
       })

       this.context.commit('handleAuthenticatedUser', authenticated)

       router.push({ name: 'home' })
     })
     .catch(e => {
       this.context.commit('handleError', e.response.data.errored)
       this.context.commit('handleSubmission', false)
     })
 }

 @Action
 checkLoggedIn () {
   if (ApiServices.tokenService.loggedIn()) {
     this.context.commit('handleAuthenticatedUser', ApiServices.tokenService.decoded())
   } else {
     ApiServices.tokenService.remove()
     this.context.commit('handleAuthenticatedUser', {})
     router.push({ name: 'signin' })
   }
 }

 @Action
 reserveAccess (data: Mail) {
   this.context.commit('handleSubmission', true)
   ApiServices.reserve(data)
     .then(() => {
       Vue.toasted.show('You have reserved your early access spot', {
         duration: 4000
       })
       this.context.commit('handleSuccessfulReservation', true)
     })
     .catch(e => {
       Vue.toasted.show('Failed to make reservation for this email', {
         duration: 4000
       })
       this.context.commit('handleError', e.response.data.errored)
       this.context.commit('handleSubmission', false)
     })
 }

 @Mutation
 handleError (error: string) {
   this.error = error
 }

 @Mutation
 handleSubmission (submit: boolean) {
   this.submitted = submit
 }

 @Mutation
 handleAuthenticatedUser (authenticated: AuthenticatedUser | {}) {
   this.user = authenticated
 }

 @Mutation
 handleSuccessfulReservation (success: boolean) {
   this.reserved = success
 }

 @Mutation
 clearError () {
   this.error = ''
 }
}

export default getModule(AuthModule)
