<!-- attendance.vue -->
<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <content-header v-bind:menuList="menuList"></content-header>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <div class="box">
            <div class="box-header with-border">
              <!-- <h3 class="box-title">我的考勤记录</h3> -->
              <form action class="form-inline">
                <div class="input-group" style="width:220px;">
                  <button
                    type="button"
                    class="btn btn-primary btn-create"
                    @click="createinfo()"
                  >通过csv创建</button>
                </div>
              </form>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <!-- <th style="width: 10px">ID</th> -->
                    <!-- <th>区域</th> -->

                    <th>机器名</th>
                    <th>镜像</th>
                    <th>CPU</th>
                    <th>内存</th>
                    <th>系统盘</th>
                    <th>数据盘</th>
                    <th>VLAN</th>
                    <th>IP地址</th>
                    <th>子网掩码</th>
                    <th>网关</th>
                    <th>宿主机</th>
                    <th>存储</th>
                    <th>过期时间</th>
                    <th>业务组</th>
                    <th>成本中心</th>
                    <th>联系人</th>
                    <th>联系人邮箱</th>

                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in list" :key="index">
                    <!-- <td v-for="(item1,index1) in item.clist" :key="index1">
                      <input
                        :type="item1.type"
                        :class="item1.name"
                        v-model="item1.value"
                        :disabled="item1.isf"
                      />
                    </td>-->
                    <td>
                      <input type="text" v-model="list[index].host_name" class="my_input75" />
                    </td>

                    <td>
                      <input type="text" v-model="list[index].image_id" class="my_input75" />
                    </td>
                    <td>
                      <input
                        type="number"
                        v-model="list[index].cpu"
                        @input="cpuchange(list[index].cpu,index)"
                        max="32"
                        class="my_input54"
                      />
                      <!-- <input @keyup="this.value=this.value.replace(/\D/g,'')" class="my_input54" onafterpaste="this.value=this.value.replace(/\D/g,'')">   -->
                    </td>
                    <td>
                      <input
                        type="number"
                        v-model="list[index].memory"
                        @input="memorychange(list[index].memory,index)"
                        class="my_input54"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        v-model="list[index].system_disk"
                        class="my_input54"
                        disabled
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        v-model="list[index].data_disk"
                        @input="data_diskchange(list[index].data_disk,index)"
                        class="my_input93"
                      />
                    </td>
                    <td>
                      <input type="text" v-model="list[index].vlan" class="my_input93" />
                    </td>
                    <td>
                      <input type="text" v-model="list[index].ip" class="my_input73" />
                    </td>
                    <td>
                      <input type="text" v-model="list[index].submask" class="my_input107" />
                    </td>
                    <td>
                      <input type="text" v-model="list[index].gateway" class="my_input93" />
                    </td>
                    <td>
                      <input type="text" v-model="list[index].host_id" class="my_input93" />
                    </td>
                    <td>
                      <input type="text" v-model="list[index].data_store" class="my_input93" />
                    </td>
                    <td class="mynomes">
                      <el-date-picker
                        v-model="list[index].expiration_time"
                        type="date"
                        placeholder="选择日期"
                        class="nomes"
                      ></el-date-picker>
                    </td>
                    <td>
                      <input type="text" v-model="list[index].business_group" class="my_input107" />
                    </td>
                    <td>
                      <input type="text" v-model="list[index].cost_centor" class="my_input68" />
                    </td>
                    <td>
                      <input type="text" v-model="list[index].owner_id" class="my_input75" />
                    </td>
                    <td>
                      <input type="text" v-model="list[index].owner_email" class="my_input107" />
                    </td>

                    <td>
                      <div class="my_input75">
                        <span @click="del(index)" class="b">
                          <img src="../../static/iconfontshanchu1.png" alt />
                        </span>

                        <span @click="cp(index)" class="b">
                          <img src="../../static/fuzhi.png" alt />
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
                <div class="addbtn" @click="addbtn()">
                  <img src="../../static/xz.png" alt />
                </div>
                <div class="ckbox">
                  <button type="button" class="btn btn-primary btn-create" @click="createlist()">创建</button>
                  <button type="button" class="btn btn-default btn-create">取消</button>
                </div>
              </table>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import contentHeader from "../components/content_header";
