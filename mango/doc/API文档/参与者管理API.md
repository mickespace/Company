# 参与者管理API

[TOC]

## 成员-获取项目所有成员（筛选、分页、排序、映射）

`member/list`

> **URL**

https://api.xxx.com/v1/member/list

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数           | 必选      | 类型         | 说明                   |
| ------------ | ------- | ---------- | -------------------- |
| `UserToken`  | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `ProjectId`  | `true`  | `ObjectId` | 项目Id                 |
| `ListParams` | `false` | `json`     | 集合的筛选、分页、排序、映射参数     |

`ListParams`的格式为：

```json
{
    "Search": "[Expression]", //筛选表达式，默认为空，表示不筛选
    "Page": { //分页，默认为空，表示不分页
        "Index": 0, //分页索引，*必填
        "Count": 1, //分页数量，*必填
    },
    "Sort": [{ //排序，可选，默认为空数组，表示不排序
        "Property": "PropertyName", //第一个排序属性名，*必填
        "Ascending": true //是否升序，如果为false，则为降序排列，默认为true
    }, {
        "...": ""
    }],
    "Map": ["PropertyName1", "..."] //返回的属性映射数组，默认为空数组，表示返回所有属性
}
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": [{
        "_id": "ObjectId", //成员Id
      	"UserInfo":{
          	"UserId": "ObjectId", //用户Id
            "Email": "xxx@qq.com", //用户邮箱
        	"PhoneNumber": "(86)136xxxxxxxx", //用户手机号
        	"RealName": "张三", //用户真实姓名
            "Avatar": "https://api.xxx.com/v1/img/default" //用户头像
        },
        "JoinDate": "/Date/", //加入项目时间
        "Orgs": [{ //成员所属组织
            "_id": "ObjectId", //组织Id
            "Name": "研发部" //组织名称
        }, {
            "...": ""
        }],
        "Roles": [{
            "_id": "ObjectId", //角色Id
            "Name": "管理员" //角色名称
        }, {
            "...": ""
        }]
    }, {
        "...": ""
    }]
}
```

> **注意事项**

如果`PageIndex`和`PageCount`都为0，则表示不分页；如果搜索表达式为空，则表示不搜索；`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。`Sort`表示按指定的属性升序或降序排列。

## 成员-判断用户是否属于项目的成员

`member/is_project_member`

> **URL**

https://api.xxx.com/v1/member/is_project_member

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `ProjectId` | `true` | `ObjectId` | 项目Id                 |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": true,//是否属于该项目成员
}
```

> **注意事项**

返回的`Data`如果返回true则表示该用户是属于该项目中的成员，返回false表示该用户不属于该项目中的成员。

## 成员-获取基本信息（映射）

`member/info`

> **URL**

https://api.xxx.com/v1/member/info

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选      | 类型         | 说明                   |
| ----------- | ------- | ---------- | -------------------- |
| `UserToken` | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true`  | `ObjectId` | 成员Id                 |
| `Map`       | `false` | `json`     | 返回的属性映射数组            |

`Map`的格式为：

```json
["PropertyName1","..."]   			//返回的属性映射数组，默认为空数组，表示返回所有属性
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": {
        "_id": "ObjectId", //成员Id
        "UserInfo":{
          	"UserId": "ObjectId", //用户Id
            "Email": "xxx@qq.com", //用户邮箱
        	"PhoneNumber": "(86)136xxxxxxxx", //用户手机号
        	"RealName": "张三", //用户真实姓名
            "Avatar": "https://api.xxx.com/v1/img/default" //用户头像
        },
        "JoinDate": "/Date/", //加入项目时间
        "Orgs": [{
            "_id": "ObjectId", //组织Id
            "Name": "研发部" //组织名称
        }, {
            "...": ""
        }],
        "Roles": [{
            "_id": "ObjectId", //角色Id
            "Name": "管理员" //角色名称
        }, {
            "...": ""
        }]
    }
}
```

> **注意事项**

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 成员-将成员从项目中移除（批量）

`member/delete`

> **URL**

https://api.xxx.com/v1/member/delete

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数           | 必选     | 类型       | 说明                   |
| ------------ | ------ | -------- | -------------------- |
| `UserToken`  | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `MermberIds` | `true` | `json`   | 待移除的成员Id集合           |

`MermberIds `的格式为：

```json
[ "ObjectId","..."]	//待移除的成员Id数组，*必填
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": [ "ObjectId","..."] //返回成功的成员Id
}
```

> **注意事项**

无

## 成员-批量邀请成员

`member/invite`

> **URL**

https://api.xxx.com/v1/member/invite

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `ProjectId` | `true` | `ObjectId` | 项目Id                 |
| `Data`      | `true` | `json`     | 邀请邮箱(或手机)的集合         |

`Data `的格式为：

```json
["Email1","Phone1", "..."] //受邀请的用户邮箱（或手机，两种方式都可填），*必填
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": ["Email1","Phone1", "..."] //返回邀请成功的邮箱
}
```

> **注意事项**

无

## 成员-获取邀请码

`member/invite_code`

> **URL**

https://api.xxx.com/v1/member/invite_code

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `ProjectId` | `true` | `ObjectId` | 项目Id                 |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": {
        "InviteCode": "https://api.xxx.com/v1/invite/inviteinfo"
    }
}
```

