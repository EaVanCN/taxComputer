Page({
    data: {
        params: {}
    },
    onLoad: function(options){
        var queryBean = JSON.parse(options.params);
        this.setData({
            params: queryBean
        })
    }
})