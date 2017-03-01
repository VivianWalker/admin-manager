<template>
    <router-view></router-view>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  created () {
    this.$store.dispatch('fetchCookie', document.cookie);
  }
}
</script>
