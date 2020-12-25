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
                <base-button style="width:100%;background:cadetblue" @click="newRoom()">Create Room</base-button>
              </div>
              <div class="col-md-2" style="float:left;width:100%">
                <base-button style="width:100%;background:blueviolet" @click="joinWithId()">Join Room</base-button>
              </div>
            </div>
            <div id="video">
            </div>
            <div id="childVideo"></div>
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
      room: undefined,
      roomId: '',
      userToken: '',
      roomToken: '',
      projectId : "SKIuNgIgQclWM0GFSPCJO7eervWS7hKkQg",
      projectSecret : "Tk1NaUZGVElWZ3VpNFZVQlZVVTZseWFsWTlHTndyMw==",
      BASE_URL : "https://api.stringee.com/v1/room2",
      restToken : "",
      callClient: undefined
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
        this.joinWithId();
      }
      this.setRestToken();
    }
  },
  methods: {
    joinWithId: async function(roomId) {
      if (this.roomId) {
        await this.joinRoom();
      }
    },
    joinRoom: async function() {
      var roomToken = await this.getRoomToken(this.roomId);
      this.roomToken = roomToken;
      await this.authen(this.userId);
      await this.publicVideo();
    },
    async updateRoom() {
      var course = await Course.update();
    },
    async getListCourse(userId) {
      var result = await Course.getCourseByUser({userId:userId});
      if(result.data.status) {
        this.courses = result.data.courses;
      }
    },
    async publicVideo(screenSharing = false) {
      var localTrack = await StringeeVideo.createLocalVideoTrack(this.callClient, {
        audio:true, video:true,
        screen: screenSharing,
        videoDimensions : { width:300, height:150} 
        });
        var videoContainer1 = document.querySelector('#video');
        var videoElement = localTrack.attach();
        this.addVideo(videoContainer1,videoElement);
        var roomData = await StringeeVideo.joinRoom(this.callClient, this.roomToken);
        var room = roomData.room;
        console.log({roomData, room});
        if (!this.room) {
        this.room = room;
        room.clearAllOnMethos();
        // them join room
        // room.on('addtrack',  function (event) {
        //   var track = event.info.track;
        //   console.log("addtrack", track);
        //   if (track.serverId === localTrack.serverId) {
        //     console.log("local");
        //     return;
        //   }
        //     this.subscribe(track);
        // });
        // roomData.listTracksInfo.forEach(info =>  {console.log(info); this.subscribe(info)});
        // }
          room.on('addtrack', function (event) {
              console.log('on add track: ' + JSON.stringify(event.info));
              var local = false;
              localTrack.forEach(function (localTrack2) {
                  if (localTrack2.serverId === event.info.track.serverId) {
                      console.log(localTrack2.serverId + ' is LOCAL');
                      local = true;
                  }
              });
              if (!local) {
                  subscribe(event.info.track);
              }
          });
        }
      room.publish(localTrack);
      console.log("room publish successful");
    },
    async newRoom() {
      let ls = new secure();
      var userId = ls.get("user").id;
      console.log('new moi room');
      var room = await this.createRoom();
      this.roomToken = await this.getRoomToken(this.room.roomId);
      console.log(this.roomToken);
      await this.authen(userId);
      await this.publicVideo();
      var linkJoinRoom = window.location.href + '?roomid=' + this.roomId;
      console.log(linkJoinRoom);
      //update room
    },
    async subscribe(trackInfo) {
      var track = await this.room.subscribe(trackInfo.serverId);
      track.on('ready', () => {
        var containerEle = document.querySelector('#childVideo');
        var ele = track.attach();
        this.addVideo(containerEle, ele);
      });
    },
    addVideo(container,video) {
      video.setAttribute("controls", "true");
      video.setAttribute("playsinline", "true");
      container.append(video);
    },
    authen: function(userId) {
      return new Promise(async resolve => {
        var userToken = await this.getUserToken(userId);
        this.userToken = userToken;
        if (!this.callClient) {
          var client = new StringeeClient();

          client.on("authen", function(res) {
            console.log("on authen: ", res);
            resolve(res);
          });
          this.callClient = client;
        }
        this.callClient.connect(userToken);
      });
    },
    async setRestToken() {
      var tokens = await this._getToken({ rest: true });
      this.restToken = tokens.rest_access_token;
    },
    async _getToken({userId, roomId, rest }) {
      return await axios.get(
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
      ).then(function(res) {
        return res.data;
      });
    },
    async getUserToken(userId) {
      var tokens = await this._getToken({ userId });
      return tokens.access_token;
    },
    _authHeader() {
        return {
          "X-STRINGEE-AUTH": this.restToken
        };
    },
    async getRoomToken(roomId) {
      var tokens = await this._getToken({ roomId:this.roomId, rest:true });
      return tokens.room_token;
    },
    async createRoom() {
      var roomName = Math.random().toFixed(4);
      var response = await axios.post(
        `${this.BASE_URL}/create`,
        {
          name: roomName,
          uniqueName: roomName
        },
        {
          headers: this._authHeader()
        }
      );
      var room = response.data;
      this.room = response.data;
      this.roomId = response.data.roomId;
      return room;
    },
    async getRoomID() {
      this.room_id = this.uuidv4();
      if(this.room_id != '' && this.room_id != undefined) {
        var result = await Stream.createRoom();
      }
    },
    uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16)
  });
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
  border: solid 2px red;
  flex: 1 1 50%;
  padding: 0;
  min-width: 0;
}
</style>
