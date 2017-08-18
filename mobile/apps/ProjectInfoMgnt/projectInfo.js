mgPage.OnLoaded = function () {
    mgPage.SetTitle('项目概况')
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
                //获取项目信息
                var map = new Array('Name', 'Icon', 'Description');
                mgContext.GetCurrentProject(map, function (r) {
                    //mgDialog.Alert("项目信息", JSON.stringify(r));

                });
                //设置title
                mgContext.GetProjectId(function (projectId) {
                    var urlData = {
                        ProjectId: projectId
                    };
                    mgWeb.GetResult({
                        apiPath: "v1/project/property/info",
                        urlParam: {
                            ProjectId: projectId
                        },
                        showProgress: true
                    }, function (res) {
                        if (!res.IsOk) {
                            mgLog.Error("读取概况信息错误", "");
                            return;
                        }
                        app.ProjectInfo.Properties = res.Data;
                    });
                });
            }
        }
    })

    $(function () {
        app.LoadData();
    });
};