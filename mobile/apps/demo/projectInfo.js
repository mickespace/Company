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
            app.IsBusy = true;
            setTimeout(function () {
                app.IsBusy = false;
            }, 4000);
            // $.ajax({
            //     type: 'get',
            //     timeout: 10000,
            //     url: "https://www.baidu.com",
            //     data: null,
            //     dataType: 'json',
            //     success: function (res) {
            //         app.IsBusy = false;
            //         if (!res.IsOk) {

            //             return;
            //         }
            //         app.Login();
            //     },
            //     error: function (res) {
            //         app.IsBusy = false;
            //         return;
            //     }
            // });
        }
    }
})

$(function () {
    app.LoadData();
});