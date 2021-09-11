<template>
  <div class="index">
    <!-- 侧边栏 -->
    <div class="nav">
      <ul>
        <li><router-link to="/discovery"> 发现音乐 </router-link></li>
        <li><router-link to="/playlist"> 推荐歌单 </router-link></li>
        <li><router-link to="/songs"> 最新音乐 </router-link></li>
        <li><router-link to="/mvs"> 最新MV </router-link></li>
      </ul>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.index {
  display: flex;
}
.index .nav {
  width: 200px;
  background-color: #ededed;
  height: 830px;
}
.nav li {
  text-align: center;
  margin: 10px;
}
.index .main {
  flex: 1;
  background-color: orange;
}
a.router-link-active {
  background-color: orange;
}
</style>