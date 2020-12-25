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
          <div class="row">
            <div class="col-md-12">
              <course-form :model="course" @submitCourse="create($event)">
              </course-form>
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
  import CourseForm from './CourseForm/AddCourseForm';
  import {FadeTransition} from 'vue2-transitions';
  import secure from "secure-ls";
export default {
  components: {
      FadeTransition,
      TopNavbar,
      ContentFooter,
      MobileMenu,
      CourseForm,
    },
  data: () => {
    return {
      course: {
          courseName: '',
          courseTypeId: '',
          topicId: '',
          courseDescription: '',
          costS: '',
          startDate: '',
          endDate: '',
        },
        image: {
          imageName:''
        }
    };
  },
  mounted() {
    let ls = new secure();
    if (!localStorage.getItem("user")) {
      this.$router.push("/");
    } else {
    }
    
  },
  methods: {
    async create(create){
      this.course = create
      // var result = await Course.create({course: this.course});
      // if (result.response.status) {

      // }
    },
  }
};
</script>
<style>
</style>
