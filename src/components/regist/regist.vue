<template>
  <div>
    <div>
      <p>名前</p>
      <input type="text" name="user_name" v-model="userName" required />
      <p>メールアドレス</p>
      <input type="email" name="email" v-model="email" required />
      <p>電話番号</p>
      <input type="tel" name="phone_number" v-model="phoneNumber" required />
    </div>
    <hr />
    <button @click="userRegist">登録</button>
    <hr />
    {{ info }}
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      userName: '',
      email: '',
      phoneNumber: null,
      info: ''
    }
  },
  methods: {
    userRegist() {
      var params = new URLSearchParams()
      params.append('user_name', this.userName)
      params.append('email', this.email)
      params.append('phone_number', this.phoneNumber)
      this.axios
        .post('http://localhost:8888/api/userRegist', params)
        .then((response) => (this.info = response.data))
        .catch((e) => {
          console.log(e)
          alert(e)
        })
    }
  }
}
</script>
