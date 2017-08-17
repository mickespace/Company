# 项目管理API



[TOC]

## 项目-获取项目信息（映射）

`project/info`

> **URL**

[https://api.xxx.com/v1/project/info]()

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选      | 类型       | 说明                   |
| ----------- | ------- | -------- | -------------------- |
| `UserToken` | `true`  | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true`  | `string` | 项目Id                 |
| `Map`       | `false` | `json`   | 返回的属性映射数组            |

`Map`的格式如下：

```json
["PropertyName1","..."]  //返回的属性映射数组,默认为空数组，表示返回所有属性
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string",//返回信息
    "Data": {
        "_id": "ObjectId", //Id
        "Name": "string", //项目名称
        "Icon": "url", //项目图标
        "Description": "string", //项目描述
        "Publicity": 0, //项目公开性：0-成员可见；1-所有人可见
        "OwnerId": "ObjectId", //项目拥有者Id
        "CreatorId": "ObjectId", //项目创建者Id
        "CreatedDate": "/Date/", //项目创建时间
        "Property": [{ //项目概览信息
            "_id": "ObjectId", //主键
            "Name": "string", //属性名
            "Value": "string" //属性值
        }, {
            "...": ""
        }],
        "Apps": ["GUID", "..."], //项目启用的APP集合
        "Majors": [{ //项目中
            "_id": "ObjectId", //Id
            "Name": "string", //名称
            "Desciption": "string" //描述
        }, {
            "...": ""
        }]
    }
}
```

> **注意事项**

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 项目-获取当前用户参与的项目（筛选、分页，排序、映射）

`project/list`

> **URL**

https://api.xxx.com/v1/project/list

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数           | 必选      | 类型       | 说明                   |
| ------------ | ------- | -------- | -------------------- |
| `UserToken`  | `true`  | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `ListParams` | `flase` | `json`   | 集合的筛选、分页、排序、映射参数     |

`ListParams`格式为：

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
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": [{
        "_id": "ObjectId", //Id
        "Name": "string", //项目名称
        "Icon": "url", //项目图标
        "Publicity": 0, //项目公开性：0-成员可见；1-所有人可见
        "Description": "string", //项目描述
        "OwnerId": "ObjectId", //项目拥有者Id
        "CreatorId": "ObjectId", //项目创建者Id
        "CreatedDate": "/Date/", //项目创建时间
        "Property": [{ //项目概览信息
            "_id": "ObjectId",
            "Name": "string", //属性名，可作为主键
            "Value": "string" //属性值
        }, {
            "...": ""
        }],
        "Apps": ["GUID", "..."], //项目启用的APP集合
        "Majors": [{ //项目中的专业
            "_id": "ObjectId", //Id
            "Name": "string", //名称
            "Description": "string" //描述
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

## 项目-创建项目（映射）

`project/create`

> **URL**

[https://api.xxx.com/v1/project/create]()

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选      | 类型       | 说明                   |
| ----------- | ------- | -------- | -------------------- |
| `UserToken` | `true`  | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Data`      | `true`  | `json`   | 项目信息                 |
| `Icon`      | `false` | `Stream` | 项目图标信息               |
| `Map`       | `false` | `json`   | 返回的属性映射数组            |

`Data`格式为：

```json
{
    "Name": "string", //项目名称 *必填
    "Description": "string", //项目描述，默认为空
    "Publicity": 0, //项目公开性：0-成员可见；1-所有人可见
    "...": "" //自定义属性
}
```

`Map`的格式如下：

