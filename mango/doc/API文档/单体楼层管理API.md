# 单体楼层管理API

[TOC]

## 单体-获取项目单体楼层树

`building/floors`

> **URL**

https://api.xxx.com/v1/building/floors

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
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回信息
    "Data": [{
        "_id": "ObjectId", //Id
        "ProjectId": "ObjectId", //项目Id
        "Code": "XZL-A", //楼层编码
        "Name": "A栋", //名称
        "Area": 30454.3, //建筑面积㎡
        "Description": "string", //描述
        "Floors": [{
            "_id": "ObjectId", //Id
            "BuildingId": "ObjectId", //所在单体Id
            "ProjectId": "ObjectId", //所在项目Id
            "Code": "AL-001", //楼层编码
            "Name": "楼层名称", //楼层名称
            "IsFirstFloor": false, //是否是首层
            "ArchitectureHeight": 3.2, //建筑层高(m)
            "StructureHeight": 3.2, //结构层高(m)
            "ArchitectureElevation": 0, //建筑底标高，只有首层才有效
            "StructureElevation": 0, //结构底标高，只有首层才有效
            "Description": "", //描述
            "AxisFileId": "ObjectId" //轴网文件Id
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

## 单体-获取项目所有单体（分页、筛选、排序、映射）

`building/list`

> **URL**

https://api.xxx.com/v1/building/list

> **API级别**

  2

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
        "ProjectId": "ObjectId", //项目Id
        "Code": "XZL-A", //楼层编码
        "Name": "A栋", //名称
        "Area": 30454.3, //建筑面积㎡
        "Description": "string" //描述
    }, {
        "...": ""
    }]
}
```

> **注意事项**

如果`PageIndex`和`PageCount`都为0，则表示不分页；如果搜索表达式为空，则表示不搜索；`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。`Sort`表示按指定的属性升序或降序排列。

## 单体-获取单体基本信息（映射）

`building/info`

> **URL**

https://api.xxx.com/v1/building/info

> **API级别**

  2

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选      | 类型         | 说明                   |
| ----------- | ------- | ---------- | -------------------- |
| `UserToken` | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true`  | `ObjectId` | 单体Id                 |
| `Map`       | `false` | `json`     | 返回的属性映射数组            |

`Map`格式为：

```json
["PropertyName1", "..."] //返回的属性映射数组,默认为空数组，表示返回所有属性
```

> **返回结果**

```json
{
  "IsOk": true,  //是否成功
  "Code": 200,    //返回码
  "Message": "string",//返回的信息
  "Data": {     //单体详细信息
    "_id": "ObjectId", //Id
    "ProjectId": "ObjectId", //项目Id
    "Code": "XZL-A", //楼层编码
    "Name": "A栋", //名称
    "Area": 30454.3, //建筑面积㎡
    "Description": "string" //描述
  }
}
```

> **注意事项**

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 单体-新增单体（批量、映射）

`building/add`

> **URL**

https://api.xxx.com/v1/building/add

> **API级别**

 4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选      | 类型         | 说明                   |
| ----------- | ------- | ---------- | -------------------- |
| `UserToken` | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `ProjectId` | `true`  | `ObjectId` | 项目Id                 |
| `Data`      | `true`  | `json`     | 单体信息，数组格式            |
| `Map`       | `false` | `json`     | 返回的属性映射数组            |

`Data`格式为：

```json
[{
    "Code": "XZL-A", //楼层编码，*必填
    "Name": "A栋", //名称，*必填
    "Area": 30454.3, //建筑面积㎡，*必填
    "Description": "string" //描述，默认为空
}, {
    "...": ""
}]
```

`Map`格式为：

```json
["PropertyName1", "..."] //返回的属性映射数组,默认为空数组，表示返回所有属性
```

> **返回结果**

```json
{
    "IsOk": true,  //是否成功
    "Code": 200,    //返回码
    "Message": "string",//返回的信息
    "Data": [{ //返回添加成功的自定义数据集合
        "_id": "ObjectId", //单体Id
        "ProjectId": "ObjectId", //项目Id
        "Code": "XZL-A", //楼层编码
        "Name": "A栋", //名称
        "Area": 30454.3, //建筑面积㎡
        "Description": "string" //描述
    }, {
        "...": ""
    }]
}
```

> **注意事项**

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 单体-删除单体（批量）

`building/delete`

> **URL**

https://api.xxx.com/v1/building/delete

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Ids`       | `true` | `json`   | 单体Id集合               |

`Ids`格式为：

```json
["ObjectId", "..."]       //待删除的单体Id数组，*必填
```

> **返回结果**

```json
{
	"IsOk": true,    //是否成功
  	"Code": 200,       //返回码
	"Message": "string",   //返回的信息
	"Data": ["ObjectId", "..."] //返回删除成功的单体Id
}
```

> **注意事项**

无

## 单体-修改单体信息

`building/update`

> **URL**

https://api.xxx.com/v1/building/update

> **API级别**

3

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `ObjectId` | 单体Id                 |
| `Data`      | `true` | `json`     | 修改的单体信息              |

`Data`格式为：

```json
{
    "ProjectId": "ObjectId", //项目Id，默认为null
    "Code": "XZL-A", //楼层编码，默认为null
    "Name": "A栋", //名称，默认为null
    "Area": 30454.3, //建筑面积㎡，默认为null
    "Description": "string" //描述，默认为null
}
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200,    //返回码
    "Message": "string",//返回的信息
    "Data": {//返回的数据
        "ProjectId": "ObjectId", //项目Id
        "Code": "XZL-A", //楼层编码
        "Name": "A栋", //名称
        "Area": 30454.3, //建筑面积㎡
        "Description": "string" //描述
    } 
}
```

> **注意事项**

无

***

## 楼层-获取单体中的所有楼层（分页、筛选、排序、映射）

`floor/list`

> **URL**

https://api.xxx.com/v1/floor/list

> **API级别**

2

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数           | 必选      | 类型         | 说明                   |
| ------------ | ------- | ---------- | -------------------- |
| `UserToken`  | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `BuildingId` | `true`  | `ObjectId` | 所在单体Id               |
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
    "Message": "string",//返回的信息
    "Data": [{
        "_id": "ObjectId", //Id
        "BuildingId": "ObjectId", //所在单体Id
        "ProjectId": "ObjectId", //所在项目Id
        "Code": "AL-001", //楼层编码
        "Name": "楼层名称", //楼层名称
        "IsFirstFloor": false, //是否是首层
        "ArchitectureHeight": 3.2, //建筑层高(m)
        "StructureHeight": 3.2, //结构层高(m)
        "ArchitectureElevation": 0, //建筑底标高，只有首层才有效
        "StructureElevation": 0, //结构底标高，只有首层才有效
        "Description": "string", //描述
        "AxisFile": "ObjectId" //轴网文件Id
    }, {
        "...": ""
    }]
}
```

> **注意事项**

如果`PageIndex`和`PageCount`都为0，则表示不分页；如果搜索表达式为空，则表示不搜索；`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。`Sort`表示按指定的属性升序或降序排列。

