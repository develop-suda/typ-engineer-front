<template>
  <div>
    <div v-if="isActive">
      <MonitorWord :typedWord="enteredWord" :typingWord="enterWord" />
      <h4>{{ typWords[typWordCount].parts_of_speech }}</h4>
      <h4>{{ typWords[typWordCount].Description }}</h4>
    </div>
    <div v-else>
      <h1>クリア!!</h1>
      <button @click="replay">もう一度</button>
    </div>
    <MissTyp :missTypCount="missTypCount" />
  </div>
</template>

<script>
import MonitorWord from './MonitorWord'
import MissTyp from './MissTyp'
// import StopWatch from '../stopWatch'

import { mapState } from 'vuex'

export default {
  name: 'Monitor',
  components: {
    MonitorWord,
    MissTyp
    // StopWatch
  },
  data() {
    return {
      typWords: [],
      typCount: 0,
      typWordCount: 0,
      typWordSplit: '',
      enteredWord: '',
      enterWord: '',
      tempWord: '',
      missTypCount: 0,
      isActive: true
    }
  },
  methods: {
    inputKeyCheck() {
      if (this.inputKey == this.typWordSplit[this.typCount]) {
        //入力が正しい場合
        this.typCount++

        if (this.typCount !== this.typWordSplit.length) {
          //まだ入力し切っていない場合の処理
          //入力された文字をenteredWordに代入
          this.tempWord = this.typWordSplit.slice(0, this.typCount)
          this.enteredWord = this.tempWord.join('')

          //これから入力する文字をenterWordに代入
          this.tempWord = this.typWordSplit.slice(this.typCount)
          this.enterWord = this.tempWord.join('')
        } else {
          //画面に表示された単語を入力し切った場合の処理
          this.typCount = 0
          this.typWordCount++

          //すべての単語を入力し切った場合の処理
          if (this.typWordCount == this.typWords.length) {
            this.isActive = !this.isActive
          }

          this.typWordSplit = this.typWords[this.typWordCount].word.split('')
          this.enteredWord = ''
          this.enterWord = this.typWordSplit.join('')
        }
      } else {
        //ミスタイプをしたため、変数の初期化
        this.typCount = 0
        this.enteredWord = ''
        this.enterWord = this.typWordSplit.join('')

        //ミスタイプした回数を記録
        this.missTypCount++
      }
    },
    replay() {
      this.typWordCount = 0
      this.enteredWord = ''
      this.tempWord = ''
      this.missTypCount = 0
      this.isActive = true
      this.typWordSplit = this.typWords[0].word.split('')
      this.enterWord = this.typWordSplit.join('')
    }
  },
  computed: {
    ...mapState(['inputKey'])
  },
  created: function () {
    this.axios
      .get('http://localhost:8888/api?parts_of_speech=動詞&is_deleted=0&limit=10')
      .then((response) => {
        this.typWords = response.data
        this.typWordSplit = this.typWords[0].word.split('')
        this.enterWord = this.typWordSplit.join('')
        window.addEventListener('keypress', this.inputKeyCheck)
      })
      .catch((e) => {
        console.log(e)
        alert(e)
      })
  }
}
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