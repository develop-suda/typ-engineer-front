<template>
  <div>
    <div>
      <router-link to="./typmode">タイピングへ!</router-link>
      <hr />
    </div>
    <div>
      <router-link to="./wordList">単語一覧</router-link>
      <hr />
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

<style></style>
