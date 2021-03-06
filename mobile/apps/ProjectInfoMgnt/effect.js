mgPage.OnLoaded = function () {
    mgPage.SetTitle('效果图')
    var app = new Vue({
        el: "#app",
        data: {
            IsBusy: false,
            IsEffectShow: false,
            CurrentImage: {
                "_id": "ObjectId", //Id 
                "ProjectId": "ObjectId", //项目id
                "Type": 0, //图片类别：0-效果图；1-进度图
                "UploadTime": "2017-10-12", //上传时间
                "File": {
                    "FileId": "ObjectId", //图片文件的Id
                    "FilePath": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502997373435&di=6564c35ed5bf3bab653184a8a07adbf0&imgtype=0&src=http%3A%2F%2Fwww.17sucai.com%2Fupload%2F165687%2F2014-07-26%2Fef15d82c34694c9bc2cc3b9e903b0b91_big.jpg" //图片原图路径
                },
                "Description": "真心觉得很操蛋的一个技术，我真的想把所有的技术学到家", //图片描述
                "Thumbnail": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502997373435&di=6564c35ed5bf3bab653184a8a07adbf0&imgtype=0&src=http%3A%2F%2Fwww.17sucai.com%2Fupload%2F165687%2F2014-07-26%2Fef15d82c34694c9bc2cc3b9e903b0b91_big.jpg" //图片缩略图路径
            },
            IsEffectData: false,
            EffectImgs: [{
                "_id": "ObjectId", //Id 
                "ProjectId": "ObjectId", //项目id
                "Type": 0, //图片类别：0-效果图；1-进度图
                "UploadTime": "2017-10-12", //上传时间
                "File": {
                    "FileId": "ObjectId", //图片文件的Id
                    "FilePath": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502997373435&di=6564c35ed5bf3bab653184a8a07adbf0&imgtype=0&src=http%3A%2F%2Fwww.17sucai.com%2Fupload%2F165687%2F2014-07-26%2Fef15d82c34694c9bc2cc3b9e903b0b91_big.jpg" //图片原图路径
                },
                "Description": "真心觉得很操蛋的一个技术，我真的想把所有的技术学到家", //图片描述
                "Thumbnail": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502997373435&di=6564c35ed5bf3bab653184a8a07adbf0&imgtype=0&src=http%3A%2F%2Fwww.17sucai.com%2Fupload%2F165687%2F2014-07-26%2Fef15d82c34694c9bc2cc3b9e903b0b91_big.jpg" //图片缩略图路径
            }, {
                "_id": "ObjectId", //Id 
                "ProjectId": "ObjectId", //项目id
                "Type": 0, //图片类别：0-效果图；1-进度图
                "UploadTime": "2017-10-12", //上传时间
                "File": {
                    "FileId": "ObjectId", //图片文件的Id
                    "FilePath": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502997373433&di=73715d06fd69c5fcde05d768dd756af2&imgtype=0&src=http%3A%2F%2Fwww.myexception.cn%2Fimg%2F2015%2F05%2F18%2F12202899.jpg"
                },
                "Description": "真心觉得很操蛋的一个技术，我真的想把所有的技术学到家", //图片描述
                "Thumbnail": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502997373433&di=73715d06fd69c5fcde05d768dd756af2&imgtype=0&src=http%3A%2F%2Fwww.myexception.cn%2Fimg%2F2015%2F05%2F18%2F12202899.jpg"
            }, {
                "_id": "ObjectId", //Id 
                "ProjectId": "ObjectId", //项目id
                "Type": 0, //图片类别：0-效果图；1-进度图
                "UploadTime": "2017-10-12", //上传时间
                "File": {
                    "FileId": "ObjectId", //图片文件的Id
                    "FilePath": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502997373435&di=6564c35ed5bf3bab653184a8a07adbf0&imgtype=0&src=http%3A%2F%2Fwww.17sucai.com%2Fupload%2F165687%2F2014-07-26%2Fef15d82c34694c9bc2cc3b9e903b0b91_big.jpg" //图片原图路径
                },
                "Description": "真心觉得很操蛋的一个技术，我真的想把所有的技术学到家", //图片描述
                "Thumbnail": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502997373435&di=6564c35ed5bf3bab653184a8a07adbf0&imgtype=0&src=http%3A%2F%2Fwww.17sucai.com%2Fupload%2F165687%2F2014-07-26%2Fef15d82c34694c9bc2cc3b9e903b0b91_big.jpg" //图片缩略图路径
            }, {
                "_id": "ObjectId", //Id 
                "ProjectId": "ObjectId", //项目id
                "Type": 0, //图片类别：0-效果图；1-进度图
                "UploadTime": "2017-10-12", //上传时间
                "File": {
                    "FileId": "ObjectId", //图片文件的Id
                    "FilePath": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502997373433&di=73715d06fd69c5fcde05d768dd756af2&imgtype=0&src=http%3A%2F%2Fwww.myexception.cn%2Fimg%2F2015%2F05%2F18%2F12202899.jpg"
                },
                "Description": "真心觉得很操蛋的一个技术，我真的想把所有的技术学到家", //图片描述
                "Thumbnail": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502997373433&di=73715d06fd69c5fcde05d768dd756af2&imgtype=0&src=http%3A%2F%2Fwww.myexception.cn%2Fimg%2F2015%2F05%2F18%2F12202899.jpg"
            }, {
                "_id": "ObjectId", //Id 
                "ProjectId": "ObjectId", //项目id
                "Type": 0, //图片类别：0-效果图；1-进度图
                "UploadTime": "2017-10-12", //上传时间
                "File": {
                    "FileId": "ObjectId", //图片文件的Id
                    "FilePath": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502997373435&di=6564c35ed5bf3bab653184a8a07adbf0&imgtype=0&src=http%3A%2F%2Fwww.17sucai.com%2Fupload%2F165687%2F2014-07-26%2Fef15d82c34694c9bc2cc3b9e903b0b91_big.jpg" //图片原图路径
                },
                "Description": "真心觉得很操蛋的一个技术，我真的想把所有的技术学到家", //图片描述
                "Thumbnail": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502997373435&di=6564c35ed5bf3bab653184a8a07adbf0&imgtype=0&src=http%3A%2F%2Fwww.17sucai.com%2Fupload%2F165687%2F2014-07-26%2Fef15d82c34694c9bc2cc3b9e903b0b91_big.jpg" //图片缩略图路径
            }, {
                "_id": "ObjectId", //Id 
                "ProjectId": "ObjectId", //项目id
                "Type": 0, //图片类别：0-效果图；1-进度图
                "UploadTime": "2017-10-12", //上传时间
                "File": {
                    "FileId": "ObjectId", //图片文件的Id
                    "FilePath": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502997373433&di=73715d06fd69c5fcde05d768dd756af2&imgtype=0&src=http%3A%2F%2Fwww.myexception.cn%2Fimg%2F2015%2F05%2F18%2F12202899.jpg"
                },
                "Description": "真心觉得很操蛋的一个技术，我真的想把所有的技术学到家", //图片描述
                "Thumbnail": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502997373433&di=73715d06fd69c5fcde05d768dd756af2&imgtype=0&src=http%3A%2F%2Fwww.myexception.cn%2Fimg%2F2015%2F05%2F18%2F12202899.jpg"
            }, {
                "_id": "ObjectId", //Id 
                "ProjectId": "ObjectId", //项目id
                "Type": 0, //图片类别：0-效果图；1-进度图
                "UploadTime": "2017-10-12", //上传时间
                "File": {
                    "FileId": "ObjectId", //图片文件的Id
                    "FilePath": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502997373435&di=6564c35ed5bf3bab653184a8a07adbf0&imgtype=0&src=http%3A%2F%2Fwww.17sucai.com%2Fupload%2F165687%2F2014-07-26%2Fef15d82c34694c9bc2cc3b9e903b0b91_big.jpg" //图片原图路径
                },
                "Description": "真心觉得很操蛋的一个技术，我真的想把所有的技术学到家", //图片描述
                "Thumbnail": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502997373435&di=6564c35ed5bf3bab653184a8a07adbf0&imgtype=0&src=http%3A%2F%2Fwww.17sucai.com%2Fupload%2F165687%2F2014-07-26%2Fef15d82c34694c9bc2cc3b9e903b0b91_big.jpg" //图片缩略图路径
            }, {
                "_id": "ObjectId", //Id 
                "ProjectId": "ObjectId", //项目id
                "Type": 0, //图片类别：0-效果图；1-进度图
                "UploadTime": "2017-10-12", //上传时间
                "File": {
                    "FileId": "ObjectId", //图片文件的Id
                    "FilePath": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502997373433&di=73715d06fd69c5fcde05d768dd756af2&imgtype=0&src=http%3A%2F%2Fwww.myexception.cn%2Fimg%2F2015%2F05%2F18%2F12202899.jpg"
                },
                "Description": "真心觉得很操蛋的一个技术，我真的想把所有的技术学到家", //图片描述
                "Thumbnail": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502997373433&di=73715d06fd69c5fcde05d768dd756af2&imgtype=0&src=http%3A%2F%2Fwww.myexception.cn%2Fimg%2F2015%2F05%2F18%2F12202899.jpg"
            }, {
                "_id": "ObjectId", //Id 
                "ProjectId": "ObjectId", //项目id
                "Type": 0, //图片类别：0-效果图；1-进度图
                "UploadTime": "2017-10-12", //上传时间
                "File": {
                    "FileId": "ObjectId", //图片文件的Id
                    "FilePath": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502997373435&di=6564c35ed5bf3bab653184a8a07adbf0&imgtype=0&src=http%3A%2F%2Fwww.17sucai.com%2Fupload%2F165687%2F2014-07-26%2Fef15d82c34694c9bc2cc3b9e903b0b91_big.jpg" //图片原图路径
                },
                "Description": "真心觉得很操蛋的一个技术，我真的想把所有的技术学到家", //图片描述
                "Thumbnail": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502997373435&di=6564c35ed5bf3bab653184a8a07adbf0&imgtype=0&src=http%3A%2F%2Fwww.17sucai.com%2Fupload%2F165687%2F2014-07-26%2Fef15d82c34694c9bc2cc3b9e903b0b91_big.jpg" //图片缩略图路径
            }, {
                "_id": "ObjectId", //Id 
                "ProjectId": "ObjectId", //项目id
                "Type": 0, //图片类别：0-效果图；1-进度图
                "UploadTime": "2017-10-12", //上传时间
                "File": {
                    "FileId": "ObjectId", //图片文件的Id
                    "FilePath": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502997373433&di=73715d06fd69c5fcde05d768dd756af2&imgtype=0&src=http%3A%2F%2Fwww.myexception.cn%2Fimg%2F2015%2F05%2F18%2F12202899.jpg"
                },
                "Description": "真心觉得很操蛋的一个技术，我真的想把所有的技术学到家", //图片描述
                "Thumbnail": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502997373433&di=73715d06fd69c5fcde05d768dd756af2&imgtype=0&src=http%3A%2F%2Fwww.myexception.cn%2Fimg%2F2015%2F05%2F18%2F12202899.jpg"
            }]

        },
        methods: {
            LoadData: function () {
                //设置title   
                mgTip.Show("加载数据", 0);
                mgContext.GetProjectId(function (projectId) {
                    var urlData = {
                        ProjectId: projectId,
                        Type: 1,
                    };
                    mgWeb.GetResult({
                        apiPath: "v1/project/photo/list",
                        urlParam: urlData
                    }, function (res) {
                        if (!res.IsOk) {
                            mgLog.Error("读取效果图信息错误", "");
                            // app.EffectImgs = null;
                            // app.IsEffectData = true;
                            return;
                        }
                        app.EffectImgs = res.Data;
                        if (app.EffectImgs == null || app.EffectImgs.length < 1) {
                            app.IsEffectData = true;
                        }
                    });
                })
            },
            HandleImage: function (item) {
                if (item == "" || item == null) {
                    app.IsEffectShow = false;
                    return;
                }
                app.IsEffectShow = true;
                app.CurrentImage = item;
            }
        }
    })

    $(function () {
        app.LoadData();
    });
};