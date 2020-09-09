<template>
  <div id='signin'>
    <Navigation />

    <div class="container">
        <header class="header">
            <h2 class="header__title">Welcome Back</h2>
            <p class="header__description">Log into your account</p>
        </header>
          <FormulateForm @submit="handleSubmit" autocomplete="off">
              <FormulateInput validation="bail|required|email"
                v-model="email"
                type="email"
                name="email"
                label="Email"
                placeholder="Enter email here" />
              <FormulateInput validation="bail|required|min:6"
                v-model="password"
                name="password"
                type="password"
                label="Password"
                placeholder="Enter new password" />
              <FormulateInput type="submit" label="Sign in" />
          </FormulateForm>
    </div>
  </div>
</template>

<style type="text/css" scoped>

@import "../assets/form.css";

</style>

<script lang="ts">

import Navigation from '@/components/Navigation.vue'
import AuthModule from '@/store/modules/auth'
import { SignIn } from '@/store/models'

import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    Navigation
  }
})

export default class Signin extends Vue {
    email = ''

    password = ''

    public handleSubmit (): void {
      const userSignin: SignIn = {
        email: this.email,
        password: this.password
      }

      AuthModule.sendSignInData(userSignin)
    }
}
</script>
