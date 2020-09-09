<template>
  <div class='landing'>
    <LetterHead />

    <div class='content'>
        <div class="content-header" v-if="reserved">
            <h1>Thank you for your interest.</h1>
            <p>You will be receiving and email to signup soon, your big data journey begins with us</p>
        </div>

        <div class="content-header" v-else>
            <h1>Personal Financial Data Analytics</h1>
            <p>Toramari is the easiest way to visualize your personal financial activity.</p>

            <div class="content-access">
              <FormulateForm @submit="handleSubmit"  class="access-early" autocomplete="off">
                  <FormulateInput validation="bail|required|email"
                    v-model="email"
                    type="email"
                    name="email"
                    placeholder="Enter email here" />
                    <FormulateInput type="submit" label="Reserve early access"/>
              </FormulateForm>
            </div>
        </div>

    </div>
  </div>
</template>

<script lang="ts">

import LetterHead from '@/components/LetterHead.vue'

import AuthModule from '@/store/modules/auth'

import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    LetterHead
  }
})

export default class Landing extends Vue {
  email = ''

  public handleSubmit (): void {
    const data = {
      email: this.email
    }
    AuthModule.reserveAccess(data)
  }

  get reserved () {
    return this.$store.state.auth.reserved
  }
}
</script>

<style type="text/css" scoped>
.content, .content-access {
  display: flex;
  justify-content: center;
}
.content-header {
  margin-top: 115px;
  text-align: center;
}

.content-header h1 {
  font-size: 33px;
}

.content-access {
  margin-top: 50px;
}

.content-access input[type=email] {
  background: 0 0;
  border-radius: 3px;
  height: 54px;
  padding: 0 20px;
  border: 1px rgba(255,255,255,.2) solid;
  margin-right: 10px;
  width: 300px;
}

.content-access button {
  background: #076fff;
  color: #fff;
  border-radius: 3px;
  height: 54px;
  padding: 0 25px 0 25px;
  border: 0;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  position: relative;
}

.access-early {
  display: flex;
}

@import "../assets/form.css";

</style>
