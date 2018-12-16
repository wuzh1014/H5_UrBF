<template>
  <mu-container>
    <mu-appbar color="pink200" style="width: 100%;text-align: center;position: fixed;top: 30px;height: 2.5rem;left: 0;"
               :title="title_name" :z-depth="0"></mu-appbar>
    <mu-bottom-nav color="pink900" :value="btn_val" @change="handleChange"
                   style='position: fixed;bottom: 0;left: 0;width: 100%;background-color: #f48fb1;color: #fce4ec'>
      <mu-bottom-nav-item title="嗯哼" icon="favorite_border" :value="0"></mu-bottom-nav-item>
      <mu-bottom-nav-item title="我们的日历" icon="date_range" :value="1"></mu-bottom-nav-item>
      <mu-bottom-nav-item title="我的帅哥" icon="face" :value="2"></mu-bottom-nav-item>
    </mu-bottom-nav>
  </mu-container>
</template>
<script>
  import {
    preLoad,
    showWebviewById
  } from "@/utils/webview";

  export default {
    components: {},
    created() {
      function plusReady() {
        let ws = plus.webview.currentWebview();
      }

      if (window.plus) {
        plusReady();
      } else {
        document.addEventListener("plusready", plusReady, false);
      }
      preLoad(this.route_list);
      plus.webview.show(this.route_list[0].id, "", 200);
    },
    data() {
      let t_list = [
        '有什么想说的话呢',
        '我们的日历',
        '你的帅哥',
      ];
      return {
        title_list: t_list,
        title_name: t_list[0],
        btn_val: "0",
        route_list: [{
          url: "./new.new.html",
          id: "new.new",
          title: "嗯哼"
        }, {
          url: "./calender.calender.html",
          id: "calender.calender",
          title: "我们的日历"
        }, {
          url: "./center.center.html",
          id: "center.center",
          title: "我的帅哥"
        },]
      };
    },
    onLoad() {
    },
    methods: {
      handleChange(value) {
        this.title_name = this.title_list[value];
        plus.webview.show(this.route_list[value].id, "", 200);
      },
    }
  }
</script>
