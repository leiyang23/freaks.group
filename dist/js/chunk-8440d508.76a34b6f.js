(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8440d508"],{6213:function(t,e,a){"use strict";var n=a("c929"),o=a.n(n);o.a},"745d":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page"},[a("el-button",{staticClass:"btn",attrs:{type:"primary",icon:"el-icon-folder-add"},on:{click:t.select}},[t._v(" 选择图片")]),a("form",{attrs:{id:"myForm",name:"myForm"}},[a("input",{staticStyle:{opacity:"0",width:"0",height:"0"},attrs:{type:"file",id:"file",name:"image",accept:"image/*"},on:{change:t.upload}})]),a("el-row",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}]},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.text,expression:"text"}],attrs:{cols:"100",rows:"20"},domProps:{value:t.text},on:{input:function(e){e.target.composing||(t.text=e.target.value)}}})])],1)},o=[],i={name:"index",data:function(){return{loading:!1,text:""}},mounted:function(){},methods:{select:function(){document.getElementById("file").click()},upload:function(){var t=this,e=new FormData(document.getElementById("myForm"));document.getElementById("file").files.length<=0?t.$message.info("未选择文件！"):(t.text="",t.loading=!0,t.$http({method:"POST",url:"/ai/ocr",headers:{"Content-Type":"multipart/form-data;charset=utf8"},data:e}).then((function(e){t.loading=!1;var a=e.data;if(0==a.errcode)if(a.data.words_result_num>0)for(var n=0;n<a.data.words_result_num;n++)t.text=t.text+a.data.words_result[n].words+"\n";else t.text="未识别到文字！";else t.$message.error("服务器错误")})).catch((function(t){window.console.log(t)})))}}},r=i,l=(a("6213"),a("2877")),s=Object(l["a"])(r,n,o,!1,null,"3b4e5a0c",null);e["default"]=s.exports},c929:function(t,e,a){}}]);
//# sourceMappingURL=chunk-8440d508.76a34b6f.js.map