> **注意事项**

无

## 成员-获取成员所属角色

`member/roles`

> **URL**

https://api.xxx.com/v1/member/roles

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `ObjectId` | 成员Id                 |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": [{
            "_id": "ObjectId", //角色Id
            "Name": "管理员" //角色名称
        }, {
            "...": ""
        }
    ]
}
```

> **注意事项**

无

## 成员-添加成员所属角色（批量）

`member/add_roles`

> **URL**

https://api.xxx.com/v1/member/add_roles

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `ObjectId` | 成员Id                 |
| `RoleIds`   | `true` | `json`     | 待添加的角色Id集合           |

`RoleIds `的格式为：

```json
["ObjectId", "..."] //待添加的角色Id数组，*必填
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": ["ObjectId", "..."] //返回添加成功的角色Id
}
```

> **注意事项**

无

## 成员-删除成员所属角色（批量）

`member/delete_roles`

> **URL**

https://api.xxx.com/v1/member/delete_roles

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `ObjectId` | 成员Id                 |
| `RoleIds`   | `true` | `json`     | 待删除的角色Id集合           |

`RoleIds `的格式为：

```json
["ObjectId", "..."]	//待删除的角色Id数组，*必填
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": ["ObjectId", "..."] //返回删除成功的角色Id
}
```

> **注意事项**

无

## 成员-获取成员所属组织

`member/orgs`

> **URL**

https://api.xxx.com/v1/member/orgs

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `ObjectId` | 成员Id                 |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": [ //成员所属组织
        {
            "_id": "ObjectId", //组织Id
            "Name": "管理员", //组织名称
            "CreatedDate": " /Date/", //组织的创建时间
            "DisplayName": "深圳筑星科技有限公司>研发部" //组织的展示名称
        }, {
            "...": ""
        }
    ]
}
```

> **注意事项**

无

## 成员-添加成员所属组织（批量）

`member/add_orgs`

> **URL**

https://api.xxx.com/v1/member/add_orgs

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `ObjectId` | 成员Id                 |
| `OrgIds`    | `true` | `json`     | 待添加的组织Id集合           |

`OrgIds `的格式为：

```json
["ObjectId", "..."]	//待添加的组织Id数组，*必填
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data":["ObjectId", "..."] //返回添加成功的组织Id
}
```

> **注意事项**

无

## 成员-删除成员所属组织 （批量）

`member/delete_orgs`

> **URL**

https://api.xxx.com/v1/member/delete_orgs

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `ObjectId` | 成员Id                 |
| `OrgIds`    | `true` | `json`     | 待删除的组织Id集合           |

`OrgIds `的格式为：

```json
["ObjectId", "..."]	//待删除的组织Id数组，*必填
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": ["ObjectId", "..."] //返回删除成功的组织Id
}
```

> **注意事项**

无

## 组织-获取项目所有组织（筛选、分页、排序、映射）

`org/list`

> **URL**

