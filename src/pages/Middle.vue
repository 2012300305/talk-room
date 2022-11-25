<template>
      <el-card class="box-card">
        <div id="div4Show">
          <el-form :inline="true" :model="formSearch">
            <el-form-item label="会议室">
              <el-select v-model="formSearch.number" placeholder="请选择会议室">
                <el-option label="1019" value="1019"></el-option>
                <el-option label="1021" value="1021"></el-option>
                <el-option label="1513" value="1513"></el-option>
                <el-option label="1523" value="1523"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="formSearch.start_time"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="formSearch.end_time"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
              <el-button type="primary" @click="exportPdf">打印</el-button>
            </el-form-item>
          </el-form>
          <el-table
            ref="filterTable"
            :data="rooms.slice((currentPage-1)*size,currentPage*size)"
            
            style="width: 100%"
            id="heroListTable"
          >
            <el-table-column prop="id" label="Id" width="150"></el-table-column>
            <el-table-column
              prop="number"
              label="会议室"
              width="150"
              :filters="[
                { text: '1019', value: '1019' },
                { text: '1021', value: '1021' },
                { text: '1513', value: '1513' },
                { text: '1523', value: '1523' },
              ]"
              :filter-method="filterRoom"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="预约人"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="content"
              label="会议内容"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="start_time"
              label="开始时间"
              width="200"
              sortable
            ></el-table-column>
            <el-table-column
              prop="end_time"
              label="结束时间"
              width="200"
              sortable
            ></el-table-column>
            <el-table-column
              prop="start_time"
              label="月份"
              width="100"
              :filters="month"
              :filter-method="filterMonth"
              filter-placement="bottom-end"
            >
              <template slot-scope="scope">
                <el-tag
                  :type="filterShowTag(scope.row.start_time.substring(5, 7))"
                  disable-transitions
                  >{{ scope.row.start_time.substring(0, 7) }}</el-tag
                >
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <!-- <el-button   @click="updatePage(scope.row)" type="text" >编辑</el-button>    -->
                <el-button @click="updatePage2(scope.row)" type="text"
                  >编辑</el-button
                >
                <el-button @click="delete2(scope.row)" type="text"
                  >删除</el-button
                >
                <el-button @click="ok()" type="text">跳转</el-button>
              </template>
            </el-table-column>
          </el-table>

  <el-pagination
    :current-page="currentPage"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="rooms.length">
  </el-pagination>

        </div>
        <!-- 会议室预约修改 -->
        <div id="div4Update">
          <template>
            <el-form ref="roomUpdate" :model="roomUpdate" label-width="80px">
              <el-form-item label="会议室">
                <el-select
                  v-model="roomUpdate.number"
                  placeholder="请选择会议室"
                  :key="roomUpdate.number"
                  :value="roomUpdate.number"
                >
                  <el-option label="1019" value="1019"></el-option>
                  <el-option label="1021" value="1021"></el-option>
                  <el-option label="1513" value="1513"></el-option>
                  <el-option label="1523" value="1523"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="预约人" style="width: 300px">
                <el-input v-model="roomUpdate.name"></el-input>
              </el-form-item>
              <el-form-item label="会议内容" style="width: 300px">
                <el-input
                  type="textarea"
                  v-model="roomUpdate.content"
                ></el-input>
              </el-form-item>
              <el-form-item label="开始时间">
                <el-date-picker
                  v-model="roomUpdate.start_time"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="结束时间">
                <el-date-picker
                  v-model="roomUpdate.end_time"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="update">修改</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </template>
        </div>

        <!-- 会议室预约弹框修改 -->
        <el-dialog title="修改预约信息" :visible.sync="editFormVisible">
          <template>
            <el-form ref="roomUpdate" :model="roomUpdate" label-width="80px">
              <el-form-item label="会议室">
                <el-select
                  v-model="roomUpdate.number"
                  placeholder="请选择会议室"
                  :key="roomUpdate.number"
                  :value="roomUpdate.number"
                >
                  <el-option label="1019" value="1019"></el-option>
                  <el-option label="1021" value="1021"></el-option>
                  <el-option label="1513" value="1513"></el-option>
                  <el-option label="1523" value="1523"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="预约人" style="width: 300px">
                <el-input v-model="roomUpdate.name"></el-input>
              </el-form-item>
              <el-form-item label="会议内容" style="width: 300px">
                <el-input
                  type="textarea"
                  v-model="roomUpdate.content"
                ></el-input>
              </el-form-item>
              <el-form-item label="开始时间">
                <el-date-picker
                  v-model="roomUpdate.start_time"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="结束时间">
                <el-date-picker
                  v-model="roomUpdate.end_time"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="update">修改</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </template>
        </el-dialog>
        <!-- 会议室预约 -->
        <div id="div4Add">
          <template>
            <el-form ref="roomAdd" :model="roomAdd" label-width="80px">
              <el-form-item label="会议室">
                <el-select v-model="roomAdd.number" placeholder="请选择会议室">
                  <el-option label="1019" value="1019"></el-option>
                  <el-option label="1021" value="1021"></el-option>
                  <el-option label="1513" value="1513"></el-option>
                  <el-option label="1523" value="1523"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="预约人" style="width: 300px">
                <el-input v-model="roomAdd.name"></el-input>
              </el-form-item>
              <el-form-item label="会议内容" style="width: 300px">
                <el-input type="textarea" v-model="roomAdd.content"></el-input>
              </el-form-item>
              <el-form-item label="开始时间">
                <el-date-picker
                  v-model="roomAdd.start_time"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="结束时间">
                <el-date-picker
                  v-model="roomAdd.end_time"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="add">增加</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </template>
        </div>
      </el-card>
