<template>
  <div>
    <p>ミスタイプ数</p>
    <p>{{ missTypCount }}</p>
  </div>
</template>

<script>
export default {
  props: ['missTypCount']
}
</script>