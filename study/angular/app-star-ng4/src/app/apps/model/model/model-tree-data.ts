/*
 * @Author: zsq
 * @Date: 2017-07-19 17:08:09
 * @Last Modified by: 
 * @Last Modified time: 2017-07-20 19:20:06
 *项目树 实体
 */
export class ModelTreeData {
    _id: string;
    Name: string;
    // root
    IsBuilding?: boolean;
    // node
    BuildingId?: string;
    Description?: string;
    Ancentors?: string[]; // 祖先节点
    SortIndex?: number; // 排序索引
    // cheaf node
    ElevationSystem?: number; // 标高体系：0-建筑体系；1-结构体系
    IsBeGenerated?: boolean; // 后台是否生成了模型文件的构件树
    ErrorInfo?: string; // 后台生成模型文件失败后的错误信息
    Fs_id?: string;
    FsId?: string;
    FsName?: string;
    FsVersion?: number;
    FsUpdateDate?: Date;
    FsUpdateUserId?: string;
    FsFileSize?: number;
    // tslint:disable-next-line:eofline
}