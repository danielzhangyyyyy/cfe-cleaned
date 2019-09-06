<template>
  <div></div>
</template>

<script>
import { ACCESS_TOKEN } from "@/store/mutation-types";
import Vue from "vue";

export default {
  data() {
    return {
      websock: null,
      wsAddress: "ws://10.112.28.146:8180/websocket/threadsocket"
    };
  },
  created() {
    //页面刚进入时开启长连接
    this.initWebSocket();
  },
  destroyed: function() {
    //页面销毁时关闭长连接
    this.websocketclose();
  },
  methods: {
    initWebSocket() {
      //初始化weosocket
      let wsuri = "";
      process.env.NODE_ENV === "production"
        ? (wsuri =
            "wss://" + location.host + "/pcg/socket/websocket/announcement")
        : (wsuri =
            "ws://" + location.host + "/pcg/socket/websocket/announcement"); //ws地址
      this.websock = new WebSocket(wsuri);
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      const token = Vue.ls.get(ACCESS_TOKEN);
      this.websock.send(token);
      console.log("WebSocket connected");
    },
    websocketonerror(e) {
      //错误
      console.log("WebSocket connection error");
    },
    websocketonmessage(e) {
      console.log(e);
      this.$store.dispatch("getUnread");
      //数据接收
      const msgCode = ["error", "warning", "success", "info"];
      const msgBcgrdColor = ["#F5222D", "#FAAD14", "#52C41A", "#1890FF"];
      const retData = JSON.parse(e.data); //注意：长连接我们是后台直接1秒推送一条数据，
      //但是点击某个列表时，会发送给后台一个标识，后台根据此标识返回相对应的数据，
      //这个时候数据就只能从一个出口出，所以让后台加了一个键，例如键为1时，是每隔1秒推送的数据，为2时是发送标识后再推送的数据，以作区分
      if (msgCode.includes(retData.code)) {
        this.$notification.open({
          message: retData.code.substr(0,1).toUpperCase()+retData.code.substr(1),
          description: retData.message,
          duration: 0,
          style: { background: msgBcgrdColor[msgCode.indexOf(retData.code)] }
        });
      } else {
        this.$notification.open({
          message: "Notification",
          description: retData.message,
          duration: 0,
          style: { background: "#1890FF" }
        });
      }
    },

    websocketsend(agentData) {
      //数据发送
      this.websock.send(agentData);
    },

    websocketclose(e) {
      //关闭
      //console.log("connection closed (" + e.code + ")");
    }
  }
};
</script>
