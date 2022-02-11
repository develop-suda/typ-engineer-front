<template>
  <div>
    <table align="center">
      <tr>
        <OneKey alphabet="z" />
        <OneKey alphabet="x" />
        <OneKey alphabet="c" />
        <OneKey alphabet="v" />
        <OneKey alphabet="b" />
        <OneKey alphabet="n" />
        <OneKey alphabet="m" />
        <OneKey alphabet="," />
        <OneKey alphabet="." />
        <OneKey alphabet="/" />
      </tr>
    </table>
  </div>
</template>

<script>
import OneKey from './OneKey';

export default {
  name: 'ThirdRecord',
  components: {
    OneKey,
  },
};
</script>

<style>
</style>
