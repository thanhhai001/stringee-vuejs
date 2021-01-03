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
          <div class="row">
            <div class="news">
              <div class="row">
                <div class="col-md-8">
                  <!-- column left -->
                  <div class="row" style="padding-left: 10px">
                    <p>News</p>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                      <img src="../assets/images/rightnews.png" alt="news" />
                    </div>
                    <div class="col-md-4">
                      <img src="../assets/images/leftnews.png" alt="news" />
                    </div>
                    <div class="col-md-4">
                      <img src="../assets/images/rightnews.png" alt="news" />
                    </div>
                  </div>
                  <div class="row" style="padding: 20px 0 0 10px">
                    <p>Teachers</p>
                  </div>
                  <div class="row">
                    <!-- <div class="teacher" v-for="teacher in teachers" :key="teacher.id">
                      <img src="img/anime6.png" alt="teacher1">
                      <p>{{teacher.name}}</p>
                    </div> -->
                    <div class="teacher">
                      <img src="img/anime3.png" alt="teacher1" />
                    </div>
                    <div class="teacher">
                      <img src="img/anime6.png" alt="teacher1" />
                    </div>
                    <div class="teacher">
                      <img src="img/anime3.png" alt="teacher1" />
                    </div>
                    <div class="teacher">
                      <img src="img/anime3.png" alt="teacher1" />
                    </div>
                    <div class="teacher">
                      <img src="img/anime6.png" alt="teacher1" />
                    </div>
                    <div class="teacher">
                      <img src="img/anime3.png" alt="teacher1" />
                    </div>
                    <div class="teacher">
                      <img src="img/anime6.png" alt="teacher1" />
                    </div>
                    <div class="teacher">
                      <img src="img/anime3.png" alt="teacher1" />
                    </div>
                    <div class="teacher">
                      <img src="img/anime6.png" alt="teacher1" />
                    </div>
                  </div>
                </div>
                <!-- column right -->
                <div class="col-md-3">
                  <div class="row top-course">
                    <p>Top Course</p>
                  </div>
                </div>
              </div>

              <div class="row" style="padding-left: 10px">
                <p>info khác</p>
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
import * as chartConfigs from "@/components/Charts/config";
import User from "../util/process/User";
import config from "@/config";
import TopNavbar from "../layout/dashboard/TopNavbar.vue";
import ContentFooter from "../layout/dashboard/ContentFooter.vue";
import MobileMenu from "../layout/dashboard/MobileMenu";
import { FadeTransition } from "vue2-transitions";
import secure from "secure-ls";
export default {
  components: {
    FadeTransition,
    TopNavbar,
    ContentFooter,
    MobileMenu,
  },
  data() {
    return {
      teachers:'',
      users: '',
      user: '',
    };
  },
  mounted() {
    let ls = new secure();
    if (!localStorage.getItem("user")) {
      this.$router.push("/");
    } else {
      this.user = ls.get("user");
      this.listUser();
      this.listTeacher();
    }
  },
  computed: {},
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    async listUser() {
      var user = await User.getUser();
      if (user.data.status) {
        console.log(user.data.users);
        this.users = user.data.users;
      }
    },
    async listTeacher() {
      var teacher = await User.getTeacher();
      if (teacher.data.status) {
        this.teachers = teacher.data.teachers;
        console.log(this.teachers);
      }
    },
  },
  beforeDestroy() {},
};
</script>
<style>
.news {
  width: 100%;
  height: 700px;
  float: left;
}
.top-course {
  background: dodgerblue;
}
.teacher {
  width: 80px;
  margin: 0 10px 0 10px;
}
</style>
