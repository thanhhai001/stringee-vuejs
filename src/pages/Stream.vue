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
          <card id="stream">
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
      room: '',
      roomId: '',
      userToken: '',
      roomToken: '',
      projectId : "SKIuNgIgQclWM0GFSPCJO7eervWS7hKkQg",
      projectSecret : "Tk1NaUZGVElWZ3VpNFZVQlZVVTZseWFsWTlHTndyMw==",
      BASE_URL : "https://api.stringee.com/v1/room2",
      restToken : "",
      callClient: undefined,
      roomUrl : "",
    };
  },
  mounted() {
    let ls = new secure();
    if (!localStorage.getItem("user")) {
      this.$router.push("/");
    } else {
      this.userId = ls.get("user").id;
      this.getListCourse(this.userId);
        if(this.$route.query.roomid) {
        this.roomId = this.$route.query.roomid;
        // this.joinRoom();
      }
      this.setRestTokenApi();
    }
  },
  methods: {
    async createRoom() {
      const room = await this.createRoomAPI();
      const { roomId } = room;
      const roomToken = await this.getRoomTokenApi(roomId);

      this.roomId = roomId;
      this.roomToken = roomToken;

      await this.authen();
      await this.publish();
    },

    async join() {
      const roomToken = await this.getRoomTokenApi(this.roomId);
      this.roomToken = roomToken;
      await this.authen();
      await this.publish();
    },

    async authen() {
      // return new Promise(async resolve => {
        const userId = `${(Math.random() * 100000).toFixed(6)}`;
        const userToken = await this.getUserTokenApi(userId);
        this.userToken = userToken;

        if (!this.callClient) {
          const client = new StringeeClient();

          client.on("authen", function(res) {
            resolve(res);
          });
          this.callClient = client;
        }
        this.callClient.connect(userToken);
      // });
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
        await roomData.listTracksInfo.forEach(info => this.subscribe(info));
      }

      await room.publish(localTrack);
      console.log("room publish successful");
    },

    async getListCourse(userId) {
      var result = await Course.getCourseByUser({userId:userId});
      if(result.data.status) {
        this.courses = result.data.courses;
      }
    },

    async setRestTokenApi() {
      const tokens = await this._getTokenApi({ rest: true });
      const restToken = tokens.rest_access_token;
      this.restToken = restToken;

      return restToken;
    },
    
    async _getTokenApi({ userId, roomId, rest }) {
      const response = await axios.get(
        "https://v2.stringee.com/web-sdk-conference-samples/php/token_helper.php",
        {
          params: {
            keySid: this.projectId,
            keySecret: this.projectSecret,
            userId,
            roomId,
            rest
          }
        }
      );
      const tokens = response.data;
      return tokens;
    },
    
    async createRoomAPI() {
      const roomName = Math.random().toFixed(4);
      const response = await axios.post(
        `${this.BASE_URL}/create`,
        {
          name: roomName,
          uniqueName: roomName
        },
        {
          headers: this._authHeaderApi()
        }
      );

      const room = response.data;
      console.log({ room });
      return room;
    },

    _authHeaderApi() {
      return {
        "X-STRINGEE-AUTH": this.restToken
      };
    },

    async getRoomTokenApi(roomId) {
      this.roomUrl = `https://${window.location.hostname}?room=${this.roomId}`;
      // console.log(this.roomUrl);
      const tokens = await this._getTokenApi({ roomId });
      return tokens.room_token;
    },

    async joinRoom() {
      const roomId = this.roomId;
      if (roomId) {
        this.roomId = roomId; 
        await this.join();
      }
    },

    async getUserTokenApi(userId) {
      const tokens = await this._getTokenApi({ userId });
      return tokens.access_token;
    },

    async subscribe(trackInfo) {
      const track = await this.room.subscribe(trackInfo.serverId);
      track.on("ready", function() {
        const videoElement = track.attach();
        this.addVideo(videoElement);
      });
    },

     isSafari() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf('safari') != -1) {
          if (ua.indexOf('chrome') > -1) {
          } else {
              return true;
          }
      }
      return false;
    },

    addVideo(video) {
      video.setAttribute("controls", "true");
      video.setAttribute("playsinline", "true");
      document.querySelector('#videos').appendChild(video);
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
