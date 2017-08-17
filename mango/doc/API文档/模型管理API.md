# 模型管理API

[TOC]



## 模型浏览-获取构件颜色定义文件

`model/type_color`

> **URL**

https://api.xxx.com/v1/model/type_color

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

无

> **返回结果**

```json
{
    "IsOk": true,
    "Code": 200,
    "Message": "",
    "Data": [{
        "TypeId": 0, //ifc类型Id
        "Name": "string", //ifc类型
        "Color": [255, 255, 255, 255], //颜色
    }, {
        "...": ""
    }]
}
```

> **注意事项**

无

## 模型浏览-获取三维模型场景

`model/scene_file`

> **URL**

https://api.xxx.com/v1/model/scene_file

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选      | 类型         | 说明                          |
| ----------- | ------- | ---------- | --------------------------- |
| `UserToken` | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息）        |
| `FsId`      | `true`  | `ObjectId` | 模型文件Id                      |
| `ModelId`   | `false` | `ObjectId` | 模型文件所在的模型节点Id               |
| `IsBinary`  | `false` | `bool`     | 是否是二进制文件，否则为xml文件，默认为`true` |

> **返回结果**

`Stream`

> **注意事项**

无

## 模型浏览-获取构件颜色定义文件模型场景

`model/type_color`

> **URL**

https://api.xxx.com/v1/model/type_color

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

