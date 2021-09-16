<template>
  <div class="result">
    <div class="head">{{ $route.query.p }}</div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="歌曲" name="first">
        <h2>1</h2>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="second">
        <h2>2</h2>
      </el-tab-pane>
      <el-tab-pane label="MV" name="third">
        <h2>3</h2>
      </el-tab-pane>
    </el-tabs>
    <el-pagination background layout="prev, pager, next" :total="1000">
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {};
  },
  methods: {
    handleClick() {},
    getLists() {
      axios({
        url: "https://autumnfish.cn/search",
        method: "get",
        params: {
          keywords: this.$route.query.p,
          limit: 10,
          type: 1,
        },
      }).then((res) => {
        if (res.status !== 200) {
          this.$message.error("获取信息失败");
        } else {
          console.log(res);
        }
      });
    },
  },
  created() {
    this.getLists();
  },
};
</script>

<style>
.head {
  font-size: 30px;
  font-weight: 800;
  margin: 10px;
}
</style>