<template>
  <div>
    <div class="col-md-8" style="float:left">
      <card class="card-add-course">
        <h5 slot="header" class="title">New Course</h5>
        <div style="height:130px;padding-left: 40px;">
          <div class="error-message" :class="validateCourseName == true ? '' : 'hide-error'">* the course name has not been entered</div>
          <div class="error-message" :class="validateCourseTypeId == true ? '' : 'hide-error'">* the course type has not been selected</div>
          <div class="error-message" :class="validateTopicId == true ? '' : 'hide-error'">* the topic has not been selected</div>
          <div class="error-message" :class="validateCourseDescription == true ? '' : 'hide-error'">* the course description has not been entered</div>
          <div class="error-message" :class="validateCosts == true ? '' : 'hide-error'">* the Tuition has not been entered</div>
          <div class="error-message" :class="validateStartDate == true ? '' : 'hide-error'">* the start date has not been entered</div>
          <div class="error-message" :class="validateEndDate == true ? '' : 'hide-error'">* the end date has not been entered</div>
        </div>
        <div class="row" style="margin-top:15px">
          <div class="col-md-6 pr-md-1">
            <base-input label="Coursename"
                      placeholder="Course Name"
                      v-model="courseName">
            </base-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 pr-md-1">
            <base-input label="Type of Course" >
              <select v-model="courseTypeId">
                <option value=1>Public</option>
                <option value=2>Non-Public</option>
              </select>
            </base-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 pr-md-1">
            <base-input>
              <label>Topic</label>
            </base-input>
            <select v-model="topicId">
              <option v-for="topic in topics" :key="topic.id" :value="topic.id">{{topic.title}}</option>
            </select>
          </div>
        </div>
        <div class="row" style="margin-top:15px">
          <div class="col-md-8 pr-md-1">
            <base-input>
              <label>Course Description</label>
              <textarea rows="4" cols="80"
                        class="form-control"
                        placeholder="Here can be your description"
                        v-model="courseDescription">
              </textarea>
            </base-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 pr-md-1">
            <base-input label="Tuition"
                        placeholder="123456"
                        v-model="costs">
            </base-input>
          </div>
          <div class="col-md-4 px-md-1">
            <base-input>
              <div class="form-group">
                <label>Start Date</label>
                  <datepicker v-model="startDate"></datepicker>
              </div>
            </base-input>
          </div>
          <div class="col-md-4 pl-md-1">
            <base-input>
              <div class="form-group">
                <label>End Date</label>
                  <datepicker v-model="endDate"></datepicker>
              </div>
            </base-input>
          </div>
        </div>
        <base-button slot="footer" type="primary" fill @click="onSubmit">ADD</base-button>
      </card>
    </div>
    <div class="col-md-4" style="float:left">
      <card class="image">
      <p class="card-text">
      </p>
        <div class="range-image">
          <img v-if="!file" style="display:none" :src="file ? file : ''" alt="">
          <img v-else :src="file ? file : ''" alt="">
        </div>  
        <div style="text-align: center;margin-top:15px;width: 100%;height: 5%;">
          <input type="file" ref="file" @change="onFileChange" class="d-none" :accept="accept">
          <base-button @click="selectFile">Select Image</base-button>
        </div>
        <div style="text-align: center;margin-top:15px;width: 100%;height: 5%;">
          <base-button @click="removeFile" v-if="file">Remove Image</base-button>
        </div>
    </card>
    </div>
  </div>
