<template>
  <div class="index">
    <!-- 侧边栏 -->
    <div class="nav">
      <ul>
        <router-link to="/discovery"> <li>发现音乐</li> </router-link>
        <router-link to="/playlist"> <li>推荐歌单</li></router-link>
        <router-link to="/songs"> <li>最新音乐</li></router-link>
        <router-link to="/mvs"> <li>最新MV</li></router-link>
      </ul>
    </div>
    <div class="main">
      <router-view :key="$route.fullPath"></router-view>
    </div>
    <div class="player-container">
      <div class="player">
        <audio :src="musicUrl" controls autoplay></audio>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      musicUrl: "",
    };
  },
};
</script>

<style>
.index {
  display: flex;
  /* flex-wrap: wrap; */
}
.index .nav {
  width: 200px;
  background-color: #ededed;
  height: 860px;
}
.nav li {
  text-align: center;
  padding: 20px;
}
.nav li:hover {
  cursor: pointer;
}
.main {
  flex: 1;
  padding-left: 200px;
  padding-right: 200px;
  overflow-y: scroll;
  height: 800px;
}
.player {
  background: #f1f3f4;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.player audio {
  width: 80%;
  margin-left: 80px;
  border-radius: none;
  outline: none;
}
a {
  text-decoration: none;
  color: black;
}

.router-link-active {
  /* background-color: orange; */
  text-decoration: none;
  color: red;
  background-color: #ededed;
}
.index li:hover {
  background-color: #d0d0d0;
}
</style>