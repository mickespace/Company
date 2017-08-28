// mgPage.OnLoaded = function () {
//     mgPage.SetTitle('项目概况')
// define the item component
Vue.component('item', {
    template: '#item-template',
    props: {
        model: Object
    },
    data: function () {
        var itemData = {
            open: false,
            IsChecked: false
        }
        return itemData;
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
            //设置id
            app.SelectedItem(org);
            //改变状态；
            this.IsChecked = !this.IsChecked;
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
        SelectedIds: [],
        OrgTree: [{
            "_id": "ObjectId66", //组织Id
            "ProjectId": "ObjectId", //项目Id
            "ParentId": "ObjectId", //父组织Id
            Name: "深圳筑星科技有限公司", //组织名称
            "Description": "组织描述", //组织描述
            "CreatorId": "ObjectId", //创建者Id
            "CreatedDate": " /Date/", //创建时间
            Children: [{
                "_id": "ObjectId33", //组织Id
                "ProjectId": "ObjectId", //项目Id
                "ParentId": "ObjectId", //父组织Id
                Name: "深圳筑星科技有限公司", //组织名称
                "Description": "组织描述", //组织描述
                "CreatorId": "ObjectId", //创建者Id
                "CreatedDate": " /Date/", //创建时间
                Children: []
            }]
        }, {
            "_id": "ObjectId1", //组织Id
            "ProjectId": "ObjectId", //项目Id
            "ParentId": "ObjectId", //父组织Id
            Name: "深圳筑星科技有限公司", //组织名称
            "Description": "组织描述", //组织描述
            "CreatorId": "ObjectId", //创建者Id
            "CreatedDate": " /Date/", //创建时间
            Children: [{
                "_id": "ObjectId2", //组织Id
                "ProjectId": "ObjectId", //项目Id
                "ParentId": "ObjectId", //父组织Id
                Name: "深圳筑星科技有限公司", //组织名称
                "Description": "组织描述", //组织描述
                "CreatorId": "ObjectId", //创建者Id
                "CreatedDate": " /Date/", //创建时间
                Children: [{
                    "_id": "ObjectId3", //组织Id
                    "ProjectId": "ObjectId", //项目Id
                    "ParentId": "ObjectId", //父组织Id
                    Name: "深圳筑星科技有限公司", //组织名称
                    "Description": "组织描述", //组织描述
                    "CreatorId": "ObjectId", //创建者Id
                    "CreatedDate": " /Date/", //创建时间
                    Children: [{
                        "_id": "ObjectId4", //组织Id
                        "ProjectId": "ObjectId", //项目Id
                        "ParentId": "ObjectId", //父组织Id
                        Name: "深圳筑星科技有限公司", //组织名称
                        "Description": "组织描述", //组织描述
                        "CreatorId": "ObjectId", //创建者Id
                        "CreatedDate": " /Date/", //创建时间
                        Children: [{
                            "_id": "ObjectId6", //组织Id
                            "ProjectId": "ObjectId", //项目Id
                            "ParentId": "ObjectId", //父组织Id
                            Name: "深圳筑星科技有限公司", //组织名称
                            "Description": "组织描述", //组织描述
                            "CreatorId": "ObjectId", //创建者Id
                            "CreatedDate": " /Date/", //创建时间
                            Children: [{
                                "_id": "ObjectId7", //组织Id
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
                "_id": "ObjectId8", //组织Id
                "ProjectId": "ObjectId", //项目Id
                "ParentId": "ObjectId", //父组织Id
                Name: "深圳筑星科技有限公司", //组织名称
                "Description": "组织描述", //组织描述
                "CreatorId": "ObjectId", //创建者Id
                "CreatedDate": " /Date/", //创建时间
                Children: [{
                    "_id": "ObjectId9", //组织Id
                    "ProjectId": "ObjectId", //项目Id
                    "ParentId": "ObjectId", //父组织Id
                    Name: "深圳筑星科技有限公司", //组织名称
                    "Description": "组织描述", //组织描述
                    "CreatorId": "ObjectId", //创建者Id
                    "CreatedDate": " /Date/", //创建时间
                    Children: [{
                        "_id": "ObjectId11", //组织Id
                        "ProjectId": "ObjectId", //项目Id
                        "ParentId": "ObjectId", //父组织Id
                        Name: "深圳筑星科技有限公司", //组织名称
                        "Description": "组织描述", //组织描述
                        "CreatorId": "ObjectId", //创建者Id
                        "CreatedDate": " /Date/", //创建时间
                        Children: [{
                            "_id": "ObjectId22", //组织Id
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
        },
        SubmitIds: function () {

        }
    }
})

$(function () {
    app.LoadData();
});

// };