https://api.xxx.com/v1/org/list

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数           | 必选      | 类型         | 说明                   |
| ------------ | ------- | ---------- | -------------------- |
| `UserToken`  | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `ProjectId`  | `true`  | `ObjectId` | 项目Id                 |
| `ListParams` | `false` | `json`     | 集合的筛选、分页、排序、映射参数     |

`ListParams`的格式为：

```json
{
    "Search": "[Expression]", //筛选表达式，默认为空，表示不筛选
    "Map": ["PropertyName1", "..."] //返回的属性映射数组，默认为空数组，表示返回所有属性
}
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": [{
        "_id": "ObjectId", //组织Id
        "ProjectId": "ObjectId", //项目Id
        "ParentId": "ObjectId", //父组织Id
        "Name": "深圳筑星科技有限公司", //组织名称
        "Description": "组织描述", //组织描述
        "CreatorId": "ObjectId", //创建者Id
        "CreatedDate": " /Date/", //创建时间
        "Children": [{
            "_id": "ObjectId", //组织Id
            "ProjectId": "ObjectId", //项目Id
            "ParentId": "ObjectId", //父组织Id
            "Name": "深圳筑星科技有限公司", //组织名称
            "Description": "组织描述", //组织描述
            "CreatorId": "ObjectId", //创建者Id
            "CreatedDate": " /Date/", //创建时间
            "Children": "..."
        }, {
            "...": ""
        }]
    }, {
        "...": ""
    }]
}
```

> **注意事项**

如果`PageIndex`和`PageCount`都为0，则表示不分页；如果搜索表达式为空，则表示不搜索；`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。`Sort`表示按指定的属性升序或降序排列。

## 组织-获取组织基本信息（映射）

`org/info`

> **URL**

https://api.xxx.com/v1/org/info

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选      | 类型         | 说明                   |
| ----------- | ------- | ---------- | -------------------- |
| `UserToken` | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true`  | `ObjectId` | 组织Id                 |
| `Map`       | `false` | `json`     | 返回的属性映射数组            |

`Map`的格式为：

```json
["PropertyName1","..."]   			//返回的属性映射数组，默认为空数组，表示返回所有属性
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": {
        "_id": "ObjectId", //组织Id
        "ProjectId"："ObjectId", //项目Id
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
    }
}
```

> **注意事项**

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 组织-修改组织信息

`org/update`

> **URL**

https://api.xxx.com/v1/org/update

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Data`      | `true` | `json`   | 组织信息                 |

`Data`的格式为：

```json
{
    "_id": "ObjectId", //组织Id，*必填
    "ParentId": "ObjectId", //父组织Id，可选，默认为null
    "Name": "深圳筑星科技有限公司", //组织名称，可选，默认为null
    "Description": "组织描述", //组织描述，可选，默认为null
  	"...":""
}
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": {
      	"_id": "ObjectId", //组织Id
        "ProjectId"："ObjectId", //项目Id
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
    } //返回的数据
}
```

> **注意事项**

无

## 组织-创建组织（映射）

`org/create`

> **URL**

https://api.xxx.com/v1/org/create

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选      | 类型       | 说明                   |
| ----------- | ------- | -------- | -------------------- |
| `UserToken` | `true`  | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Data`      | `true`  | `json`   | 组织信息                 |
| `Map`       | `false` | `json`   | 返回的属性映射数组            |

`Map`的格式为：

```json
["PropertyName1","..."]   			//返回的属性映射数组，默认为空数组，表示返回所有属性
```

`Data`的格式为：

```json
{
    "ProjectId": "ObjectId", //项目Id，*必填
    "ParentId": "ObjectId", //父组织Id，*必填
    "Name": "深圳筑星科技有限公司", //组织名称，*必填
    "Description": "组织描述", //组织描述，*必填
    "Roles": ["ObjectId", "..."] //组织所属角色，默认为空
}
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": {
        "_id": "ObjectId", //组织Id
      	"ProjectId"："ObjectId", //项目Id
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
        }],
        "Members": [{
            "_id": "ObjectId", //成员Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //成员真实姓名
        }, {
            "...": "..."
        }]
    }
}
```

> **注意事项**

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 组织-删除组织(批量)

`org/delete`

> **URL**

