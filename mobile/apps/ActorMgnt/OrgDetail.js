// mgPage.OnLoaded = function () {
//     mgPage.SetTitle('项目概况')
var app = new Vue({
    el: "#app",
    data: {
        IsEdit: false,
        IsUserEdit: false,
        IsRoleEdit: false,
        OrgInfo: {
            "_id": "ObjectId", //组织Id
            "ProjectId": "ObjectId", //项目Id
            "ParentId": "ObjectId", //父组织Id
            "Name": "深圳筑星科技有限公司", //组织名称
            "Description": "组织描述", //组织描述
            "Creator": {
                "_id": "ObjectId", //用户Id
                "Email": "xxx@qq.com", //邮箱
                "PhoneNumber": "(86)136xxxxxxxx", //手机号
                "RealName": "超级管理员" //真实姓名
            },
            "CreatedDate": " /Date/", //创建时间
            "Roles": [{
                "_id": "ObjectId", //角色Id
                "Name": "超级管理员" //角色名称
            }]
        },
        MemberList: [{
            "_id": "ObjectId", //成员Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //成员真实姓名
        }, {
            "_id": "ObjectId", //成员Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //成员真实姓名
        }, {
            "_id": "ObjectId", //成员Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //成员真实姓名
        }, {
            "_id": "ObjectId", //成员Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //成员真实姓名
        }, {
            "_id": "ObjectId", //成员Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //成员真实姓名
        }, {
            "_id": "ObjectId", //成员Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //成员真实姓名
        }, ]
    },
    methods: {
        LoadData: function () {

        },
        OrgEdit: function () {
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