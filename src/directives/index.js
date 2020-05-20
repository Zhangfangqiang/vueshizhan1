import Vue from 'vue'
import title from "./title"
import validator from "./validator"

/**
 * 全局注册指令开始
 */
Vue.directive('title',title);
Vue.directive('validator',validator);
