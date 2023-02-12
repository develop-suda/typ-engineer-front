<template>
  <div id="Main">
    <Monitor
      :type="type"
      :partsOfSpeech="partsOfSpeech"
      :quantity="quantity"
      :alphabet="alphabet"
    />
    <KeyBoard />
  </div>
</template>

<script>
import Monitor from './Monitor/Monitor.vue';
import KeyBoard from './keyboard/KeyBoard.vue';

export default {
  name: 'Main',
  components: {
    Monitor,
    KeyBoard,
  },
  props: ['type', 'partsOfSpeech', 'quantity', 'alphabet'],
  methods: {
    inputKey(event) {
      this.$store.commit('updateInputKey', event.key);
    },
  },
  created: function () {
    //参考資料 https://kenkennoblog.com/vue-js-window-addeventlister
    //↓第二引数で実行する関数を指定している
    //keypressは1~9A~Zのキーだけに反応
    //keydownは全てのキーに反応
    window.addEventListener('keypress', this.inputKey);
  },
};
</script>

<style>
#Main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
