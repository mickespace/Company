 mgPage.OnLoaded = function (selectedUser) {
     var app = new Vue({
         el: "#app",
         data: {
             IsOrgEdit: false,
             IsRoleEdit: false,
             UserInfo: {
                 "_id": "ObjectId", //成员Id
                 "UserInfo": {
                     "UserId": "ObjectId", //用户Id
                     "Email": "xxx@qq.com", //用户邮箱
                     "PhoneNumber": "(86)136xxxxxxxx", //用户手机号
                     "RealName": "张三", //用户真实姓名
                     "Avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503480227216&di=fea9489f242255b2409477c574b8cdee&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D763968628%2C2435880126%26fm%3D214%26gp%3D0.jpg" //用户头像
                 },
                 "JoinDate": "/Date/", //加入项目时间
                 "Orgs": [{
                     "_id": "ObjectId", //组织Id
                     "Name": "研发部" //组织名称
                 }],
                 "Roles": [{
                     "_id": "ObjectId", //角色Id
                     "Name": "管理员" //角色名称
                 }]
             }
         },
         methods: {
             LoadData: function () {
                 var urlData = {
                     Id: selectedUser._id
                 };
                 mgWeb.GetResult({
                     apiPath: "v1/member/info",
                     urlParam: urlData
                 }, function (res) {
                     if (!res.IsOk) {
                         mgLog.Error("读取人员信息失败", "");
                         return;
                     }
                     app.UserInfo = res.Data;
                 });
             },
             OrgEdit: function () {
                 //获取当前人员的组织ids;
                 mgNavi.Go("SelectedOrg.html", "选择组织", app.UserInfo.Orgs);
             },
             RoleEdit: function () {
                 //获取当前角色的ids;
                 mgNavi.Go("SelectedRole.html", "选择角色", app.UserInfo.Roles);
             }
         }
     })

     $(function () {
         app.LoadData();
     });
 };

 mgPage.OnAppearing = function (data) {

 }