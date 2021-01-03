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
          to="/stream"
          :name="$t('stream')"
          icon="tim-icons icon-video-66"
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
            <div class="card course-detail">
              <div class="card-header">
                <h3>{{course.courseName}}</h3>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="image" style="float:left">
                    <img style="height:90%;width:100%" src="../assets/images/img.jpg" alt="" />
                  </div>
                  <div class="decription">
                    <div class="row tuition" style="margin-bottom:5%"><h4 style="padding-right:1.8em">Tuition:</h4><h4>{{course.costs}} VNĐ</h4></div>
                    <label style="font-size:20px;color:darksalmon;font-weight:700">Description</label>
                    <p style="width:100%;max-height:80px;overflow:auto;">{{course.courseDescription}}</p>
                    </div>
                  <div class="join">
                    <div class="row">
                      <base-button v-show="!show" style="background:rebeccapurple;" @click="joinRoom">Join Room</base-button>
                    </div>
                    <div class="row">
                      <base-button v-show="show" style="background:seagreen;" @click="regisCourse">Register Course</base-button>
                    </div>
                  </div>
                </div>
                <div class="row" style="margin-top:80px">
                  <div v-for="sameCourse in sameCourses" :key="sameCourse.id" :value="sameCourse.id" class="same-course" @click="courseDetail(sameCourse.id)">
                    <img src="../assets/images/img.jpg" alt="" />
                    <p class="course-name">{{ sameCourse.courseName }}</p>
                  </div>
                </div>
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
import Stream from "../util/process/Stream";
import BaseButton from '../components/BaseButton.vue';
import secure from "secure-ls";
export default {
  components: {
    FadeTransition,
    TopNavbar,
    ContentFooter,
    MobileMenu,
  },
  data: () => {
    return {
      course : {},
      sameCourses: {},
      courseId: '',
      user:'',
      show: true
    };
  },
  mounted() {
    let ls = new secure();
    if (!localStorage.getItem("user")) {
      this.$router.push("/");
    }
    console.log(this.$route.query.courseId);
    this.user = ls.get("user");
    if(this.$route.query.courseId != undefined) {
      this.courseId = this.$route.query.courseId;
      this.getCourseById(this.courseId);
      this.checkRegist();
      this.getSameCourse(this.courseId);
    }
  },
  methods: {
    async checkRegist() {
      var check = await Course.checkRegistCourse({userId: this.user.id, courseId: this.courseId});
      if(check.data.status) {
        this.show = false;
      }
    },
    async getCourseById(courseId) {
      var result = await Course.getCourseDetail({courseId: courseId});
      if (result.data.status) {
        this.course = result.data.course;
      }
    },
    async getSameCourse(courseId) {
      var result = await Course.getSameCourseDetail({courseId: courseId});
      if (result.data.status) {
        this.sameCourses = result.data.course;
      }
    },
    courseDetail(courseId) {
      this.$router.push('/course-detail?courseId='+courseId);
    },
    async regisCourse() {
      var register = await Course.registerCourse({userId: this.user.id, courseId: this.courseId});
      if(register.data.status) {
        alert(register.data.message);
        window.location.reload();
      }
    },
    joinRoom() {
      this.$router.push('/stream?courseId=' + this.courseId);
    }
  },
};
</script>
<style>
#video-gird {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-auto-rows: 300px;
}
video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.course-detail .card-header {
  height: 10%;
}
.course-detail .card-body {
  padding: 0 5%;
}
.course-detail .image {
  border-top: solid 20px slateblue;
  float: left;
  width: 20%;
  height: 40%;
  border-radius: 60px 0;
}
.course-detail .decription {
  float: left;
  width: 40%;
  height: 40%;
  padding: 3% 2%;
  text-align: left;
  border-top: solid 20px slateblue;
  border-right: solid 20px slateblue;
  border-radius: 0 0 70px;
}
.course-detail .join {
  padding: 3% 2%;
  float: left;
  width: 40%;
  height: 40%;
}
.course-detail .tuition{
    margin-left: 15%;
    border: solid 1px darkseagreen;
    border-radius: 19px;
    background: cadetblue;
    color: chartreuse;
    height: 40px;
    width: 70%;
    text-align: center;
    padding: 7px 15%;
 }
.course-detail .same-course {
  height: 180px;
  width: 200px;
  margin-right: 30px ;
  border: solid 1px slateblue;
}
.course-detail .same-course .course-name {
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
 }
</style>
