<template>
  <div>
    <p>単語の成功入力回数</p>
    {{ myPageData.wordTypInfoSum.Typing_count }}
    <p>単語の失敗入力回数</p>
    {{ myPageData.wordTypInfoSum.Typing_miss_count }}

    <p>単語の入力成功回数ランキングTOP10</p>
    <table>
      <tr>
        <th>単語</th>
        <th>入力成功回数</th>
        <th>順位</th>
      </tr>
      <tr
        v-for="wordCountRanking in myPageData.wordCountRanking"
        :key="wordCountRanking.word"
      >
        <td>{{ wordCountRanking.Word }}</td>
        <td>{{ wordCountRanking.Typing_count }}</td>
        <td>{{ wordCountRanking.Rank_result }}</td>
      </tr>
    </table>

    <p>単語の入力失敗回数ランキングTOP10</p>
    <table>
      <tr>
        <th>単語</th>
        <th>入力失敗回数</th>
        <th>順位</th>
      </tr>
      <tr
        v-for="wordMissCountRanking in myPageData.wordMissCountRanking"
        :key="wordMissCountRanking.word"
      >
        <td>{{ wordMissCountRanking.Word }}</td>
        <td>{{ wordMissCountRanking.Typing_miss_count }}</td>
        <td>{{ wordMissCountRanking.Rank_result }}</td>
      </tr>
    </table>

    <p>アルファベットの入力成功回数ランキングTOP10</p>
    <table>
      <tr>
        <th>アルファベット</th>
        <th>入力成功回数</th>
        <th>順位</th>
      </tr>
      <tr
        v-for="alphabetCountRanking in myPageData.alphabetCountRanking"
        :key="alphabetCountRanking.alphabet"
      >
        <td>{{ alphabetCountRanking.Alphabet }}</td>
        <td>{{ alphabetCountRanking.Typing_count }}</td>
        <td>{{ alphabetCountRanking.Rank_result }}</td>
      </tr>
    </table>

    <p>アルファベットの入力失敗回数ランキングTOP10</p>
    <table>
      <tr>
        <th>アルファベット</th>
        <th>入力失敗回数</th>
        <th>順位</th>
      </tr>
      <tr
        v-for="alphabetMissCountRanking in myPageData.alphabetMissCountRanking"
        :key="alphabetMissCountRanking.alphabet"
      >
        <td>{{ alphabetMissCountRanking.Alphabet }}</td>
        <td>{{ alphabetMissCountRanking.Typing_miss_count }}</td>
        <td>{{ alphabetMissCountRanking.Rank_result }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'MyPage',
  data() {
    return {
      myPageData: [],
    };
  },
  computed: {
    ...mapState(['userId']),
  },
  methods: {
    getMyPageData() {
      var params = new URLSearchParams();
      params.append('userId', this.userId);
      this.axios
        .post('http://localhost:8888/api/myPage', params)
        .then((response) => {
          this.myPageData = response.data;
        })
        .catch((e) => {
          console.log(e);
          alert(e);
        });
    },
  },
  created: function () {
    this.getMyPageData();
  },
};
</script>
