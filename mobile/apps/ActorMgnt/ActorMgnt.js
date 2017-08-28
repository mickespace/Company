mgPage.OnLoaded = function () {
    mgPage.SetTitle('项目概况');
    Vue.component('item', {
        template: '#item-template',
        props: {
            model: Object
        },
        data: function () {
            return {
                open: false
            }
        },
        computed: {
            isHas: function () {
                return this.model.Children &&
                    this.model.Children.length
            },
            NameCount: function () {
                if (this.model.Children.length > 0)
                    return this.model.Name + " (" + this.model.Children.length + ")";
                return this.model.Name;
            }
        },
        methods: {
            toggle: function () {
                if (this.isHas) {
                    this.open = !this.open
                }
            },
            changeType: function () {
                if (!this.isHas) {
                    Vue.set(this.model, 'Children', [])
                    this.addChild()
                    this.open = true
                }
            },
            OrgDetail: function (org) {
                app.OrgDetail(org);
            },
            addChild: function () {
                this.model.Children.push({
                    Name: '新组织'
                })
            }
        }
    })
    var app = new Vue({
        el: "#app",
        data: {
            IsBusy: false,
            IsUserList: false,
            IsOrgTree: false,
            IsRoleList: false,
            UserList: [{
                "_id": "ObjectId", //成员Id
                "UserInfo": {
                    "UserId": "ObjectId", //用户Id
                    "Email": "xxx@qq.com", //用户邮箱
                    "PhoneNumber": "(86)136xxxxxxxx", //用户手机号
                    "RealName": "张三", //用户真实姓名
                    "Avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503480227216&di=fea9489f242255b2409477c574b8cdee&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D763968628%2C2435880126%26fm%3D214%26gp%3D0.jpg" //用户头像
                }
            }, {
                "_id": "ObjectId", //成员Id
                "UserInfo": {
                    "UserId": "ObjectId", //用户Id
                    "Email": "xxx@qq.com", //用户邮箱
                    "PhoneNumber": "(86)136xxxxxxxx", //用户手机号
                    "RealName": "张三", //用户真实姓名
                    "Avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503480227216&di=fea9489f242255b2409477c574b8cdee&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D763968628%2C2435880126%26fm%3D214%26gp%3D0.jpg" //用户头像
                }
            }, {
                "_id": "ObjectId", //成员Id
                "UserInfo": {
                    "UserId": "ObjectId", //用户Id
                    "Email": "xxx@qq.com", //用户邮箱
                    "PhoneNumber": "(86)136xxxxxxxx", //用户手机号
                    "RealName": "张三", //用户真实姓名
                    "Avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503480227216&di=fea9489f242255b2409477c574b8cdee&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D763968628%2C2435880126%26fm%3D214%26gp%3D0.jpg" //用户头像
                }
            }, {
                "_id": "ObjectId", //成员Id
                "UserInfo": {
                    "UserId": "ObjectId", //用户Id
                    "Email": "xxx@qq.com", //用户邮箱
                    "PhoneNumber": "(86)136xxxxxxxx", //用户手机号
                    "RealName": "张三", //用户真实姓名
                    "Avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503480227216&di=fea9489f242255b2409477c574b8cdee&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D763968628%2C2435880126%26fm%3D214%26gp%3D0.jpg" //用户头像
                }
            }, ],
            OrgTree: [{
                "_id": "ObjectId", //组织Id
                "ProjectId": "ObjectId", //项目Id
                "ParentId": "ObjectId", //父组织Id
                Name: "深圳筑星科技有限公司", //组织名称
                "Description": "组织描述", //组织描述
                "CreatorId": "ObjectId", //创建者Id
                "CreatedDate": " /Date/", //创建时间
                Children: [{
                    "_id": "ObjectId", //组织Id
                    "ProjectId": "ObjectId", //项目Id
                    "ParentId": "ObjectId", //父组织Id
                    Name: "深圳筑星科技有限公司", //组织名称
                    "Description": "组织描述", //组织描述
                    "CreatorId": "ObjectId", //创建者Id
                    "CreatedDate": " /Date/", //创建时间
                    Children: []
                }]
            }, {
                "_id": "ObjectId", //组织Id
                "ProjectId": "ObjectId", //项目Id
                "ParentId": "ObjectId", //父组织Id
                Name: "深圳筑星科技有限公司", //组织名称
                "Description": "组织描述", //组织描述
                "CreatorId": "ObjectId", //创建者Id
                "CreatedDate": " /Date/", //创建时间
                Children: [{
                    "_id": "ObjectId", //组织Id
                    "ProjectId": "ObjectId", //项目Id
                    "ParentId": "ObjectId", //父组织Id
                    Name: "深圳筑星科技有限公司", //组织名称
                    "Description": "组织描述", //组织描述
                    "CreatorId": "ObjectId", //创建者Id
                    "CreatedDate": " /Date/", //创建时间
                    Children: [{
                        "_id": "ObjectId", //组织Id
                        "ProjectId": "ObjectId", //项目Id
                        "ParentId": "ObjectId", //父组织Id
                        Name: "深圳筑星科技有限公司", //组织名称
                        "Description": "组织描述", //组织描述
                        "CreatorId": "ObjectId", //创建者Id
                        "CreatedDate": " /Date/", //创建时间
                        Children: [{
                            "_id": "ObjectId", //组织Id
                            "ProjectId": "ObjectId", //项目Id
                            "ParentId": "ObjectId", //父组织Id
                            Name: "深圳筑星科技有限公司", //组织名称
                            "Description": "组织描述", //组织描述
                            "CreatorId": "ObjectId", //创建者Id
                            "CreatedDate": " /Date/", //创建时间
                            Children: [{
                                "_id": "ObjectId", //组织Id
                                "ProjectId": "ObjectId", //项目Id
                                "ParentId": "ObjectId", //父组织Id
                                Name: "深圳筑星科技有限公司", //组织名称
                                "Description": "组织描述", //组织描述
                                "CreatorId": "ObjectId", //创建者Id
                                "CreatedDate": " /Date/", //创建时间
                                Children: [{
                                    "_id": "ObjectId", //组织Id
                                    "ProjectId": "ObjectId", //项目Id
                                    "ParentId": "ObjectId", //父组织Id
                                    Name: "深圳筑星科技有限公司", //组织名称
                                    "Description": "组织描述", //组织描述
                                    "CreatorId": "ObjectId", //创建者Id
                                    "CreatedDate": " /Date/", //创建时间
                                    Children: []
                                }]
                            }]
                        }]
                    }]
                }, {
                    "_id": "ObjectId", //组织Id
                    "ProjectId": "ObjectId", //项目Id
                    "ParentId": "ObjectId", //父组织Id
                    Name: "深圳筑星科技有限公司", //组织名称
                    "Description": "组织描述", //组织描述
                    "CreatorId": "ObjectId", //创建者Id
                    "CreatedDate": " /Date/", //创建时间
                    Children: [{
                        "_id": "ObjectId", //组织Id
                        "ProjectId": "ObjectId", //项目Id
                        "ParentId": "ObjectId", //父组织Id
                        Name: "深圳筑星科技有限公司", //组织名称
                        "Description": "组织描述", //组织描述
                        "CreatorId": "ObjectId", //创建者Id
                        "CreatedDate": " /Date/", //创建时间
                        Children: [{
                            "_id": "ObjectId", //组织Id
                            "ProjectId": "ObjectId", //项目Id
                            "ParentId": "ObjectId", //父组织Id
                            Name: "深圳筑星科技有限公司", //组织名称
                            "Description": "组织描述", //组织描述
                            "CreatorId": "ObjectId", //创建者Id
                            "CreatedDate": " /Date/", //创建时间
                            Children: [{
                                "_id": "ObjectId", //组织Id
                                "ProjectId": "ObjectId", //项目Id
                                "ParentId": "ObjectId", //父组织Id
                                Name: "深圳筑星科技有限公司", //组织名称
                                "Description": "组织描述", //组织描述
                                "CreatorId": "ObjectId", //创建者Id
                                "CreatedDate": " /Date/", //创建时间
                                Children: []
                            }]
                        }]
                    }]
                }]
            }],
            RoleList: [{
                "_id": "ObjectId", //角色Id
                Name: "管理员", //角色名称
                "IsDefault": true, //是否是系统默认角色，系统默认角色不能被删除
                "Description": "角色描述", //角色描述
                "CreatedDate": "12542545555555555555555555" //创建时间
            }, {
                "_id": "ObjectId", //角色Id
                Name: "管理员", //角色名称
                "IsDefault": false, //是否是系统默认角色，系统默认角色不能被删除
                "Description": "角色描述", //角色描述
                "CreatedDate": "2017-12-12" //创建时间
            }, {
                "_id": "ObjectId", //角色Id
                Name: "管理员", //角色名称
                "IsDefault": true, //是否是系统默认角色，系统默认角色不能被删除
                "Description": "角色描述", //角色描述
                "CreatedDate": "12542545555555555555555555" //创建时间
            }, {
                "_id": "ObjectId", //角色Id
                Name: "管理员", //角色名称
                "IsDefault": false, //是否是系统默认角色，系统默认角色不能被删除
                "Description": "角色描述", //角色描述
                "CreatedDate": "2017-12-12" //创建时间
            }, {
                "_id": "ObjectId", //角色Id
                Name: "管理员", //角色名称
                "IsDefault": true, //是否是系统默认角色，系统默认角色不能被删除
                "Description": "角色描述", //角色描述
                "CreatedDate": "12542545555555555555555555" //创建时间
            }, {
                "_id": "ObjectId", //角色Id
                Name: "管理员", //角色名称
                "IsDefault": false, //是否是系统默认角色，系统默认角色不能被删除
                "Description": "角色描述", //角色描述
                "CreatedDate": "2017-12-12" //创建时间
            }],

        },
        methods: {
            LoadData: function () {

                mgContext.GetProjectId(function (projectId) {
                    var urlData = {
                        ProjectId: projectId,
                    };
                    //加载人员
                    mgWeb.GetResult({
                        apiPath: "v1/member/list",
                        urlParam: urlData
                    }, function (res) {
                        if (!res.IsOk) {
                            mgLog.Error("读取成员列表失败", "");
                            return;
                        }
                        app.UserList = res.Data;
                        if (app.UserList == null || app.UserList.length < 1) {
                            app.IsUserList = true;
                        }
                    });
                    //加载组织
                    mgWeb.GetResult({
                        apiPath: "v1/org/list",
                        urlParam: urlData
                    }, function (res) {
                        if (!res.IsOk) {
                            mgLog.Error("读取组织列表失败", "");
                            return;
                        }
                        app.OrgTree = res.Data;
                        if (app.OrgTree == null || app.OrgTree.length < 1) {
                            app.IsOrgTree = true;
                        }
                    });
                    //加载角色
                    mgWeb.GetResult({
                        apiPath: "v1/role/list",
                        urlParam: urlData
                    }, function (res) {
                        if (!res.IsOk) {
                            mgLog.Error("读取角色列表失败", "");
                            return;
                        }
                        app.RoleList = res.Data;
                        if (app.RoleList == null || app.RoleList.length < 1) {
                            app.IsRoleList = true;
                        }
                    });
                })


            },
            UserDetail: function (user) {
                mgNavi.Go("UserDetail.html", "用户信息", user);
            },
            OrgDetail: function (org) {
                mgNavi.Go("OrgDetail.html", "组织信息", org);
            },

            RoleDetail: function (role) {
                mgNavi.Go("RoleDetail.html", "角色信息", role);
            }
        }
    })

    $(function () {
        app.LoadData();
    });

};