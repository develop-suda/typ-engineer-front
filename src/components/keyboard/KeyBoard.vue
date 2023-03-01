<template>
  <div class="keyBoard">
    <FirstRecord />
    <SecondRecord />
    <ThirdRecord />
  </div>
</template>

<script>
import FirstRecord from './FristRecord.vue'
import SecondRecord from './SecondRecord.vue'
import ThirdRecord from './ThirdRecord.vue'

export default {
  name: 'KeyBoard',
  components: {
    FirstRecord,
    SecondRecord,
    ThirdRecord
  }
}
</script>

<style scoped>
.keyBoard {
  margin-top: 20px;
}
</style>
