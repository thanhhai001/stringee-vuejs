import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// import Login from "@/layout/dashboard/LoginLayout.vue";
import Content from "@/layout/dashboard/Content.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
const Home = () => import("@/pages/Home.vue");
const Login = () => import("@/pages/Login.vue");
const Profile = () => import("@/pages/Profile.vue");
const Calendar = () => import("@/pages/Calendar.vue");
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
    path: "/calendar",
    name: "calendar",
    component: Calendar
  },
  {
    path: "/calendar/*",
    name: "calendar",
    component: Calendar
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