无

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回信息
    "Data": [{ 
        "TypeId": "ObjectId", //Id
        "Name": "string", //名称
      	"...": ""
    }, {
        "...": ""
    }]
}
```

> **注意事项**

无

## 模型浏览-获取空间结构节点列表（筛选、分页、排序、映射）

`model/ss/list`

> **URL**

https://api.xxx.com/v1/model/ss/list

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数           | 必选      | 类型         | 说明                                 |
| ------------ | ------- | ---------- | ---------------------------------- |
| `UserToken`  | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息）               |
| `ModelId`    | `true`  | `ObjectId` | 模型Id                               |
| `FsId`       | `false` | `ObjectId` | 模型文件节点Id，默认为`null`，表示采用最新版本的模型文件Id |
| `Version`    | `false` | `long`     | 模型文件版本号，默认为-1，表示采用最新版本的模型文件版本      |
| `ListParams` | `false` | `json`     | 集合的筛选、分页、排序、映射参数                   |
| `version`    | `false` | `long`     | 模型文件版本号，默认为-1，表示采用最新版本的模型文件版本      |

`ListParams`格式为：

```json
{
  "Search": "[Expression]", //筛选表达式，默认为空，表示不筛选
  "Page": {	//分页，默认为空，表示不筛选
    "Index": 0,	//分页索引
    "Count": 0	//分页数量
  },
  "Sort": [{ //排序，默认为空数组，表示不排序
    "Property": "PropertyName",	 //第一个排序的属性名,*必填
    "Ascending": false	//是否升序排序，如果为false,则降序排列，默认为true
  },{"...": ""}],
  "Map": ["PropertyName1","PropertyName2","..."] //返回的属性映射数组,默认为空数组，表示返回所有属性
}
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回信息
    "Data": [{ //空间节点集合
        "_id": "ObjectId", //Id
        "ModelId": "ObjectId", //模型Id，只有根节点才存在该字段
        "FsId": "ObjectId", //文件Id，只有根节点才存在该字段
        "Name": "string", //节点名称
        "EntityLabel": 0, //节点Label
        "MajorType": "string", //节点主类型
        "MajorTypeId": 0, //节点主类型Id
        "SubType": "", //节点子类型
        "HasGeometry": false, //是否具有几何实体
        "Color": [255, 255, 255, 255], //节点颜色
        "BoundingBox": [0, 0, 0, 1, 1, 1], //节点包围盒
        "Transform": [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], //节点变换矩阵
        "Ancentors": ["ObjectId", "..."], //祖先节点
        "SortIndex": 0, //排序索引
        "Properties": [{
            "Name": "string", //属性名
            "Value": "string", //属性值
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

## 模型浏览-获取空间结构节点树（映射）

`model/ss/tree`

> **URL**

https://api.xxx.com/v1/model/ss/tree

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选      | 类型         | 说明                                 |
| ----------- | ------- | ---------- | ---------------------------------- |
| `UserToken` | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息）               |
| `ModelId`   | `true`  | `ObjectId` | 模型Id                               |
| `FsId`      | `false` | `ObjectId` | 模型文件节点Id，默认为`null`，表示采用最新版本的模型文件Id |
| `Version`   | `false` | `long`     | 模型文件版本号，默认为-1，表示采用最新版本的模型文件版本      |
| `Map`       | `false` | `json`     | 返回的属性映射数组，如果为空，则返回所有属性             |

`Map`格式为：

```json
["PropertyName1","..."]  //返回的属性映射数组,默认为空数组，表示返回所有属性
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回信息
    "Data": { //空间节点树
        "_id": "ObjectId", //Id
        "ModelId": "ObjectId", //模型Id，只有根节点才存在该字段
        "FsId": "ObjectId", //文件Id，只有根节点才存在该字段
        "Name": "string", //节点名称
        "EntityLabel": 0, //节点Label
        "MajorType": "string", //节点主类型
        "MajorTypeId": 0, //节点主类型Id
        "SubType": "", //节点子类型
        "HasGeometry": false, //是否具有几何实体
        "Color": [255, 255, 255, 255], //节点颜色
        "BoundingBox": [0, 0, 0, 1, 1, 1], //节点包围盒
        "Transform": [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], //节点变换矩阵
        "Ancentors": ["ObjectId", "..."], //祖先节点
        "SortIndex": 0, //排序索引
        "Properties": [{ //其它属性
            "Name": "string", //属性名
            "Value": "string", //属性值
        }, {
            "...": ""
        }],
        "Children": [{
            "...": ""
        }]
    }
}
```

> **注意事项**

接口首先根据筛选表达式找出根结点，然后找到根结点下面所有的后代节点，返回根结点树集合。

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 模型浏览-获取空间结构类型列表

`model/ss/type_list`

> **URL**

https://api.xxx.com/v1/model/ss/type_list

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
    "Code": 200, //返回值
    "Message": "", //返回信息
    "Data": [{
        "MajorType": "string", //主类型
        "MajorTypeId": 0, //主类型Id
        "SubTypes": ["string", "..."] //子类型集合
    }, {
        "...": ""
    }]
}
}
```

> **注意事项**

无

## 模型浏览-获取空间结构Id

`model/ss/id`

> **URL**

https://api.xxx.com/v1/model/ss/id

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数            | 必选      | 类型         | 说明                            |
| ------------- | ------- | ---------- | ----------------------------- |
| `UserToken`   | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息）          |
| `ModelId`     | `true`  | `ObjectId` | 模型节点Id                        |
| `EntityLabel` | `true`  | `int`      | 实体唯一编号                        |
| `FsId`        | `true`  | `ObjectId` | 文件`Id`                        |
| `Version`     | `false` | `long`     | 模型文件版本号，默认为-1，表示采用最新版本的模型文件版本 |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回值
    "Message": "string", //返回信息
    "Data": "ObjectId", //空间结构Id
}
```

> **注意事项**

无

## 模型浏览-获取空间结构节点信息（映射）

`model/ss/info`

> **URL**

https://api.xxx.com/v1/model/ss/info

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选      | 类型         | 说明                     |
| ----------- | ------- | ---------- | ---------------------- |
| `UserToken` | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息）   |
| `SsId`      | `true`  | `ObjectId` | 空间结构Id                 |
| `Map`       | `false` | `json`     | 返回的属性映射数组，如果为空，则返回所有属性 |

`Map`格式为：

```json
["PropertyName1","..."]  //返回的属性映射数组,默认为空数组，表示返回所有属性
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回值
    "Message": "string", //返回信息
    "Data": {
        "_id": "ObjectId", //Id
        "ModelId": "ObjectId", //模型Id，只有根节点才存在该字段
        "FsId": "ObjectId", //文件Id，只有根节点才存在该字段
        "Name": "string", //节点名称
        "EntityLabel": 0, //节点Label
        "MajorType": "string", //节点主类型
        "MajorTypeId": 0, //节点主类型Id
        "SubType": "", //节点子类型
        "HasGeometry": false, //是否具有几何实体
        "Color": [255, 255, 255, 255], //节点颜色
        "BoundingBox": [0, 0, 0, 1, 1, 1], //节点包围盒
        "Transform": [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], //节点变换矩阵
        "Ancentors": ["ObjectId", "..."], //祖先节点
        "SortIndex": 0, //排序索引
        "Properties": [{
            "Name": "系统",
            "Value": "测试系统"
        }, {
            "...": ""
        }],
        "PropertySets": [{ //扩展属性集集合
            "Name": "string", //属性集名称，可作为索引，
            "Properties": [{ //扩展属性
                "Name": "结构材质", //属性名称，可作为索引
                "Value": "混凝土，现场浇注 - C60" //属性值，可以为任意类型
                "Type": 1, //属性类型
            }, {}]
        }, {}],
        "Quantities": [{ //体量信息集合
            "Name": "string", //属性名
            "Value": 0.0, //属性值
            "Unit": "㎡" //单位
        }, {
            "...": "",
        }]
    }
}
```

> **注意事项**

 `Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 模型浏览-获取项目类型列表

`model/ss/type_list`

> **URL**

https://api.xxx.com/v1/model/ss/type_list

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
    "Code": 200, //返回值
    "Message": "string", //返回信息
    "Data": [{//返回的数据
      "MajorTypeId":"Items"
      "MajorType":"string"
      "SubTypes":"Array"
    },{
      "...":""
    }
    ]
}
```

> **注意事项**

暂无

## 实体模型-获取项目树列表

`model/project_tree_list`

> **URL**

https://api.xxx.com/v1/model/project_tree_list

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选      | 类型         | 说明                   |
| ----------- | ------- | ---------- | -------------------- |
| `UserToken` | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `ProjectId` | `true`  | `ObjectId` | 项目Id                 |
| `Map`       | `false` | `json`     | 返回的属性映射数组            |

`Map`格式为：

```json
["PropertyName1", "..."] //返回的属性映射数组,默认为空数组，表示返回所有属性
```

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": [{
        "_id": "ObjectId", //Id
        "BuildingId": "ObjectId", //模型所在的单体Id
        "ParentId": "ObjectId", //父节点Id
        "SortIndex": 0, //排序索引
        "Name": "土建", //节点名称
        "Description": "string", //备注
       	"ElevationSystem": 0, //标高体系：0-建筑体系；1-结构体系，只有文件节点才存在该字段
        "IsBeGenerated": true, //后台是否生成了模型文件的构件树，只有文件节点才存在该字段
        "ErrorInfo": "string", //后台生成模型文件失败后的错误信息，只有文件节点才存在该字段
        "File": { //模型文件，只有文件节点才存在该字段
                "_id": "ObjectId", //模型文件Id
          		"FsId": "ObjectId", //模型文件在GridFS中的Id
                "Name": "string", //模型文件名称
                "Version": 0, //模型文件版本号
                "UpdateDate": "/Date/", //模型文件更新时间
                "UpdateUserId": "ObjectId" //更新者Id
        }
        "Children": [{
            "...": ""
        }]
    }, {
        "...": ""
    }]
}
```

> **注意事项**

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 实体模型-获取节点树列表（映射）

`model/node_tree`

> **URL**

https://api.xxx.com/v1/model/node_tree

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选      | 类型         | 说明                   |
| ----------- | ------- | ---------- | -------------------- |
| `UserToken` | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `NodeId`    | `true`  | `ObjectId` | 节点Id                 |
| `Map`       | `false` | `json`     | 返回的属性映射数组            |

`Map`格式为：

```json
["PropertyName1", "..."] //返回的属性映射数组,默认为空数组，表示返回所有属性
```

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": {
        "_id": "ObjectId", //Id
        "BuildingId": "ObjectId", //模型所在的单体Id
        "ParentId": "ObjectId", //父节点Id
        "SortIndex": 0, //排序索引
        "Name": "土建", //节点名称
        "Description": "string", //备注
       	"ElevationSystem": 0, //标高体系：0-建筑体系；1-结构体系，只有文件节点才存在该字段
        "IsBeGenerated": true, //后台是否生成了模型文件的构件树，只有文件节点才存在该字段
        "ErrorInfo": "string", //后台生成模型文件失败后的错误信息，只有文件节点才存在该字段
        "File": { //模型文件，只有文件节点才存在该字段
                "_id": "ObjectId", //模型文件Id
                "FsId": "ObjectId", //模型文件在GridFS中的Id
                "Name": "string", //模型文件名称
                "Version": 0, //模型文件版本号
                "UpdateDate": "/Date/", //模型文件更新时间
                "UpdateUserId": "ObjectId" //更新者Id
        }
        "Children": [{
            "...": ""
        }]
    }
}
```

