# 专业管理API

[TOC]

## 专业-获取项目专业列表（分页、筛选、排序、映射）

`major/list`

> **URL**

https://api.xxx.com/v1/major/list

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
        "ProjectId": "ObjectId", //项目Id
        "Id": "ObjectId", //Id
        "Code": "string", //编码
        "Name": "string", //名称
        "CreateDate": "/Date/", //专业添加时间
        "Description": "string" //描述
    }, {
        "...": ""
    }]
}
```

> **注意事项**

如果`PageIndex`和`PageCount`都为0，则表示不分页；如果搜索表达式为空，则表示不搜索；`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。`Sort`表示按指定的属性升序或降序排列。

## 专业-获取专业详情（映射）

`major/info`

> **URL**

https://api.xxx.com/v1/major/info

> **API级别**

2

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选      | 类型         | 说明                   |
| ----------- | ------- | ---------- | -------------------- |
| `UserToken` | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true`  | `ObjectId` | 专业Id                 |
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
        "ProjectId": "ObjectId", //项目Id
        "Id": "ObjectId", //Id
        "Code": "string", //编码
        "Name": "string", //名称
        "CreateDate": "/Date/", //专业添加时间
        "Description": "string" //描述
    }
}
```

> **注意事项**

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 专业-添加专业（批量、映射）

`major/add`

> **URL**

https://api.xxx.com/v1/major/add

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选      | 类型         | 说明                   |
| ----------- | ------- | ---------- | -------------------- |
| `UserToken` | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `ProjectId` | `true`  | `ObjectId` | 项目Id                 |
| `Data`      | `true`  | `json`     | 添加的专业信息，数组格式         |
| `Map`       | `false` | `json`     | 返回的属性映射数组            |

`Data`格式为：

```json
[{
    "Code": "string", //编码，*必填
    "Name": "string", //名称，*必填
    "CreateDate": "/Date/", //专业添加时间，*必填
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
    "Data": [{
        "ProjectId": "ObjectId", //项目Id
        "Id": "ObjectId", //Id
        "Code": "string", //编码
        "Name": "string", //名称
        "CreateDate": "/Date/", //专业添加时间
        "Description": "string" //描述
    }, {
        "...": ""
    }]
}
```

> **注意事项**

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 专业-删除专业（批量）

`major/delete`

> **URL**

https://api.xxx.com/v1/major/delete

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Ids`       | `true` | `json`   | 专业Id集合               |

`Ids`格式为：

```json
["ObjectId", "..."]  //待删除的专业Id数组，*必填
```

> **返回结果**

```json
{
	"IsOk": true,//是否成功
  	"Code": 200,//返回码
	"Message": "string",//返回信息
	"Data": ["ObjectId", "..."] //返回删除成功的Id集合
}
```

> **注意事项**

无

## 专业-修改专业（批量）

`major/update`

> **URL**

https://api.xxx.com/v1/major/update

> **API级别**

3

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Data`      | `true` | `json`   | 需要修改的专业信息，数组格式       |

`Data`格式为：

```json
[{
    "Id": "ObjectId", //Id，*必填
    "Code": "string", //编码，*必填
    "Name": "string", //名称，*必填
    "Description": "string" //描述，默认为空
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
    "Data": ["ObjectId", "..."] //返回修改成功的Id集合
}
```

> **注意事项**

只能批量修改同一个项目中的专业。