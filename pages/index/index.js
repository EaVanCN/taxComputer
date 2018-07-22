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
    startPoint: 3500
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
    if(this.data.salary == "0"){
      wx.showModal({
        title: '提示',
        content: '请正确输入工资~'
      })
      return;
    }
    var param = this.getSalaryObj();
    wx.navigateTo({
      url: '/pages/chart/chart?params='+ JSON.stringify(param)
    })
  },
  getMoney: function(e){
    var curInput = e.currentTarget.id;
    this.data[curInput] = e.detail.value;
  },
  getSalaryObj: function(){
    var obj = {};
    if(this.data.custom51){
      obj.custom51 = utils.get2Number(this.data.custom51);
      obj.salary = utils.get2Number(this.data.salary);
      var endowment = utils.get2Number(this.data.endowment);
      var medical = utils.get2Number(this.data.medical);
      var unemployment = utils.get2Number(this.data.unemployment);
      var housing = utils.get2Number(this.data.housing);
      obj.total = endowment + medical + unemployment + housing;
      obj.startPoint = utils.get2Number(this.data.startPoint);
    }else{
      obj.custom51 = utils.get2Number(this.data.custom51);
      obj.salary = utils.get2Number(this.data.salary);
      obj.total = utils.get2Number(this.data.total);
      obj.startPoint = utils.get2Number(this.data.startPoint);
    }
    return obj;
  }
})
