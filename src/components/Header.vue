<template>
  <div class="header">
    <input type="text" v-model="inputValue" @keyup.enter="toSearch" />
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
        alert("请输入内容");
      } else {
        this.$router.push(`/result?p=${this.inputValue}`);
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
}
</style>