```json
["PropertyName1","..."]  //返回的属性映射数组,默认为空数组，表示返回所有属性
```

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": {
        "_id": "ObjectId", //项目Id
        "Name": "string", //项目名称
        "Icon": "url", //项目图标地址
        "Description": "string", //项目描述
        "OwnerId": "ObjectId", //项目拥有者Id
        "CreatorId": "ObjectId", //项目创建者Id
        "CreatedDate": "/Date/", //项目创建时间
        "Apps": ["GUID", "..."], //项目启用的APP集合
        "...": "" //自定义属性
    }
}
```

> **注意事项**

`Property`、 `Apps、` `Majors、` `Description` 、`...`  以及返回值中包含的一些固有字段 不能作为自定义属性的名称，服务在解析的时候将会自动忽略这些已使用的字段名称。

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 项目-更新项目信息

`project/update`

> **URL**

[https://api.xxx.com/v1/project/update]()

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选      | 类型                    | 说明                   |
| ----------- | ------- | --------------------- | -------------------- |
| `UserToken` | `true`  | `string`              | 用户令牌（包含用户Id及访问权限等信息） |
| `Data`      | `true`  | `string`              | 需要更新的项目信息            |
| `Id`        | `true`  | `string`              | 项目Id                 |
| `Icon`      | `false` | `multipart/form-data` | 项目图标信息               |

`Data`格式为：

```json
{
    "Name": "string", //项目名称，默认为null 
    "Description": "string", //项目描述，默认为null 
    "OwnerId": "ObjectId", //项目拥有者Id，默认为null 
    "Publicity": 0, //项目公开性：0-成员可见；1-所有人可见
    "...": "" //自定义的属性
}
```

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": { //只返回需要修改的字段
        "_id": "ObjectId", //Id
        "Name": "string", //项目名称
        "Icon": "url", //项目图标
        "Description": "string", //项目描述
        "OwnerId": "ObjectId", //项目拥有者Id
        "Publicity": 0, //项目公开性：0-成员可见；1-所有人可见
        "...": "" //自定义的属性
    }
}
```

> **注意事项**

`Property`、 `Apps、` `Majors、` `Description` 、`...`  以及返回值中包含的一些固有字段 不能作为自定义属性的名称，服务在解析的时候将会自动忽略这些已使用的字段名称。

返回结果中的Data 只包含修改的字段（即在上传参数中需要修改的字段）

## 项目-添加项目下的应用（批量）

`project/add_apps`

> **URL**

https://api.xxx.com/v1/project/add_apps

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `ObjectId` | 项目Id                 |
| `AppKeys`   | `true` | `json`     | 待添加的应用标识集合           |

`AppKeys`的格式为：

```json
["GUID", "..."] //待添加的AppKey数组，*必填
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": ["GUID", "..."] //返回添加成功的应用标识
}
```

> **注意事项**

无

## 项目-删除项目下的应用（批量）

`project/delete_apps`

> **URL**

https://api.xxx.com/v1/project/delete_apps

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `ObjectId` | 项目Id                 |
| `AppKeys`   | `true` | `json`     | 待删除的应用标识             |

`RoleIds`的格式为：

```json
["GUID", "..."] //待删除的AppKey数组，*必填
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": ["GUID", "..."] //返回删除成功的应用标识
}
```

> **注意事项**

无

## 项目-删除项目（批量）

`project/delete`

> **URL**

[https://api.xxx.com/v1/project/delete]()

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Ids`       | `true` | `json`   | 项目Id集合               |

`Ids`格式为：

```json
["ObjectId1","..."]  //项目Id，*必填
```

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": ["ObjectId1", "..."] //返回删除成功的项目Id
}
```

> **注意事项**

无

## 项目-通过邀请码加入项目

`project/join`

> **URL**

https://api.xxx.com/v1/project/join

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数           | 必选     | 类型       | 说明                             |
| ------------ | ------ | -------- | ------------------------------ |
| `UserToken`  | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息）           |
| `InviteCode` | `true` | `string` | 邀请码（包含邀请人Id、邀请加入的项目Id、邀请码过期时间） |

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": "ObjectId" //加入成功，返回加入的项目Id 
}
```

> **注意事项**

无

## 项目-验证邀请码

`project/valid_invite_code`

> **URL**

https://api.xxx.com/v1/project/valid_invite_code

> **API级别**

4

> **HTTP请求方式**

`Get`

> **请求参数：**

| 参数           | 必选     | 类型       | 说明                             |
| ------------ | ------ | -------- | ------------------------------ |
| `InviteCode` | `true` | `string` | 邀请码（包含邀请人Id、邀请加入的项目Id、邀请码过期时间） |

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": null
}
```

> **注意事项**

无

## 项目-通过邀请码获取项目Id

`project/projectId_by_inviteCode`

