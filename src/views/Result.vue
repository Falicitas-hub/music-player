<template>
  <div class="result">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">
        <h2>1</h2>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">
        <h2>2</h2>
      </el-tab-pane>
      <el-tab-pane label="角色管理" name="third">
        <h2>3</h2>
      </el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">
        <h2>4</h2>
      </el-tab-pane>
    </el-tabs>
    <el-pagination background layout="prev, pager, next" :total="1000">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {
    handleClick() {},
  },
  created() {},
};
</script>

<style>
</style>