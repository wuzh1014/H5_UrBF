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
    <mu-icon style="position:absolute" :color='item.color' v-for="(item, index) in love_list" :key="index"
             :style='{left:item.left,top:item.top}'
             class='love_img' :value="item.icon"></mu-icon>
  </mu-container>
</template>

<style>
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
    onLoad() {
      this.refresh_sample()
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