https://api.xxx.com/v1/org/delete

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Ids`       | `true` | `json`   | 待删除的组织Id集合           |

`Ids`的格式为：

```json
["ObjectId","..."]   				//组织Id集合，*必填
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": ["ObjectId","..."] //返回删除成功的组织Id
}
```

> **注意事项**

无

## 组织-获取组织所属角色

`org/roles`

> **URL**

https://api.xxx.com/v1/org/roles

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `ObjectId` | 组织Id                 |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": [{
        "_id": "ObjectId", //角色Id
        "Name": "管理员" //角色名称
    }, {
        "...": ""
    }]
}
```

> **注意事项**

无

## 组织-添加组织所属角色（批量）

`org/add_roles`

> **URL**

https://api.xxx.com/v1/org/add_roles

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `ObjectId` | 组织Id                 |
| `RoleIds`   | `true` | `json`     | 待添加的角色Id集合           |

`RoleIds`的格式为：

```json
["ObjectId", "..."] //待添加的角色Id数组，*必填
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": ["ObjectId", "..."] //返回添加成功的角色Id
}
```

> **注意事项**

无

## 组织-删除组织所属角色（批量）

`org/delete_roles`

> **URL**

https://api.xxx.com/v1/org/delete_roles

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `ObjectId` | 组织Id                 |
| `RoleIds`   | `true` | `json`     | 待删除的角色Id集合           |

`RoleIds`的格式为：

```json
["ObjectId", "..."] //待删除的角色Id数组，*必填
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": ["ObjectId", "..."] //返回删除成功的角色Id
}
```

> **注意事项**

无

## 组织-获取组织所有成员

`org/members`

> **URL**

https://api.xxx.com/v1/org/members

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `ObjectId` | 组织Id                 |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": [{
        "_id": "ObjectId", //成员Id
        "Email": "xxx@qq.com", //邮箱
        "PhoneNumber": "(86)136xxxxxxxx", //手机号
        "RealName": "超级管理员" //成员真实姓名
    }, {
        "...": ""
    }]
}
```

> **注意事项**

无

## 组织-添加组织成员（批量，映射）

`org/add_members`

> **URL**

https://api.xxx.com/v1/org/add_members

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选      | 类型         | 说明                   |
| ----------- | ------- | ---------- | -------------------- |
| `UserToken` | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true`  | `ObjectId` | 组织Id                 |
| `MemberIds` | `true`  | `json`     | 待添加的成员Id集合           |
| `Map`       | `false` | `json`     | 返回的属性映射数组            |

`Map`的格式为：

```json
["PropertyName1","..."]   			//返回的属性映射数组，默认为空数组，表示返回所有属性
```

`MemberIds`的格式为：

```json
["ObjectId", "..."] //待添加的成员Id数组，*必填
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": {
        "_id": "ObjectId", //组织Id
      	"ProjectId"："ObjectId", //项目Id
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
            "Name": "管理员" //角色名称
        }],
        "Members": [{
            "_id": "ObjectId", //成员Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //成员真实姓名
        }, {
            "...": ""
        }]
    }
}
```

> **注意事项**

无

## 组织-删除组织成员（批量）

`org/delete_members`

> **URL**

https://api.xxx.com/v1/org/delete_members

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `ObjectId` | 组织Id                 |
| `MemberIds` | `true` | `json`     | 待删除的成员Id集合           |

`MemberIds`的格式为：

```json
["ObjectId", "..."] //待删除的成员Id数组，*必填
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": ["ObjectId", "..."] //返回删除失败的成员编号
}
```

> **注意事项**

无

## 角色-获取项目所有角色（筛选、分页、排序、映射）

`role/list`

> **URL**

https://api.xxx.com/v1/role/list

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数           | 必选      | 类型         | 说明                   |
| ------------ | ------- | ---------- | -------------------- |
| `UserToken`  | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `ProjectId`  | `true`  | `ObjectId` | 项目Id                 |
| `ListParams` | `false` | `json`     | 集合的筛选、分页、排序、映射参数     |

`ListParams`的格式为：

