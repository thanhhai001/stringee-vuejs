// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
const Home = () => import("@/pages/Home.vue");
const Login = () => import("@/pages/Login.vue");
const Profile = () => import("@/pages/Profile.vue");
const Stream = () => import("@/pages/Stream.vue");
const Course = () => import("@/pages/Course.vue");
const CourseDetail = () => import("@/pages/CourseDetail.vue");
const CreateCourse = () => import("@/pages/CreateCourse.vue");
const Statistical = () => import("@/pages/Statistical.vue");
const Logout = () => import("@/pages/Logout.vue");
const Register = () => import("@/pages/Register.vue");

const routes = [
  {
    path: '/',
    component: Login,
    name: 'index',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login,
    name: 'login',
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile
  },
  {
    path: "/stream",
    name: "stream",
    component: Stream
  },
  {
    path: "/course",
    name: "course",
    component: Course
  },
  {
    path: "/create-course",
    name: "createcourse",
    component: CreateCourse
  },
  {
    path: "/course-detail",
    name: "coursedetail",
    component: CourseDetail
  },
  {
    path: "/statistical",
    name: "statistical",
    component: Statistical
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "*",
    component: NotFound
  },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
