<template>
  <div class="head">
    <div class="head-left">
      <div>
        <span class="FrameName">员工在线定会议室</span>
      </div>
    </div>
    <div class="head-right">
      <el-menu
        default-active="1"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="导出pdf" @click="pdf()">导出pdf</el-menu-item>
        <el-menu-item index="处理中心" @click="open('处理中心')"
          >处理中心</el-menu-item
        >
        <el-submenu index="我的工作台">
          <template slot="title">我的工作台</template>
          <el-menu-item index="选项1">选项1</el-menu-item>
          <el-menu-item index="选项2">选项2</el-menu-item>
          <el-menu-item index="选项3">选项3</el-menu-item>
          <el-submenu index="选项4">
            <template slot="title">选项4</template>
            <el-menu-item index="选项4-选项1">选项1</el-menu-item>
            <el-menu-item index="选项4-选项2">选项2</el-menu-item>
            <el-menu-item index="选项4-选项3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="消息中心" @click="open('消息中心')"
          >消息中心</el-menu-item
        >
        <el-menu-item index="订单管理" @click="open('订单管理')"
          >订单管理</el-menu-item
        >
        <el-submenu index="用户">
          <template slot="title">
            <img
              class="head-right-log-img"
              src="../assets/default_handsome.jpg"
            />
          </template>

          <el-menu-item index="切换账户" @click="siwtchUser()"
            >切换账户</el-menu-item
          >
          <el-menu-item index="退出" @click="signout()">退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      activeIndex2: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style >
.el-header {
  padding-left: 0px;
}

.head {
  width: 100%;
  height: 61px;
  /* position: fixed; */
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 3px 4px 0px;
  /* flex布局 */
  display: flex;
  /* 左右两边布局 */
  justify-content: space-between;
  align-items: center;
  z-index: 999;
  background-color: #545c64;
  padding: 0px 15px;
}
.head-left {
  display: flex;
  align-items: center;
  height: 61px;
  line-height: 61px;
}
.FrameName {
  font-size: 20px;
  color: #fff;
}
.head-right {
  display: flex;
  align-items: center;
  height: 61px;
  box-sizing: border-box;
}
.head-right-log-img {
  width: 28px;
  height: 28px;
  border-radius: 50%;
}
</style>


