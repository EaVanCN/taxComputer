//index.js
//获取应用实例
var utils = require("../../utils/util");
const app = getApp()

Page({
  data: {
    custom51: false,
    salary: 0,
    switchStatus: "nonSel",
    endowment: 0,
    medical: 0,
    unemployment: 0,
    housing: 0,
    total: 0,
    startPoint: 3500,
    copFull: false
  },
  changStatus: function(e){
    var curStatus = (this.data.custom51 ? "nonSel" : "sel");
    this.setData({
      switchStatus: curStatus,
      custom51: !this.data.custom51
    })
  },
  routeToChart: function(){
    //首先验证税前工资填没填
    if(this.data.salary == 0){
      wx.showToast({
        title: '请正确输入工资~',
        icon: "none",
        duration: 2000
      })
      return;
    };
    var param = this.getSalaryObj();
    if(param.salary < param.total){
      wx.showToast({
        title: '哇~ 社保比工资都高',
        icon: "none",
        duration: 2000
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/chart/chart?params='+ JSON.stringify(param)
    })
  },
  getMoney: function(e){
    var curInput = e.currentTarget.id;
    this.data[curInput] = utils.get2Number(e.detail.value);
  },
  getSalaryObj: function(){
    var obj = {};
    if(this.data.custom51){
      obj.custom51 = this.data.custom51;
      obj.salary = this.data.salary;
      var endowment = this.data.endowment;
      var medical = this.data.medical;
      var unemployment = this.data.unemployment;
      var housing = this.data.housing;
      obj.total = endowment + medical + unemployment + housing;
      obj.startPoint = this.data.startPoint;
      obj.copFull = this.data.copFull;
    }else{
      obj.custom51 = this.data.custom51;
      obj.salary = this.data.salary;
      obj.total = this.data.total;
      obj.startPoint = this.data.startPoint;
      obj.copFull = this.data.copFull;
    }
    return obj;
  },
  checkboxChange: function(e) {
    this.setData({
      copFull: e.detail.value.length > 0 ? true : false
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '分享个税计算器',
      path: '/page/index/index'
    }
  }
})
