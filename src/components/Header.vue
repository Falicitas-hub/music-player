<template>
  <div class="header">
    <el-input
      style="width: 350px"
      placeholder="搜索"
      v-model="inputValue"
      @keyup.enter.native="toSearch"
    >
    </el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    toSearch() {
      if (this.inputValue == "") {
        this.$message.warning("请输入内容");
      } else {
        this.$router.push(`/result?p=${this.inputValue}`).catch((err) => {});
        this.inputValue = "";
      }
    },
  },
};
</script>

<style>
.header {
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  padding-bottom: 30px;
}
.el-input__inner {
  position: relative;
  left: 1300px;
  top: 10px;
}
</style>