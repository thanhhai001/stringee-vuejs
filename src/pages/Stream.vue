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
          <!-- <card id="stream">
            <div class="chose">
              <div class="col-md-2" style="float:left;padding: 10px 0;text-align: center;"><p>Select Courses: </p></div>
              <div class="col-md-4" style="float:left">
                <base-input >
                  <select v-model="courseId">
                    <option  v-for="course in courses" :key="course.id" :value="course.id">{{course.courseName}}</option>
                  </select>
                </base-input>
              </div>
              <div class="col-md-2" style="float:left;">
                <base-button style="width:100%;background:cadetblue" @click="createRoom()">Create Room</base-button>
              </div>
              <div class="col-md-2" style="float:left;width:100%">
                <base-button style="width:100%;background:blueviolet" @click="joinRoom()">Join Room</base-button>
              </div>
            </div>
            <div id="videos">
            </div>
          </card> -->
          <card>
            <div class="container has-text-centered" v-cloak id="app">
              <h1 class="title">
                <!-- Ứng dụng Clone Zoom cực cool ngầu với -->
                <!-- <span class="header-highlight">Stringee API</span> -->
              </h1>

              <div>
                <button class="button is-primary" v-if="!room" @click="createRoom()">
                  Tạo Meeting
                </button>

                <button class="button is-info" v-if="!room" @click="joinWithId()">
                  Join Meeting
                </button>

                <button class="button is-info" v-if="room" @click="publish(true)">
                  Share Desktop
                </button>
              </div>

              <div v-if="roomId" class="info">
                <p>Bạn đang ở trong room <strong>{{roomId}}</strong>.</p>
                <p>
                  Gửi link này cho bạn bè cùng join room nhé
                  <a v-bind:href="roomUrl" target="_blank">{{roomUrl}}</a>.
                </p>
                <p>Hoặc bạn cũng có thể copy <code>{{roomId}}</code> để share.</p>
              </div>
            </div>
            <div class="container">
              <div id="videos"></div>
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
  import apiStringee from '../../api'
export default {
  components: {
    FadeTransition,
    TopNavbar,
    ContentFooter,
    MobileMenu,
    },
  data: () => {
    return {
      courseId:'',
      userId: '',
      courses:[],
      userToken: '',
      roomToken: '',
      restToken : "",
      roomUrl : "",
      roomId: "",
      roomToken: "",
      room: undefined,
      callClient: undefined
    };
  },
  async mounted() {
    //let ls = new secure();
    //if (!localStorage.getItem("user")) {
    //  this.$router.push("/");
    //} else {
      // return new Promise( async function(resolve) {
      //   await apiStringee.setRestToken();
        
      // });
      await apiStringee.setRestToken();
      //this.userId = ls.get("user").id;
      //this.getListCourse(this.userId);
        if(this.$route.query.roomid) {
        this.roomId = this.$route.query.roomid;
        // this.joinRoom();
      }
    //}
  },
  methods: {
    async getListCourse(userId) {
      var result = await Course.getCourseByUser({userId:userId});
      if(result.data.status) {
        this.courses = result.data.courses;
      }
    },

    authen: function() {
      return new Promise(async resolve => {
        const userId = `${(Math.random() * 100000).toFixed(6)}`;
        const userToken = await apiStringee.getUserToken(userId);
        this.userToken = userToken;

        if (!this.callClient) {
          const client = new StringeeClient();

          client.on("authen", function(res) {
            console.log("on authen: ", res);
            resolve(res);
          });
          this.callClient = client;
        }
        this.callClient.connect(userToken);
      });
    },
    publish: async function(screenSharing = false) {
      const localTrack = await StringeeVideo.createLocalVideoTrack(
        this.callClient,
        {
          audio: true,
          video: true,
          screen: screenSharing,
          videoDimensions: { width: 640, height: 360 }
        }
      );

      const videoElement = localTrack.attach();
      this.addVideo(videoElement);

      const roomData = await StringeeVideo.joinRoom(
        this.callClient,
        this.roomToken
      );
      const room = roomData.room;
      console.log({ roomData, room });

      if (!this.room) {
        this.room = room;
        room.clearAllOnMethos();
        room.on("addtrack", e => {
          const track = e.info.track;

          console.log("addtrack", track);
          if (track.serverId != localTrack.serverId) {
            this.subscribe(track);
          } else {
            console.log("local");
            return;
          }
        });
        room.on("removetrack", e => {
          const track = e.track;
          if (!track) {
            return;
          }

          const mediaElements = track.detach();
          mediaElements.forEach(element => element.remove());
        });

        // Join existing tracks
        roomData.listTracksInfo.forEach(info => this.subscribe(info));
      }

      await room.publish(localTrack);
      console.log("room publish successful");
    },
    async createRoom() {
      const room = await apiStringee.createRoom();
      const { roomId } = room;
      const roomToken = await apiStringee.getRoomToken(roomId);

      this.roomId = roomId;
      this.roomToken = roomToken;
      console.log({ roomId, roomToken });

      await this.authen();
      await this.publish();
    },
    join: async function() {
      const roomToken = await apiStringee.getRoomToken(this.roomId);
      this.roomToken = roomToken;

      await this.authen();
      await this.publish();
    },
    joinWithId: async function() {
      const roomId = prompt("Dán Room ID vào đây nhé!");
      if (roomId) {
        this.roomId = roomId;
        await this.join();
      }
    },
    subscribe: async function(trackInfo) {
      const track = await this.room.subscribe(trackInfo.serverId);
      track.on("ready", () => {
        const videoElement = track.attach();
        this.addVideo(videoElement);
      });
    },
    addVideo: function(video) {
      video.setAttribute("controls", "true");
      video.setAttribute("playsinline", "true");
      document.querySelector('#videos').append(video);
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
