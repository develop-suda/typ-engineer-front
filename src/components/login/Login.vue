<template>
  <div>
    <p>メールアドレス</p>
    <input type="email" name="email" v-model="email" required />
    <p>パスワード</p>
    <input type="password" name="password" v-model="password" required />
    <button @click="userLogin">ログイン</button>
    {{ hashPassword }}
    {{ info }}
  </div>
</template>

<script>
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
