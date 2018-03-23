
new Vue({
  el: '#app',
  delimiters: ['[[',']]'],
  data: {
    message: 'Hello from flask + vue',
    socket: null,
    pingCount: 0,
    pingRspData: null,
    jsTime: 0,
    jsTimeDt: 100,
    pyTime: 0
  },
  methods: {
    sendPing: function (){
      this.pingCount += 1
        console.log('send ping ' + this.pingCount)
        console.log(this.socket)
        this.socket.emit('ping-msg', {count: this.pingCount})
    },
    onPingRsp: function(data) {
      this.pingRspData = JSON.stringify(data);
    },
    jsTimeUpdate: function() {
      this.jsTime +=  this.jsTimeDt;
    },
    onPyTime: function(data) {
      this.pyTime = data.t
    }
  },
  mounted () { 
    setInterval(this.jsTimeUpdate, this.jsTimeDt);
    this.socket = io.connect('http://' + document.domain + ':' + location.port);
    this.socket.on('ping-rsp', this.onPingRsp);
    this.socket.on('py-time', this.onPyTime);
  }
})

