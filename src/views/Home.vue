<template>
  <div class='home'>
    <Navigation />
  </div>
</template>

<script lang="ts">

import Navigation from '@/components/Navigation.vue'

import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    Navigation
  }
})

export default class Home extends Vue {
}
</script>
