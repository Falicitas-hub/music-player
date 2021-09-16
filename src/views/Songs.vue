<template>
  <div class="songs">
    <div class="tab-bar">
      <div class="span-container">
        <span class="title" :class="{ active: tag == '0' }" @click="tag = '0'"
          >全部</span
        >
        <span class="title" :class="{ active: tag == '96' }" @click="tag = '96'"
          >欧美</span
        >
        <span class="title" :class="{ active: tag == '7' }" @click="tag = '7'"
          >华语</span
        >
        <span class="title" :class="{ active: tag == '8' }" @click="tag = '8'"
          >日本</span
        >
        <span class="title" :class="{ active: tag == '16' }" @click="tag = '16'"
          >韩国</span
        >
      </div>
    </div>
    <div class="songs-list">
      <thead>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in lists" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <img :src="item.album.picUrl" alt="" @click="playMusic(item.id)" />
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.artists[0].name }}</td>
          <td>{{ item.album.name }}</td>
          <td>{{ item.duration }}</td>
        </tr>
      </tbody>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      lists: [],
      tag: "0",
      url: "",
    };
  },
  watch: {
    tag() {
      this.getLists();
    },
  },
  created() {
    this.getLists();
  },
  methods: {
    getLists() {
      axios({
        url: "https://autumnfish.cn/top/song",
        method: "get",
        params: {
          type: this.tag,
        },
      }).then((res) => {
        if (res.status !== 200) {
          this.$message.error("获取信息失败");
        } else {
          this.lists = res.data.data;
          for (let i = 0; i < this.lists.length; i++) {
            let duration = this.lists[i].duration;
            let min = parseInt(duration / 1000 / 60);
            let sec = parseInt((duration / 1000) % 60);
            if (min < 10) {
              min = "0" + min;
            }
            if (sec < 10) {
              sec = "0" + sec;
            }
            this.lists[i].duration = min + ":" + sec;
          }
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

<style>
.tab-bar {
  margin-top: 10px;
}

.songs-list thead th {
  font-size: 14px;
  font-weight: 200;
}
.songs-list tbody tr td {
  text-align: center;
}
.songs-list tbody tr td img {
  width: 60px;
  height: 60px;
}
.songs-list tbody tr td img:hover {
  cursor: pointer;
}
</style>