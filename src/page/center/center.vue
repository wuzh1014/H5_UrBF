<template>
  <mu-container>
    <mu-flex justify-content="center" style='margin-top: 5rem;'>
      <mu-avatar :size="size">
        <img :src="notice_list[0]">
      </mu-avatar>
    </mu-flex>
    <mu-flex justify-content="center" style='margin-top: 1rem;'>
      <mu-button v-if='show_good' @click='add_bad()' flat color="blue">
        点踩
        <mu-icon right value="thumb_down"></mu-icon>
      </mu-button>
      <mu-button v-if='!show_good' @click='add_good()' flat color="red">
        点赞
        <mu-icon right value="thumb_up"></mu-icon>
      </mu-button>
      <mu-button v-if='show_good' @click='add_good()' flat color="red">
        点赞
        <mu-icon right value="thumb_up"></mu-icon>
      </mu-button>
      <mu-button v-if='!show_good' @click='add_bad()' flat color="blue">
        点踩
        <mu-icon right value="thumb_down"></mu-icon>
      </mu-button>
    </mu-flex>
  </mu-container>

</template>

<script>
  export default {
    data() {
      return {
        show_good: true,
        notice_list: [
          require("@/assets/image/head.jpg"),
        ],
        size: 120,
      }
    },
    methods: {
      add_bad: function () {
        this.show_good = !this.show_good;

        this.$axios.get(this.$serverUrl + '/incr/bf_bad', {}
        ).then(function (response) {
          if (response && response.data && response.data.incr) {
            console.info(response.data.incr)
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      add_good: function () {
        this.$axios.get(this.$serverUrl + '/incr/bf_good', {}
        ).then(function (response) {
          if (response && response.data && response.data.incr) {
            console.info(response.data.incr)
          }
        }).catch(function (error) {
          console.log(error);
        });
      }
    }
  }
</script>

<style>
  .icon-flex-wrap .mu-button {
    margin: 6px 8px;
  }
</style>
