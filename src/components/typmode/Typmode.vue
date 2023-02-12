<template>
  <div id="app">
    <p>タイプを選択</p>
    <select v-model="type" :disabled="wordTypeCheckBox">
      <option v-for="wordType in wordTypes" :key="wordType">
        {{ wordType.word_type }}
      </option>
    </select>
    <input
      type="checkbox"
      v-model="wordTypeCheckBox"
      @change="changeWordTypeCheckBox"
    />
    <p>品詞を選択</p>
    <select v-model="partsOfSpeech" :disabled="partsOfSpeechCheckBox">
      <option v-for="partsOfSpeech in partsOfSpeeches" :key="partsOfSpeech">
        {{ partsOfSpeech.parts_of_speech }}
      </option>
    </select>
    <input
      type="checkbox"
      v-model="partsOfSpeechCheckBox"
      @change="changePartsOfSpeechCheckBox"
    />
    <p>アルファベットを選択</p>
    <input
      @input="alphabetValidate"
      v-model="alphabet"
      :disabled="alphabetCheckBox"
      required
    />
    <input
      type="checkbox"
      v-model="alphabetCheckBox"
      @change="changeAlphabetCheckBox"
    />
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
            alphabet: this.alphabet,
          },
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
      words: [],
      partsOfSpeechCheckBox: false,
    };
  },
  methods: {
    quantityValidate() {
      this.quantity = this.quantity.replace(/\D/g, '').replace(/^0+/, '');
    },
    alphabetValidate() {
      if (1 < this.alphabet.length) {
        this.alphabet = this.alphabet.slice(0, 1);
      }
    },
    changeWordTypeCheckBox() {
      if (this.wordTypeCheckBox) {
        this.type = 'ALL';
      } else {
        this.type = this.wordTypes[0].word_type;
      }
    },
    changePartsOfSpeechCheckBox() {
      if (this.partsOfSpeechCheckBox) {
        this.partsOfSpeech = 'ALL';
      } else {
        this.partsOfSpeech = this.partsOfSpeeches[0].parts_of_speech;
      }
    },
    changeAlphabetCheckBox() {
      if (this.alphabetCheckBox) {
        this.alphabet = 'ALL';
      } else {
        this.alphabet = 'a';
      }
    },
  },
  created: function () {
    this.axios
      .get('http://localhost:8888/api/types')
      .then((response) => {
        this.wordTypes = response.data;
        this.type = this.wordTypes[0].word_type;
      })
      .catch((e) => {
        return alert(e);
      });
    this.axios
      .get('http://localhost:8888/api/partsofspeech')
      .then((response) => {
        this.partsOfSpeeches = response.data;
        this.partsOfSpeech = this.partsOfSpeeches[0].parts_of_speech;
      })
      .catch((e) => {
        return alert(e);
      });
  },
};
</script>
