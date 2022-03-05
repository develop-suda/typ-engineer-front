<template>
  <div>
    <h1>
      <span :class="{ pressed: true }">{{ typedWord }}</span
      >{{ typingWord }}
    </h1>
  </div>
</template>

<script>
export default {
  props: ['typedWord', 'typingWord']
}
</script>

<style scoped>
.pressed {
  color: green;
}

p {
  display: inline-flex;
  margin: 0px;
  font-size: 1.5rem;
  font-weight: 300;
}
</style>