> **URL**

https://api.xxx.com/v1/project/projectId_by_inviteCode

> **API级别**

4

> **HTTP请求方式**

`Get`

> **请求参数：**

| 参数           | 必选     | 类型       | 说明                             |
| ------------ | ------ | -------- | ------------------------------ |
| `InviteCode` | `true` | `string` | 邀请码（包含邀请人Id、邀请加入的项目Id、邀请码过期时间） |

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": "ObjectId"//项目Id
}
```

> **注意事项**

无

## 概览-获取工程概况

`project/property/info`

> **URL**

https://api.xxx.com/v1/project/property/info

> **API级别**

2

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
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": [{
        "_id": "ObjectId", //添加自定义属性的Id
        "Name": "string", //添加自定义属性的Name
        "Value": "string" //添加自定义属性的value
    }, {
        "...": ""
    }]
}
```

> **注意事项**

无

## 概览-添加工程概况项（批量）

`project/property/add`

> **URL**

https://api.xxx.com/v1/project/property/add

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| :---------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `ProjectId` | `true` | `ObjectId` | 项目Id                 |
| `Data`      | `true` | `json`     | 工程概况自定义属性名和值         |

`Data`格式如下：

```json
[{
  "Name": "string",// *必填
  "Value": "string"// *必填
},{
  "...":""
}]
```

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": [{
        "_id": "ObjectId", //添加自定义属性的Id
        "Name": "string", //添加自定义属性的Name
        "Value": "string" //添加自定义属性的value
    }, {
        "...": ""
    }]
}
```

> **注意事项**

无

## 概览-删除工程概况项（批量）

`project/property/delete`

> **URL**

https://api.xxx.com/v1/project/property/delete

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Ids`       | `true` | `json`   | 自定义属性Id集合            |
| `ProjectId` | `true` | `string` | 项目Id                 |

`Ids` 格式为：

```json
["ObjectId1","..."]  //自定义属性的Id，*必填
```

> **返回结果**

```json
{
  "IsOk": true,//是否成功
  "Code": 200,//返回码
  "Message": "string",//返回信息
  "Data": ["ObjectId1","..."] //返回删除成功的Id
}
```

> **注意事项**

无

## 概览-修改工程概况项（批量）

`project/property/update`

> **URL**

https://api.xxx.com/v1/project/property/update

> **API级别**

3

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Data`      | `true` | `json`     | 项目概况信息               |
| `ProjectId` | `true` | `ObjectId` | 项目Id                 |

`Data`格式如下：

```json
[{
    "Id": "string", //自定义属性Id，*必填
    "Name": "string", //自定义属性名称，*必填
    "Value": "string" //自定义属性值，*必填
}, {
    "...": ""
}]
```

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": ["ObjectId1", "..."] //返回修改成功的属性的Id
}
```

> **注意事项**

无

## 图集-获取项目图集列表（筛选、分页、排序、映射）

`project/photo/list`

> **URL**

https://api.xxx.com/v1/project/photo/list

> **API级别**

2

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数           | 必选      | 类型         | 说明                   |
| ------------ | ------- | ---------- | -------------------- |
| `UserToken`  | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `ProjectId`  | `true`  | `ObjectId` | 项目Id                 |
| `Type`       | `true`  | `int`      | 图片类型，0-效果图片；1-进度图片   |
| `ListParams` | `false` | `json`     | 集合的筛选、分页、排序、映射参数     |

`ListParams`格式为：

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
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": [{
        "_id": "ObjectId", //Id 
        "ProjectId": "ObjectId", //项目id
        "Type": 0, //图片类别：0-效果图；1-进度图
      	"UploadTime":"/Date/", //上传时间
        "File": {
            "FileId": "ObjectId", //图片文件的Id
            "FilePath": "url" //图片原图路径
        },
        "Description": "string", //图片描述
        "Thumbnail": "url" //图片缩略图路径
    }, {
        "...": ""
    }]
}
```

> **注意事项**

如果`PageIndex`和`PageCount`都为0，则表示不分页；如果搜索表达式为空，则表示不搜索；`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。`Sort`表示按指定的属性升序或降序排列。

## 图集-获取图片详情（映射）

