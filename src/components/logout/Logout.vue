<template>
  <div>
    <b-button variant="info" @click="userLogout">Sign out</b-button>
  </div>
</template>

<script>
// @ts-nocheck

import { mapState } from 'vuex';

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
        .then((response) => {
          this.deleteLogoutData(response.data);
          this.$router.push('/Home');
        })
        .catch((e) => {
          alert(e);
        });
    },
    deleteLogoutData() {
      this.userId;
      this.$store.commit('deleteLoginData');
      this.userId;
    },
  },
};
</script>
