//ファイル名はパスカルケースでお願いします //パルカルケースは最初も大文字
<template>
  <div class="keyFlame" :class="{ pressing: isPress }">
    <p>{{ this.alphabet }}</p>
  </div>
</template>

<script>
// @ts-nocheck

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
  width: 55px;
  height: 55px;
  border: 0.5px solid black;
  border-collapse: collapse;
  background-color: white;
  display: inline-table;
}

p {
  font-size: 1.5rem;
  text-align: center;
  padding: 0%;
  margin: 25% 0;
}

.pressing {
  background-color: #28a745;
  color: #f8f9fa;

}
</style>
