<template>
  <div>
    <div>
      <h1>登录</h1>
    </div>
    <div>
      <input placeholder="请输入用户名" type="text" v-model="userName"/>
    </div>
    <div>
      <input placeholder="请输入密码" type="password" v-model="password"/>
    </div>
    <div>
      <button @click="toLogin">登录</button>
    </div>
  </div>
</template>

<script>
let _this;

const {
  ipcRenderer,
  remote
} = require('electron');

export default {
  data() {
    return {
      userName: "",
      password: ""
    }
  },
  created() {
    _this = this;
    // _this.getUserIP(function (ip) {
    //   alert(ip);
    // });
  },
  methods: {
    //获取本机IP地址
    getUserIP(onNewIP) {
      let myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
      let pc = new myPeerConnection({
            iceServers: []
          }),
          noop = function () {
          },
          localIPs = {},
          ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
          key;

      function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
      }

      pc.createDataChannel("");
      pc.createOffer().then(function (sdp) {
        sdp.sdp.split('\n').forEach(function (line) {
          if (line.indexOf('candidate') < 0) return;
          line.match(ipRegex).forEach(iterateIP);
        });
        pc.setLocalDescription(sdp, noop, noop);
      });
      pc.onicecandidate = function (ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
      };
    },
    toLogin() {
      let param = {
        userName: _this.userName,
        password: _this.password
      }
      _this.$axios.get(_this.$PJS.url + "/login/userLogin", {
        params: param
      }).then(data => {
        alert(data.data.content);
        if (data.data.type == "success") {
          _this.$router.push({
            path: '/home1.html'
          });
        }
        return;
      }).catch(err => {
        alert("注册失败");
      });
    }
  }
}
</script>

<style>

</style>
