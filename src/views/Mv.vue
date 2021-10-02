<template>
  <div class="mv">
    <div class="mv-wrap">
      <h2 class="title-wrap">mv详情</h2>
      <div class="video-wrap">
        <video :src="url" controls autoplay></video>
      </div>
      <br />
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
    </div>
    <div class="simi-mvs">
      <h2 class="title-wrap">相关推荐</h2>
      <div class="simi-mv" v-for="(item, index) in simiMvs" :key="index">
        <div class="img-wrap" @click="toMV(item.id)">
          <img :src="item.cover" alt="" />
        </div>
        <div class="info-wrap">
          <div class="name">{{ item.name }}</div>
          <div class="singer">{{ item.artistName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      total: 20,
      page: 1,
      limit: 10,
      url: "",
      simiMvs: [],
      hotComment: [],
    };
  },
  created() {
    this.getVideo();
    this.getLikelyVideo();
    this.getComments();
  },
  methods: {
    getVideo() {
      axios({
        url: "https://autumnfish.cn/mv/url",
        method: "get",
        params: {
          id: this.$route.query.q,
        },
      }).then((res) => {
        if (res.status !== 200) {
          this.$message.error("获取信息失败");
        } else {
          this.url = res.data.data.url;
        }
      });
    },
    getLikelyVideo() {
      axios({
        url: "https://autumnfish.cn/simi/mv",
        method: "get",
        params: {
          mvid: this.$route.query.q,
        },
      }).then((res) => {
        if (res.status !== 200) {
          this.$message.error("获取信息失败");
        } else {
          this.simiMvs = res.data.mvs;
          console.log(this.simiMvs);
        }
      });
    },
    getComments() {
      axios({
        url: "https://autumnfish.cn/comment/mv",
        method: "get",
        params: {
          id: this.$route.query.q,
          limit: 10,
          offset: 0,
        },
      }).then((res) => {
        if (res.status !== 200) {
          this.$message.error("获取信息失败");
        } else {
          this.hotComment = res.data.comments;
        }
      });
    },
    toMV(id) {
      this.$router.push(`/mv?q=${id}`);
    },
  },
};
</script>

<style scoped>
.mv {
  display: flex;
}
.title-wrap {
  margin-bottom: 20px;
  text-indent: 20px;
}
.video-wrap video {
  width: 700px;
  height: 500px;
  object-fit: fill;
}
.img-wrap:hover {
  cursor: pointer;
}
.img-wrap img {
  width: 200px;
  height: 100px;
  border-radius: 10px;
}
.simi-mv {
  margin-left: 20px;
  display: flex;
}
.info-wrap {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
}
.singer {
  font-weight: 200;
}
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