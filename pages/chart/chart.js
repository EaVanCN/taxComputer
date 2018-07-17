var eld_tax_table = require("./../eld_tax_table");
Page({
    data: {
        params: {}
    },
    onLoad: function(options){
        var queryBean = JSON.parse(options.params);
        this.setData({
            params: queryBean
        });
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
        var moneyForTaxStart = moneyForTax-3500;
        var curTaxRate = eld_tax_table.taxIndex.filter(function(item,index,arr){
            var curTax = parseInt(item);
            var nextTax = parseInt(arr[index+1]);
            if(nextTax && moneyForTaxStart>curTax && moneyForTaxStart<=nextTax){
                return curTax;
            }
        })

        var rate = eld_tax_table.taxObj[curTaxRate+""].rate;
        var subNum = eld_tax_table.taxObj[curTaxRate+""].subNum;
        console.log((moneyForTax-(moneyForTaxStart*rate-subNum)).toFixed(2));



    }
})