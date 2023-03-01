<template>
  <div id="app">
    <div>
      <p>レベル(タイプ)を選択</p>
      <b-form-select v-model="type" :disabled="wordTypeCheckBox">
        <option v-for="wordType in wordTypes" :key="wordType">
          {{ wordType.word_type }}
        </option>
      </b-form-select>
      <b-form-checkbox type="checkbox" v-model="wordTypeCheckBox" @change="changeWordTypeCheckBox">
        すべてを対象にする</b-form-checkbox>
    </div>
    <hr />
    <div>
      <p>品詞を選択</p>
      <b-form-select v-model="partsOfSpeech" :disabled="partsOfSpeechCheckBox">
        <option v-for="partsOfSpeech in partsOfSpeeches" :key="partsOfSpeech">
          {{ partsOfSpeech.parts_of_speech }}
        </option>
      </b-form-select>
    </div>
    <b-form-checkbox type="checkbox" v-model="partsOfSpeechCheckBox" @change="changePartsOfSpeechCheckBox">
      すべてを対象にする</b-form-checkbox>
    <hr />
    <div>
      <p>アルファベットを選択</p>
      <b-form-input @input="alphabetValidate" v-model="alphabet" :disabled="alphabetCheckBox" required></b-form-input>
      <b-form-checkbox type="checkbox" v-model="alphabetCheckBox"
        @change="changeAlphabetCheckBox">すべてのアルファベットを対象にする</b-form-checkbox>
    </div>
    <hr />
    <div>
      <p>打つ英単語の個数を選択</p>
      <b-form-input type="number" v-model="quantity" required></b-form-input>
    </div>
    <hr />
    <div class="typPost">
      <b-link :to="{
        name: 'Typ',
        params: {
          type: this.type,
          partsOfSpeech: this.partsOfSpeech,
          quantity: String(this.quantity),
          alphabet: this.alphabet,
        },
      }"><b-button variant="outline-primary">開始!!</b-button></b-link>
    </div>
  </div>
</template>

<script>
// @ts-nocheck

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
      wordTypeCheckBox: false,
      alphabetCheckBox: false,
    };
  },
  methods: {
    alphabetValidate() {
      if (1 < this.alphabet.length) {
        this.alphabet = this.alphabet.slice(-1);
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

<style scoped>
p {
  margin: 0;
}

/* .typPost {
  border: thick double #0000ff;
} */

.side {
  float: right;
}
</style>