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
          <card>
            <div class="container">
              <div class="row">
                <div class="col-md-12 my-3">
                  <h2>Room</h2>
                  <input v-show="false" v-model="roomId">
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 pr-md-1">
                  <base-input v-show="typeShow" label="Select Course" >
                    <select v-model="courseId">
                      <option value="">Choose Course to learn</option>
                      <option v-for="course in courses" :key="course.id" :value="course.id" >{{course.courseName}}</option>
                    </select>
                  </base-input>
                </div>
                <div class="col-md-12">
                  <vue-webrtc ref="webrtc"
                              :roomId="roomId"
                              v-on:joined-room="logEvent"
                              v-on:left-room="logEvent"
                              v-on:opened-room="logEvent"
                              v-on:share-started="logEvent"
                              v-on:share-stopped="logEvent"
                              @error="onError" />
                  <div class="row">
                    <div class="col-md-12 my-3">
                      <button type="button" :disabled="enableSelectRoom" class="btn btn-primary" @click="onJoin">Join</button>
                      <button type="button" :disabled="enableAnyButton" class="btn btn-primary" @click="onLeave">Leave</button>
                      <button type="button" :disabled="enableAnyButton" class="btn btn-primary" @click="onCapture">Capture Photo</button>
                      <button type="button" :disabled="enableAnyButton" class="btn btn-primary" @click="onShareScreen">Share Screen</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <h2>Captured Image</h2>
                  <figure class="figure">
                    <img :src="img" class="img-responsive" />
                  </figure>
                </div>
              </div>
            </div>
          </card>
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
  import {FadeTransition} from 'vue2-transitions';
  import axios from 'axios'
  import secure from "secure-ls";
  import Vue from 'vue'
  import { WebRTC } from 'plugin';
  import { find, head } from 'lodash';

  Vue.component(WebRTC, WebRTC);
export default {
  components: {
    FadeTransition,
    TopNavbar,
    ContentFooter,
    MobileMenu,
    },
  data: () => {
    return {
      enableSelectRoom: true,
      enableButton: false,
      enableAnyButton: true,
      user: '',
      courses: '',
      userId: '',
      courseId:'',
      img: null,
      roomId: '',
      typeShow: true,
    };
  },
  async mounted() {
    let ls = new secure();
    if (!localStorage.getItem("user")) {
      this.$router.push("/");
    } else {
      this.user = ls.get("user");
      this.userId = ls.get("user").id;
      this.getListCourse(this.userId);
      if(this.$route.query.courseId != undefined) {
        this.courseId = this.$route.query.courseId;
        this.onJoin();
      }
    }
  },
  methods: {
    async getListCourse(userId) {
      var result = await Course.getCourseByUser({userId:userId});
      if(result.data.status) {
        this.courses = result.data.courses;
      }
    },
    onCapture() {
        this.img = this.$refs.webrtc.capture();
      },
      onJoin() {
        if(this.courseId != '') {
          this.typeShow = false;
          this.roomId = 'public-room-' + this.courseId;
          console.log(this.roomId);
          this.enableButton = true;
          console.log(this.enable);
          this.$refs.webrtc.join();
          
        }
        
      },
      onLeave() {
        this.enableButton = false;
        this.courseId = '';
        this.$refs.webrtc.leave();
        this.$router.push('/stream');
      },
      onShareScreen() {
        this.img = this.$refs.webrtc.shareScreen();
      },
      onError(error, stream) {
        console.log('On Error Event', error, stream);
      },
      logEvent(event) {
        console.log('Event : ', event);
      },
  },
  watch:{
    courseId : function(new_value, old_value) {
      if(new_value == '') {
        this.enableSelectRoom = true;
      } else {
        this.enableSelectRoom = false;
      }
    },
    enableButton : function(new_value, old_value) {
      if(new_value == true) {
        this.enableAnyButton = false;
      } else {
        this.enableAnyButton = true;
      }
    }
  }
};
</script>
<style>
/* #stream #video{
  float: left;
  border: solid 2px red;
  width: 62%;
} */
#stream #childVideo {
  float: right;
  width: 35%;
  border: solid 2px red;
}
#stream .chose {
  padding-top: 20px;
  height: 15%;
}

[v-cloak] { display: none; }

.header-highlight {
  color: #ff4954;
}

.info {
  padding: 1.5rem;
}

.container {
  padding-top: 1rem;
}

/* #videos {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
} */

/* #videos video {
  flex: 1 1 50%;
  padding: 0;
  min-width: 0;
} */

video:first {
  width: 250px;
  height: 150px;
  padding-left: 7px ;
}

video {
  width: 250px;
  height: 150px;
}
</style>
