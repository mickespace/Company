# 文件管理API设计

[TOC]

## 文件-上传文件

`file/upload`

> **URL**

https://api.xxx.com/v1/file/upload

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型                    | 说明                   |
| ----------- | ------ | --------------------- | -------------------- |
| `UserToken` | `true` | `string`              | 用户令牌（包含用户Id及访问权限等信息） |
| `FileName`  | `true` | `string`              | 文件名（不包含路径）           |
| `ParentId`  | `true` | `ObjectId`            | 父文件夹Id               |
| `File`      | `true` | `multipart/form-data` | 文件信息                 |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": { //文件项详细信息
        "_id": "ObjectId", //文件Id
        "Name": "string", //文件名称
        "Thumbnail": "url", //小图标缩略图url地址
      	"LargeThumbnail": "url", //大图标缩略图url地址
        "Description": "string", //文件描述
        "ParentId": "ObjectId", //父文件Id
        "CreateUser": { //创建者信息
            "_id": "ObjectId", //用户Id
            "Email": "xxxx@qq.com", //邮箱
            "PhoneNumber": "(86)139xxxxxxxx", //手机号
            "RealName": "超级管理员" //真实姓名
        },
        "CreateDate": "/Date/", //创建日期
      	"Version": 0, //当前文件版本号，只有IsFolder为false时才有该属性
        "ModifyUser": { //最后修改者信息
            "_id": "ObjectId", //用户Id
            "Email": "xxxx@qq.com", //邮箱
            "PhoneNumber": "(86)139xxxxxxxx", //手机号
            "RealName": "超级管理员" //真实姓名
        },
        "ModifyDate": "/Date/", //最后修改时间
        "IsFolder": false, //是否为文件夹
        "ItemType": 0, //文件项类型：0-普通；1-系统项，默认为0
        "FileSize": 13534 //文件大小，只有IsFolder为false时才有该属性
    }
}
```

> **注意事项**

暂无

## 文件-更新文件

`file/update`

> **URL**

https://api.xxx.com/v1/file/update

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型                    | 说明                   |
| ----------- | ------ | --------------------- | -------------------- |
| `UserToken` | `true` | `string`              | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `ObjectId`            | 文件Id                 |
| `File`      | `true` | `multipart/form-data` | 文件信息                 |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": { //文件项详细信息
        "_id": "ObjectId", //文件Id
        "Name": "string", //文件名称
        "Thumbnail": "url", //小图标缩略图url地址
      	"LargeThumbnail": "url", //大图标缩略图url地址
        "Description": "string", //文件描述
        "ParentId": "ObjectId", //父文件Id
        "CreateUser": { //创建者信息
            "_id": "ObjectId", //用户Id
            "Email": "xxxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //真实姓名
        },
        "CreateDate": "/Date/", //创建日期
      	"Version": 0, //当前文件版本号，只有IsFolder为false时才有该属性
        "ModifyUser": { //最后修改者信息
            "_id": "ObjectId", //用户Id
            "Email": "xxxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //真实姓名
        },
        "ModifyDate": "/Date/", //最后修改时间
        "IsFolder": false, //是否为文件夹
        "ItemType": 0, //文件项类型：0-普通；1-系统项，默认为0
        "FileSize": 13534 //文件大小，只有IsFolder为false时才有该属性
    }
}
```

> **注意事项**

暂无

## 文件-上传文件（大文件分片上传）

`file/upload_large_file`

> **URL**

