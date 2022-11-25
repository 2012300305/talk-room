<template>
  <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#F5F5F5"
      text-color="#333333"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1" v-on:click="showData">
        <i class="el-icon-setting"></i>
        <span slot="title">会议室信息</span>
      </el-menu-item>
      <el-menu-item index="2" v-on:click="addPage">
        <i class="el-icon-setting"></i>
        <span slot="title">预约会议室</span>
      </el-menu-item>
    </el-menu>

</template>

<script>
export default {
  name: "Side",
  data() {
    return {
    };
  },
  methods: {
    showData: function () {
      var that = this;
      $.ajax({
        url:  that.GLOBAL.serverPath+"/room/selectRoom",
        method: "post",
        success: function (data) {
          if (0 == data.code) {
            that.rooms = data.data;
          } else {
            alert(data.msg);
          }
        },
      });
      $("#div4Show").show();
      $("#div4Add").hide();
      $("#div4Update").hide();
    },
    addPage: function (room) {
      $("#div4Show").hide();
      $("#div4Update").hide();
      $("#div4Add").show();
      this.roomUpdate = room;
    },
  },
};
</script>

<style >
.el-aside {
  padding-top: 20px;
  background-color: #F5F5F5 !important;
}

</style>