> **注意事项**

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 实体模型-获取模型节点列表（筛选、分页、排序、映射）

`model/list`

> **URL**

https://api.xxx.com/v1/model/list

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

`ListParams`格式为：

```json
{
  "Search": "[Expression]", //筛选表达式，默认为空，表示不筛选
  "Page": {	//分页，默认为空，表示不筛选
    "Index": 0,	//分页索引
    "Count": 0	//分页数量
  },
  "Sort": [{ //排序，默认为空数组，表示不排序
    "Property": "PropertyName",	 //第一个排序的属性名,*必填
    "Ascending": false	//是否升序排序，如果为false,则降序排列，默认为true
  },{"...": ""}],
  "Map": ["PropertyName1","PropertyName2","..."] //返回的属性映射数组,默认为空数组，表示返回所有属性
}
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回信息
    "Data": [{
        "_id": "ObjectId", //Id
        "BuildingId": "ObjectId", //模型所在的单体Id
        "ParentId": "ObjectId", //父节点Id
        "SortIndex": 0, //排序索引
        "Name": "string", //节点名称
        "Description": "string", //备注
        "ElevationSystem": 0, //标高体系：0-建筑体系；1-结构体系，只有文件节点才存在该字段
        "IsBeGenerated": true, //后台是否生成了模型文件的构件树，只有文件节点才存在该字段
        "ErrorInfo": "string", //后台生成模型文件失败后的错误信息，只有文件节点才存在该字段
        "File": { //模型文件，只有文件节点才存在该字段
            "_id": "ObjectId", //模型文件Id
            "FsId": "ObjectId", //模型文件在GridFS中的Id
            "Name": "string", //模型文件名称
            "Version": 0, //模型文件版本号
            "UpdateDate": "/Date/", //模型文件更新时间
            "UpdateUserId": "ObjectId" //更新者Id
        }
    }, {
        "...": ""
    }]
}
```