</template>
<script>
import Topic from "../../util/process/Topic";
import Course from "../../util/process/Course";
import Datepicker from 'vuejs-datepicker';
  export default {
    components:{
      Datepicker
    },
    props: {
      course: {
        type: Object,
        default: () => {
          return {
          };
        }
      },
    },
    mounted () {
      this.getTopic();
    },
    data: () => {
      return {
        topics: [],
        courseName: '',
        courseTypeId: '',
        topicId: '',
        courseDescription: '',
        costs: '',
        startDate: '',
        endDate: '',
        validateCourseName: false,
        validateCourseTypeId: false,
        validateTopicId: false,
        validateCourseDescription: false,
        validateCosts: false,
        validateStartDate: false,
        validateEndDate: false,
        showError: false,
        accept: 'images/*',
        file: '',
        fileName : ''
      };
    },
    methods:{
      async getTopic() {
        var result = await Topic.getAll();
        if(result.data.status) {
          this.topics = result.data.data;
        }
      },
      selectFile(){
        this.$refs.file.click()
      },
      onFileChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
          return
        }
        this.fileName = files[0].name
        this.createImage(files[0])
      },
      onChange(image) {
        console.log('New picture selected!')
        if (image) {
          console.log('Picture loaded.')
          this.image = image;
        } else {
          console.log('FileReader API not supported: use the <form>, Luke!')
        }
      },
      createImage(file) {
        var image = new Image()
        var reader = new FileReader()

        reader.onload = (e) => {
          this.file = e.target.result;
          this.$emit('change', this.file)
        }
        reader.readAsDataURL(file)
      },
      removeFile() {
        this.file = ''
        this.fileName = ''
      },
      async onSubmit() {
        this.showError = false;
        if (
          this.courseName != "" &&
          this.courseTypeId != "" &&
          this.topicId != "" &&
          this.courseDescription != "" &&
          this.costs != "" &&
          this.startDate != "" &&
          this.endDate != ""
          ) {
          // if (this.user.role == 2 && this.user.department_manager.length == 0) {
          //   return;
          // }
          console.log(1);
          var result_course = await Course.register({
            courseName: this.courseName,
            courseTypeId: this.courseTypeId,
            topicId: this.topicId,
            courseDescription: this.courseDescription,
            costs: this.costs,
            startDate: this.startDate,
            endDate: this.endDate,
            image: this.fileName
          });
          if (result_course.data.status) {
            this.$router.push({
              path: `/course`,
              query: { success: true }
            });
            // this.response_register_exist = false;
            // this.response_register = true;
            // this.resetTextbox();
          // } else if (result_user.data.exist) {
          //   this.response_register_exist = true;
          }
        } else {
          this.showError = true;
          if(this.courseName == "") {
            this.validateCourseName = true;
          }
          if(this.courseTypeId == "") {
            this.validateCourseTypeId = true;
          }
          if(this.topicId == "") {
            this.validateTopicId = true;
          }
          if(this.courseDescription == "") {
            this.validateCourseDescription = true;
          }
          if(this.costs == "") {
            this.validateCosts = true;
          }
          if(this.startDate == "") {
            this.validateStartDate = true;
          }
          if(this.endDate == "") {
            this.validateEndDate = true;
          }
        }
      }
    },
    watch: {
      courseName :function(new_value, old_value) {
        if(new_value != '' && new_value != undefined) {
          this.validateCourseName = false;
        } else {
          this.validateCourseName = true;
        }
      },
      courseTypeId :function(new_value, old_value) {
        if(new_value != '' && new_value != undefined) {
          this.validateCourseTypeId = false;
        } else {
          this.validateCourseTypeId = true;
        }
      },
      topicId :function(new_value, old_value) {
        if(new_value != '' && new_value != undefined) {
          this.validateTopicId = false;
        } else {
          this.validateTopicId = true;
        }
      },
      courseDescription :function(new_value, old_value) {
        if(new_value != '' && new_value != undefined) {
          this.validateCourseDescription = false;
        } else {
          this.validateCourseDescription = true;
        }
      },
      costs :function(new_value, old_value) {
        if(new_value != '' && new_value != undefined) {
          this.validateCosts = false;
        } else {
          this.validateCosts = true;
        }
      },
      startDate :function(new_value, old_value) {
        if(new_value != '' && new_value != undefined) {
          this.validateStartDate = false;
        } else {
          this.validateStartDate = true;
        }
      },
      endDate :function(new_value, old_value) {
        if(new_value != '' && new_value != undefined) {
          this.validateEndDate = false;
        } else {
          this.validateEndDate = true;
        }
      },
    }
  }
</script>
<style>
.vdp-datepicker input {
    border-color: rgba(34, 42, 66);
    border-radius: 0.4285rem;
    font-size: 0.75rem;
    transition: color 0.3s ease-in-out, border-color 0.3s ease-in-out, background-color 0.3s ease-in-out;
    height: calc(2.25rem + 2px);
    background: rgb(34, 42, 66, 30%); 
    font-family: "Poppins", sans-serif;
    border: solid 1px #2b3553;
    color: rgba(255,255,255, .8);
    width: 100%;
    padding: 10px 18px 10px 18px;
}
.vdp-datepicker input:focus{
    color: rgba(255,255,255, .8);
    border-color: #e14eca;
    outline: 0;
}
select {
  background: rgb(34, 42, 66, 30%);
  border: solid 1px #2b3553;
  border-radius: 0.4285rem;
  font-size: 0.75rem;
  font-family: "Poppins", sans-serif;
  height: calc(2.25rem + 2px);
  width: 100%;
  color: rgba(255,255,255, .8);
  padding: 10px 18px 10px 18px;
}
select:focus {
  color: rgba(255,255,255, .8);
  border-color: #e14eca;
  outline: 0;
}
option{
  background: white;
  color: black;
}
input {
  background: rgb(34, 42, 66, 30%) !important; 
}
.error-message {
  height: 20px;
  color: red;
}
.hide-error {
  display: none;
}
.card-add-course .card-header {
  height: 10%;
}
.image .range-image {
  height:400px;
  border:solid 15px aquamarine;
}
.image button {
  width:50%;
}
.image .range-image img {
  width: 100%;
  height: 100%;
}
.image .upload {
  text-align: center;
  border: solid 1px salmon;
  background: salmon;
  border-radius: 60px 60px;
  width: 50%;
  height: 100%;
  margin: 0 25%;
  box-shadow:none;
}
.image .upload:hover{
  box-shadow: 3px 6px 3px;
}
.image .upload input:hover {
  cursor: pointer;
}
.image .upload p:hover {
  cursor: pointer;
}
</style>
