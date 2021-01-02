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
                  <input v-model="roomId">
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="">
                    <vue-webrtc ref="webrtc"
                                width="100%"
                                :roomId="roomId"
                                v-on:joined-room="logEvent"
                                v-on:left-room="logEvent"
                                v-on:opened-room="logEvent"
                                v-on:share-started="logEvent"
                                v-on:share-stopped="logEvent"
                                @error="onError" />
                  </div>
                  <div class="row">
                    <div class="col-md-12 my-3">
                      <button type="button" class="btn btn-primary" @click="onJoin">Join</button>
                      <button type="button" class="btn btn-primary" @click="onLeave">Leave</button>
                      <button type="button" class="btn btn-primary" @click="onCapture">Capture Photo</button>
                      <button type="button" class="btn btn-primary" @click="onShareScreen">Share Screen</button>
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
      userId: '',
      courseId:'',
      img: null,
      roomId: "public-room",
    };
  },
  async mounted() {
    let ls = new secure();
    if (!localStorage.getItem("user")) {
      this.$router.push("/");
    } else {
      this.userId = ls.get("user").id;
      console.log(this.userId);
      this.getListCourse(this.userId);
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
        this.$refs.webrtc.join();
      },
      onLeave() {
        this.$refs.webrtc.leave();
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

#videos {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}

#videos video {
  flex: 1 1 50%;
  padding: 0;
  min-width: 0;
}
</style>
