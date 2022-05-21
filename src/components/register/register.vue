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
    </div>
    <hr />
    <button @click="userRegist">登録</button>
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
      info: ''
    }
  },
  computed: {
    hashPassword: function () {
      return createHash('sha256').update(this.password).digest('hex')
    }
  },
  methods: {
    userRegist() {
      var params = new URLSearchParams()
      params.append('last_name', this.lastName)
      params.append('first_name', this.firstName)
      params.append('email', this.email)
      params.append('password', createHash('sha256').update(this.password).digest('hex'))
      this.axios
        .post('http://localhost:8888/api/userRegister', params)
        .then((response) => (this.info = response.data))
        .catch((e) => {
          console.log(e)
          alert(e)
        })
    }
  }
}
</script>
