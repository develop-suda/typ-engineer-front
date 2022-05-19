<template>
  <div id="app">
    <p>タイプを選択</p>
    <select v-model="type">
      <option v-for="wordType in wordTypes" :key="wordType">{{ wordType.word_type }}</option>
    </select>
    <p>品詞を選択</p>
    <select v-model="partsOfSpeech">
      <option v-for="partsOfSpeech in partsOfSpeeches" :key="partsOfSpeech">{{ partsOfSpeech.parts_of_speech }}</option>
    </select>
    <p>アルファベットを選択</p>
    <input @input="alphabetValidate" v-model="alphabet" required />
    <p>打つ英単語の個数を選択</p>
    <input @input="quantityValidate" v-model="quantity" required />
    <hr />
    <div>
      <router-link
        :to="{
          name: 'Typ',
          params: {
            type: this.type,
            partsOfSpeech: this.partsOfSpeech,
            quantity: String(this.quantity),
            alphabet: this.alphabet
          }
        }"
        >開始!!</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      type: '',
      partsOfSpeech: '',
      quantity: 10,
      alphabet: 'a',
      wordTypes: [],
      partsOfSpeeches: [],
      words: []
    }
  },
  methods: {
    quantityValidate() {
      this.quantity = this.quantity.replace(/\D/g, '').replace(/^0+/, '')
    },
    alphabetValidate() {
      if (1 < this.alphabet.length) {
        this.alphabet = this.alphabet.slice(0, 1)
      }
    }
  },
  created: function () {
    this.axios
      .get('http://localhost:8888/api/types')
      .then((response) => {
        this.wordTypes = response.data
        this.type = this.wordTypes[0].word_type
      })
      .catch((e) => {
        console.log(e)
        return alert(e)
      })
    this.axios
      .get('http://localhost:8888/api/partsofspeech')
      .then((response) => {
        this.partsOfSpeeches = response.data
        this.partsOfSpeech = this.partsOfSpeeches[0].parts_of_speech
      })
      .catch((e) => {
        console.log(e)
        return alert(e)
      })
  }
}
</script>
