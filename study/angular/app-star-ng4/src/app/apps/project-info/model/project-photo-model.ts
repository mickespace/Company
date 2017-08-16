export class ProjectPhoto {
    _id: string; //Id 
    ProjectId: string; //项目id
    Type: number; //图片类别：0-效果图；1-进度图
    UploadTime: Date; //上传时间
    File: photoFile;
    Description: string; //图片描述
    Thumbnail: string; //图片缩略图路径
    ImgIndex: number; // 索引
}
export class photoFile {
    FileId: string; //图片文件的Id
    FilePath: string; //图片原图路径
}