<template>
  <div id='signup'>
    <Navigation />

    <div class="container">
        <header class="header">
            <h2 class="header__title">Sign up</h2>
            <p class="header__description">Open an account and get insights</p>
        </header>
          <FormulateForm @submit="handleSubmit" autocomplete="off">
              <FormulateInput validation="bail|required|email"
                v-model="email"
                type="email"
                name="email"
                label="Email"
                placeholder="Enter email here" />
              <FormulateInput validation="bail|required|min:2|max:15"
                v-model="username"
                type="text"
                name="username"
                label="Username"
                placeholder="Enter username here" />
              <FormulateInput validation="bail|required|number|length:10|phoneNumber"
                v-model="mobile"
                type="text"
                name="mobile"
                label="Mobile Number"
                placeholder="Enter your mobile number here" />
              <FormulateInput validation="bail|required|min:6"
                v-model="password"
                name="password"
                type="password"
                label="Password"
                placeholder="Enter new password" />
              <FormulateInput type="submit" label="Sign up"/>
          </FormulateForm>
    </div>
  </div>
</template>

<script lang="ts">

import Navigation from '@/components/Navigation.vue'
import { SignUp } from '@/store/models'
import AuthModule from '@/store/modules/auth'

import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    Navigation
  }
})

export default class Signup extends Vue {
    email = ''

    mobile = ''

    password = ''

    username = ''

    public handleSubmit (): void {
      const userOnboard: SignUp = {
        email: this.email,
        username: this.username,
        mobile: this.mobile,
        password: this.password
      }

      AuthModule.sendSignUpData(userOnboard)
    }

    get errors () {
      return this.$store.state.auth.errors
    }

    get submitted () {
      return this.$store.state.auth.submitted
    }
}

</script>

<style type="text/css" scoped>

@import "../assets/form.css";

</style>
