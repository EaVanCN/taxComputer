var eld_tax_index = [0,3000,12000,25000,35000,55000,80000];
var eld_tax_table = {
    "0": {
        rate: 0.03,
        subNum: 0
    },
    "3000": {
        rate: 0.1,
        subNum: 210
    },
    "12000": {
        rate: 0.2,
        subNum: 1410
    },
    "25000": {
        rate: 0.25,
        subNum: 2660
    },
    "35000": {
        rate: 0.3,
        subNum: 4410
    },
    "55000": {
        rate: 0.35,
        subNum: 7160
    },
    "80000": {
        rate: 0.45,
        subNum: 15160
    }
}
module.exports.taxIndex = eld_tax_index;
module.exports.taxObj = eld_tax_table;
//用来标记是新版or老版个税表
module.exports.taxType = true;