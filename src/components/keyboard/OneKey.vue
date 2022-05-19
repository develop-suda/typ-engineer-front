//ファイル名はパスカルケースでお願いします //パルカルケースは最初も大文字
<template>
  <div class="keyFlame" :class="{ pressing: isPress }">
    <p>{{ this.alphabet }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'OneKey',
  props: {
    alphabet: {
      required: true
    }
  },
  computed: {
    ...mapState(['inputKey']),
    isPress() {
      return this.inputKey == this.alphabet
    }
  }
}
</script>

<style scoped>
.keyFlame {
  width: 50px;
  height: 50px;
  border: 1px solid;
  background-color: white;
  display: inline-table;
}

.pressing {
  background-color: green;
}
</style>
