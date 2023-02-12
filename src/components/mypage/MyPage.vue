<!-- <div v-if="isActive">
      <MonitorWord :typedWord="enteredWord" :typingWord="enterWord" />
      <h4>{{ typWords[typWordCount].parts_of_speech }}</h4>
      <h4>{{ typWords[typWordCount].Description }}</h4>
    </div>
    <div v-else>
       -->
<template>
  <div>
    <div v-if="isTypedFlg">
      <p>単語の成功入力回数</p>
      {{ myPageData.wordTypInfoSum.typingCount }}
      <p>単語の失敗入力回数</p>
      {{ myPageData.wordTypInfoSum.typingMissCount }}

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
          <td>{{ wordCountRanking.word }}</td>
          <td>{{ wordCountRanking.typingCount }}</td>
          <td>{{ wordCountRanking.rankResult }}</td>
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
          <td>{{ wordMissCountRanking.word }}</td>
          <td>{{ wordMissCountRanking.typingMissCount }}</td>
          <td>{{ wordMissCountRanking.rankResult }}</td>
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
          <td>{{ alphabetCountRanking.alphabet }}</td>
          <td>{{ alphabetCountRanking.typingCount }}</td>
          <td>{{ alphabetCountRanking.rankResult }}</td>
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
          <td>{{ alphabetMissCountRanking.alphabet }}</td>
          <td>{{ alphabetMissCountRanking.typingMissCount }}</td>
          <td>{{ alphabetMissCountRanking.rankResult }}</td>
        </tr>
      </table>
    </div>
    <div v-else>
      <p>タイミング練習をしていないので、情報がありません！</p>
      <p>やってみよう！！</p>
      <router-link to="./typmode">タイピングへ!</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'MyPage',
  data() {
    return {
      myPageData: [],
      isTypedFlg: false,
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
          if (this.myPageData.wordCountRanking !== null) {
            this.isTypedFlg = true;
          }
        })
        .catch((e) => {
          alert(e);
        });
    },
  },
  created: function () {
    this.getMyPageData();
  },
};
</script>