```json
{
    "Search": "[Expression]", //筛选表达式，默认为空，表示不筛选
    "Page": { //分页，默认为空，表示不分页
        "Index": 0, //分页索引，*必填
        "Count": 0 //分页数量，*必填
    },
    "Sort": [{ //排序，默认为空数组，表示不排序
        "Property": "PropertyName", //第一个排序的属性名，*必填
        "Ascending": false //是否升序排序，如果为false，则降序排列，默认为true
    }, {
        "...": ""
    }],
    "Map": ["PropertyName1", "..."] //返回的属性映射数组,默认为空数组，表示返回所有属性
}
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": [{
        "_id": "ObjectId", //角色Id
        "Name": "管理员", //角色名称
        "IsDefault": true, //是否是系统默认角色，系统默认角色不能被删除
        "Description": "角色描述", //角色描述
        "Creator": {
            "_id": "ObjectId", //用户Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //真实姓名
        },
        "CreatedDate": " /Date/" //创建时间
    }, {
        "...": ""
    }]
}
```

> **注意事项**

如果`PageIndex`和`PageCount`都为0，则表示不分页；如果搜索表达式为空，则表示不搜索；`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。`Sort`表示按指定的属性升序或降序排列。

## 角色-获取角色基本信息（映射）

`role/info`

> **URL**

https://api.xxx.com/v1/role/info

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选      | 类型         | 说明                   |
| ----------- | ------- | ---------- | -------------------- |
| `UserToken` | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true`  | `ObjectId` | 角色Id                 |
| `Map`       | `false` | `json`     | 返回的属性映射数组            |

`Map`的格式为：

```json
["PropertyName1","..."]   			//返回的属性映射数组，默认为空数组，表示返回所有属性
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": {
        "_id": "ObjectId", //角色Id
        "Name": "深圳筑星科技有限公司", //角色名称
        "Description": "组织描述", //角色描述
        "IsDefault": true, //是否是系统默认角色，系统默认角色不能被删除
        "Creator": {
            "_id": "ObjectId", //用户Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //真实姓名
        },
        "CreatedDate": " /Date/", //创建时间
        "Orgs": [{
            "_id": "ObjectId", //组织Id
            "Name": "超级管理员" //组织名称
        }],
        "Members": [{
            "_id": "ObjectId", //成员Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //成员真实姓名
        }, {
            "...": ""
        }]
    }
}
```

> **注意事项**

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 角色-修改角色信息

`role/update`

> **URL**

https://api.xxx.com/v1/role/update

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数            | 必选      | 类型         | 说明                   |
| ------------- | ------- | ---------- | -------------------- |
| `UserToken`   | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`          | `true`  | `ObjectId` | 角色Id                 |
| `Name`        | `false` | `string`   | 角色名称                 |
| `Description` | `false` | `string`   | 角色描述                 |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data":{
      	"_id": "ObjectId", //角色Id
        "Name": "深圳筑星科技有限公司", //角色名称
        "Description": "组织描述", //角色描述
        "IsDefault": true, //是否是系统默认角色，系统默认角色不能被删除
        "Creator": {
            "_id": "ObjectId", //用户Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //真实姓名
        },
        "CreatedDate": " /Date/", //创建时间
        "Orgs": [{
            "_id": "ObjectId", //组织Id
            "Name": "超级管理员" //组织名称
        }],
        "Members": [{
            "_id": "ObjectId", //成员Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //成员真实姓名
        }, {
            "...": ""
        }]
    } //返回的数据
}
```

> **注意事项**

无

## 角色-创建角色（映射）

`role/create`

> **URL**

https://api.xxx.com/v1/role/create

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选      | 类型       | 说明                   |
| ----------- | ------- | -------- | -------------------- |
| `UserToken` | `true`  | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Data`      | `true`  | `json`   | 角色信息                 |
| `Map`       | `false` | `json`   | 返回的属性映射数组            |

`Data`的格式为：

```json
{
    "ProjectId": "string", //项目Id，*必填
    "Name": "深圳筑星科技有限公司", //角色名称，*必填
    "Description": "角色描述", //角色描述，*必填
}
```

`Map`的格式为：

```json
["PropertyName1","..."]   			//返回的属性映射数组，默认为空数组，表示返回所有属性
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": {
        "_id": "ObjectId", //角色Id
        "Name": "深圳筑星科技有限公司", //角色名称
        "Description": "组织描述", //角色描述
        "IsDefault": true, //是否是系统默认角色，系统默认角色不能被删除
        "Creator": {
            "_id": "ObjectId", //用户Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //真实姓名
        },
        "CreatedDate": " /Date/", //创建时间
        "Members": [{
            "_id": "ObjectId", //成员Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //成员真实姓名
        }, {
            "...": ""
        }]
    }
}
```

> **注意事项**

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 角色-删除角色（批量）

`role/delete`

> **URL**

https://api.xxx.com/v1/role/delete

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Ids`       | `true` | `json`   | 待删除的角色Id集合           |