## 楼层-获取楼层基本信息（映射）

`floor/info`

> **URL**

https://api.xxx.com/v1/floor/info

> **API级别**

2

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选      | 类型         | 说明                   |
| ----------- | ------- | ---------- | -------------------- |
| `UserToken` | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true`  | `ObjectId` | 楼层Id                 |
| `Map`       | `false` | `json`     | 返回的属性映射数组            |

`Map`格式为：

```json
["PropertyName1", "..."] //返回的属性映射数组,默认为空数组，表示返回所有属性
```

> **返回结果**

```json
{
	"IsOk": true,//是否成功
  	"Code":200,//返回码
	"Message": "string",//返回的信息
	"Data": {
		"_id": "ObjectId", //Id
		"BuildingId": "ObjectId", //所在单体Id
		"ProjectId": "ObjectId", //所在项目Id
		"Code": "AL-001", //楼层编码
		"Name": "楼层名称", //楼层名称
		"IsFirstFloor": false, //是否是首层
		"ArchitectureHeight": 3.2, //建筑层高(m)
		"StructureHeight": 3.2, //结构层高(m)
		"ArchitectureElevation": 0, //建筑底标高，只有首层才有效
		"StructureElevation": 0, //结构底标高，只有首层才有效
		"Description": "string", //描述
		"AxisFile": "url", //轴网文件的链接
	}
}
```

> **注意事项**

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 楼层-新增楼层（批量、映射）

`floor/add`

> **URL**

https://api.xxx.com/v1/floor/add

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数           | 必选      | 类型         | 说明                   |
| ------------ | ------- | ---------- | -------------------- |
| `UserToken`  | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `BuildingId` | `true`  | `ObjectId` | 单体Id                 |
| `Data`       | `true`  | `json`     | 楼层信息，数组格式            |
| `Map`        | `false` | `json`     | 返回的属性映射数组            |

`Data`格式为：

```json
[{
    "Code": "AL-001", //楼层编码，*必填
    "Name": "楼层名称", //楼层名称，*必填
    "IsFirstFloor": false, //是否是首层，默认为false，表示不是首层
    "ArchitectureHeight": 3.2, //建筑层高(m)，*必填
    "StructureHeight": 3.2, //结构层高(m)，*必填
    "ArchitectureElevation": 0, //建筑底标高，只有首层才有效，默认为空
    "StructureElevation": 0, //结构底标高，只有首层才有效，默认为空
    "Description": "string" //描述，默认为空
}, {
    "...": ""
}]
```

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
    "Data": [{ //返回添加成功的自定义数据集合
        "_id": "ObjectId", //Id
        "BuildingId": "ObjectId", //所在单体Id
        "ProjectId": "ObjectId", //所在项目Id
        "Code": "AL-001", //楼层编码
        "Name": "楼层名称", //楼层名称
        "IsFirstFloor": false, //是否是首层
        "ArchitectureHeight": 3.2, //建筑层高(m)
        "StructureHeight": 3.2, //结构层高(m)
        "ArchitectureElevation": 0, //建筑底标高，只有首层才有效
        "StructureElevation": 0, //结构底标高，只有首层才有效
        "Description": "string", //描述
        "AxisFile": "ObjectId" //轴网文件Id
    }, {
        "...": ""
    }]
}
```

