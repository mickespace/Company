// mgPage.OnLoaded = function () {
//     mgPage.SetTitle('项目概况')
// define the item component
var app = new Vue({
    el: "#app",
    data: {
        IsBusy: false,
        SelectedIds: [],
        UserList: [{
            "_id": "ObjectI4", //成员Id
            "UserInfo": {
                "UserId": "ObjectId4", //用户Id
                "Email": "xxx@qq.com", //用户邮箱
                "PhoneNumber": "(86)136xxxxxxxx", //用户手机号
                "RealName": "张三", //用户真实姓名
                "Avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503480227216&di=fea9489f242255b2409477c574b8cdee&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D763968628%2C2435880126%26fm%3D214%26gp%3D0.jpg" //用户头像
            }
        }, {
            "_id": "ObjectId3", //成员Id
            "UserInfo": {
                "UserId": "ObjectId3", //用户Id
                "Email": "xxx@qq.com", //用户邮箱
                "PhoneNumber": "(86)136xxxxxxxx", //用户手机号
                "RealName": "张三", //用户真实姓名
                "Avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503480227216&di=fea9489f242255b2409477c574b8cdee&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D763968628%2C2435880126%26fm%3D214%26gp%3D0.jpg" //用户头像
            }
        }, {
            "_id": "ObjectId2", //成员Id
            "UserInfo": {
                "UserId": "ObjectId2", //用户Id
                "Email": "xxx@qq.com", //用户邮箱
                "PhoneNumber": "(86)136xxxxxxxx", //用户手机号
                "RealName": "张三", //用户真实姓名
                "Avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503480227216&di=fea9489f242255b2409477c574b8cdee&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D763968628%2C2435880126%26fm%3D214%26gp%3D0.jpg" //用户头像
            }
        }, {
            "_id": "ObjectId1", //成员Id
            "UserInfo": {
                "UserId": "ObjectId5", //用户Id
                "Email": "xxx@qq.com", //用户邮箱
                "PhoneNumber": "(86)136xxxxxxxx", //用户手机号
                "RealName": "张三", //用户真实姓名
                "Avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503480227216&di=fea9489f242255b2409477c574b8cdee&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D763968628%2C2435880126%26fm%3D214%26gp%3D0.jpg" //用户头像
            }
        }, ],
    },
    methods: {
        LoadData: function () {
            //加载人员
            app.UserList.forEach(function (element) {
                element["IsChecked"] = false;
            }, this);
        },
        SelectedItem: function (data) {
            //判断是否存在集合当中，不存在加入到集合当中      
            var index = -1;
            for (var i = 0; i < app.SelectedIds.length; i++) {
                if (app.SelectedIds[i] == data.UserInfo.UserId) {
                    index = i;
                    break;
                }
            }
            if (index != -1) {
                //移除key
                delete app.SelectedIds[index];
            } else {
                //加入到集合中
                app.SelectedIds.push(data.UserInfo.UserId);
            }
            //改变集合状态
            data.IsChecked = !data.IsChecked
            var tempList = app.UserList;
            app.UserList = [];
            app.UserList = tempList;
            var alertString = JSON.stringify(app.SelectedIds);
            alert(alertString);
        },
        SubmitIds: function () {

        }

    }
})

$(function () {
    app.LoadData();
});

// };