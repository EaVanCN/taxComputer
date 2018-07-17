var eld_tax_index = [0,1500,4500,9000,35000,55000,80000];
var eld_tax_table = {
    "0": {
        rate: 0.03,
        subNum: 0
    },
    "1500": {
        rate: 0.1,
        subNum: 105
    },
    "4500": {
        rate: 0.2,
        subNum: 555
    },
    "9000": {
        rate: 0.25,
        subNum: 1005
    },
    "35000": {
        rate: 0.3,
        subNum: 2755
    },
    "55000": {
        rate: 0.35,
        subNum: 5505
    },
    "80000": {
        rate: 0.45,
        subNum: 13505
    }
}
module.exports.taxIndex = eld_tax_index;
module.exports.taxObj = eld_tax_table;
