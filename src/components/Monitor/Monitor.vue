
<template>
  <div>
    <div v-if="isActive">
      <MonitorWord :typedWord="enteredWord" :typingWord="enterWord" />
      <h6>{{ typWords[typWordCount].parts_of_speech }}</h6>
      <h6>品詞 : {{ typWords[typWordCount].Description }}</h6>
      <MissTyp :missTypCount="missTypCount" />
    </div>
    <div v-else>
      <h1>クリア!!</h1>
      <MissTyp :missTypCount="missTypCount" />
      <b-button-group vertical>
        <b-button variant="info" @click="replay">もう一度？</b-button>
        <b-button variant="info" to="./typmode">タイピング対象を選択(戻る)</b-button>
      </b-button-group>
    </div>
  </div>
</template>

<script>
// @ts-nocheck
import MonitorWord from './MonitorWord';
import MissTyp from './MissTyp';

import { mapState } from 'vuex';

export default {
  name: 'Monitor',
  components: {
    MonitorWord,
    MissTyp,
  },
  props: ['type', 'partsOfSpeech', 'quantity', 'alphabet'],
  data() {
    return {
      typWords: [],
      typCount: 0,
      typWordCount: 0,
      typWordSplit: '',
      typWordSplitLowerCase: '',
      enteredWord: '',
      enterWord: '',
      tempWord: '',
      missTypCount: 0,
      isActive: true,
      typWordInfo: [],
      typAlphaInfo: {},
      postTypAlphaInfo: [],
    };
  },
  methods: {
    inputKeyCheck() {
      this.inputKeyAlphaInfo();
      if (this.inputKey == this.typWordSplitLowerCase[this.typCount]) {
        //入力が正しい場合
        this.typCount++;

        if (this.typCount !== this.typWordSplitLowerCase.length) {
          //まだ入力し切っていない場合の処理
          //入力された文字をenteredWordに代入
          this.tempWord = this.typWordSplit.slice(0, this.typCount);
          this.enteredWord = this.tempWord.join('');

          //これから入力する文字をenterWordに代入
          this.tempWord = this.typWordSplit.slice(this.typCount);
          this.enterWord = this.tempWord.join('');
        } else {
          //画面に表示された単語を入力し切った場合の処理
          this.typCount = 0;
          this.typWordInfo[this.typWordCount].successTypCount++;
          this.typWordCount++;

          //すべての単語を入力し切った場合の処理
          if (this.typWordCount == this.typWords.length) {
            this.isActive = !this.isActive;
            if (this.userId) {
              this.postTypInfo();
            }
          }

          this.typWordSplit = this.typWords[this.typWordCount].word.split('');
          this.typWordSplitLowerCase = this.typWords[this.typWordCount].word
            .toLowerCase()
            .split('');
          this.enteredWord = '';
          this.enterWord = this.typWordSplit.join('');
        }
      } else {
        //ミスタイプをしたため、変数の初期化
        this.typCount = 0;
        this.enteredWord = '';
        this.enterWord = this.typWordSplit.join('');

        //ミスタイプした回数を記録
        this.missTypCount++;

        //表示されている単語のミスタイプ回数を記録
        this.typWordInfo[this.typWordCount].missTypCount++;
      }
    },
    replay() {
      this.typWordCount = 0;
      this.enteredWord = '';
      this.tempWord = '';
      this.missTypCount = 0;
      this.isActive = true;
      this.typWordSplit = this.typWords[0].word.split('');
      this.typWordSplitLowerCase = this.typWords[0].word
        .toLowerCase()
        .split('');
      this.enterWord = this.typWordSplit.join('');
      this.typAlphaInfo = this.createAlphaInfoObj();
    },
    createTypeInfoArr(typeWords) {
      let typeInfoArr = [];
      typeWords.forEach((typeWord) => {
        typeInfoArr.push({
          word: typeWord.word,
          successTypCount: 0,
          missTypCount: 0,
        });
      });
      return typeInfoArr;
    },
    postTypInfo() {
      var params = new URLSearchParams();

      this.postTypAlphaInfo = this.convertAlphaInfoObjToArray();

      params.append('userId', this.userId);
      // typWordInfoをparamsに追加
      params.append('typWordInfo', JSON.stringify(this.typWordInfo));
      params.append('typAlphaInfo', JSON.stringify(this.postTypAlphaInfo));

      this.axios
        .post('http://localhost:8888/api/postTypeInfo', params)
        .then((response) => {
          response.data;
        })
        .catch((e) => {
          alert(e);
        });
    },
    // アルファベットのオブジェクトを作成
    createAlphaInfoObj() {
      let alphaInfoObj = {};
      for (let i = 0; i < 26; i++) {
        alphaInfoObj[this.alphabetArr[i]] = {
          alphabet: this.alphabetArr[i],
          successTypCount: 0,
          missTypCount: 0,
        };
      }
      return alphaInfoObj;
    },
    inputKeyAlphaInfo() {
      // 入力されたアルファベットの情報を更新
      if (this.inputKey == this.typWordSplitLowerCase[this.typCount]) {
        this.typAlphaInfo[this.typWordSplitLowerCase[this.typCount]]
          .successTypCount++;
      } else {
        this.typAlphaInfo[this.typWordSplitLowerCase[this.typCount]]
          .missTypCount++;
      }
    },
    // typAlphaInfoオブジェクトの値を配列に変換
    convertAlphaInfoObjToArray() {
      let alphaInfoArr = [];
      for (let i = 0; i < 26; i++) {
        alphaInfoArr.push(this.typAlphaInfo[this.alphabetArr[i]]);
      }
      return alphaInfoArr;
    },
  },
  computed: {
    ...mapState(['inputKey']),
    ...mapState(['userId']),
    ...mapState(['alphabetArr']),
  },
  created: function () {

    if (!this.type || !this.partsOfSpeech || !this.quantity || !this.alphabet) {
      this.$router.push('typmode');
      return;
    }

    var params = new URLSearchParams();
    params.append('type', this.type);
    params.append('parts_of_speech', this.partsOfSpeech);
    params.append('quantity', this.quantity);
    params.append('alphabet', this.alphabet);
    this.axios
      .post('http://localhost:8888/api/typWord', params)
      .then((response) => {
        this.typWords = response.data;
        this.typWordSplit = this.typWords[0].word.split('');
        this.typWordSplitLowerCase = this.typWords[0].word
          .toLowerCase()
          .split('');
        this.enterWord = this.typWordSplit.join('');
        this.typWordInfo = this.createTypeInfoArr(this.typWords);
        this.typAlphaInfo = this.createAlphaInfoObj();
        this.createAlphaInfoObj();
        window.addEventListener('keypress', this.inputKeyCheck);
      })
      .catch((e) => {
        alert(e);
      });
  },
};
</script>

<style scoped>
ul {
  padding: 0;
}

li {
  display: inline;
}

.monitorword {
  display: inline;
}

.pressed {
  color: green;
}
</style>