> **注意事项**

如果`PageIndex`和`PageCount`都为0，则表示不分页；如果搜索表达式为空，则表示不搜索；`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。`Sort`表示按指定的属性升序或降序排列。

## 实体模型-获取节点信息

`model/node_info`

> **URL**

https://api.xxx.com/v1/model/node_info

> **API级别**

3

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选      | 类型         | 说明                   |
| ----------- | ------- | ---------- | -------------------- |
| `UserToken` | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `ModeId`    | `false` | `ObjectId` | 节点`Id`               |
| `Map`       | `false` | `json`     | 属性映射                 |

`Map`格式为：

```json
["PropertyName1", "..."] //返回的属性映射数组,默认为空数组，表示返回所有属性
```

> **返回结果**

```json
{
    "IsOk": true,
    "Code": 200,
    "Message": "",
    "Data": {
        "_id": "jshge5bd900f00000000686c", //Id
        "BuildingId": "4c637dbd900f0000000jwig8", //模型所在的单体Id
        "Ancestors": ["ObjectId", "..."], //父节点Id
        "SortIndex": 0, //排序索引
        "Name": "土建", //节点名称
        "Description": "", //备注
        //只有文件节点才具有下面的属性
        "ElevationSystem": 0, //标高体系：0-建筑体系；1-结构体系，只有文件节点才存在该字段
        "IsBeGenerated": true, //后台是否生成了模型文件的构件树，只有文件节点才存在该字段
        "ErrorInfo": "string", //后台生成模型文件失败后的错误信息，只有文件节点才存在该字段
        "File": { //模型文件，只有文件节点才存在该字段
            "_id": "ObjectId", //模型文件Id
            "FsId": "ObjectId", //模型文件在GridFS中的Id
            "Name": "string", //模型文件名称
            "Version": 0, //模型文件版本号
            "UpdateDate": "/Date/", //模型文件更新时间
            "UpdateUserId": "ObjectId" //更新者Id
        }
    }
}
```

> **注意事项**

无

## 实体模型-添加分组

`model/add_group_node`

> **URL**

https://api.xxx.com/v1/model/add_group_node

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数            | 必选      | 类型         | 说明                   |
| ------------- | ------- | ---------- | -------------------- |
| `UserToken`   | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `ParentId`    | `true`  | `ObjectId` | 父节点`Id`              |
| `Name`        | `true`  | `string`   | 分组名称                 |
| `Description` | `false` | `string`   | 分组描述，默认为`null`       |

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": {
        "_id": "ObjectId", //Id
        "BuildingId": "ObjectId", //模型所在的单体Id
        "ParentId": "ObjectId", //父节点Id
        "SortIndex": 0, //排序索引
        "Name": "土建", //节点名称
        "Description": "string" //备注
    }
}
```

