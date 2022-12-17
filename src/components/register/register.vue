<template>
  <div>
    <div>
      <p>姓</p>
      <input type="text" name="last_name" v-model="lastName" required />
      <p>名</p>
      <input type="text" name="first_name" v-model="firstName" required />
      <p>メールアドレス</p>
      <input type="email" name="email" v-model="email" required />
      <p>パスワード</p>
      <input type="password" name="password" v-model="password" required />
      <p>パスワードをもう一度</p>
      <input type="password" name="password_confirmation" v-model="passwordConfirmation" required />
      <p v-if="IsMatchPassword && !password"></p>
      <p v-else-if="IsMatchPassword && password">パスワードが一致します</p>
      <p v-else>パスワードが一致しておりません</p>
    </div>
    <hr />
    <button @click="userRegister" :disabled="!IsMatchPassword">登録</button>
    <hr />
    {{ info }}
    {{ hashPassword }}
  </div>
</template>

<script>
import { createHash } from 'crypto'

export default {
  data: function () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      info: ''
    }
  },
  computed: {
    hashPassword: function () {
      return createHash('sha256').update(this.password).digest('hex')
    },
    IsMatchPassword: function () {
      return this.password === this.passwordConfirmation
    }
  },
  methods: {
    userRegister() {
      var params = new URLSearchParams()
      params.append('last_name', this.lastName)
      params.append('first_name', this.firstName)
      params.append('email', this.email)
      params.append('password', createHash('sha256').update(this.password).digest('hex'))
      this.axios
        .post('http://localhost:8888/api/userRegister', params)
        .then((response) => (this.setLoginData(response.data)))
        .catch((e) => {
          console.log(e)
          alert(e)
        })
    },
    setLoginData(loginData) {
      this.$store.commit('settingLoginData',loginData)
    }
  }
}
</script>
