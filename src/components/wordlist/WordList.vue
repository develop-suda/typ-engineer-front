<template>
  <div>
    <b-button v-b-toggle.collapse-1 variant="primary" style="margin-bottom: 16px;">検索フォーム</b-button>
    <b-collapse id="collapse-1" class="mt-2" style="margin-bottom: ;">
      <div class="search">
        <b-form-group>
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
            <b-form-input @input="alphabetValidate" v-model="alphabet" :disabled="alphabetCheckBox"
              required></b-form-input>
            <b-form-checkbox type="checkbox" v-model="alphabetCheckBox"
              @change="changeAlphabetCheckBox">すべてのアルファベットを対象にする</b-form-checkbox>
          </div>
        </b-form-group>
        <b-button variant="success" @click="filteredWords" style="margin-bottom: 16px;">検索</b-button>
      </div>
    </b-collapse>
    <div class="flex">
      <b-table striped hover :items="displayWord"></b-table>
    </div>
  </div>
</template>

<script>
// @ts-nocheck

export default {
  name: 'WordList',
  data() {
    return {
      wordDetails: [],
      typWordInfos: [],
      displayWord: [],
      wordTypes: [],
      partsOfSpeeches: [],
      partsOfSpeech: '',
      type: '',
      alphabet: 'a',
      wordTypeCheckBox: false,
      partsOfSpeechCheckBox: false,
      alphabetCheckBox: false,
    };
  },
  methods: {
    filteredWords() {
      console.log("test")
      this.displayWord = [];
      if (this.wordTypeCheckBox) {
        this.type = '[^0-9]';
      }
      if (this.partsOfSpeechCheckBox) {
        this.partsOfSpeech = '[^0-9]';
      }
      if (this.alphabetCheckBox) {
        this.alphabet = '.';
      }
      for (var i in this.wordDetails) {
        var wordInfo = this.wordDetails[i];

        if (wordInfo.word_type.search(this.type) !== -1 && wordInfo.parts_of_speech.search(this.partsOfSpeech) !== -1 && wordInfo.word.search("^" + this.alphabet) !== -1) {
          this.displayWord.push(wordInfo);
        }

      }
      if (this.alphabetCheckBox) {
        this.alphabet = '';
      }
    },
    alphabetValidate() {
      if (1 < this.alphabet.length) {
        this.alphabet = this.alphabet.slice(-1);
      }
    },
  },
  created: function () {
    this.axios
      .get('http://localhost:8888/api/wordDetail')
      .then((response) => {
        this.wordDetails = response.data;
        this.displayWord = this.wordDetails;
      })
      .catch((e) => {
        alert(e);
      });

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

<style>
.flex {
  display: flex;
}
</style>
