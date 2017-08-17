var app = new Vue({
    el: "#app",
    data: {
        IsBusy: false,
        ScheduleImgs: [{
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
            app.IsBusy = true;
            setTimeout(function () {
                app.IsBusy = false;
            }, 4000);
            // $.ajax({
            //     type: 'get',
            //     timeout: 10000,
            //     url: "https://www.baidu.com",
            //     data: null,
            //     dataType: 'json',
            //     success: function (res) {
            //         app.IsBusy = false;
            //         if (!res.IsOk) {

            //             return;
            //         }
            //         app.Login();
            //     },
            //     error: function (res) {
            //         app.IsBusy = false;
            //         return;
            //     }
            // });
        }
    }
})

$(function () {
    app.LoadData();
});