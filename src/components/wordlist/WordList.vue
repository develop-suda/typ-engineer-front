<template>
  <div>
    <p>単語一覧</p>
    <div class="flex">
      <table>
        <tr>
          <th>単語</th>
          <th>品詞</th>
          <th>意味</th>
          <th>単語タイプ</th>
        </tr>
        <tr v-for="word in wordDetails" :key="word.wordId">
          <td>{{ word.word }}</td>
          <td>{{ word.parts_of_speech }}</td>
          <td>{{ word.description }}</td>
          <td>{{ word.word_type }}</td>
        </tr>
      </table>
      <table v-if="isUserId">
        <tr>
          <th>入力成功数</th>
          <th>入力失敗数</th>
        </tr>
        <tr v-for="typWordInfo in typWordInfos" :key="typWordInfo.wordId">
          <td>{{ typWordInfo.successTypCount }}</td>
          <td>{{ typWordInfo.missTypCount }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'WordList',
  data() {
    return {
      wordDetails: [],
      typWordInfos: [],
    };
  },
  computed: {
    ...mapState(['userId']),
    isUserId() {
      return this.userId != '';
    },
  },
  methods: {
    getTypWordInfo() {
      var params = new URLSearchParams();
      params.append('userId', this.userId);
      this.axios
        .post('http://localhost:8888/api/typCountInAllWord', params)
        .then((response) => {
          this.typWordInfos = response.data;
        })
        .catch((e) => {
          alert(e);
        });
    },
  },
  created: function () {
    this.axios
      .get('http://localhost:8888/api/wordDetail')
      .then((response) => {
        this.wordDetails = response.data;
      })
      .catch((e) => {
        alert(e);
      });

    if (this.isUserId) {
      this.getTypWordInfo();
    }
  },
};
</script>

<style>
.flex {
  display: flex;
}
</style>
