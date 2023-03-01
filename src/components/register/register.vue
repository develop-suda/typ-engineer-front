<template>
  <div>
    <div>
      <h3>Welcome to TYP-ENGINEER!</h3>
      <h3>Let’s begin the typing</h3>
      <b-form-input type="text" v-model="lastName" placeholder="性" required></b-form-input>
      <b-form-input type="text" v-model="firstName" placeholder="名" required></b-form-input>
      <b-form-input type="email" v-model="email" placeholder="メールアドレス" required></b-form-input>
      <b-form-input type="password" v-model="password" placeholder="パスワード" required></b-form-input>
      <b-form-input type="password" v-model="passwordConfirmation" placeholder="パスワードをもう一度" required></b-form-input>
      <p v-if="IsMatchPassword && !password"></p>
      <p v-else-if="IsMatchPassword && password">パスワードが一致します</p>
      <p v-else>パスワードが一致しておりません</p>
    </div>
    <hr />
    <b-button variant="success" @click="userRegister" :disabled="!IsMatchPassword">Sign in</b-button>
  </div>
</template>

<script>
// @ts-nocheck

import { createHash } from 'crypto';

export default {
  data: function () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      info: '',
    };
  },
  computed: {
    hashPassword: function () {
      return createHash('sha256').update(this.password).digest('hex');
    },
    IsMatchPassword: function () {
      return this.password === this.passwordConfirmation;
    },
  },
  methods: {
    userRegister() {
      var params = new URLSearchParams();
      params.append('last_name', this.lastName);
      params.append('first_name', this.firstName);
      params.append('email', this.email);
      params.append(
        'password',
        createHash('sha256').update(this.password).digest('hex')
      );
      this.axios
        .post('http://localhost:8888/api/userRegister', params)
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