</template>
<script type="text/javascript">
//修改区域隐藏起来先
$("#div4Update").hide();
//添加区域隐藏起来先
$("#div4Add").hide();

//ViewModel
export default {
  name: "index",
  data() {
    return {
      currentPage:1,
      size:5,
      rooms: "",
      roomAdd: {
        number: "",
        name: "",
        content: "",
        start_time: "",
        end_time: "",
      },
      roomUpdate: {
        number: "",
        name: "",
        content: "",
        start_time: "",
        end_time: "",
      },
      editFormVisible: false,
      //  currentView: 'ManageRoom',
      month: [
        { text: "2021-01", value: "2021-01" },
        { text: "2021-02", value: "2021-02" },
        { text: "2021-03", value: "2021-03" },
        { text: "2021-04", value: "2021-04" },
        { text: "2021-05", value: "2021-05" },
        { text: "2021-06", value: "2021-06" },
        { text: "2021-07", value: "2021-07" },
        { text: "2021-08", value: "2021-08" },
        { text: "2021-09", value: "2021-09" },
        { text: "2021-10", value: "2021-10" },
        { text: "2021-11", value: "2021-11" },
        { text: "2021-12", value: "2021-12" },
      ],
      formSearch: {
        number: "",
        start_time: "",
        end_time: "",
      },
    };
  },
  mounted() {
    this.showData();
  },

  methods: {
    ok() {
      this.$router.push({ path: "/users" });
    },

    add: function () {
      // $.ajax({
      //     url: "http://localhost:9000/insertRoom",
      //     headers: {
      //         "Accept": "application/json,text/plain,*/*",
      //     "Content-Type": "application/json"},
      //     data:JSON.stringify( this.roomAdd),
      //     method:"post",
      //     success: function (data) {
      //         if(0==data.code){
      //             window.location.href="index.html";
      //             }else{
      //                 alert(data.msg);
      //             }
      //     }
      // })
      var that = this;
      axios
        .post(
          that.GLOBAL.serverPath+"/room/insertRoom",
          JSON.stringify(this.roomAdd)
        )
        .then(function (response) {
          if (0 == response.data.code) {
            that.$router.push({ path: "/index" });
          } else {
            alert(response.data.msg);
          }
        })
        .catch(function (error) {
          alert(error);
        });
    },
    delete2: function (room) {
      $.ajax({
        url:  that.GLOBAL.serverPath+"/deleteRoom",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        data: JSON.stringify(room),
        method: "post",
        success: function (data) {
          if (0 == data.code) {
            window.location.href = "index.html";
          } else {
            alert(data.msg);
          }
        },
      });
    },
    update: function () {
      $.ajax({
        url:  that.GLOBAL.serverPath+"/updateRoom",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        data: JSON.stringify(this.roomUpdate),
        method: "post",
        success: function (data) {
          if (0 == data.code) {
            window.location.href = "index.html";
          } else {
            alert(data.msg);
          }
        },
      });
    },
    updatePage: function (room) {
      $("#div4Show").hide();
      $("#div4Add").hide();
      $("#div4Update").show();
      this.roomUpdate = room;
    },
    updatePage2: function (room) {
      this.editFormVisible = true;
      this.roomUpdate = room;
    },
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
    filterMonth(value, row, column) {
      return row.start_time.substring(0, 7) === value;
    },
    filterRoom(value, row, column) {
      return row.number === value;
    },
    filterShowTag(key) {
      let result = null;
      switch (key) {
        case "01":
          result = "primary";
          break;
        case "02":
          result = "success";
          break;
        case "03":
          result = "warning";
          break;
        case "04":
          result = "danger";
          break;
        case "05":
          result = "primary";
          break;
        case "06":
          result = "success";
          break;
        case "07":
          result = "warning";
          break;
        case "08":
          result = "danger";
          break;
        case "09":
          result = "primary";
          break;
        case "10":
          result = "success";
          break;
        case "11":
          result = "warning";
          break;
        case "12":
          result = "danger";
          break;
      }
      return result;
    },
    pdf() {
      window.location.href =  that.GLOBAL.serverPath+"/pdf/roomPdf";
    },

    onSubmit() {
      console.log("submit!");
      var that = this;
      $.ajax({
        url:  that.GLOBAL.serverPath+"/selectRoomListBY",
        method: "post",
        data: {
          number: this.formSearch.number,
          start_time: this.formSearch.start_time,
          end_time: this.formSearch.end_time,
        },
        success: function (data) {
          if (0 == data.code) {
            that.rooms = data.data;
          } else {
            alert(data.msg);
          }
        },
      });
    },
    exportPdf() {
      window.location.href =
         that.GLOBAL.serverPath+"/pdf/roomPdf?number=" +
        this.formSearch.number +
        "&start_time=" +
        this.formSearch.start_time +
        "&end_time=" +
        this.formSearch.end_time;
    },
    open(key) {
      this.$notify({
        title: "提示",
        message: "监听到 " + key + " 触发",
        type: "success",
        showClose: true,
        duration: 4000,
      });
    },
    siwtchUser() {
      this.$message({
        message: "切换用户",
        type: "warning",
      });
    },
    signout() {
      this.$confirm("是否退出登录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "确定退出触发!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消退出",
          });
        });
    },
  },
};
</script>



