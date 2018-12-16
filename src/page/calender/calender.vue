<template>
  <mu-container>
    <mu-flex justify-content="center" align-items="center" wrap="wrap">
      <mu-paper :z-depth="1" class="demo-date-picker">
        <mu-date-picker @change='change_date' :date.sync="date"></mu-date-picker>
      </mu-paper>
    </mu-flex>

    <mu-flex v-for="(item, index) in msg_list" :key="index" justify-content="start" align-items="center">
      <label style="font-size: 15px;padding-right: 4rem;">{{index}}</label>
      <label style="font-size: 15px;" v-if="item.type == 0">{{item.content}}</label>
      <img style="width: 50%;height: 15rem;" v-if="item.type == 1" :src="'http://www.aoie.ren/image/'+item.content">
    </mu-flex>
    <mu-flex justify-content="center">
      <mu-text-field v-model="input_val" placeholder="留言"></mu-text-field>
      <mu-button @click='add_date_detail' color="info">发送</mu-button>
    </mu-flex>
  </mu-container>
</template>

<script>
  export default {
    data() {
      return {
        nor_list: [{}],
        msg_list: [],
        show_pic: false,
        msg: '',
        input_val: '',
        pic_url: '',
        date_str: '',
        date: new Date(),
      }
    },
    onLoad(e) {
      let ty = this.date.getFullYear();
      let tm = this.date.getMonth() + 1;
      let td = this.date.getDate();
      this.date_str = ty + '_' + tm + '_' + td;
      this.get_date_detail(this.date_str)
    },
    methods: {
      change_date: function (date) {
        let ty = date.getFullYear();
        let tm = date.getMonth() + 1;
        let td = date.getDate();
        this.show_pic = false;
        let sstr = tm + '-' + td;
        for (let i = 0; i < this.nor_list.length; i++) {
          if (sstr == this.nor_list[i].date) {
            this.show_pic = true;
            this.msg = this.nor_list[i].msg;
            this.pic_url = this.nor_list[i].url;
            break
          }
        }
        this.date_str = ty + '_' + tm + '_' + td;
        this.get_date_detail(this.date_str)
      },
      get_date_detail: function (date) {
        let that = this;
        this.$axios.get(this.$serverUrl + '/lrange/bf_date:' + date + '/0/-1', {}
        ).then(function (response) {
          if (response && response.data && response.data.lrange) {
            let str_list = response.data.lrange;
            let msg_list = [];
            for (let i = 0; i < str_list.length; i++) {
              let in_json = JSON.parse(str_list[i]);
              msg_list.push(in_json)
            }
            that.msg_list = msg_list;
            console.log(JSON.stringify(that.msg_list))
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      add_date_detail: function () {
        if (this.input_val) {
          let data = {
            content: this.input_val,
            from: 0,
            type: 0
          };
          let that = this;
          data = 'lpush/bf_date:' + this.date_str + '/' + JSON.stringify(data);
          this.$axios.post(this.$serverUrl,
            data, {
              headers: {
                'Content-Type': 'text/plain'
              }
            }
          ).then(function (response) {
            that.get_date_detail(that.date_str);
            that.input_val = ''
          }).catch(function (error) {
            console.log(error);
          });
        }

      }
    }
  }
</script>

<style>
  .demo-date-picker {
    margin: 8px;
  }
</style>
