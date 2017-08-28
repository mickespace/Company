// mgPage.OnLoaded = function () {
//     mgPage.SetTitle('项目概况')
var app = new Vue({
    el: "#app",
    data: {
        IsUserEdit: false,
        IsRoleEdit: false,
        RoleInfo: {
            "_id": "ObjectId", //角色Id
            "Name": "深圳筑星科技有限公司", //角色名称
            "Description": "组织描述", //角色描述
            "IsDefault": true, //是否是系统默认角色，系统默认角色不能被删除
            "Creator": {
                "_id": "ObjectId", //用户Id
                "Email": "xxx@qq.com", //邮箱
                "PhoneNumber": "(86)136xxxxxxxx", //手机号
                "RealName": "超级管理员" //真实姓名
            },
            "CreatedDate": " /Date/", //创建时间
            "Orgs": [{
                "_id": "ObjectId", //组织Id
                "Name": "组织1" //组织名称
            }, {
                "_id": "ObjectId", //组织Id
                "Name": "组织2" //组织名称
            }],
            "Members": [{
                "_id": "ObjectId", //成员Id
                "Email": "xxx@qq.com", //邮箱
                "PhoneNumber": "(86)136xxxxxxxx", //手机号
                "RealName": "超级管理员" //成员真实姓名
            }, {
                "_id": "ObjectId", //成员Id
                "Email": "xxx@qq.com", //邮箱
                "PhoneNumber": "(86)136xxxxxxxx", //手机号
                "RealName": "超级管理员" //成员真实姓名
            }]
        }
    },
    methods: {
        LoadData: function () {

        },
        UserEdit: function () {
            alert("编辑人员");
        },
        RoleEdit: function () {
            alert("编辑角色");
        }
    }
})

$(function () {
    app.LoadData();
});
// };