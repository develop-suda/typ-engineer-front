<template>
  <div class="hello">
    <div v-if="!isUserId">
      <router-link to="./register">ユーザ登録</router-link>
      <hr />
    </div>
    <div v-if="!isUserId">
      <router-link to="./login">ログイン</router-link>
      <hr />
    </div>
    <div>
      <router-link to="./typmode">タイピングへ!</router-link>
      <hr />
    </div>
    <div v-if="isUserId">
      <router-link to="./logout">ログアウト</router-link>
      <hr />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapState(['userId']),
    isUserId() {
      return this.userId != ''
    }
  },
  
  
}
</script>