> **注意事项**

无

## 实体模型-添加文件（批量）

`model/add_file_node`

> **URL**

https://api.xxx.com/v1/model/add_file_node

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型                    | 说明                        |
| ----------- | ------ | --------------------- | ------------------------- |
| `UserToken` | `true` | `string`              | 用户令牌（包含用户Id及访问权限等信息）      |
| `ParentId`  | `true` | `ObjectId`            | 父节点`Id`                   |
| `Data`      | `true` | `json`                | 文件节点数据集合                  |
| `Files`     | `true` | `multipart/form-data` | 文件数据，文件的个数应等于`Data`中数组的长度 |

`Data`的数据格式如下：

```json
[{
    "Name": "string", //文件节点名称，*必填
    "ElevationSystem": 0, //标高体系：0 - 建筑体系；1 - 结构体系，*必填
    "Description": "string" //文件节点描述，可选，默认为空
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
        "_id": "ObjectId", //Id
        "BuildingId": "ObjectId", //模型所在的单体Id
        "ParentId": "ObjectId", //父节点Id
        "SortIndex": 0, //排序索引
        "Name": "string", //节点名称
        "Description": "string", //备注
        "ElevationSystem": 0, //标高体系：0-建筑体系；1-结构体系，只有文件节点才存在该字段
        "IsBeGenerated": true, //后台是否生成了模型文件的构件树，只有文件节点才存在该字段
        "ErrorInfo": "string", //后台生成模型文件失败后的错误信息，只有文件节点才存在该字段
        "File": { //模型文件，只有文件节点才存在该字段
            "_id": "ObjectId", //模型文件Id
            "FsId": "ObjectId", //模型文件在GridFS中的Id
            "Name": "string", //模型文件名称
            "Version": 0, //模型文件版本号
            "UpdateDate": "/Date/", //模型文件更新时间
            "UpdateUserId": "ObjectId" //更新者Id
        }
    }, {
        "...": ""
    }]
}
```

> **注意事项**

无

## 实体模型-删除节点（批量）

`model/delete_node`

> **URL**

