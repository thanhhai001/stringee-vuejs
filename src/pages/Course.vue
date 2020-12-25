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
                    <p class="m-t-8">Search:</p>
                    <base-input
                      v-model="keyword"
                      @keyup="handleSearch"
                      type="text"
                      style="margin-left: 15px; width: 400px"
                      name="keyword"
                      id="keyword">
                    </base-input>
                  </ul>
                </div>
              </div>
            </div>

            <div class="card-body all-icons item-course">
              <div class="row">
                <div
                  v-for="course in courses"
                  :key="course.id"
                  class="font-icon-list col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6"
                >
                  <div class="font-icon-detail" @click="courseDetail(course.id)">
                    <img src="../assets/images/img.jpg" alt="" />
                    <p class="course-name">{{ course.courseName }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-footer">
              <ul>
                <li>
                  {{
                    page == 1
                      ? page * limit - (limit - 1)
                      : page * limit + 1 - limit
                  }}
                  - {{ page != totalPage ? page * limit : countCourse }} of
                  {{ countCourse }}
                </li>
                <li @click="prePage()" style="padding-left: 15px">
                  <a><i class="tim-icons icon-minimal-left"></i></a>
                </li>
                <li @click="nextPage()" style="padding-left: 15px">
                  <a><i class="tim-icons icon-minimal-right"></i></a>
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
import Course from "../util/process/Course";
import TopNavbar from "../layout/dashboard/TopNavbar.vue";
import ContentFooter from "../layout/dashboard/ContentFooter.vue";
import MobileMenu from "../layout/dashboard/MobileMenu";
import { FadeTransition } from "vue2-transitions";
import secure from "secure-ls";
import BaseInput from '../components/Inputs/BaseInput.vue';
export default {
  components: {
    FadeTransition,
    TopNavbar,
    ContentFooter,
    MobileMenu,
    BaseInput,
  },
  data: () => {
    return {
      keyword: "",
      courses: [],
      page: 1,
      countCourse: 0,
      totalPage: 0,
      limit: 6,
      offset: 0,
    };
  },
  mounted() {
    let ls = new secure();
    if (!localStorage.getItem("user")) {
      this.$router.push("/");
    }
    this.load(this.page);
  },
  methods: {
    async load(page) {
      let listCourse = await Course.listCourse({
        page: this.page,
        keyword: this.keyword,
      });
      if (listCourse.data.status) {
        this.courses = listCourse.data.list;
        this.countCourse = listCourse.data.recordNumber;
        this.totalPage = listCourse.data.totalPage;
        this.limit = listCourse.data.limit;
      }
    },
    handleSearch() {
      console.log(this.keyword);
      var vm = this;
      this.page = 1;
      setTimeout(function () {
        vm.load(1);
      }, 500);
    },
    nextPage() {
      if (this.page < this.totalPage) {
        this.page = this.page + 1;
        this.load();
      }
    },
    prePage() {
      if (this.page > 1) {
        this.page = this.page - 1;
        this.load();
      }
    },
    async courseDetail(courseId) {
      this.$router.push('/course-detail');
    },
  },
};
</script>
<style>
.nav-item-head select {
  background: white;
  color: black;
  border-radius: 2px;
  border: solid 1px;
  text-align: center;
  font-size: 20px;
  width: 250px;
  height: 40px;
  padding-top: 5px;
  /* margin: 0 20px 0 20px; */
}

.nav-item-head p {
  margin-left: 15px;
}
.icon-minimal-left,
.icon-minimal-right {
  font-size: 24px;
  color: white;
  font-weight: 500;
}

.card-footer ul li {
  font-size: 18px;
  list-style-type: none;
  float: left;
}

.card-footer ul li.btn-page {
  width: 3%;
}

.card-footer ul li a i:hover {
  color: cornflowerblue;
}
.item-course :hover {
  cursor: pointer;
}
.course-name {
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