https://api.xxx.com/v1/file/upload_large_file

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数            | 必选     | 类型                    | 说明                   |
| ------------- | ------ | --------------------- | -------------------- |
| `UserToken`   | `true` | `string`              | 用户令牌（包含用户Id及访问权限等信息） |
| `FileName`    | `true` | `string`              | 文件名（不包含路径）           |
| `ParentId`    | `true` | `ObjectId`            | 父文件夹Id               |
| `FileTempId`  | `true` | `GUID`                | 文件临时标识               |
| `SliceOffset` | `true` | `long`                | 分片偏移位置               |
| `FileLength`  | `true` | `long`                | 文件总大小                |
| `SliceData`   | `true` | `multipart/form-data` | 文件分片信息               |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": {
        "_id": "ObjectId", //文件Id
        "Name": "string", //文件名称
        "Thumbnail": "url", //小图标缩略图url地址
      	"LargeThumbnail": "url", //大图标缩略图url地址
        "Description": "string", //文件描述
        "ParentId": "ObjectId", //父文件Id
        "FileSize": 13534, //文件大小，只有IsFolder为false时才有该属性
        "CreateUser": { //创建者信息
            "_id": "ObjectId", //用户Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //真实姓名
        },
        "CreateDate": "/Date/", //创建日期
      	"Version": 0, //当前文件版本号，只有IsFolder为false时才有该属性
        "ModifyUser": { //最后修改者信息
            "_id": "ObjectId", //用户Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //真实姓名
        },
        "ModifyDate": "/Date/", //最后修改时间
        "IsFolder": false, //是否为文件夹
        "ItemType": 0, //文件项类型：0-普通；1-系统项，默认为0	
    }
}
```

> **注意事项**

服务器端需要接收到文件的所有分片，在成功接收最后一个分片后才会把文件的详细信息发给客户端。

## 文件-更新文件（大文件分片上传）

`file/update_large_file`

> **URL**

https://api.xxx.com/v1/file/update_large_file

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数            | 必选     | 类型                    | 说明                   |
| ------------- | ------ | --------------------- | -------------------- |
| `UserToken`   | `true` | `string`              | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`          | `true` | `ObjectId`            | 文件Id                 |
| `FileTempId`  | `true` | `guid`                | 文件临时标识               |
| `SliceOffset` | `true` | `long`                | 分片偏移位置               |
| `FileLength`  | `true` | `long`                | 文件总大小                |
| `SliceData`   | `true` | `multipart/form-data` | 文件分片信息               |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": {
        "_id": "ObjectId", //文件Id
        "Name": "string", //文件名称
        "Thumbnail": "url", //小图标缩略图url地址
      	"LargeThumbnail": "url", //大图标缩略图url地址
        "Description": "string", //文件描述
        "ParentId": "ObjectId", //父文件Id
        "FileSize": 13534, //文件大小，只有IsFolder为false时才有该属性
        "CreateUser": { //创建者信息
            "_id": "ObjectId", //用户Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //真实姓名
        },
        "CreateDate": "/Date/", //创建日期
      	"Version": 0, //当前文件版本号，只有IsFolder为false时才有该属性
        "ModifyUser": { //最后修改者信息
            "_id": "ObjectId", //用户Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //真实姓名
        },
        "ModifyDate": "/Date/", //最后修改时间
        "IsFolder": false, //是否为文件夹
        "ItemType": 0, //文件项类型：0-普通；1-系统项，默认为0
    }
}
```

> **注意事项**

服务器端需要接收到文件的所有分片，在成功接收最后一个分片后才会把文件的详细信息发给客户端。

## 文件-下载文件

`file/download`

> **URL**

https://api.xxx.com/v1/file/download

> **API级别**

4

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `FileId`    | `true` | `ObjectId` | 下载文件的Id              |

> **返回结果**

`文件流`

> **注意事项**

暂无

## 文件-下载文件（大文件分片下载）

`file/download_large_file`

> **URL**

https://api.xxx.com/v1/file/download_large_file

> **API级别**

4

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数            | 必选      | 类型         | 说明                         |
| ------------- | ------- | ---------- | -------------------------- |
| `UserToken`   | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息）       |
| `FileId`      | `true`  | `ObjectId` | 下载文件的Id                    |
| `SliceOffset` | `true`  | `long`     | 文件分片偏移位置                   |
| `SliceLength` | `false` | `long`     | 分片的长度（字节），默认为1024x1024（1M） |

> **返回结果**

`文件流`

> **注意事项**

暂无

## 文件-创建文件夹

`file/create_folder`

> **URL**

https://api.xxx.com/v1/file/create_folder

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数           | 必选      | 类型         | 说明                    |
| ------------ | ------- | ---------- | --------------------- |
| `UserToken`  | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息）  |
| `FolderName` | `true`  | `string`   | 文件夹名（不包含路径）           |
| `ParentId`   | `true`  | `ObjectId` | 父文件夹Id                |
| `ItemType`   | `false` | `int`      | 文件项类型：0-普通；1-系统项，默认为0 |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": { //文件项详细信息
        "_id": "ObjectId", //文件Id
        "Name": "string", //文件名称
        "Thumbnail": "url", //小图标缩略图url地址
      	"LargeThumbnail": "url", //大图标缩略图url地址
        "Description": "string", //文件项描述
        "ParentId": "ObjectId", //父项Id
        "CreateUser": { //创建者信息
            "_id": "ObjectId", //用户Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //真实姓名
        },
        "CreateDate": "/Date/", //创建日期
      	"Version": 0, //当前文件版本号，只有IsFolder为false时才有该属性
        "ModifyUser": { //最后修改者信息
            "_id": "ObjectId", //用户Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //真实姓名
        },
        "ModifyDate": "/Date/", //最后修改时间
        "IsFolder": false, //是否为文件夹
        "ItemType": 0 //文件项类型：0-普通；1-系统项，默认为0	
    }
}
```

