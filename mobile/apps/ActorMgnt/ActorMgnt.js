// mgPage.OnLoaded = function () {
//     mgPage.SetTitle('项目概况')
var app = new Vue({
    el: "#app",
    data: {
        IsBusy: false,
        ProjectInfo: {
            Name: "", //项目名称
            Icon: "Assets/project_bg.jpg", //项目图标
            Description: "sdfasd", //项目描述
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

        }
    }
})

$(function () {
    app.LoadData();
});
// };