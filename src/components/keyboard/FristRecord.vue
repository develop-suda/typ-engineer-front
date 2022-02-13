<template>
  <div>
    <table align="center">
      <tr>
        <OneKey alphabet="q" />
        <OneKey alphabet="w" />
        <OneKey alphabet="e" />
        <OneKey alphabet="r" />
        <OneKey alphabet="t" />
        <OneKey alphabet="y" />
        <OneKey alphabet="u" />
        <OneKey alphabet="i" />
        <OneKey alphabet="o" />
        <OneKey alphabet="p" />
        <OneKey alphabet="@" />
      </tr>
    </table>
  </div>
</template>

<script>
import OneKey from './OneKey'

export default {
  name: 'FirstRecord',
  components: {
    OneKey
  }
}
</script>

<style>
</style>
