//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    custom51: false,
    salary: 0,
    switchStatus: "nonSel",
    endowment: 0,
    medical: 0,
    unemployment: 0,
    injury: 0,
    childbirth: 0,
    housing: 0
  },
  changStatus: function(e){
    var curStatus = (this.data.custom51 ? "nonSel" : "sel");
    this.setData({
      switchStatus: curStatus,
      custom51: !this.data.custom51
    })
  },
  routeToChart: function(){
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
      obj.salary = this.data.salary;
      obj.endowment = this.data.endowment;
      obj.medical = this.data.medical;
      obj.unemployment = this.data.unemployment;
      obj.injury = this.data.injury;
      obj.childbirth = this.data.childbirth;
      obj.housing = this.data.housing;
    }else{
      obj.salary = this.data.salary;
    }
    return obj;
  }
})
