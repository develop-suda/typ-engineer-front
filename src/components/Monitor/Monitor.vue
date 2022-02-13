<template>
  <div>
    <h1>{{ typWords[typWordCount] }}</h1>
    <MonitorWord :typedWord="enteredWord" :typingWord="enterWord" />
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
      typWords: ['application', 'engineer', 'computer'],
      typCount: 0,
      typWordCount: 0,
      typWordSplit: '',
      enteredWord: '',
      enterWord: '',
      tempWord: '',
      missTypCount: 0
    }
  },
  methods: {
    inputKeyCheck() {
      if (this.inputKey == this.typWordSplit[this.typCount]) {
        this.typCount++

        if (this.typCount !== this.typWordSplit.length) {
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

          //↓で無限ループ
          if (this.typWordCount == this.typWords.length) {
            this.typWordCount = 0
          }

          this.typWordSplit = this.typWords[this.typWordCount].split('')
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
    }
  },
  computed: {
    ...mapState(['inputKey'])
  },
  created: function () {
    this.typWordSplit = this.typWords[0].split('')
    this.enterWord = this.typWordSplit.join('')
    window.addEventListener('keypress', this.inputKeyCheck)
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