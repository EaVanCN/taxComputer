var eld_tax_table = require("./../eld_tax_table");
var new_tax_table = require("./../new_tax_table");
var utils = require("../../utils/util");
import * as echarts from '../../ec-canvas/echarts';
Page({
    data: {
      params: {},
      oldChart: {
        lazyLoad: true
      },
      newChart:{
        lazyLoad: true
      },
      taxForm: {}
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

    },
    init: function(){
      this.old_ecComponent.init(this.initOldChart);
      this.new_ecComponent.init(this.initNewChart);
    },
    initOldChart: function(canvas, width, height) {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(chart);
      chart.setOption(this.getOptions(this.data.params,this.data.params.startPoint,eld_tax_table));
      chart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: 0});
      chart.on('mouseover',(v) => {
        if(v.dataIndex != 0){
          chart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: 0
          });
        }
      });
      return chart;
    },
    initNewChart: function(canvas, width, height) {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(chart);
      chart.setOption(this.getOptions(this.data.params, 5000, new_tax_table));
      chart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: 0});
      chart.on('mouseover',(v) => {
        if(v.dataIndex != 0){
          chart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: 0
          });
        }
      });
      return chart;
    },
    getOptions: function(params, startPoint, taxForm){
      return {
        title : {
          text: taxForm.taxType ? "改革后工资情况" : "改革前工资情况",
          textStyle:{
            color: "#777",
            fontFamily: "monospace",
            fontSize: 14
          },
          x:'center'
        },
        legend: {
          orient: 'horizontal',
          left: 'center',
          bottom: '10%',
          data: ['五险一金','个人所得税','实发工资']
        },
        series: [{
          type: 'pie', 
          label:{
            normal: {
              show: false,
              position: 'center',
              formatter: '{b}\n{c}'
            },
            emphasis: {
              show: true,
              textStyle: {
                  fontSize: '13',
                  fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
                show: false
            }
          },
          avoidLabelOverlap: false,
          startAngle: 270,
          center: ['50%', '45%'],
          radius: ['40%', '60%'],
          data: this.getSalaryObj(params, startPoint, taxForm)
        }]
      };
    },
    getSalaryObj: function(params,startPoint,taxForm){
      if(params.custom51){
        //自定义五险一金的情况
        var total = params.total;
        var moneyForTax = params.salary-total; 
      }else{
        //默认按比例扣除五险一金的情况
        var total = utils.get2Number(params.salary*0.222); 
        var moneyForTax = params.salary-total; 
      }
      //通过起征点计算需计算税额的部分
      var moneyForTaxStart = moneyForTax-startPoint;
      //查找对应的税率和应减数
      if(moneyForTaxStart > 0){
          var curTaxRate = taxForm.taxIndex.filter(function(item,index,arr){
              var curTax = item;
              var nextTax = arr[index+1];
              if((nextTax && moneyForTaxStart>curTax && moneyForTaxStart<=nextTax)||!nextTax){
                  return curTax;
              }
          })
          var rate = taxForm.taxObj[curTaxRate[0]+""].rate;
          var subNum = taxForm.taxObj[curTaxRate[0]+""].subNum;
      }else{
          var rate = 0;
          var subNum = 0;
      }
      //实际需缴纳的税和实际到手工资
      var real51 = total;
      var realtax = utils.get2Number(moneyForTaxStart*rate-subNum);
      var realSalary = (moneyForTax-(moneyForTaxStart*rate-subNum)).toFixed(2);  
      var showArr = [];
      if(realSalary != 0){
        showArr.push({
          name: "实发工资",
          value: realSalary
        })
      }
      if(real51 != 0){
        showArr.push({
          name: "五险一金",
          value: real51
        })
      }
      if(realtax != 0){
        showArr.push({
          name: "个人所得税",
          value: realtax
        })
      }
      return showArr;
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


