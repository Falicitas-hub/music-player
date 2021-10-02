<template>
  <div class="discovery">
    <el-carousel :interval="4000" type="card">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <div class="img-container">
          <img :src="item.imageUrl" alt="" />
        </div>
      </el-carousel-item>
    </el-carousel>
    <h3>推荐歌单</h3>
    <div class="items">
      <div
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="toPlayList(item.id)"
      >
        <div class="img-wrap">
          <img :src="item.picUrl" alt="" />
        </div>
        <p class="name">{{ item.name }}</p>
      </div>
    </div>
    <h3>最新音乐</h3>
    <div class="news">
      <div class="new" v-for="(item, index) in songs" :key="index">
        <div class="img-wrap" @click="playMusic(item.id)">
          <img :src="item.picUrl" alt="" />
        </div>
        <div class="item-name">{{ item.name }}</div>
        <div>{{ item.song.artists[0].name }}</div>
      </div>
    </div>
    <h3>推荐MV</h3>
    <div class="mvs">
      <div class="mv" v-for="(item, index) in mvs" :key="index">
        <div class="img-wrap" @click="toMV(item.id)">
          <img :src="item.picUrl" alt="" />
        </div>
        <p class="name">{{ item.name }}</p>
        <p clss="singer">{{ item.artistName }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      banners: [],
      list: [],
      songs: [],
      mvs: [],
    };
  },
  created() {
    axios({
      url: "https://autumnfish.cn/banner",
      method: "get",
    }).then((res) => {
      if (res.status !== 200) {
        this.$message.error("获取信息失败");
      } else {
        this.banners = res.data.banners;
      }
    });
    axios({
      url: "https://autumnfish.cn/personalized",
      method: "get",
      params: {
        limit: 10,
      },
    }).then((res) => {
      if (res.status !== 200) {
        this.$message.error("获取信息失败");
      } else {
        this.list = res.data.result;
      }
    });
    axios({
      url: "https://autumnfish.cn/personalized/newsong",
      method: "get",
    }).then((res) => {
      if (res.status !== 200) {
        this.$message.error("获取信息失败");
      } else {
        this.songs = res.data.result;
      }
    });
    axios({
      url: "https://autumnfish.cn/personalized/mv",
      method: "get",
    }).then((res) => {
      if (res.status !== 200) {
        this.$message.error("获取信息失败");
      } else {
        this.mvs = res.data.result;
      }
    });
  },
  methods: {
    playMusic(id) {
      axios({
        url: "https://autumnfish.cn/song/url",
        method: "get",
        params: {
          id,
        },
      }).then((res) => {
        if (res.status !== 200) {
          this.$message.error("获取信息失败");
        } else {
          let url = res.data.data[0].url;
          this.$parent.musicUrl = url;
        }
      });
    },
    toPlayList(id) {
      this.$router.push(`/playlists?q=${id}`);
    },
    toMV(id) {
      this.$router.push(`/mv?q=${id}`);
    },
  },
};
</script>

<style>
.img-container img {
  width: 643px;
  height: 300px;
}
.el-carousel__item {
  border-radius: 15px;
}
.items {
  display: flex;
  flex-wrap: wrap;
}

.item {
  height: 250px;
  width: 200px;
  margin: 10px;
  font-size: 14px;
  max-width: 200px;
}
.item .item-name {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: keep-all;
}
.item img {
  width: 170px;
}
.news {
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
.new .item-name {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: keep-all;
}
.new img:hover {
  cursor: pointer;
}
.new img {
  width: 200px;
}
.mvs {
  display: flex;
  flex-wrap: wrap;
}

.mv {
  height: 250px;
  width: 240px;
  margin: 40px;
  font-size: 14px;
  max-width: 200px;
}

.mv img {
  width: 240px;
}
</style>