`Ids`的格式为：

```json
["ObjectId","..."]   				//待删除的角色Id数组，*必填
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": ["ObjectId","..."] //返回删除成功的角色Id
}
```

> **注意事项**

无

## 角色-获取角色所有成员

`role/members`

> **URL**

https://api.xxx.com/v1/role/members

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `ObjectId` | 角色Id                 |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": [{
        "_id": "ObjectId", //成员Id
        "Email": "xxx@qq.com", //邮箱
        "PhoneNumber": "(86)136xxxxxxxx", //手机号
        "RealName": "超级管理员" //成员真实姓名
    }, {
        "...": ""
    }]
}
```

> **注意事项**

无

## 角色-添加角色成员（批量，映射）

`role/add_members`

> **URL**

https://api.xxx.com/v1/role/add_members

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选      | 类型         | 说明                   |
| ----------- | ------- | ---------- | -------------------- |
| `UserToken` | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true`  | `ObjectId` | 角色Id                 |
| `MemberIds` | `true`  | `json`     | 待添加的成员Id集合           |
| `Map`       | `false` | `json`     | 返回的属性映射数组            |

`Map`的格式为：

```json
["PropertyName1","..."]   			//返回的属性映射数组，默认为空数组，表示返回所有属性
```

`MemberIds`的格式为：

```json
["ObjectId", "..."] //待添加的成员Id数组，*必填
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": {
        "_id": "ObjectId", //角色Id
        "Name": "深圳筑星科技有限公司", //角色名称
        "ProjectId":"ObjectId",//项目Id
        "Description": "组织描述", //角色描述
        "IsDefault": true, //是否是系统默认角色，系统默认角色不能被删除
        "Creator": {
            "_id": "ObjectId", //用户Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //真实姓名
        },
        "CreatedDate": " /Date/", //创建时间
        "Orgs": [{
            "_id": "ObjectId", //组织Id
            "Name": "超级管理员" //组织名称
        }],
        "Members": [{
            "_id": "ObjectId", //成员Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //成员真实姓名
        }, {
            "...": ""
        }]
    }
}
```

> **注意事项**

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 角色-删除角色成员（批量）

`role/delete_members`

> **URL**

https://api.xxx.com/v1/role/delete_members

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `ObjectId` | 角色Id                 |
| `MemberIds` | `true` | `json`     | 待删除的成员Id集合           |

`MemberIds`的格式为：

```json
["ObjectId", "..."]	//待删除的成员Id数组，*必填
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": ["ObjectId", "..."] //返回删除成功的成员Id
}
```

> **注意事项**

无

## 权限-获取所有权限项（筛选、分页、排序、映射）

`access/list`

> **URL**

https://api.xxx.com/v1/access/list

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数           | 必选      | 类型         | 说明                   |
| ------------ | ------- | ---------- | -------------------- |
| `UserToken`  | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `ActorType`  | `true`  | `int`      | 参与者类型：0-成员，1-组织，2-角色 |
| `ActorId`    | `true`  | `ObjectId` | 参与者Id                |
| `ListParams` | `false` | `json`     | 集合的筛选、分页、排序、映射参数     |

`ListParams`的格式为：

