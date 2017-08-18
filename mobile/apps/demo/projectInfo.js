var app = new Vue({
    el: "#app",
    data: {
        IsBusy: false,
        ProjectInfo: {
            "Name": "string", //项目名称
            "Icon": "url", //项目图标
            "Description": "string", //项目描述
            "CreatorId": "ObjectId", //项目创建者Id
            "CreatedDate": "/Date/", //项目创建时间
            Properties: [{
                "_id": "id", //主键
                "Name": "项目名", //属性名
                "Value": "煞笔我是一个大煞笔打压达拉斯的煞笔" //属性值
            }, {
                "_id": "id", //主键
                "Name": "项目名", //属性名
                "Value": "煞笔煞笔" //属性值
            }, {
                "_id": "id", //主键
                "Name": "项目名", //属性名
                "Value": "煞笔我是一个大煞笔打压达拉斯的煞笔" //属性值
            }, {
                "_id": "id", //主键
                "Name": "项目名", //属性名
                "Value": "煞笔煞笔" //属性值
            }, {
                "_id": "id", //主键
                "Name": "项目名", //属性名
                "Value": "煞笔煞笔" //属性值
            }, {
                "_id": "id", //主键
                "Name": "项目名", //属性名
                "Value": "煞笔煞笔4" //属性值
            }, {
                "_id": "id", //主键
                "Name": "项目名", //属性名
                "Value": "煞笔煞笔3" //属性值
            }, {
                "_id": "id", //主键
                "Name": "项目名", //属性名
                "Value": "煞笔我是一个大煞笔打压达拉斯的煞笔" //属性值
            }, {
                "_id": "id", //主键
                "Name": "项目名", //属性名
                "Value": "煞笔煞笔2" //属性值
            }, {
                "_id": "id", //主键
                "Name": "项目名", //属性名
                "Value": "煞笔煞笔" //属性值
            }, {
                "_id": "id", //主键
                "Name": "项目名", //属性名
                "Value": "煞笔我是一个大煞笔打压达拉斯的煞笔煞笔我是一个大煞笔打压达拉斯的煞笔煞笔我是一个大煞笔打压达拉斯的煞笔" //属性值
            }, {
                "_id": "id", //主键
                "Name": "项目名", //属性名
                "Value": "煞笔我是一个大煞笔打压达拉煞笔我是一个大煞笔打压达拉斯的煞笔笔" //属性值
            }, {
                "_id": "id", //主键
                "Name": "项目名", //属性名
                "Value": "煞笔我是一个大煞笔打压达拉斯的煞笔" //属性值
            }, {
                "_id": "id", //主键
                "Name": "项目名", //属性名
                "Value": "煞笔我是一个大煞笔打压达拉斯的煞笔" //属性值
            }]
        }

    },
    methods: {
        LoadData: function () {

            //设置title       
            try {
                mgTip.Show("加载数据");
                mgContext.GetProjectId(function (projectId) {
                    var urlData = {
                        ProjectId: projectId
                    };
                    var urlParam = HandleParams(urlData);
                    mgWeb.GetUrl("v1/project/property/info", urlParam, function (res) {
                        if (!res.IsOk) {
                            mgLog.Error("读取概况信息错误", "");
                            return;
                        }
                    });
                })
            } catch (error) {} finally {
                mgTip.Close();
            }

            // $.ajax({
            //     type: "get",
            //     async: false,
            //     url: "http://weather.123.duba.net/static/weather_info/101121301.html",
            //     dataType: "jsonp",
            //     jsonp: "callbackparam", //服务端用于接收callback调用的function名的参数
            //     jsonpCallback: "weather_callback", //callback的function名称
            //     success: function (json) {
            //         //  console.log(json);              //浏览器调试的时候用
            //         app.IsBusy = false;
            //         alert(json.weatherinfo.city);
            //         alert(json.weatherinfo.week);
            //         alert(json.update_time);
            //     },
            //     error: function () {
            //         app.IsBusy = false;
            //         alert('fail');
            //     }
            // });

        }
    }
})

$(function () {
    app.LoadData();
});