`project/photo/info`

> **URL**

https://api.xxx.com/v1/project/photo/info

> **API级别**

2

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选      | 类型         | 说明                   |
| ----------- | ------- | ---------- | -------------------- |
| `UserToken` | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true`  | `ObjectId` | 图片Id                 |
| `Map`       | `false` | `json`     | 返回的属性映射数组            |

`Map`的格式为：

```json
["PropertyName1","..."]   //返回的属性映射数组，,默认为空数组，表示返回所有属性
```

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": {
        "_id": "ObjectId", //Id 
        "ProjectId": "ObjectId", //项目id
        "Type": 0, //图片类别：0-效果图；1-进度图
        "UploadTime":"/Date/", //上传时间
        "File": {
            "FileId": "ObjectId", //图片文件的Id
            "FilePath": "url" //图片原图路径
        },
        "Description": "string", //图片描述
        "Thumbnail": "url" //图片缩略图路径
    }
}
```

> **注意事项**

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 图集-添加图片（批量、映射）

`project/photo/add`

> **URL**

https://api.xxx.com/v1/project/photo/add

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选      | 类型                    | 说明                   |
| ----------- | ------- | --------------------- | -------------------- |
| `UserToken` | `true`  | `string`              | 用户令牌（包含用户Id及访问权限等信息） |
| ``Type``    | `true`  | `int`                 | 图片类型，0-效果图片；1-进度图片   |
| `Files`     | `true`  | `multipart/form-data` | 图片文件流                |
| `ProjectId` | `true`  | `projectId`           | 项目Id                 |
| `Map`       | `false` | `json`                | 返回的属性映射数组            |
| `Data`      | `false` | `json`                | 图片的额外信息              |

`Map`的格式为：

```json
["PropertyName1","..."]   //返回的属性映射数组，,默认为空数组，表示返回所有属性
```

`Data`格式如下：

```json
[{
    "Description": "string", //图片描述，默认为空，
    "UploadTime": "/Date/", //上传日期，默认当天,
}, {
    "...": ""
}]
```

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": [{
        "_id": "ObjectId", //图片Id
        "Type": 0, //图片类型：0-效果图片；1-进度图片
        "UploadTime":"/Date/", //上传时间
        "File": {
            "FileId": "ObjectId", //图片文件的Id
            "FilePath": "url" //图片原图路径
        },
        "Thumbnail": "url", //图片缩略图路径
        "Description": "string" // 图片描述
    }, {
        "...": ""
    }]
}
```

> **注意事项**

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。`FileStreams`需要与`Data`里的数据对应。

## 图集-删除图片（批量）

`project/photo/delete`

> **URL**

https://api.xxx.com/v1/project/photo/delete

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| ``Ids``     | `true` | `json`   | 图片Id的集合              |

`Ids格式为：`

```json
["ObjectId1","..."]  //待删除的图片Id数组，*必填
```

> **返回结果**

```json
{
  "IsOk": true,//是否成功
  "Code": 200,//返回码
  "Message": "string",//返回信息
  "Data": ["ObjectId1","..."] //返回删除成功的图片Id
}
```

> **注意事项**

无

## 图集-修改图片信息

`project/photo/update`

> **URL**

https://api.xxx.com/v1/project/photo/update

> **API级别**

3

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `ObjectId` | 图片Id                 |
| `Data`      | `true` | `json`     | 图片的需要修改信息            |

`Data`格式如下：

```json
{
   "Description": "string", //图片描述，*必填
   "UploadTime": "/Date/", //上传或修改日期
}
```

> **返回结果**

```json
{
  "IsOk": true,//是否成功
  "Code": 200,//返回码
  "Message": "string",//返回信息
  "Data": { //返回的数据
        "_id": "ObjectId", //图片Id
        "Type": 0, //图片类型：0-效果图片；1-进度图片
        "UploadTime":"/Date/", //上传时间
        "File": {
            "FileId": "ObjectId", //图片文件的Id
            "FilePath": "url" //图片原图路径
        },
        "Thumbnail": "url", //图片缩略图路径
        "Description": "string" // 图片描述
  }
}
```

> **注意事项**

无



