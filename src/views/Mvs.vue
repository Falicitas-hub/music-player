<template>
  <div class="mvs">
    <div class="filter-wrap">
      <ul class="section-wrap">
        <li class="tab">
          <span
            class="title"
            :class="{ active: area == '地区' }"
            @click="area = '地区'"
          >
            地区:</span
          >
        </li>
        <li class="tab">
          <span
            class="title"
            :class="{ active: area == '全部' }"
            @click="area = '全部'"
          >
            全部</span
          >
        </li>
        <li class="tab">
          <span
            class="title"
            :class="{ active: area == '内地' }"
            @click="area = '内地'"
          >
            内地</span
          >
        </li>
        <li class="tab">
          <span
            class="title"
            :class="{ active: area == '港台' }"
            @click="area = '港台'"
          >
            港台</span
          >
        </li>
        <li class="tab">
          <span
            class="title"
            :class="{ active: area == '欧美' }"
            @click="area = '欧美'"
          >
            欧美</span
          >
        </li>
        <li class="tab">
          <span
            class="title"
            :class="{ active: area == '日本' }"
            @click="area = '日本'"
          >
            日本</span
          >
        </li>
        <li class="tab">
          <span
            class="title"
            :class="{ active: area == '韩国' }"
            @click="area = '韩国'"
          >
            韩国</span
          >
        </li>
      </ul>
      <ul class="section-wrap">
        <li class="tab">
          <span
            class="title"
            :class="{ active: type == '类型' }"
            @click="type = '类型'"
          >
            类型:</span
          >
        </li>
        <li class="tab">
          <span
            class="title"
            :class="{ active: type == '全部' }"
            @click="type = '全部'"
          >
            全部</span
          >
        </li>
        <li class="tab">
          <span
            class="title"
            :class="{ active: type == '官方版' }"
            @click="type = '官方版'"
          >
            官方版</span
          >
        </li>
        <li class="tab">
          <span
            class="title"
            :class="{ active: type == '原声' }"
            @click="type = '原声'"
          >
            原声</span
          >
        </li>
        <li class="tab">
          <span
            class="title"
            :class="{ active: type == '现场版' }"
            @click="type = '现场版'"
          >
            现场版</span
          >
        </li>
        <li class="tab">
          <span
            class="title"
            :class="{ active: type == '网易出品' }"
            @click="type = '网易出品'"
          >
            网易出品</span
          >
        </li>
      </ul>
      <ul class="section-wrap">
        <li class="tab">
          <span
            class="title"
            :class="{ active: order == '排序' }"
            @click="order = '排序'"
          >
            排序</span
          >
        </li>
        <li class="tab">
          <span
            class="title"
            :class="{ active: order == '上升最快' }"
            @click="order = '上升最快'"
          >
            上升最快</span
          >
        </li>
        <li class="tab">
          <span
            class="title"
            :class="{ active: order == '最热' }"
            @click="order = '最热'"
          >
            最热</span
          >
        </li>
        <li class="tab">
          <span
            class="title"
            :class="{ active: order == '最新' }"
            @click="order = '最新'"
          >
            最新</span
          >
        </li>
      </ul>
    </div>
    <div class="items">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="img-wrap">
          <img :src="item.cover" alt="" />
        </div>
        <p class="name">{{ item.name }}</p>
        <p class="artistName">{{ item.artistName }}</p>
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
      total: 20,
      page: 1,
      limit: 10,
      area: "全部",
      type: "全部",
      order: "上升最快",
      list: [],
    };
  },
  watch: {
    area() {
      this.page = 1;
      this.getLists();
    },
    type() {
      this.page = 1;
      this.getLists();
    },
    order() {
      this.page = 1;
      this.getLists();
    },
  },
  created() {
    this.getLists();
  },
  methods: {
    getLists() {
      axios({
        url: "https://autumnfish.cn/mv/all",
        method: "get",
        params: {
          area: this.area,
          type: this.type,
          order: this.order,
          limit: this.limit,
          offset: (this.page - 1) * this.limit,
        },
      }).then((res) => {
        if (res.status !== 200) {
          this.$message.error("获取信息失败");
        } else {
          this.list = res.data.data;
          if (res.data.count) {
            this.total = res.data.count;
          }
        }
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getLists();
    },
  },
};
</script>

<style>
.section-wrap li {
  display: inline;
  margin: 10px;
}
.section-wrap li span {
  font-size: 16px;
  font-weight: 300;
}
.section-wrap li span:hover {
  cursor: pointer;
}
.item img:hover {
  cursor: pointer;
}
.item .name {
  font-size: 14px;
  font-weight: 800;
  text-indent: 10px;
}
.item .artistName {
  font-size: 10px;
  text-indent: 25px;
  font-weight: 200;
}
</style>