/*
 * @Author: zsq
 * @Date: 2017-08-15 08:41:17
 * @Last Modified by: zsq
 * @Last Modified time: 2017-08-15 08:43:36
 *组织 树 数据结构
 */
export class OrgTreeData {
    _id: string;
    ProjectId: string; // 项目Id
    ParentId: string; // 父组织Id
    Name: string; // 组织名称
    Description: string; // 组织描述
    CreatorId: string; // 创建者Id
    CreatedDate: Date; // 创建时间
}