https://api.xxx.com/v1/model/delete_node

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Ids`       | `true` | `json`   | 节点Id集合               |

`Ids`的格式为

```json
["ObjectId", "..."]     //节点Id数组，*必填
```

> **返回结果**

```json
{
  "IsOk": true,//是否成功
  "Message": "string",//返回信息
  "Code": 200,//返回码
  "Data": ["ObjectId", "..."] //返回删除成功的Id集合
}
```

> **注意事项**

无

## 实体模型-移动节点

`model/move_node`

> **URL**

https://api.xxx.com/v1/model/move_node

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数              | 必选      | 类型         | 说明                    |
| --------------- | ------- | ---------- | --------------------- |
| `UserToken`     | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息）  |
| `ModelIds`      | `true`  | `ObjectId` | 节点Id集合                |
| `TargetId`      | `true`  | `ObjectId` | 目标Id                  |
| `MovePos`       | `true`  | `int`      | 移动所到位置，1为前面，2为里面，4为后面 |
| `IgnoreInvalid` | `false` | `bool`     | 是否忽略移动非法的节点           |

`Ids`的格式为

```json
["ObjectId", "..."]     //节点Id数组，*必填
```

> **返回结果**

```json
{
  "IsOk": true,//是否成功
  "Message": "string",//返回信息
  "Code": 200,//返回码
  "Data": null
}
```

> **注意事项**

无

## 实体模型-更新节点

`model/update_node`

> **URL**

https://api.xxx.com/v1/model/update_node

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选      | 类型                    | 说明                   |
| ----------- | ------- | --------------------- | -------------------- |
| `UserToken` | `true`  | `string`              | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true`  | `string`              | 节点`Id`               |
| `Data`      | `true`  | `json`                | 需要更新的数据              |
| `File`      | `false` | `multipart/form-data` | 文件数据                 |

`Data`的数据格式如下所示：

```json
{
    "Name": "string", //节点名称，可选，默认为null
    "Description": "string", //备注，可选，默认为null
    "ElevationSystem": 0 //可选。标高体系：0-建筑体系；1-结构体系
}
```

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

## 实体模型-移动节点

`model/move_node`

> **URL**

https://api.xxx.com/v1/model/move_node

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数              | 必选      | 类型       | 说明                        |
| --------------- | ------- | -------- | ------------------------- |
| `UserToken`     | `true`  | `string` | 用户令牌（包含用户Id及访问权限等信息）      |
| `ModeIds`       | `true`  | `json`   | 待移动的节点Id集合                |
| `TargetId`      | `true`  | `string` | 目标节点Id                    |
| `MovePos`       | `true`  | `int`    | 移动至目标节点的位置：1-上面；2-内部；4-下面 |
| `IgnoreInvalid` | `false` | `bool`   | 是否忽略移动非法的节点，默认为true       |

`ModeIds`格式为：

```json
["ObjectId","..."] //移动的节点Id集合，*必填
```

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Message": "string",//返回信息
    "Code": 200,//返回码
    "Data": null //返回的数据
}
```

> **注意事项**

无

## 实体模型-获取历史版本文件列表

`model/history/files`

> **URL**

https://api.xxx.com/v1/model/history/files

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `ModelId`   | `true` | `ObjectId` | 文件节点`Id`             |

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": [{
        "_id": "ObjectId", //Id
        "Name": "string", //文件名称
        "Version": 0, //模型文件版本号
        "UpdateDate": "/Date/", //模型文件更新时间
        "UpdateUserId": "ObjectId" //更新者Id
    }, {
        "...": ""
    }]
}
```

> **注意事项**

无

## 实体模型-删除历史版本文件（批量）

`model/history/delete`

> **URL**

https://api.xxx.com/v1/model/history/delete

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `ModelId`   | `true` | `ObjectId` | 文件节点Id               |
| `Versions`  | `true` | `json`     | 版本号集合                |

`Versions`数据格式如下所示：

```json
[1,"..."] //待删除的版本号数组，*必填
```

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": [1, "..."] //返回删除成功的版本号
}
```

> **注意事项**

无