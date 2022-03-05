export default {
  methods: {
    callAPI() {
      this.axios
        .get('http://localhost:8888/levels')
        .then((response) => {
          return response.data
        })
        .catch((e) => {
          console.log(e)
          return alert(e)
        })
    }
  }
}
