var eld_tax_table = require("./../eld_tax_table");
import * as echarts from '../../ec-canvas/echarts';
Page({
    data: {
        params: {}
    },
    onLoad: function(options){
        var queryBean = JSON.parse(options.params);
        this.setData({
            params: queryBean
        });
        //拿到去除五险一金之后剩余的工资
        if(this.data.params.custom51){
            var endowment = parseFloat(this.data.params.endowment);
            var medical = parseFloat(this.data.params.medical);
            var unemployment = parseFloat(this.data.params.unemployment);
            var injury = parseFloat(this.data.params.injury);
            var childbirth = parseFloat(this.data.params.childbirth);
            var housing = parseFloat(this.data.params.housing);
            var moneyForTax = parseFloat(this.data.params.salary)-endowment-medical-unemployment-injury-childbirth-housing; 
        }else{
            var moneyForTax = parseFloat(this.data.params.salary)*0.778; 
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
        console.log((moneyForTax-(moneyForTaxStart*rate-subNum)).toFixed(2));
        




    }
})