// mgPage.OnLoaded = function () {
//     mgPage.SetTitle('项目概况')
// define the item component
var app = new Vue({
    el: "#app",
    data: {
        IsBusy: false,
        SelectedIds: [],
        RoleList: [{
            "_id": "ObjectId1", //角色Id
            Name: "管理员", //角色名称
            "IsDefault": true, //是否是系统默认角色，系统默认角色不能被删除
            "Description": "角色描述", //角色描述
            "CreatedDate": "12542545555555555555555555" //创建时间
        }, {
            "_id": "ObjectId2", //角色Id
            Name: "管理员", //角色名称
            "IsDefault": false, //是否是系统默认角色，系统默认角色不能被删除
            "Description": "角色描述", //角色描述
            "CreatedDate": "2017-12-12" //创建时间
        }, {
            "_id": "ObjectId3", //角色Id
            Name: "管理员", //角色名称
            "IsDefault": true, //是否是系统默认角色，系统默认角色不能被删除
            "Description": "角色描述", //角色描述
            "CreatedDate": "12542545555555555555555555" //创建时间
        }, {
            "_id": "ObjectId4", //角色Id
            Name: "管理员", //角色名称
            "IsDefault": false, //是否是系统默认角色，系统默认角色不能被删除
            "Description": "角色描述", //角色描述
            "CreatedDate": "2017-12-12" //创建时间
        }, {
            "_id": "ObjectId5", //角色Id
            Name: "管理员", //角色名称
            "IsDefault": true, //是否是系统默认角色，系统默认角色不能被删除
            "Description": "角色描述", //角色描述
            "CreatedDate": "12542545555555555555555555" //创建时间
        }, {
            "_id": "ObjectId6", //角色Id
            Name: "管理员", //角色名称
            "IsDefault": false, //是否是系统默认角色，系统默认角色不能被删除
            "Description": "角色描述", //角色描述
            "CreatedDate": "2017-12-12" //创建时间
        }],
    },
    methods: {
        LoadData: function () {
            //加载人员
        },
        SelectedItem: function (data) {
            //判断是否存在集合当中，不存在加入到集合当中      
            var index = -1;
            for (var i = 0; i < app.SelectedIds.length; i++) {
                if (app.SelectedIds[i] == data._id) {
                    index = i;
                    break;
                }
            }
            if (index != -1) {
                //移除key
                delete app.SelectedIds[index];
            } else {
                //加入到集合中
                app.SelectedIds.push(data._id);
            }
            //改变集合状态
            data.IsChecked = !data.IsChecked
            var tempList = app.RoleList;
            app.RoleList = [];
            app.RoleList = tempList;
            var alertString = JSON.stringify(app.SelectedIds);
            alert(alertString);
        }
    }
})

$(function () {
    app.LoadData();
});

// };