> **注意事项**

暂无

## 文件-创建文件目录树

`file/create_folder_tree`

> **URL**

https://api.xxx.com/v1/file/create_folder_tree

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Data`      | `true` | `json`   | 文件夹树信息               |

`Data`的格式为：

```json
{
    "ParentId": "ObjectId", //父项编号，*必填
    "Name": "string", //文件夹名，*必填
    "Children": [{
        "Name": "", //文件夹名，*必填
        "...": "",
        "Children": [{
            "...": ""
        }]
    }]
}
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": {
        "_id": "ObjectId", //文件夹Id
        "Name": "string", //文件夹名
        "Children": [{
            "_id": "ObjectId", //文件夹Id
            "Name": "string",
            "Children": [{
                "...": ""
            }]
        }]
    }
}
```

> **注意事项**

暂无

## 文件-获取项目文件夹

`file/project_folder`

> **URL**

https://api.xxx.com/v1/file/project_folder

> **API级别**

4

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
    "Data": { //文件项详细信息
        "_id": "ObjectId", //文件夹Id
        "Name": "string", //文件夹名称
        "Thumbnail": "url", //小图标缩略图url地址
      	"LargeThumbnail": "url", //大图标缩略图url地址
        "Description": "string", //文件夹描述
        "ParentId": "ObjectId", //父文件Id
        "CreateDate": "/Date/", //创建日期
      	"Version": 0, //当前文件版本号，只有IsFolder为false时才有该属性
        "ModifyDate": "/Date/", //最后修改时间
        "IsFolder": false, //是否为文件夹
        "ItemType": 0 //文件项类型：0-普通；1-系统项，默认为0
    }
}
```

> **注意事项**

暂无

## 文件-获取父文件夹

`file/parent`

> **URL**

https://api.xxx.com/v1/file/parent

> **API级别**

4

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `ItemId`    | `true` | `ObjectId` | 文件项Id                |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": { //文件项详细信息
        "_id": "ObjectId", //文件夹Id
        "Name": "string", //文件夹名称
        "Thumbnail": "url", //小图标缩略图url地址
      	"LargeThumbnail": "url", //大图标缩略图url地址
        "Description": "string", //文件夹描述
        "ParentId": "ObjectId", //父文件Id
        "CreateDate": "/Date/", //创建日期
      	"Version": 0, //当前文件版本号，只有IsFolder为false时才有该属性
        "ModifyDate": "/Date/", //最后修改时间
        "IsFolder": false, //是否为文件夹
        "ItemType": 0 //文件项类型：0-普通；1-系统项，默认为0
    }
}
```

> **注意事项**

暂无

## 文件-获取文件夹下所有子项（筛选、映射）

`file/descendants`

> **URL**

https://api.xxx.com/v1/file/descendants

> **API级别**

4

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数             | 必选      | 类型         | 说明                   |
| -------------- | ------- | ---------- | -------------------- |
| `UserToken`    | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `FolderId`     | `true`  | `ObjectId` | 文件夹Id                |
| `ContainsFile` | `false` | `bool`     | 是否包含文件（默认为true）      |
| `ListParams`   | `false` | `json`     | 集合的筛选、映射参数           |

`ListParams`格式为：

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
        "_id": "ObjectId", //文件夹Id
        "Name": "string", //文件夹名称
        "Description": "string", //文件夹描述
        "ParentId": "ObjectId", //父文件Id
        "FileSize": 13534, //文件大小，只有IsFolder为false时才有该属性
        "CreatorId": "ObjectId", //创建者Id
        "CreateDate": "/Date/", //创建日期
        "Version": 0, //当前文件版本号，只有IsFolder为false时才有该属性
        "ModifierId": "ObjectId", //最近修改用户
        "ModifyDate": "/Date/", //最后修改时间
        "IsFolder": false, //是否为文件夹
        "ItemType": 0, //文件项类型，默认为0（0-普通;1-系统项）
        "Children": [{ //子项信息集合
            "_id": "ObjectId", //文件夹Id
            "Name": "string", //文件夹名称
            "Thumbnail": "url", //小图标缩略图url地址
      		"LargeThumbnail": "url", //大图标缩略图url地址
            "Description": "string", //文件夹描述
            "ParentId": "ObjectId", //父文件Id
            "FileSize": 13534, //文件大小，只有IsFolder为false时才有该属性
            "CreatorId": "ObjectId", //创建者Id
            "CreateDate": "/Date/", //创建日期
            "Version": 0, //当前文件版本号，只有IsFolder为false时才有该属性
            "ModifierId": "ObjectId", //最近修改用户
            "ModifyDate": "/Date/", //最后修改时间
            "IsFolder": false, //是否为文件夹
            "ItemType": 0, //文件项类型：0-普通；1-系统项，默认为0
            "Children": [{
                "...": ""
            }]
        } {
            "...": ""
        }]
    }, {
        "...": ""
    }]
}
```

