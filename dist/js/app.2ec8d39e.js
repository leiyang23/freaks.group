(function(e){function t(t){for(var s,n,d=t[0],i=t[1],r=t[2],l=0,f=[];l<d.length;l++)n=d[l],Object.prototype.hasOwnProperty.call(a,n)&&a[n]&&f.push(a[n][0]),a[n]=0;for(s in i)Object.prototype.hasOwnProperty.call(i,s)&&(e[s]=i[s]);p&&p(t);while(f.length)f.shift()();return o.push.apply(o,r||[]),c()}function c(){for(var e,t=0;t<o.length;t++){for(var c=o[t],s=!0,n=1;n<c.length;n++){var d=c[n];0!==a[d]&&(s=!1)}s&&(o.splice(t--,1),e=i(i.s=c[0]))}return e}var s={},n={app:0},a={app:0},o=[];function d(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-2d0ba48c":"78d7e380","chunk-2d0e26b8":"b580d368","chunk-4bde2a34":"e10ce724","chunk-5d0c8cd3":"6f826344","chunk-63c4f602":"54049555","chunk-689a894c":"8cb25b0b","chunk-8440d508":"f6a19442"}[e]+".js"}function i(t){if(s[t])return s[t].exports;var c=s[t]={i:t,l:!1,exports:{}};return e[t].call(c.exports,c,c.exports,i),c.l=!0,c.exports}i.e=function(e){var t=[],c={"chunk-4bde2a34":1,"chunk-5d0c8cd3":1,"chunk-63c4f602":1,"chunk-689a894c":1,"chunk-8440d508":1};n[e]?t.push(n[e]):0!==n[e]&&c[e]&&t.push(n[e]=new Promise((function(t,c){for(var s="css/"+({}[e]||e)+"."+{"chunk-2d0ba48c":"31d6cfe0","chunk-2d0e26b8":"31d6cfe0","chunk-4bde2a34":"2ff8e589","chunk-5d0c8cd3":"70594f0d","chunk-63c4f602":"781a9b29","chunk-689a894c":"3688affa","chunk-8440d508":"21c72ed3"}[e]+".css",a=i.p+s,o=document.getElementsByTagName("link"),d=0;d<o.length;d++){var r=o[d],l=r.getAttribute("data-href")||r.getAttribute("href");if("stylesheet"===r.rel&&(l===s||l===a))return t()}var f=document.getElementsByTagName("style");for(d=0;d<f.length;d++){r=f[d],l=r.getAttribute("data-href");if(l===s||l===a)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var s=t&&t.target&&t.target.src||a,o=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=s,delete n[e],p.parentNode.removeChild(p),c(o)},p.href=a;var m=document.getElementsByTagName("head")[0];m.appendChild(p)})).then((function(){n[e]=0})));var s=a[e];if(0!==s)if(s)t.push(s[2]);else{var o=new Promise((function(t,c){s=a[e]=[t,c]}));t.push(s[2]=o);var r,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=d(e);var f=new Error;r=function(t){l.onerror=l.onload=null,clearTimeout(p);var c=a[e];if(0!==c){if(c){var s=t&&("load"===t.type?"missing":t.type),n=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+s+": "+n+")",f.name="ChunkLoadError",f.type=s,f.request=n,c[1](f)}a[e]=void 0}};var p=setTimeout((function(){r({type:"timeout",target:l})}),12e4);l.onerror=l.onload=r,document.head.appendChild(l)}return Promise.all(t)},i.m=e,i.c=s,i.d=function(e,t,c){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:c})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var c=Object.create(null);if(i.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(c,s,function(t){return e[t]}.bind(null,s));return c},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i.oe=function(e){throw console.error(e),e};var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=t,r=r.slice();for(var f=0;f<r.length;f++)t(r[f]);var p=l;o.push([0,"chunk-vendors"]),c()})({0:function(e,t,c){e.exports=c("56d7")},"13e9":function(e,t,c){},"2a40":function(e,t,c){"use strict";var s=c("5e1a"),n=c.n(s);n.a},"2daa":function(e,t,c){"use strict";c.d(t,"a",(function(){return n})),c.d(t,"b",(function(){return a}));var s=!1,n="",a="";s?(n="http://localhost:9000",a="ws://localhost:9000"):(n="http://api.freaks.group",a="ws://api.freaks.group")},"349c":function(e,t,c){"use strict";c.r(t);var s=function(){var e=this,t=e.$createElement,c=e._self._c||t;return c("div",[c("h1",[e._v("主机监控")]),c("div",{staticClass:"os-info"},[c("router-link",{attrs:{to:"/monitor/terminal"}},[c("el-tag",{attrs:{type:"success"}},[e._v("操作系统："+e._s(e.return_messages.os.system))])],1),c("el-tag",[e._v("版本："+e._s(e.return_messages.os.version))]),c("span",{staticClass:"work-time"},[e._v("运行时长："+e._s(e.return_messages.work_time.days)+" 天 "+e._s(e.return_messages.work_time.hours)+" 小时 "+e._s(e.return_messages.work_time.minutes)+" 分钟")])],1),c("div",{staticClass:"monitors"},[c("div",{staticClass:"monitor-item"},[c("div",{staticClass:"title"},[e._v("负载状态")]),c("el-progress",{attrs:{type:"circle",percentage:e.return_messages.load.mins_5,color:e.return_messages.load.mins_5>50?"red":""}}),c("div",{staticClass:"footer"},[e._v(e._s(e.return_messages.load.mins_1/e.return_messages.cpu.cores>5?"超负荷":"运行流畅"))])],1),c("div",{staticClass:"monitor-item"},[c("div",{staticClass:"title"},[e._v("CPU 使用率")]),c("el-progress",{attrs:{type:"circle",percentage:e.return_messages.cpu.load,color:e.return_messages.cpu.load>50?"red":""}}),c("div",{staticClass:"footer"},[e._v(e._s(e.return_messages.cpu.cores)+" 核心")])],1),c("div",{staticClass:"monitor-item"},[c("div",{staticClass:"title"},[e._v("内存使用率")]),c("el-progress",{attrs:{type:"circle",percentage:e.return_messages.memory.percent,color:e.return_messages.memory.percent>50?"red":""}}),c("div",{staticClass:"footer"},[e._v(e._s(e._f("Bytes2MB")(e.return_messages.memory.used))+" / "+e._s(e._f("Bytes2MB")(e.return_messages.memory.total))+" (MB) ")])],1),c("div",{staticClass:"monitor-item"},[c("div",{staticClass:"title"},[e._v(" /")]),c("el-progress",{attrs:{type:"circle",percentage:e.return_messages.disk.percent,color:e.return_messages.disk.percent>50?"red":""}}),c("div",{staticClass:"footer"},[e._v(e._s(e._f("Bytes2GB")(e.return_messages.disk.used))+" / "+e._s(e._f("Bytes2GB")(e.return_messages.disk.total))+" (GB) ")])],1)]),c("div",{attrs:{id:""}})])},n=[],a=c("2daa"),o={name:"Hosts",data:function(){return{socket:"",ws_path:a["b"]+"/ws/monitor/get_host_info",return_messages:{os:{system:"",version:""},work_time:{days:0,hours:0,minutes:0},cpu:{cores:0,load:0},memory:{total:0,used:0,available:3344367616,percent:0},disk:{total:0,used:0,percent:0},load:{mins_1:0,mins_5:0,mins_15:0},conn:278},send_message:""}},filters:{Bytes2GB:function(e){return Math.floor(e/1024/1024/1024)},Bytes2MB:function(e){return Math.floor(e/1024/1024)}},mounted:function(){this.init()},methods:{init:function(){"undefined"===typeof WebSocket?this.$message.error("浏览器不支持 websocket !"):(this.socket=new WebSocket(this.ws_path),this.socket.onopen=this.ws_open,this.socket.onerror=this.ws_error,this.socket.onmessage=this.ws_get_message,this.socket.onclose=this.ws_close)},ws_open:function(){this.ws_send(),window.console.log("conn success")},ws_error:function(){window.console.log("conn err"),this.$message.error("websocket 连接出错！")},ws_get_message:function(e){this.return_messages=JSON.parse(e.data).message},ws_close:function(){window.console.warn("conn close"),clearInterval(this.timer)},ws_send:function(){var e=this;e.socket.send(JSON.stringify({message:1})),e.timer=setInterval((function(){e.socket.send(JSON.stringify({message:1}))}),3e3)}},destroyed:function(){clearInterval(this.timer),this.socket.close()}},d=o,i=(c("2a40"),c("2877")),r=Object(i["a"])(d,s,n,!1,null,"0f78d136",null);t["default"]=r.exports},3948:function(e,t,c){},"3a19":function(e,t,c){"use strict";var s=c("13e9"),n=c.n(s);n.a},"56d7":function(e,t,c){"use strict";c.r(t);c("e260"),c("e6cf"),c("cca6"),c("a79d");var s=c("2b0e"),n=function(){var e=this,t=e.$createElement,c=e._self._c||t;return c("div",{attrs:{id:"app"}},[c("el-container",[c("el-aside",{style:{height:e.pageHeight+"px"},attrs:{width:"200px"}},[c("el-row",{staticClass:"aside"},[c("el-row",{staticClass:"nav"},[c("el-row",{staticClass:"logo"},[c("i",{staticClass:"fa fa-user"}),c("span",{staticStyle:{"margin-left":"6px"},on:{click:e.goto_blog}},[e._v("博客")])]),c("el-col",{attrs:{span:24}},[c("el-menu",{staticClass:"menu-aside",attrs:{router:!0,"default-active":"1","background-color":"#3c444d","text-color":"#bbb","active-text-color":"#ffffff"}},[c("el-menu-item-group",[c("template",{slot:"title"},[c("i",{staticClass:"fa fa-television"}),e._v(" "),c("span",{staticStyle:{"font-size":"14px","margin-left":"2px"}},[e._v("监控")])]),c("el-menu-item",{attrs:{index:"1",route:"/monitor/hosts"}},[e._v("主机")]),c("el-menu-item",{attrs:{index:"2",route:"/monitor/services"}},[e._v("服务")])],2),c("el-menu-item-group",[c("template",{slot:"title"},[c("i",{staticClass:"fa fa-server"}),e._v(" "),c("span",{staticStyle:{"font-size":"14px","margin-left":"2px"}},[e._v("应用")])]),c("el-menu-item",{attrs:{index:"3",route:"/apps/imgur"}},[e._v("图床")]),c("el-menu-item",{attrs:{index:"4",route:"/apps/musicVisualization"}},[e._v("频谱")]),c("el-menu-item",{attrs:{index:"5",route:"/apps/ocr"}},[e._v("图像转文字")])],2)],1)],1)],1),c("el-row",{staticClass:"music"},[c("MusicBox")],1)],1)],1),c("el-main",{staticClass:"main",style:{height:e.pageHeight+"px"}},[c("transition",{attrs:{name:"fade"}},[c("router-view")],1)],1)],1)],1)},a=[],o=function(){var e=this,t=e.$createElement,c=e._self._c||t;return c("div",{staticClass:"con"},[c("div",{staticClass:"music-box"},[c("div",[c("i",{staticClass:"fa fa-step-backward",on:{click:e.last}})]),e.is_play?c("div",[c("i",{staticClass:"fa fa-pause",on:{click:e.pause}})]):c("div",[c("i",{staticClass:"fa fa-play",on:{click:e.play}})]),c("div",[c("i",{staticClass:"fa fa-step-forward",on:{click:e.next}})])])])},d=[],i={name:"MusicBox",data:function(){return{urls:["http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33287/98437/cf99d1afa34545e8a1b68151c3e2b609_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33287/98438/11dfc869ce5248eb80966b84a0542863_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33287/98439/942e6e21a6324f74a11fa39cc402dadd_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33287/98444/ae0f1b97e71d4f83a5f11fa278d80e86_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33287/98445/5942dea0d37e4f60a9f8b903047f7bd0_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33287/98446/d2932effd4f04e999bd5740caa3fd6dc_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33287/98447/ab6cca5dc991408aa396dddeedccffb7_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33287/98460/7dfa3688b658488a87292d76e535d5d9_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video19/TMS/cc/33287/98467/faa82ceb212346d3ad0128c96706ee93_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33287/98469/727a3f2bab49442dbf594ff8d42f6f91_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33287/98470/25b3fb948ae642e4b3c1ca47262b2d5a_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33287/98471/ef21072eb26e4ed5878a9f5191f4f4c7_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33287/98472/90294e8eb0fe448e826ba7af3a8c22eb_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33287/98473/e677ebcd12e94d5cbf56c9388a638f99_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/98474/0a0109d72db64e719e4a823e9d3af47f_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/98475/6d1840a1e7fa41e0912b0d3c70af3584_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/98477/c90f0ad6ed32481d8fa4d099e70ab1c9_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/98478/6e71e39df5f3412683c9187c1dd159fa_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/98479/78974f7164854af09d3e5b2be6f9e151_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/98480/f2df28f211dc4a8a8277662cae2ef6fa_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/98481/95c17228b8aa43efbd13981bf59e3c80_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/98482/120820a0887e4aee8783d63135ca4999_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/98483/9dbe07895cd941f4b6da6937070c9c52_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/98484/1c4f39683140402b93eeaa65636cab60_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/98486/affb94791d1d4dd1a4cb7a056ebe95f4_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/98487/bf9f02348eab4f2a839fb3eeb1b41a5d_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/98488/aa03d633daf04ac7a787771f994bdf38_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/98489/2636e969a58640cf8074aae5317bc59f_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/98491/b400db3b2e594be5b3418637a6b2c2f1_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/131496/505f4c9ac9254fe38a1bbeae9e3c1e17_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/131497/0d4998e130f3456999ce5ccf097b600f_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/131498/3e789a3b31c84c6d910435fe599075a8_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/131499/792eaa65ad0d4faf8a58af96999a6d39_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/131500/fef2e7df33af44f5b1b9fa715351078a_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/131501/cf44e886dcc24c2390a124927929271e_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98492/6439248622b34d369f3312b1ebfeaac7_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98493/e2a4127ad09c45acabd00f6ff3e9a741_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98494/06174b4d2e8b403f999ff972389bcdee_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98496/7aa936e697dd415f945e4030f081bd78_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98497/d7aeabd9e87e49d4933616c49aad8c5e_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98498/9bc8abf701ad4056b95565f75692d98c_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98499/0cc794bfc4fa402292a592aeac5a99e1_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98500/65b9d94729a749c7a8c6c2b80d5beace_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98502/8cadb8e43dec4a64890b9d61af5a9ee2_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98505/ce4ec1c5a1754af3b5165514ff32ecbd_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98506/0a30279ffd2c4f1b868ed3f12a7a2753_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98507/7b078b1d1e3c40e582dbca2facad5baf_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98508/b8fa13cf973043bcb61265f473411c47_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98510/810daa7ea17440f7a7870c07de69af14_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98511/9aa1d17140704bb4b3db075ecfa2a7e8_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98513/823dca0d51ba4ab5a792a83ff33f7024_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98514/344c406138b740a8952f86e19ef955d8_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video28/TMS/cc/36294/113095/fec4154deffc4f3a8d64619b546364f5_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video28/TMS/cc/36294/118689/08cdb34278d44914ac732ea952727695_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video28/TMS/cc/36294/118690/67a2df3de1d84caaa83b9c836b20105d_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video28/TMS/cc/36294/118691/6d8b1a23d725412a9ba3032bd036b67b_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video28/TMS/cc/36294/118692/633c0b8218354eda989ee46c7dd0c06e_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video28/TMS/cc/36294/118693/86aa4246ac5d47ba8dc2729ac2ae249c_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video28/TMS/cc/36294/118694/8c175b4a019548f1891256d0d860446c_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video28/TMS/cc/36294/118695/822df44cd50742239ac60de975d93b5b_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video28/TMS/cc/36294/118696/347a1502da52411fa5a864a1d6638e12_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video28/TMS/cc/36294/118697/803a76b517ff4a3189a3a8d672902301_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video28/TMS/cc/36294/118698/9c02bd28202745219bc1351ca5c9d7e9_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video28/TMS/cc/36294/118699/5972a204760a4a6c9a05d219c2e45543_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video28/TMS/cc/36294/118700/15881626ed8a48fdb9e4cbb1dedb7ff8_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video28/TMS/cc/36294/118701/a4354b7019a74bd8a34e3f4ad2641c1c_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video28/TMS/cc/36294/118702/4ffcbc83b9a6414d9f37861a04fef2b4_MP3_192.mp3","http://vod.cntv.lxdns.com/flash/mp4video28/TMS/cc/36294/118703/2f34e9a75fc74b2dbab40ed0d614a896_MP3_192.mp3"],cur_index:0,is_play:!1,sound:null}},mounted:function(){this.init()},methods:{init:function(){var e=this,t=Math.floor(12*Math.random());this.cur_index=t,this.sound=new Audio(this.urls[t]),this.sound.loop=!1,setInterval((function(){e.sound.ended&&e.next()}),1e3)},pause:function(){this.sound.pause(),this.is_play=!1},play:function(){this.sound.play(),this.is_play=!0},next:function(){this.cur_index<this.urls.length?this.cur_index++:this.cur_index=0,this.sound.src=this.urls[this.cur_index],this.sound.play(),this.is_play=!0},last:function(){this.cur_index>0?this.cur_index--:this.cur_index=this.urls.length-1,this.sound.src=this.urls[this.cur_index],this.sound.play(),this.is_play=!0}}},r=i,l=(c("3a19"),c("2877")),f=Object(l["a"])(r,o,d,!1,null,"0646e3b9",null),p=f.exports,m={components:{MusicBox:p},data:function(){return{pageHeight:0}},mounted:function(){this.pageHeight=document.body.clientHeight;var e=this;window.addEventListener("resize",(function(){e.pageHeight=document.body.clientHeight}))},methods:{goto_blog:function(){window.open("https://leiyang23.github.io/blog/")}}},u=m,h=(c("5c25"),Object(l["a"])(u,n,a,!1,null,"16620e52",null)),v=h.exports,_=(c("d3b7"),c("8c4f")),b=c("349c");s["default"].use(_["a"]);var M=[{path:"/",name:"hosts",component:b["default"]},{path:"/monitor",component:function(){return c.e("chunk-689a894c").then(c.bind(null,"b3e2"))},children:[{path:"hosts",component:function(){return Promise.resolve().then(c.bind(null,"349c"))}},{path:"terminal",component:function(){return c.e("chunk-63c4f602").then(c.bind(null,"fb60"))}},{path:"services",component:function(){return c.e("chunk-2d0ba48c").then(c.bind(null,"370b"))}}]},{path:"/apps",component:function(){return c.e("chunk-2d0e26b8").then(c.bind(null,"7f2e"))},children:[{path:"imgur/",component:function(){return c.e("chunk-5d0c8cd3").then(c.bind(null,"7e5a"))}},{path:"musicVisualization/",component:function(){return c.e("chunk-4bde2a34").then(c.bind(null,"a625"))}},{path:"ocr/",component:function(){return c.e("chunk-8440d508").then(c.bind(null,"745d"))}}]}],g=new _["a"]({routes:M}),x=g,S=c("2f62");s["default"].use(S["a"]);var P=new S["a"].Store({state:{},mutations:{},actions:{},modules:{}}),T=c("5c96"),y=c.n(T),k=(c("0fae"),c("bc3a")),w=c.n(k),C=c("4328"),B=c.n(C),O=c("2daa"),j=w.a.create({baseURL:O["a"]});j.interceptors.request.use((function(e){if("post"===e.method){if("multipart/form-data;charset=utf8"===e.headers["Content-Type"].toLowerCase())return e;e.data=B.a.stringify(e.data)}return e}),(function(e){return Promise.reject(e)})),j.interceptors.response.use((function(e){return e}),(function(e){return Promise.reject(e)}));var E={http:j};c("7f10"),c("68b6");s["default"].use(y.a),s["default"].config.productionTip=!1,s["default"].prototype.$http=E.http,new s["default"]({router:x,store:P,render:function(e){return e(v)}}).$mount("#app")},"5c25":function(e,t,c){"use strict";var s=c("3948"),n=c.n(s);n.a},"5e1a":function(e,t,c){},"68b6":function(e,t,c){}});
//# sourceMappingURL=app.2ec8d39e.js.map