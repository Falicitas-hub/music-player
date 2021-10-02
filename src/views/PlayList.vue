<template>
  <div class="playlist">
    <div class="top-card">
      <div class="icon-wrap">
        <!-- 封面 -->
        <img :src="topList.coverImgUrl" alt="" />
      </div>
      <div class="description">
        <div class="d-title">
          {{ topList.name }}
        </div>
        <div class="info">
          {{ topList.description }}
        </div>
      </div>
    </div>
    <div class="tab-bar">
      <span
        class="title"
        :class="{ active: tag == '全部' }"
        @click="tag = '全部'"
        >全部</span
      >
      <span
        class="title"
        :class="{ active: tag == '欧美' }"
        @click="tag = '欧美'"
        >欧美</span
      >
      <span
        class="title"
        :class="{ active: tag == '华语' }"
        @click="tag = '华语'"
        >华语</span
      >
      <span
        class="title"
        :class="{ active: tag == '流行' }"
        @click="tag = '流行'"
        >流行</span
      >
      <span
        class="title"
        :class="{ active: tag == '说唱' }"
        @click="tag = '说唱'"
        >说唱</span
      >
      <span
        class="title"
        :class="{ active: tag == '摇滚' }"
        @click="tag = '摇滚'"
        >摇滚</span
      >
      <span
        class="title"
        :class="{ active: tag == '民谣' }"
        @click="tag = '民谣'"
        >民谣</span
      >
      <span
        class="title"
        :class="{ active: tag == '电子' }"
        @click="tag = '电子'"
        >电子</span
      >
      <span
        class="title"
        :class="{ active: tag == '轻音乐' }"
        @click="tag = '轻音乐'"
        >轻音乐</span
      >
      <span
        class="title"
        :class="{ active: tag == '影视原声' }"
        @click="tag = '影视原声'"
        >影视原声</span
      >
      <span class="title" :class="{ active: tag == 'ACG' }" @click="tag = 'ACG'"
        >ACG</span
      >
      <span
        class="title"
        :class="{ active: tag == '怀旧' }"
        @click="tag = '怀旧'"
        >怀旧</span
      >
      <span
        class="title"
        :class="{ active: tag == '治愈' }"
        @click="tag = '治愈'"
        >治愈</span
      >
      <span
        class="title"
        :class="{ active: tag == '旅行' }"
        @click="tag = '旅行'"
        >旅行</span
      >
    </div>
    <div class="items">
      <div
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="toPlayList(item.id)"
      >
        <div class="img-wrap">
          <img :src="item.coverImgUrl" alt="" />
        </div>
        <div>{{ item.name }}</div>
      </div>
    </div>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :page-size="10"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
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
      tag: "全部",
    };
  },
  watch: {
    tag() {
      this.page = 1;
      this.getTopData();
      this.getListData();
    },
  },
  created() {
    this.getTopData();
    this.getListData();
  },
  methods: {
    getTopData() {
      axios({
        url: "https://autumnfish.cn/top/playlist/highquality",
        method: "get",
        params: {
          limit: 1,
          cat: this.tag,
        },
      }).then((res) => {
        if (res.status !== 200) {
          this.$message.error("获取信息失败");
        } else {
          this.topList = res.data.playlists[0];
        }
      });
    },
    getListData() {
      axios({
        url: "https://autumnfish.cn/top/playlist/",
        method: "get",
        params: {
          limit: 10,
          offset: (this.page - 1) * 10,
          cat: this.tag,
        },
      }).then((res) => {
        if (res.status !== 200) {
          this.$message.error("获取信息失败");
        } else {
          this.total = res.data.total;
          this.list = res.data.playlists;
        }
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getListData();
    },
    toPlayList(id) {
      this.$router.push(`/playlists?q=${id}`);
    },
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
  font-size: 16px;
  font-weight: 500;
  margin: 20px;
  text-align: center;
}
.title:hover {
  cursor: pointer;
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
.new img {
  width: 200px;
}
.tab-bar {
  margin-top: 10px;
}

.active {
  opacity: 0.6;
  color: red;
  background-color: rgba(219, 118, 118, 0.808);
  border-radius: 5px;
}
.d-title {
  font-size: 18px;
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>