> **注意事项**

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 文件-获取文件项所有父项（映射）

`file/ancestors`

> **URL**

https://api.xxx.com/v1/file/ancestors

> **API级别**

4

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选      | 类型         | 说明                   |
| ----------- | ------- | ---------- | -------------------- |
| `UserToken` | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `ItemId`    | `true`  | `ObjectId` | 文件项Id                |
| `Map`       | `false` | `json`     | 返回的属性映射数组            |

`Map`格式为：

```json
["PropertyName1","..."]   //返回的属性映射数组，默认为空数组，表示返回所有属性
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": [ //文件项集合
        {
            "_id": "ObjectId", //文件Id
            "Name": "string", //文件名称
            "Description": "string", //文件描述
            "ParentId": "ObjectId", //父文件Id
            "CreatorId": "ObjectId", //创建者Id
            "CreateDate": "/Date/", //创建日期
            "ModifierId": "/Date/", //最近修改用户
            "ModifyDate": "/Date/", //最后修改时间
            "IsFolder": true, //是否为文件夹
            "ItemType": 0 //文件项类型：0-普通；1-系统项，默认为0	
        }, {
            "...": ""
        }
    ]
}
```

> **注意事项**

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 文件-获取文件夹子项（筛选、映射）

`file/children`

> **URL**

https://api.xxx.com/v1/file/children

> **API级别**

4

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数           | 必选      | 类型         | 说明                   |
| ------------ | ------- | ---------- | -------------------- |
| `UserToken`  | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `FolderId`   | `true`  | `ObjectId` | 文件夹Id                |
| `ListParams` | `false` | `json`     | 集合的筛选、映射参数           |

