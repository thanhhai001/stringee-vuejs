<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link
          to="/home"
          :name="$t('Home')"
          icon="tim-icons icon-chart-pie-36"
        />
        <sidebar-link
          to="/create-course"
          :name="$t('Create Course')"
          icon="tim-icons icon-simple-add"
        />
        <sidebar-link
          to="/course"
          :name="$t('Course')"
          icon="tim-icons icon-book-bookmark"
        />
        <sidebar-link
          to="/profile"
          :name="$t('User Profile')"
          icon="tim-icons icon-single-02"
        />
        <sidebar-link
          to="/calendar"
          :name="$t('calendar')"
          icon="tim-icons icon-calendar-60"
        />
        <sidebar-link
          to="/statistical"
          :name="$t('statistical')"
          icon="tim-icons icon-chart-bar-32"
        />
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>
        <div class="content">
        <fade-transition :duration="100" mode="out-in">
          <div class="card">
          <div class="card-header">
            <div class="row">
                <div class="sidebar-wrapper">
                  <ul class="nav">
                    <p class="m-r-5 m-t-8">Form :</p>
                    <datepicker v-model="fromDate" class="m-l-5"></datepicker>
                    <p class="m-l-10 m-r-5 m-t-8">To :</p>
                    <datepicker v-model="toDate" class="m-l-5"></datepicker>
                    <button class ="btn m-l-20 submit" @click="statistical()">Search</button>
                    <button class ="btn clear m-l-20 submit" @click="clearSearch()">Clear</button>
                    <export-excel class="btn export m-l-20" :data="json_data" :fields="json_fields" type="xls" name="filename.xls">DownloadExcel</export-excel>
                  </ul>
                </div>
            </div>
          </div>

          <div class="card-body">
            <!-- <base-table :title="titleTable" :columns="tableColumn"> -->
            <table class="statistical-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>CourseID</th>
                  <th>Course Name</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody v-for="(userCourse, key) in statisticalData" :key="userCourse.courseName">
                <tr>
                  <td>{{key+1}}</td>
                  <td>{{userCourse.courses}}</td>
                  <td>{{userCourse.courseName}}</td>
                  <td>{{userCourse.count}}</td>
                </tr>
              </tbody>
            </table>
            <!-- </base-table> -->
          </div>

          <div class="card-footer">
          <ul>
            <li style="width: 8%">
              {{
                page == 1 ? page * limit - (limit - 1) : page * limit + 1 - limit
              }}
              - {{ page != totalPage ? page * limit : totalRecord }} of
              {{ totalRecord }}
            </li>
            <li class="btn-page" style="padding-left: 15px">
              <a @click="prePage()"><i class="tim-icons icon-minimal-left"></i></a>
            </li>
            <li class="btn-page" style="padding-left: 15px">
              <a @click="nextPage()"><i class="tim-icons icon-minimal-right"></i></a>
            </li>
          </ul>
        </div>
      </div>
        </fade-transition>
      </div>
      <content-footer></content-footer>
    </div>
  </div>
</template>
<script>
import TopNavbar from "../layout/dashboard/TopNavbar.vue";
import ContentFooter from "../layout/dashboard/ContentFooter.vue";
import MobileMenu from "../layout/dashboard/MobileMenu";
import UserCourcse from "../util/process/UserCourse";
import Datepicker from 'vuejs-datepicker';
import {vi} from 'vuejs-datepicker';
import { BaseTable } from "@/components";
import {FadeTransition} from 'vue2-transitions';
import secure from "secure-ls";
export default {
  components:{
    FadeTransition,
    TopNavbar,
    ContentFooter,
    MobileMenu,
    Datepicker,
    BaseTable
  },
  data: () => {
    return {
      vi:'vi',
      fromDate:'',
      toDate:'',
      statisticalData : [],
      totalRecord: '',
      totalPage: '',
      limit: '',
      page: 1,
      offset: 0,
      titleTable : "Statistical Table",
      tableColumn:["STT", "Course Name", 'Count'],
      json_fields: {
        'CourseId': 'courses',
        'CourseName': 'courseName',
        'Total': 'count',
        },
      json_data:[],
      json_meta: [
        [
          {
            'key': 'charset',
            'value': 'utf-8'
          }
        ]
      ],
    };
  },
  mounted() {
    let ls = new secure();
    if (!localStorage.getItem("user")) {
      this.$router.push("/");
    }
    this.statistical();
  },
  methods: {
    async statistical() {
      this.json_data = [];
      let results = await UserCourcse.statisticalCourse({from: this.fromDate, to: this.toDate, page:this.page});
      if (results.data.status) {
        this.statisticalData = results.data.results;
        this.totalRecord = results.data.count;
        this.totalPage = results.data.countPage;
        this.offset = results.data.offset;
        this.limit = results.data.limit;
      }
      this.statisticalData.forEach(ele => {
        this.json_data.push(ele);  
      });
    },
    async clearSearch() {
      this.fromDate = '';
      this.toDate = '';
      this.statistical();
    },
    nextPage() {
      if (this.page < this.totalPage) {
        this.page = this.page + 1;
        this.statistical();
      }
    },
    prePage() {
      if (this.page > 1) {
        this.page = this.page - 1;
        this.statistical();
      }
    },
  },
};
</script>
<style>
.m-r-5{
  margin-right: 5px;
}
.m-l-5{
  margin-left: 5px;
}
.m-l-10{
  margin-left: 10px;
}
.m-l-20{
  margin-left: 20px;
}
.m-t-8{
  margin-top: 8px;
}
.vdp-datepicker{
  color: black !important;
}
.row{
  padding-left: 15px;
}
.submit {
  border-radius: 2px;
  border: 2px solid white;
}
.card-header{
  height: 150px;
}
.card-header .row{
  padding: 0 0 15px 15px;
}
table {
  width: 100%;
  font-size: 16px;
  color: white;
}
table tr{
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  height: 50px;
  }
table.statistical-table th{
font-size: 20px;
}
.card-header .btn {
width: 10%;
 padding: 2px 4px 2px 4px ;
 margin-top: 0;
 border-radius: 0.4285rem;
}
.export {
  border: solid 1px white;
  background: turquoise;
}
.sidebar-wrapper{
  padding: 20px 0 0 15px;
  width: 100%;
}
.card {
  height: 750px;
}
.btn.clear{
  background: darkgray;
}

</style>
