<template>
  <div class="playlists">
    <div class="top-card">
      <div class="icon-wrap">
        <!-- 封面 -->
        <img :src="playlist.coverImgUrl" alt="" />
      </div>
      <div class="description">
        <div class="d-title">
          {{ playlist.name }}
        </div>
        <div class="info">简介:{{ playlist.description }}</div>
      </div>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="歌曲列表" name="songs">
        <div class="res-songs-list">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in songList"
              :key="index"
              @dblclick="playMusic(item.id)"
            >
              <td>{{ index + 1 }}</td>
              <td>
                {{ item.name }}
                <i class="el-icon-video-play" @click="playMusic(item.id)"></i>
              </td>
              <td>{{ item.ar[0].name }}</td>
              <td>{{ item.al.name }}</td>
            </tr>
          </tbody>
        </div>
      </el-tab-pane>
      <el-tab-pane label="评论" name="comment">
        <h2>热门评论</h2>
        <div class="items" v-for="(item, index) in hotComment" :key="index">
          <div class="icon-wrap">
            <img :src="item.user.avatarUrl" alt="" />
          </div>
          <div class="content">
            <div class="name">{{ item.user.nickname }}</div>
            <div class="comment">{{ item.content }}</div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      playlist: [],
      activeName: "songs",
      songList: [],
      hotComment: [],
    };
  },
  created() {
    this.getSongs();
    this.getComment();
  },
  methods: {
    getSongs() {
      axios({
        url: "https://autumnfish.cn/playlist/detail",
        method: "get",
        params: {
          id: this.$route.query.q,
        },
      }).then((res) => {
        if (res.status !== 200) {
          this.$message.error("获取信息失败");
        } else {
          this.playlist = res.data.playlist;
          this.songList = this.playlist.tracks;
        }
      });
    },
    getComment() {
      axios({
        url: "https://autumnfish.cn/comment/hot",
        method: "get",
        params: {
          id: this.$route.query.q,
          type: 2,
        },
      }).then((res) => {
        if (res.status !== 200) {
          this.$message.error("获取信息失败");
        } else {
          this.hotComment = res.data.hotComments;
        }
      });
    },
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
          this.$parent.musicUrl = res.data.data[0].url;
        }
      });
    },
  },
};
</script>

<style scoped >
.items .icon-wrap img {
  width: 70px;
  height: 70px;
  border-radius: 50px;
}
.items {
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 10px;
  border-bottom: 0.5px black solid;
}
.items .content {
  margin-left: 10px;
}
.items .content .name {
  font-weight: 900;
  margin-bottom: 10px;
}
</style>