```json
{
    "Search": "[Expression]", //筛选表达式，默认为空，表示不筛选
    "Page": { //分页，默认为空，表示不分页
        "Index": 0, //分页索引，*必填
        "Count": 1, //分页数量，*必填
    },
    "Sort": [{ //排序，可选，默认为空数组，表示不排序
        "Property": "PropertyName", //第一个排序属性名，*必填
        "Ascending": true //是否升序，如果为false，则为降序排列，默认为true
    }, {
        "...": ""
    }],
    "Map": ["PropertyName1", "..."] //返回的属性映射数组，默认为空数组，表示返回所有属性
}
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": [{
        "AppKey": "GUID", //应用唯一标识
        "Name": "档案管理" //应用名称
      	"Description": "string", //应用描述
      	"IsEnabled": 0, //是否启用:0-未设置；1-禁用；2-启用
        "Modules": [{
            "Key": "GUID", //模块的唯一键
        	"Name": "string", //模块名称
        	"Description": "string", //模块描述
            "IsEnabled": 0 //是否启用:0-未设置；1-禁用；2-启用
        }, {
            "...": ""
        }]
    }, {
        "...": ""
    }]
}
```

> **注意事项**

无

## 权限-获取功能项权限

`access/info`

> **URL**

https://api.xxx.com/v1/access/info

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `ModuleKey` | `true` | `GUID`     | 功能项Id                |
| `ActorType` | `true` | `int`      | 参与者类型：0-成员，1-组织，2-角色 |
| `ActorId`   | `true` | `ObjectId` | 参与者Id                |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": {
        "IsEnabled": 0 //是否启用该功能项:0-未设置；1-禁用；2-启用
        "RealAccess":true //实际权限
    }
}
```

> **注意事项**

无

## 权限-获取当前用户对功能项的权限(批量)

`access/privilege`

> **URL**

https://api.xxx.com/v1/access/privilege

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数           | 必选     | 类型         | 说明                   |
| ------------ | ------ | ---------- | -------------------- |
| `UserToken`  | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `ModuleKeys` | `true` | `json`     | 功能项Id集合              |
| `ProjectId`  | `true` | `ObjectId` | 项目Id                 |

`ModuleKeys`的格式为：

```json
["GUID1", "..."]	//功能项Id的数组，*必填
```

> 返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": [{
        "ModuleKey": "GUID" //功能项Id
        "RealAccess":true //实际权限
    },{
      "...":""
    }]
}
```

> **注意事项**

无

## 权限-获取功能项权限实际权限（批量）

`access/real_access`

> **URL**

https://api.xxx.com/v1/access/real_access

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数           | 必选     | 类型         | 说明                   |
| ------------ | ------ | ---------- | -------------------- |
| `UserToken`  | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `ModuleKeys` | `true` | `json`     | 功能项Id集合              |
| `ActorType`  | `true` | `int`      | 参与者类型：0-成员，1-组织，2-角色 |
| `ActorId`    | `true` | `ObjectId` | 参与者Id                |

`ModuleKeys`的格式为：

```json
["GUID1", "..."]	//功能项Id的数组，*必填
```

> 返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": [{
        	"ModuleKey": "GUID" //功能项Id
        	"RealAccess":true //实际权限
    	},{
          "...": ""
    	}
    ]
}
```

> **注意事项**

无

## 权限-设置功能项权限（批量）

`access/set`

> **URL**

https://api.xxx.com/v1/access/set

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `ActorType` | `true` | `int`      | 参与者类型：0-成员，1-组织，2-角色 |
| `ActorId`   | `true` | `ObjectId` | 参与者Id                |
| `Data`      | `true` | `json`     | 权限信息                 |

`Data`的格式为：

```json
[{
        "ModuleKey": "GUID", //功能项Id，*必填
        "IsEnabled": 0 //是否启用该功能项:0-未设置；1-禁用；2-启用，*必填
    }, {
        "...": ""
}]
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": ["MoudleId1","..."]	//返回成功设置的功能项Id
}
```

> **注意事项**

无

## 权限-获取权限来源

`access/source`

> **URL**

https://api.xxx.com/v1/access/source

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `ActorType` | `true` | `int`      | 参与者类型：0-成员，1-组织，2-角色 |
| `ActorId`   | `true` | `ObjectId` | 参与者Id                |
| `ModuleKey` | `true` | `GUID`     | 功能项Id                |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": ["当前成员所属的xxx角色具有该权限", "当前成员所属的xxx组织具有该权限", "..."]
}
```

> **注意事项**

无