import defaultapi from "../api/apiDefault";
export default {
  data() {
    return {
      msg: "数据",
      list: [
        {
          host_name: "",
          image_id: "",
          cpu: "",
          memory: "",
          system_disk: 50,
          data_disk: "",
          vlan: "",
          ip: "",
          submask: "",
          gateway: "",
          host_id: "",
          data_store: "",
          expiration_time: "",
          business_group: "",
          cost_centor: "",
          owner_id: "",
          owner_email: "",
          region_id: "1"
        }
      ],
      menuList: [
        {
          text: "首页",
          isActive: false
        },
        {
          text: "创建主机",
          isActive: true
        }
      ]
    };
  },
  components: {
    contentHeader
  },

  methods: {
    data_diskchange(val, index) {
      if (val > 2000) {
        this.list[index].data_disk = 2000;
      } else if (val < 50) {
        this.list[index].data_disk = 50;
      }
    },
    cpuchange(val, index) {
      if (val > 32) {
        this.list[index].cpu = 32;
      } else if (val < 1) {
        this.list[index].cpu = 1;
      }
    },
    memorychange(val, index) {
      if (val > 256) {
        this.list[index].memory = 256;
      } else if (val < 1) {
        this.list[index].memory = 1;
      }
    },
    toNumberer(arr) {
      console.log(arr);
      // arr.tasks;
      for (var i in arr) {
        for (var k in arr[i]) {
          console.log(k);
          if (
            k == "cpu" ||
            k == "data_disk" ||
            k == "memory" ||
            k == "system_disk"
          ) {
            arr[i][k] = arr[i][k] * 1;
          }
        }
      }
    },
    createlist() {
      this.toNumberer(this.list);
      defaultapi.tasks({ tasks: this.list }).then(res => {
        console.log(res);
      });
    },
    createinfo() {
      this.$router.push({ path: "/csvcreate" });
    },
    del(idx) {
      console.log(idx);
      this.list.splice(idx, 1);
    },
    cp(idx) {
      if (this.list.length < 10) {
        let clist = {
          host_name: this.list[idx].host_name,
          image_id: this.list[idx].image_id,
          cpu: this.list[idx].cpu,
          memory: this.list[idx].memory,
          system_disk: this.list[idx].system_disk,
          data_disk: this.list[idx].data_disk,
          vlan: this.list[idx].vlan,
          ip: this.list[idx].ip,
          submask: this.list[idx].submask,
          gateway: this.list[idx].gateway,
          host_id: this.list[idx].host_id,
          data_store: this.list[idx].data_store,
          expiration_time: this.list[idx].expiration_time,
          business_group: this.list[idx].business_group,
          cost_centor: this.list[idx].cost_centor,
          owner_id: this.list[idx].owner_id,
          owner_email: this.list[idx].owner_email
        };
        this.list.push(clist);
      }
    },
    addbtn() {
      if (this.list.length < 10) {
        let clist = {
          host_name: "",
          image_id: "",
          cpu: "",
          memory: "",
          system_disk: 50,
          data_disk: "",
          vlan: "",
          ip: "",
          submask: "",
          gateway: "",
          host_id: "",
          data_store: "",
          expiration_time: "",
          business_group: "",
          cost_centor: "",
          owner_id: "",
          owner_email: "",
          region_id: "1"
        };
        this.list.push(clist);
      }
    }
  },
  mounted() {
    if ($ && $.AdminLTE && $.AdminLTE.layout) {
      $.AdminLTE.layout.fix();
    }
    // alert("抓取到vuex数据："+this.$store.state.test)
    $('input[name="daterange"]').daterangepicker(
      {
        ranges: {
          今天: [moment(), moment()],
          最近7天: [moment().subtract(6, "days"), moment()],
          最近30天: [moment().subtract(29, "days"), moment()],
          上个月: [
            moment()
              .subtract(1, "month")
              .startOf("month"),
            moment()
              .subtract(1, "month")
              .endOf("month")
          ]
        },
        opens: "right",
        autoclose: true,
        // buttonClasses : [ 'btn btn-default' ],
        applyClass: "btn-small btn-primary",
        cancelClass: "btn-small",
        locale: {
          applyLabel: "确定",
          cancelLabel: "取消",
          daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
          monthNames: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ],
          firstDay: 1,
          customRangeLabel: "选择起止日期"
        }
      },
      function(start, end, label) {
        console.log(
          "改变" +
            start.format("YYYY-MM-DD") +
            " to " +
            end.format("YYYY-MM-DD") +
            " (predefined range: " +
            label +
            ")"
        );
      }
    );
  }
};
</script>
<style scoped>
.table-bordered {
  position: relative;
}
.box-body {
  min-height: 600px;
  overflow: auto;
  position: relative;
}
::-webkit-scrollbar-track-piece {
  background-color: #f8f8f8;
}
::-webkit-scrollbar {
  width: 9px;
  height: 9px;
}
::-webkit-scrollbar-thumb {
  background-color: #dddddd;
  background-clip: padding-box;
  min-height: 28px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #bbb;
}

.addbtn {
  position: absolute;
  right: 57px;
  width: 25px;
  margin-bottom: 15px;
  color: blue;
  padding-right: 25px;
  margin-top: 10px;
  cursor: pointer;
}
.form-inline {
  display: flex;
  flex-direction: row;
}
.btn-create {
  width: 100px;
}
.btn-group {
  margin-left: -50px;
}
.my_input75 {
  width: 75px;
  height: 25px;
}
.my_input54 {
  width: 54px;
  height: 25px;
}
.my_input62 {
  width: 62px;
  height: 25px;
}
.my_input93 {
  width: 93px;
  height: 25px;
}
.my_input73 {
  width: 73px;
  height: 25px;
}
.my_input107 {
  width: 107px;
  height: 25px;
}

.nomes {
  width: 107px !important;
  height: 25px !important;
}
.nomes >>> input {
  height: 25px;
}
.my_input68 {
  width: 68px;
  height: 25px;
}
.b {
  color: #66ccff;
  cursor: pointer;
}
.b img {
  width: 25px;
  height: 25px;
}
.addbtn img {
  width: 25px;
  height: 25px;
}
.ckbox {
  width: 230px;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  right: 120px;
  bottom: -38px;
}
.ckbox button {
  height: 30px;
}
</style>
