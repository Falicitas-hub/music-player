<template>
  <div class="playlist">
    <div class="top-card">
      <div class="icon-wrap">
        <!-- 封面 -->
        <img :src="topList.coverImgUrl" alt="" />
      </div>
      <div class="description">
        <div class="title">
          {{ topList.name }}
        </div>
        <div class="info">
          {{ topList.description }}
        </div>
      </div>
    </div>
    <div class="news">
      <div
        class="new"
        v-for="(item, index) in list"
        :key="index"
        @click="playMusic(item.id)"
      >
        <div class="img-wrap">
          <img :src="item.coverImgUrl" alt="" />
        </div>
        <div>{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      total: 0,
      page: 1,
      topList: {},
      list: [],
    };
  },
  created() {
    axios({
      url: "https://autumnfish.cn/top/playlist/highquality",
      method: "get",
      params: {
        limit: 1,
        cat: "全部",
      },
    }).then((res) => {
      if (res.status !== 200) {
        this.$message.error("获取信息失败");
      } else {
        this.topList = res.data.playlists[0];
      }
    });
    axios({
      url: "https://autumnfish.cn/top/playlist/",
      method: "get",
      params: {
        limit: 10,
        offset: 0,
        cat: "全部",
      },
    }).then((res) => {
      if (res.status !== 200) {
        this.$message.error("获取信息失败");
      } else {
        this.list = res.data.playlists;
        console.log(this.list);
      }
    });
  },
};
</script>

<style>
img {
  width: 200px;
  height: 200px;
  margin-left: 20px;
  margin-top: 10px;
}
.top-card {
  display: flex;
  margin-top: 20px;
  border: 2px solid black;
  border-radius: 25px;
}
.description {
  margin-left: 10px;
}
.title {
  font-size: 23px;
  font-weight: 1000;
  margin-bottom: 20px;
}
.info {
  font-size: 14px;
  font-weight: 400;
}
.news {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
}
.new {
  height: 250px;
  width: 200px;
  margin: 10px;
  font-size: 14px;
  max-width: 200px;
}
.new img:hover {
  cursor: pointer;
}
.new img {
  width: 200px;
}
</style>