`ListParams`格式为：

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
        "_id": "ObjectId", //文件Id
        "Name": "string", //文件名称
        "Thumbnail": "url", //小图标缩略图url地址
      	"LargeThumbnail": "url", //大图标缩略图url地址
        "Description": "string", //文件描述
        "ParentId": "ObjectId", //父文件Id
        "CreateUser": { //创建者信息
            "_id": "ObjectId", //用户Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //真实姓名
        },
        "CreateDate": "/Date/", //创建日期
      	"Version": 0, //当前文件版本号，只有IsFolder为false时才有该属性
        "ModifyUser": { //最后修改者信息
            "_id": "ObjectId", //用户Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //真实姓名
        },
        "ModifyDate": "/Date/", //最后修改时间
        "IsFolder": false, //是否为文件夹
        "FileSize": 13534, //文件大小，只有IsFolder为false时才有该属性
        "ItemType": 0 //文件项类型：0-普通；1-系统项，默认为0								
    }, {
        "...": ""
    }]
}
```

> **注意事项**

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 文件-获取多个文件项的详细信息（批量、映射）

`file/info`

> **URL**

https://api.xxx.com/v1/file/info

> **API级别**

4

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选      | 类型       | 说明                   |
| ----------- | ------- | -------- | -------------------- |
| `UserToken` | `true`  | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `ItemIds`   | `true`  | `json`   | 文件项Id的集合             |
| `Map`       | `false` | `json`   | 返回的属性映射数组            |

`ItemIds`的格式为：

```json
["ObjectId","..."]  //文件项Id集合，*必填
```

`Map`的格式为：

```json
["PropertyName1","..."]   //返回的属性映射数组，默认为空数组，表示返回所有属性
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": [{
        "_id": "ObjectId", //文件Id
        "Name": "string", //文件名称
        "Thumbnail": "url", //小图标缩略图url地址
      	"LargeThumbnail": "url", //大图标缩略图url地址
        "Description": "string", //文件描述
        "ParentId": "ObjectId", //父文件Id
        "FileSize": 13534, //文件大小，只有IsFolder为false时才有该属性
        "CreateUser": { //创建者信息
            "_id": "ObjectId", //用户Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //真实姓名
        },
        "CreateDate": "/Date/", //创建日期
        "Version": 0, //当前文件版本号，只有IsFolder为false时才有该属性
        "History": [{ //文件的历史版本，只有IsFolder为false时才有该属性
            "Version": 0, //版本号
            "FsId": "ObjectId", //GridFS文件系统中的Id
            "UpdateDate": "/Date/", //更新日期
            "UpdateUserId": "ObjectId" //更新者Id
        }, {
            "...": ""
        }],
        "ModifyUser": { //最后修改者信息
            "_id": "ObjectId", //用户Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //真实姓名
        },
        "ModifyDate": "/Date/", //最后修改时间
        "IsFolder": false, //是否为文件夹
        "ItemType": 0, //文件项类型，默认为0（0普通1系统项）	
        "AccessInfo": [{ //权限信息
            "_id": "ObjectId", //Id
            "ActorType": 0, //参与者类型：0-成员，1-组织，2-角色
            "ActorId": "ObjectId", //参与者Id
            "AccessType": 0 //权限类型：-1-继承；0-全部禁用；1-读取属性；2-读取文件列表；256-编辑基本信息；512-编辑扩展属性；1024-编辑权限信息
        }, {
            "...": ""
        }],
        "Properties": [{ //附加属性信息
            "Name": "Value"
        }, {
            "...": ""
        }]
    }, {
        "...": ""
    }]
}
```

> **注意事项**

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 文件-获取文件图标

`file/thumbnail`

> **URL**

https://api.xxx.com/v1/file/thumbnail

> **API级别**

4

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数              | 必选     | 类型       | 说明            |
| --------------- | ------ | -------- | ------------- |
| `ExtName`       | `true` | `string` | 文件的扩展名        |
| `ThumbnailType` | `true` | `int`    | 缩略图类型（1小图2大图） |

> **返回结果**

`文件流`

> **注意事项**

暂无

## 文件-获取资源文件

`file/resource`

> **URL**

https://api.xxx.com/v1/file/resource

> **API级别**

4

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数     | 必选      | 类型         | 说明                  |
| ------ | ------- | ---------- | ------------------- |
| `Id`   | `true`  | `ObjectId` | 文件Id                |
| `Type` | `false` | `int`      | 默认0原始文件，1为缩略图（图片类型） |

> **返回结果**

`文件流`

> **注意事项**

暂无

## 文件-删除文件项（批量）

`file/delete_items`

> **URL**

https://api.xxx.com/v1/file/delete_items

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `ItemIds`   | `true` | `json`   | 文件项Id的集合             |

`ItemIds `的格式为：

```json
["ObjectId","..."]  //文件项Id的集合，*必填
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": ["ObjectId","..."] //返回删除成功的文件项Id
}
```

> **注意事项**

暂无

## 文件-更新文件项（批量）

`file/update_items`

> **URL**

https://api.xxx.com/v1/file/update_items

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Data`      | `true` | `Json`   | 更新项信息集合              |

`Data  `的格式为：

```json
{
    "UpdateInfos": [{
        "_id": "ObjectId", //文件项编号
        "PropertyName":"..." //其它属性信息		
    }, {
        "...": ""
    }]
}
```

