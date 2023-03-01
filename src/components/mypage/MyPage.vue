<template>
  <div>
    <div v-if="isTypedFlg">
      <b-list-group style="margin-bottom:16px;">
        <b-list-group-item variant="info">単語の成功入力回数</b-list-group-item>
        <b-list-group-item>{{ myPageData.wordTypInfoSum.typingCount }}</b-list-group-item>
        <b-list-group-item variant="info">単語の失敗入力回数</b-list-group-item>
        <b-list-group-item>{{ myPageData.wordTypInfoSum.typingMissCount }}</b-list-group-item>
      </b-list-group>

      <b-button v-b-toggle.collapse-1 variant="primary" style="margin-bottom: 16px;">全単語の入力成功、失敗回数</b-button>
      <b-collapse id="collapse-1" class="mt-2" style="margin-bottom: 16px;">
        <b-button v-b-toggle.collapse-10 variant="primary" style="margin-bottom: 16px;">検索フォーム</b-button>
        <b-collapse id="collapse-10" class="mt-2" style="margin-bottom:16px ;">
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
        <b-table striped hover :items="displayWordInfos"></b-table>
      </b-collapse>

      <br>

      <b-button v-b-toggle.collapse-2 variant="primary" style="margin-bottom: 16px;">単語の入力成功回数ランキングTOP10</b-button>
      <b-collapse id="collapse-2" class="mt-2" style="margin-bottom: 16px;">
        <b-table striped hover :items="myPageData.wordCountRanking"></b-table>
      </b-collapse>

      <br>

      <b-button v-b-toggle.collapse-3 variant="primary" style="margin-bottom: 16px;">単語の入力失敗回数ランキングTOP10</b-button>
      <b-collapse id="collapse-4" class="mt-2" style="margin-bottom: 16px;">
        <b-table striped hover :items="myPageData.wordMissCountRanking"></b-table>
      </b-collapse>

      <br>

      <b-button v-b-toggle.collapse-4 variant="primary" style="margin-bottom: 16px;">アルファベットの入力成功回数ランキングTOP10</b-button>
      <b-collapse id="collapse-4" class="mt-2" style="margin-bottom: 16px;">
        <b-table striped hover :items="myPageData.alphabetCountRanking"></b-table>
      </b-collapse>

      <br>

      <b-button v-b-toggle.collapse-5 variant="primary" style="margin-bottom: 16px;">アルファベットの入力失敗回数ランキングTOP10</b-button>
      <b-collapse id="collapse-5" class="mt-2" style="margin-bottom: 16px;">
        <b-table striped hover :items="myPageData.alphabetMissCountRanking"></b-table>
      </b-collapse>
    </div>
    <div v-else>
      <p>タイミング練習をしていないので、情報がありません！</p>
      <p>やってみよう！！</p>
      <router-link to="./typmode">タイピングへ!</router-link>
    </div>
  </div>
</template>

<script>
// @ts-nocheck

import { mapState } from 'vuex';
export default {
  name: 'MyPage',
  data() {
    return {
      myPageData: [],
      isTypedFlg: false,
      typWordInfos: [],
      wordTypes: [],
      partsOfSpeeches: [],
      type: '',
      partsOfSpeech: '',
      searchType: 'and',
      displayWordInfos: [],
      alphabet: 'a',
      wordTypeCheckBox: false,
      partsOfSpeechCheckBox: false,
      alphabetCheckBox: false,
    };
  },
  computed: {
    ...mapState(['userId']),
  },
  methods: {
    getMyPageData() {
      var params = new URLSearchParams();
      params.append('userId', this.userId);
      this.axios
        .post('http://localhost:8888/api/myPage', params)
        .then((response) => {
          this.myPageData = response.data;
          if (this.myPageData.wordCountRanking !== null) {
            this.isTypedFlg = true;
          }
        })
        .catch((e) => {
          alert(e);
        });
    },
    getTypWordInfo() {
      var params = new URLSearchParams();
      params.append('userId', this.userId);
      this.axios
        .post('http://localhost:8888/api/typCountInAllWord', params)
        .then((response) => {
          this.typWordInfos = response.data;
          this.displayWordInfos = this.typWordInfos;
        })
        .catch((e) => {
          alert(e);
        });
    },
    filteredWords() {
      this.displayWordInfos = [];
      if (this.wordTypeCheckBox) {
        this.type = '[^0-9]';
      }
      if (this.partsOfSpeechCheckBox) {
        this.partsOfSpeech = '[^0-9]';
      }
      if (this.alphabetCheckBox) {
        this.alphabet = '.';
      }
      for (var i in this.typWordInfos) {
        var wordInfo = this.typWordInfos[i];

        if (wordInfo.word_type.search(this.type) !== -1 && wordInfo.parts_of_speech.search(this.partsOfSpeech) !== -1 && wordInfo.word.search("^" + this.alphabet) !== -1) {
          this.displayWordInfos.push(wordInfo);
        }

      }
      if (this.alphabetCheckBox) {
        this.alphabet = '';
      }
    },
  },
  created: function () {
    if (!this.userId) {
      this.$router.push('home');
      return;
    }
    this.getMyPageData();
    this.getTypWordInfo();
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
