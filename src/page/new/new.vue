<template>
  <mu-container>
    <mu-flex class='notice-list' justify-content="center" direction='column'>
      <mu-flex v-for="(list, index) in notice_list" :key="index" class='flex-notice' justify-content="center">
        <mu-flex>
          <mu-avatar :size="size">
            <img :src="list.img">
          </mu-avatar>
        </mu-flex>
        <mu-flex style='padding-left: 1rem;height: 50px;' align-items="center">
          <mu-button @click='switch_type(list.color, list.icon_color, list.icon, list.type)' round :color="list.color">
            {{list.word}}
          </mu-button>
        </mu-flex>
      </mu-flex>
    </mu-flex>

    <transition enter-active-class="bouncein">
      <mu-icon style="position:absolute" :color='item.color' v-for="(item, index) in snow_list" :key="index"
               :style='{left:item.left,top:item.top}'
               class='love_img' :value="item.icon"></mu-icon>
    </transition>

    <mu-icon style="position:absolute" :color='item.color' v-for="(item, index) in love_list" :key="index"
             :style='{left:item.left,top:item.top}'
             class='love_img' :value="item.icon"></mu-icon>
  </mu-container>
</template>
<!--https://www.cnblogs.com/nzbin/p/6380679.html-->
<!--https://www.dcloud.io/docs/api/zh_cn/webview.html-->
<!--http://www.html5plus.org/doc/zh_cn/push.html#plus.push.createMessage-->
<style lang="scss">
  @mixin ballb($yaxis: 0) {
    transform: translate3d(0, $yaxis, 0);
  }

  @keyframes bouncein {
    1% {
      @include ballb(-400px);
    }
    20%, 40%, 60%, 80%, 95%, 99%, 100% {
      @include ballb()
    }
    30% {
      @include ballb(-80px);
    }
    50% {
      @include ballb(-40px);
    }
    70% {
      @include ballb(-30px);
    }
    90% {
      @include ballb(-15px);
    }
    97% {
      @include ballb(-10px);
    }
  }

  .bouncein {
    animation: bouncein 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  .ballmove-enter {
    @include ballb(-400px);
  }

  .love_img {
    position: absolute;
    width: 20px;
    height: 20px;
  }

  .notice-list {
    margin-top: 100px;
  }

  .flex-notice {
    width: 100%;
    height: 2rem;
    padding: 2rem;
  }
</style>
<script>
  export default {
    data() {
      return {
        snow_list: [],
        love_list: [],
        notice_list: [{
          img: require("@/assets/image/bor.jpg"),
          word: '骚扰他',
          color: 'indigoA700',
          icon: '',
          icon_color: 'lime500',
          type: 0
        },
          {
            img: require("@/assets/image/wat.png"),
            word: '想聊天',
            color: 'lightBlue400',
            icon: 'notifications_active',
            icon_color: 'lightBlue400',
            type: 1
          },
          {
            img: require("@/assets/image/sat.png"),
            word: '求安慰',
            color: 'lime500',
            icon: 'sentiment_dissatisfied',
            icon_color: 'lime500',
            type: 2
          },
          {
            img: require("@/assets/image/lov.png"),
            word: '想你呢',
            color: 'pink500',
            icon: 'favorite',
            icon_color: 'pink200',
            type: 3
          },
        ],
        msg_list: [
          ['对方已收到你的骚扰，手机正在震动', '对方已收到你的骚扰，手表正在震动'],
          ['信息已经发出去了，他看到后就会找你哦'],
          ['摸摸头，他马上就会找你'],
          ['你的想念已经发给他了，好评哦'],
        ],
        size: 50,
        last_tor: new Date(),
      }

    },
    created() {
      this.snow_flow();
      this.refresh_sample();
      console.log(this.snow_list);
      plus.push.createMessage('hi');
    },
    methods: {
      switch_type(color, icon_color, icon, type) {
        let rand_list = this.msg_list[type];
        let pick_msg = rand_list[parseInt(Math.random() * rand_list.length)];
        this.toast_msg({
          message: pick_msg,
          color: color,
          type: type
        });
        if (icon) {
          this.spare_love(icon_color, icon, type)
        }
      },
      toast_msg(config) {
        config['close'] = false;
        config['position'] = 'top';
        config['time'] = 1000;
        let flag = new Date() - this.last_tor > 1000;
        if (flag) {
          this.$toast.message(config);
          this.last_tor = new Date();
          this.send_notice('', config.type)
        }
      },
      spare_love(color, icon) {
        let left = window.innerWidth;
        let top = window.innerHeight;
        for (let i = 0; i < 3; i++) {
          let rleft = Math.round(Math.random() * (left));
          let rtop = Math.round(Math.random() * (top) * 0.9);
          this.love_list.push({
            left: rleft + 'px',
            top: rtop + 'px',
            color: color,
            icon: icon,
          });
        }
        let that = this;
        setTimeout(function () {
          that.love_list.splice(0, 3)
        }, 2500)
      },
      snow_flow() {
        let left = window.innerWidth;
        let top = window.innerHeight;
        for (let i = 0; i < 30; i++) {
          let rleft = Math.round(Math.random() * (left));
          let rtop = Math.round(Math.random() * (top) * 0.9);
          this.snow_list.push({
            left: rleft + 'px',
            top: rtop + 'px',
            color: 'red100',
            icon: 'ac_unit',
          });
        }
        let that = this;
        setInterval(function () {
          for (let i = 0; i < 30; i++) {
            let rleft = 1;
            let rtop = 1;
            let mx = parseInt(that.snow_list[i].left) - rleft;
            let my = parseInt(that.snow_list[i].top) + rtop;
            if (mx < 0) {
              mx = window.innerWidth;
              my = Math.round(Math.random() * (top) * 0.9);
            }
            if (my > window.innerHeight) {
              mx = Math.round(Math.random() * (left));
              my = 0;
            }
            that.snow_list[i].left = mx + 'px';
            that.snow_list[i].top = my + 'px';
          }
        }, 1000 / 24)
      },
      send_notice(msg, type) {
        let data = {
          msg: msg,
          type: type,
          date: new Date(),
          from: 0
        };

        this.$axios.get(this.$serverUrl + '/lpush/bf_notice/' + JSON.stringify(data), {}
        ).then(function (response) {
          console.log("data", response);
        }).catch(function (error) {
          console.log(error);
        });

      },
      refresh_sample() {
        for (let i = 0; i < 4; i++) {
          let type = i;
          this.$axios.get(this.$serverUrl + '/lrange/bf_sample_' + type + '/0/-1', {}
          ).then(function (response) {
            if (response && response.data && response.data.lrange) {
              this.msg_list[type] = this.msg_list[type].concat(response.data.lrange);
              console.info(this.msg_list[type])
            }
          }).catch(function (error) {
            console.log(error);
          });
        }
      },
    }
  }
</script>
