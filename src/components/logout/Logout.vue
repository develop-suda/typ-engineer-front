
<template>
  <div>
    <button @click="userLogout">ログアウト</button>
    <p>{{ this.userId }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Logout',
    computed: {
        ...mapState(['userId']),
    },
    methods: {
      userLogout() {
        var params = new URLSearchParams();
        params.append('userId', this.userId);
        this.axios
          .post('http://localhost:8888/api/userLogout', params)
          .then((response) => (this.deleteLogoutData(response.data)))
          .catch((e) => {
            console.log(e);
            alert(e);
          });
      },
      deleteLogoutData() {
        console.log(this.userId)
        this.$store.commit('deleteLoginData')
        console.log(this.userId)
      }
  },
};
</script>
