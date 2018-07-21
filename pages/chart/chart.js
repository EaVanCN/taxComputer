var eld_tax_table = require("./../eld_tax_table");
var utils = require("../../utils/util");
import * as echarts from '../../ec-canvas/echarts';
Page({
    data: {
        realSalary:0,
        tax:0,
        params: {},
        oldChart: {
          lazyLoad: true
        },
        newChart:{
          lazyLoad: true
        },
        //暂时存放个人各种费用对象，用以呈现
        personObj: []
    },
    onReady: function(){
      this.old_ecComponent = this.selectComponent('#old-chart');
      this.new_ecComponent = this.selectComponent('#new-chart');
      this.init();
    },
    onLoad: function(options){
        var queryBean = JSON.parse(options.params);
        this.setData({
            params: queryBean
        });
        //拿到去除五险一金之后剩余的工资
        if(this.data.params.custom51){
            //自定义五险一金的情况
            var endowment = this.data.params.endowment;
            var medical = this.data.params.medical;
            var unemployment = this.data.params.unemployment;
            var injury = this.data.params.injury;
            var childbirth = this.data.params.childbirth;
            var housing = this.data.params.housing;
            var moneyForTax = this.data.params.salary-endowment-medical-unemployment-injury-childbirth-housing; 
        }else{
            //默认按比例扣除五险一金的情况
            var endowment = utils.get2Number(this.data.params.salary*0.08);
            var medical = utils.get2Number(this.data.params.salary*0.02);
            var unemployment = utils.get2Number(this.data.params.salary*0.002);
            var injury = utils.get2Number(this.data.params.salary*0);
            var childbirth = utils.get2Number(this.data.params.salary*0);
            var housing = utils.get2Number(this.data.params.salary*0.12);
            var moneyForTax = utils.get2Number(this.data.params.salary*0.778); 
        }
        //通过起征点计算需计算税额的部分
        var moneyForTaxStart = moneyForTax-3500 > 0 ? moneyForTax-3500 : moneyForTax;
        //查找对应的税率和应减数
        if(moneyForTax-3500 > 0){
            var curTaxRate = eld_tax_table.taxIndex.filter(function(item,index,arr){
                var curTax = parseInt(item);
                var nextTax = parseInt(arr[index+1]);
                if(nextTax && moneyForTaxStart>curTax && moneyForTaxStart<=nextTax){
                    return curTax;
                }
            })
            var rate = eld_tax_table.taxObj[curTaxRate+""].rate;
            var subNum = eld_tax_table.taxObj[curTaxRate+""].subNum;
        }else{
            var rate = 0;
            var subNum = 0;
        }
        //计算实际到手的收入
        this.data.tax = moneyForTaxStart*rate-subNum;
        this.data.realSalary = (moneyForTax-(moneyForTaxStart*rate-subNum)).toFixed(2);  
        this.data.personObj.push({
          name: "养老保险",
          value: endowment
        });
        this.data.personObj.push({
          name: "医疗保险",
          value: medical
        });
        this.data.personObj.push({
          name: "失业保险",
          value: unemployment
        });
        this.data.personObj.push({
          name: "公积金",
          value: housing
        });
        this.data.personObj.push({
          name: "个人所得税",
          value: this.data.tax
        });
        this.data.personObj.push({
          name: "实际发放",
          value: this.data.realSalary
        });
      },
    init: function(){
      this.old_ecComponent.init(this.initChart);
      this.new_ecComponent.init(this.initChart);
    },
    initChart: function(canvas, width, height) {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(chart);
      var option = {
        backgroundColor: "#ffffff",
        color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
        series: [{
          label: {
            normal: {
              fontSize: 14
            }
          },
          type: 'pie', 
          center: ['50%', '50%'],
          radius: [0, '60%'],
          data: this.data.personObj
        }]
      };
    
      chart.setOption(option);
      return chart;
    },
    getSalaryObj: function(params,taxForm){
      if(params.custom51){
        //自定义五险一金的情况
        var endowment = params.endowment;
        var medical = params.medical;
        var unemployment = params.unemployment;
        var housing = params.housing;
        var moneyForTax = params.salary-endowment-medical-unemployment-housing; 
      }else{
        //默认按比例扣除五险一金的情况
        var endowment = utils.get2Number(params.salary*0.08);
        var medical = utils.get2Number(params.salary*0.02);
        var unemployment = utils.get2Number(params.salary*0.002);
        var housing = utils.get2Number(params.salary*0.12);
        var moneyForTax = utils.get2Number(params.salary*0.778); 
      }
      //通过起征点计算需计算税额的部分
      var moneyForTaxStart = moneyForTax-3500;
      //查找对应的税率和应减数
      if(moneyForTax-3500 > 0){
          var curTaxRate = taxForm.taxIndex.filter(function(item,index,arr){
              var curTax = parseInt(item);
              var nextTax = parseInt(arr[index+1]);
              if(nextTax && moneyForTaxStart>curTax && moneyForTaxStart<=nextTax){
                  return curTax;
              }
          })
          var rate = taxForm.taxObj[curTaxRate+""].rate;
          var subNum = taxForm.taxObj[curTaxRate+""].subNum;
      }else{
          var rate = 0;
          var subNum = 0;
      }
      //实际需缴纳的税和实际到手工资
      var realtax = moneyForTaxStart*rate-subNum;
      var realSalary = (moneyForTax-(moneyForTaxStart*rate-subNum)).toFixed(2);  
      




    }

})

function drawPie(canvas, width, height){
//绘制饼图
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var option = {
    type : "pie"
  }


}