> 返回结果

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": ["ObjectId","..."] //返回更新成功的文件项Id
}
```

> **注意事项**

暂无

## 文件-更新权限信息

`file/update_permission`

> **URL**

https://api.xxx.com/v1/file/update_permission

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Data`      | `true` | `json`   | 更新的权限信息集合            |

`Data  `的格式为：

```json
[{
    "_id":"ObjectId", //权限项编号，可选（修改及删除时必填）
    "ActorId": "ObjectId", //参与者Id
    "ActorType": 0, //参与者类型：0-成员；1-组织；2-角色
    "ItemId": "ObjectId", //文件项Id
    "AccessType": 0, //权限类型：-1-继承；0-全部禁用；1-读取属性；2-读取文件列表；256-编辑基本信息；512-编辑扩展属性；1024-编辑权限信息
    "Operation": 0 //数据的状态：1-新增;2-修改;3-删除
}]
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": null //返回的数据
}
```

> **注意事项**

暂无

## 文件-查找文件项是否存在

`file/exist`

> **URL**

https://api.xxx.com/v1/file/exist

> **API级别**

4

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `ItemId`    | `true` | `ObjectId` | 文件项Id                |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": true //文件项是否存在
}
```

> **注意事项**

暂无

## 文件-移动文件项（批量）

`file/move_items`

> **URL**

https://api.xxx.com/v1/file/move_items

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数             | 必选     | 类型         | 说明                   |
| -------------- | ------ | ---------- | -------------------- |
| `UserToken`    | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `DestFolderId` | `true` | `ObjectId` | 目标文件夹Id（移动到此目录）      |
| `ItemIds`      | `true` | `json`     | 文件项Id的集合             |

`ItemIds`的格式为：

```json
["ObjectId","..."]  //文件项Id集合，*必填
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": null //返回的数据
}
```

> **注意事项**

暂无

## 文件-复制文件项（批量）

`file/copy_items`

> **URL**

https://api.xxx.com/v1/file/copy_items

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数             | 必选     | 类型         | 说明                   |
| -------------- | ------ | ---------- | -------------------- |
| `UserToken`    | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `DestFolderId` | `true` | `ObjectId` | 目标文件夹Id（移动到此目录）      |
| `ItemIds`      | `true` | `json`     | 文件项Id的集合             |

`ItemIds `的格式为：

```json
["ObjectId","..."]  //文件项Id的集合，*必填
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": null //返回的数据
}
```

> **注意事项**

暂无

## 回收站-获取回收站文件项列表

`file/recycle/list`

> **URL**

https://api.xxx.com/v1/file/recycle/list

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
    "Data": [{
        "_id": "ObjectId", //文件Id
        "Name": "string", //文件名称
        "Thumbnail": "url", //小图标缩略图url地址
      	"LargeThumbnail": "url", //大图标缩略图url地址
        "Description": "string", //文件描述
        "ParentId": "ObjectId", //父文件Id
        "CreateUser": { //创建者信息
            "_id": "ObjectId", //用户Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //真实姓名
        },
        "CreateDate": "/Date/", //创建日期
      	"Version": 0, //当前文件版本号，只有IsFolder为false时才有该属性
        "ModifyUser": { //最后修改者信息
            "_id": "ObjectId", //用户Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //真实姓名
        },
        "ModifyDate": "/Date/", //最后修改时间
        "IsFolder": false, //是否为文件夹
        "FileSize": 13534, //文件大小，只有IsFolder为false时才有该属性
        "ItemType": 0 //文件项类型，默认为0（0普通1系统项）								
    }, {
        "...": ""
    }]
}
```

> **注意事项**

无

## 回收站-还原回收站文件项（批量）

`file/recycle/reduction`

> **URL**

https://api.xxx.com/v1/file/recycle/reduction

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `ItemIds`   | `true` | `json`   | 文件项Id的集合             |

`ItemIds `的格式为：

```json
["ObjectId","..."]   //文件项Id的集合，*必填
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": ["ObjectId","..."] //返回还原成功的文件项Id
}
```

> **注意事项**

暂无

## 回收站-清空回收站

`file/recycle/clear`

> **URL**

https://api.xxx.com/v1/file/recycle/clear

