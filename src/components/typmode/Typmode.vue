<template>
  <div id="app">
    <select v-model="selected">
      <option>item1</option>
      <option>item2</option>
      <option>item3</option>
    </select>
    <div>選択項目: {{ selected }}</div>
    <input @input="validate" v-model="numValue" required />
    <div>個数: {{ numValue }}</div>
    {{ levels }}
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      selected: '',
      numValue: null,
      levels: []
    }
  },
  methods: {
    validate() {
      this.numValue = this.numValue.replace(/\D/g, '').replace(/^0+/, '')
    }
  },
  created: function () {
    this.axios
      .get('http://localhost:8888/api/levels')
      .then((response) => {
        this.levels = response.data
      })
      .catch((e) => {
        console.log(e)
        return alert(e)
      })
  }
}
</script>