> **注意事项**

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。``首层``楼层必须得填写ArchitectureElevation（建筑底标高）和StructureElevation（结构底标高）。

## 楼层-删除楼层（批量）

`floor/delete`

> **URL**

https://api.xxx.com/v1/floor/delete

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Ids`       | `true` | `json`   | 楼层Id集合               |

`Ids`格式为：

```json
["ObjectId", "..."]         //待删除的楼层Id数组,*必填
```

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": ["ObjectId", "..."] //返回删除成功的楼层Id
}
```

> **注意事项**

无

## 楼层-修改楼层信息

`floor/update`

> **URL**

https://api.xxx.com/v1/floor/update

> **API级别**

3

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `ObjectId` | 楼层Id                 |
| `Data`      | `true` | `json`     | 修改的楼层信息              |

`Data`格式为：

```json
{
    "BuildingId": "ObjectId", //所在单体Id，默认为null
    "ProjectId": "ObjectId", //所在项目Id，默认为null
    "Code": "AL-001", //楼层编码，默认为null
    "Name": "楼层名称", //楼层名称，默认为null
    "IsFirstFloor": false, //是否是首层，默认为null
    "ArchitectureHeight": 3.2, //建筑层高(m)，默认为null
    "StructureHeight": 3.2, //结构层高(m)，默认为null
    "ArchitectureElevation": 0, //建筑底标高，只有首层才有效，默认为null
    "StructureElevation": 0, //结构底标高，只有首层才有效，默认为null
    "Description": "string" //描述，默认为null
}
```

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": {
        "BuildingId": "ObjectId", //所在单体Id
        "ProjectId": "ObjectId", //所在项目Id
        "Code": "AL-001", //楼层编码
        "Name": "楼层名称", //楼层名称
        "IsFirstFloor": false, //是否是首层
        "ArchitectureHeight": 3.2, //建筑层高(m)
        "StructureHeight": 3.2, //结构层高(m)
        "ArchitectureElevation": 0, //建筑底标高，只有首层才有效
        "StructureElevation": 0, //结构底标高，只有首层才有效
        "Description": "string", //描述
        "AxisFile": "ObjectId" //轴网文件Id
    }
}
```

> **注意事项**

无

## 楼层-更新轴网文件

`floor/update_axis_file`

> **URL**

https://api.xxx.com/v1/floor/update_axis_file

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数           | 必选      | 类型                    | 说明                   |
| ------------ | ------- | --------------------- | -------------------- |
| `UserToken`  | `true`  | `string`              | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`         | `true`  | `ObjectId`            | 楼层Id                 |
| `FileStream` | `false` | `multipart/form-data` | 文件流                  |

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": {}
}
```

> **注意事项**

无

## 楼层-删除轴网文件

`floor/delete_axis_file`

> **URL**

https://api.xxx.com/v1/floor/delete_axis_file

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `ObjectId` | 楼层Id                 |

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": {}
}
```

> **注意事项**

无