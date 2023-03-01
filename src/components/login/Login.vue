<template>
  <div>
    <h3>Sign up TYP-ENGINEER</h3>
    <b-form-input type="email" v-model="email" placeholder="メールアドレス" required></b-form-input>
    <b-form-input type="password" v-model="password" placeholder="パスワード" required></b-form-input>
    <hr />
    <b-button variant="success" @click="userLogin">Sing up</b-button>
  </div>
</template>

<script>
// @ts-nocheck

import { createHash } from 'crypto';

export default {
  data: function () {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    hashPassword: function () {
      return createHash('sha256').update(this.password).digest('hex');
    },
  },
  methods: {
    userLogin() {
      var params = new URLSearchParams();
      params.append('email', this.email);
      params.append(
        'password',
        createHash('sha256').update(this.password).digest('hex')
      );
      this.axios
        .post('http://localhost:8888/api/userLogin', params)
        .then((response) => {
          this.setLoginData(response.data);
          this.$router.push('/Home');
        })
        .catch((e) => {
          alert(e);
        });
    },
    setLoginData(loginData) {
      this.$store.commit('settingLoginData', loginData);
    },
  },
};
</script>
