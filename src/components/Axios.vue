<template>
  <div id="search-ip">
    <h1>axios</h1>
    <router-link to="./typ">typへ</router-link>
    <hr />
    <input @click="getIp" type="button" value="APIテスト(郵便局)" />
    <input @click="getWords" type="button" value="APIテスト(word)" />
    <input @click="clear" type="button" value="クリア" />
    <p>{{ info }}</p>
  </div>
</template>

<script>
export default {
  name: 'Axios',
  data() {
    return {
      info: null,
      words: [],
      test: []
    }
  },
  methods: {
    getIp() {
      this.axios
        .get('https://zipcloud.ibsnet.co.jp/api/search?zipcode=0180133')
        .then((response) => (this.info = response))
        .catch((e) => {
          console.tabel(e)
          alert(e)
        })
    },
    getWords() {
      this.axios
        .get('http://localhost:8888/api')
        .then((response) => {
          this.info = response
          this.words = response.data
          this.test = response.data[0].word.split('')
        })
        .catch((e) => {
          console.log(e)
          alert(e)
        })
    },
    clear() {
      this.info = null
    }
  }
}
</script>