> **API级别**

5

> **HTTP请求方式**

`POST`

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
    "Data": null //返回的数据
}
```

> **注意事项**

暂无

## 收藏-收藏文件列表

`file/favorite/list`

> **URL**

https://api.xxx.com/v1/file/favorite/list

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
    "Data": [{
        "_id": "ObjectId", //收藏Id
        "FileId": "ObjectId", //文件Id
        "FileName": "string", //文件名称
        "ProjectId": "ObjectId", //所属项目的Id
        "UserId": "ObjectId", //所属用户的Id
        "CreateTime": "/Date/", //收藏时间
        "Tags": ["Tag1", "..."] //标签信息
    }, {
        "...": ""
    }]
}
```

> **注意事项**

暂无

## 收藏-添加文件到收藏(批量)

`file/favorite/add`

> **URL**

https://api.xxx.com/v1/file/favorite/add

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Data`      | `true` | `json`   | 收藏信息                 |

`Data`的格式为：

```json
[{
    "ItemId": "ObjectId", //文件项Id，*必填
    "Tags": ["Tag1", "Tag2", "..."] //标签信息，默认为null
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
    "Data": [{
        "_id": "ObjectId", //收藏Id
        "FileId": "ObjectId", //文件Id
        "FileName": "string", //文件名称
        "ProjectId": "ObjectId", //所属项目的Id
        "UserId": "ObjectId", //所属用户的Id
        "CreateTime": "/Date/", //收藏时间
        "Tags": ["Tag1", "..."] //标签信息
    }, {
        "...": ""
    }]
}
```

> **注意事项**

暂无

## 收藏-移除收藏文件

`file/favorite/delete`

> **URL**

https://api.xxx.com/v1/file/favorite/delete

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `ObjectId` | 收藏Id                 |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": null //返回的数据
}
```

> **注意事项**

暂无

## 分享-获取分享文件列表

`file/share/list`

> **URL**

https://api.xxx.com/v1/file/share/list

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
    "Data": [ //信息列表
        {
            "FileId": "ObjectId", //文件Id
            "FileName": "string", //文件名
            "_id": "ObjectId", //分享记录Id
            "ProjectId": "ObjectId", //所属项目的Id
            "UserId": "ObjectId", //所属用户的Id
            "CreatedDate": "/Date/", //分享日期
            "DownloadTimes": 0, //下载次数
            "ShareType": 0, //分享类型：1-公开；2-私密
            "ExtraCode": "123456", //提取码
            "ShareUrl": "https://api.xxx.com/v1/file/download_share_file?ShareId=0" //分享Url
        }, {
        "...": ""
    }]
}
```

> **注意事项**

暂无

## 分享-添加分享文件（批量）

`file/share/add`

> **URL**

https://api.xxx.com/v1/file/share/add

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `ItemIds`   | `true` | `json`   | 文件项Id的集合             |
| `ShareType` | `true` | `int`    | 分享类型（1为公开、2为私密）      |

`ItemIds `的格式为：

```json
["ObjectId","..."]  //文件项Id的集合，*必填
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": {
        "FileId": "ObjectId", //文件Id
        "FileName": "string", //文件名
        "_id": "ObjectId", //分享记录Id
        "ProjectId": "ObjectId", //所属项目的Id
        "UserId": "ObjectId", //所属用户的Id
        "CreatedDate": "/Date/", //分享日期
        "DownloadTimes": 0, //下载次数
        "ShareType": 0, //分享类型：1-公开；2-私密
        "ExtraCode": "123456", //提取码
        "ShareUrl": "https://api.xxx.com/v1/file/download_share_file?ShareId=0" //分享Url
    }
}
```

> **注意事项**

暂无

## 分享-移除分享文件

`file/share/delete`

> **URL**

https://api.xxx.com/v1/file/share/delete

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `ObjectId` | 文件分享Id               |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": null //返回的数据
}
```

> **注意事项**

暂无

## 分享-下载分享文件

`file/share/download`

> **URL**

https://api.xxx.com/v1/file/share/download

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数   | 必选     | 类型         | 说明     |
| ---- | ------ | ---------- | ------ |
| `Id` | `true` | `ObjectId` | 文件分享Id |

> **返回结果**

`文件流`

> **注意事项**

暂无



