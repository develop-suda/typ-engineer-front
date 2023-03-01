<template>
  <div>
    <table align="center">
      <tr>
        <OneKey alphabet="a" />
        <OneKey alphabet="s" />
        <OneKey alphabet="d" />
        <OneKey alphabet="f" />
        <OneKey alphabet="g" />
        <OneKey alphabet="h" />
        <OneKey alphabet="j" />
        <OneKey alphabet="k" />
        <OneKey alphabet="l" />
        <OneKey alphabet=";" />
        <OneKey alphabet=":" />
      </tr>
    </table>
  </div>
</template>

<script>
// @ts-nocheck

import OneKey from './OneKey'

export default {
  name: 'SecondRecord',
  components: {
    OneKey
  }
}
</script>

<style></style>
