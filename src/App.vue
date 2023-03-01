<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="./home">TYP-ENGINEER</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <b-navbar-nav v-if="!isUserId" class="ml-auto">
          <b-nav-item to="./login">Sing in</b-nav-item>
          <b-nav-item to="./register">Sing up</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav v-if="isUserId" class="ml-auto">
          <b-nav-item to="./logout">Sign out</b-nav-item>
          <b-nav-item to="./mypage">MyPage</b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    <div class="app">
      <b-row>
        <b-col></b-col>
        <b-col cols="8"><router-view></router-view></b-col>
        <b-col></b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
// @ts-nocheck

import { mapState } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapState(['userId']),
    isUserId() {
      // @ts-ignore
      return this.userId != '';
    },
  },
};
</script>

<style scoped>
.app {
  margin-top: 20px;
}
</style>
