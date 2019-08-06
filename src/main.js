import Vue from 'vue';
// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue';
import {
  Button,
  Option,
  Select,
  Message,
  Input,
  DatePicker
} from 'element-ui';
// Vue.use(ElementUI);
Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(Input)
Vue.use(DatePicker)

Vue.prototype.$message = Message;

new Vue({
  el: '#app',
  render: h => h(App)
});



// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require("!style!css!./bootstrap/css/bootstrap.css");
require("!style!css!./plugins/jvectormap/jquery-jvectormap-1.2.2.css");
require("!style!css!./dist/css/skins/_all-skins.min.css");
require("!style!css!./dist/css/AdminLTE.min.css");
require("!style!css!./css/main.css");
require("!style!css!./plugins/iCheck/flat/blue.css");
require("!style!css!./plugins/daterangepicker/daterangepicker.css");



require("./router.js")

require("./plugins/sparkline/jquery.sparkline.min.js")
require("./bootstrap/js/bootstrap.min.js")
require("./plugins/jvectormap/jquery-jvectormap-1.2.2.min.js")
require("./plugins/jvectormap/jquery-jvectormap-world-mill-en.js")
require("./plugins/slimScroll/jquery.slimscroll.min.js")
require("./dist/js/demo.js")
require("./dist/js/app.min.js")
//require("./dist/js/pages/dashboard2.js")


// require('!style!css!../node_modules/element-ui/lib/theme-chalk/index.css')



$(document).ajaxStart(function () {
  Pace.restart();
});
if ($ && $.AdminLTE && $.AdminLTE.layout) {
  $.AdminLTE.layout.fix();
}
