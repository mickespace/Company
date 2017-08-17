# 通知&日志管理API

[TOC]

## 获取用户的通知（筛选、分页、排序、映射）

`notice/list`

> **URL**

https://api.xxx.com/v1/notice/list

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数**

| 参数           | 必选      | 类型       | 说明                         |
| ------------ | ------- | -------- | -------------------------- |
| `UserToken`  | `true`  | `string` | 用户令牌（包含用户Id及访问权限等信息）       |
| `ListParams` | `false` | `json`   | 集合的筛选、分页、排序、映射参数           |
| `State`      | `false` | `int`    | 通知状态：0-未读；1-已读；默认-1，返回所有消息 |
| `ProjectId`  | `false` | `string` | 项目Id，默认返回系统消息              |

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
      "IsOk": true, //是否成功
      "Code": 200, //返回码
      "Message": "string", //返回的信息
      "Data": [{
          "_id": "ObjectId", //Id
          "ProjectId": "ObjectId", //通知所属的项目
          "Title": "string", //通知标题
          "Content": "string", //通知内容
          "CreatedDate": "/Date/", //通知的创建时间
          "Creator": { //通知的创建者
            "_id": "ObjectId", //用户Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //真实姓名
            "Avatar": "url" // 头像url
          },
          "State": 0, //通知的状态
          "NoticeType": "string", //通知的类型
          "Params": "string", //通知的参数
          "ProcessText": "string", //通知处理时显示的文字
          "ExpiredDate": "/Date/", //通知的过期时间
      	  }, {
          "...": ""
      }]
  }
```

> **注意事项**

如果`PageIndex`和`PageCount`都为0，则表示不分页；如果搜索表达式为空，则表示不搜索；`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。`Sort`表示按指定的属性升序或降序排列。

## 获取用户的通知数量

`notice/count`

> **URL**

https://api.xxx.com/v1/notice/count

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数**

| 参数          | 必选      | 类型       | 说明                          |
| ----------- | ------- | -------- | --------------------------- |
| `UserToken` | `true`  | `string` | 用户令牌（包含用户Id及访问权限等信息）        |
| `State`     | `false` | `int`    | 通知状态：0-未读；1-已读；2-已删除；默认返回所有 |
| `ProjectId` | `false` | `string` | 项目Id，默认返回系统消息的数量            |

>**返回结果**

```json
    {
      "IsOk": true, //是否成功
      "Code": 200, //返回码
      "Message": "string", //返回的信息
      "Data": 0 //返回数量    
  }
```

> **注意事项**

无

## 添加通知

`notice/add`

>**URL**

https://api.xxx.com/v1/notice/add

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Data`      | `true` | `json`   | 通知信息                 |

`Data`格式为：

```json
 {
     "Title": "string", //通知标题，*必填
     "Content": "string", //通知内容，*必填
     "NoticeType": "string", //通知的类型，*必填
     "Params": "string", //通知的参数，默认为空，表示没有通知参数
     "ProcessText": "string", //通知处理时显示的文字，默认为空，表示没有显示文字
     "ExpiredDate": "/Date/", //通知的过期时间，默认过期时间为一个月
     "To": ["UserId", "..."] //通知的目标用户，*必填
 }
```

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": {
        "_id": "ObjectId", //Id
        "ProjectId": "ObjectId", //通知所属的项目
        "Title": "string", //通知标题
        "Content": "string", //通知内容
        "CreatedDate": "/Date/", //通知的创建时间
        "CreatorId": "ObjectId", //通知的创建者
        "NoticeType": "string", //通知的类型
        "Params": "string", //通知的参数
        "ProcessText": "string", //通知处理时显示的文字
        "ExpiredDate": "/Date/", //通知的过期时间
        "To": [{ //通知的目标用户
            "UserId": "ObjectId", //用户Id
            "State": 0 //通知状态：0-未读；1-已读
        }, {
            "...": ""
        }]
    }
}
```

> **注意事项**

无

## 标记已读（批量）

`notice/mark_read`

>**URL**

https://api.xxx.com/v1/notice/mark_read

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Ids`       | `true` | `json`   | 通知Id集合               |

`Ids`格式为：

```json
 ["ObjectId", "..."]  //通知Id集合，*必填
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回信息
    "Data": ["ObjectId", "..."] //返回标记成功的通知Id
}
```

> **注意事项**

无

## 标记删除（批量）

`notice/mark_delete`

>**URL**

https://api.xxx.com/v1/notice/mark_delete

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Ids`       | `true` | `json`   | 通知Id集合               |

`Ids`格式为：

```json
 ["ObjectId", "..."] //通知Id的集合，*必填
```

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": ["ObjectId", "..."] //返回删除成功的通知Id
}
```

> **注意事项**

无

## 获取日志（筛选、分页、排序、映射）

`log/list`

> **URL**

https://api.xxx.com/v1/log/list

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数**

| 参数           | 必选      | 类型       | 说明                   |
| ------------ | ------- | -------- | -------------------- |
| `UserToken`  | `true`  | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `ListParams` | `false` | `json`   | 集合的筛选、分页、排序、映射参数     |

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
>**返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": [{
        "_id": "ObjectId", //Id
        "LogType": "string", //日志类型，可选值：INFO、DEBUG、WARN、ERROR、FALTAL
        "Content": "string", //日志内容
        "StackTrace": "string", //StackTrace
        "DateTime": "/Date/", //日志产生的时间
        "SystemType": "string", //系统类型：WEB、PC、IOS、ANDROID、SERVER
        "Version": "1.1.1", //系统版本
        "UserId": "ObjectId", //用户Id
        "UserName": "string" //用户姓名
    }, {
        "...": ""
    }]
}
```

> **注意事项**

如果`PageIndex`和`PageCount`都为0，则表示不分页；如果搜索表达式为空，则表示不搜索；`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。`Sort`表示按指定的属性升序或降序排列。

## 添加日志（批量）

`log/add`

>**URL**

https://api.xxx.com/v1/log/add

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Data`      | `true` | `json`   | 日志信息                 |

`Data`格式为：

```json
[{
    "LogType": "string", //日志类型，可选值：INFO、DEBUG、WARN、ERROR、FALTAL，*必填
    "Content": "string", //日志内容，*必填
    "StackTrace": "string", //StackTrace，默认为null
    "DateTime": "/Date/", //日志产生的时间，*必填
    "SystemType": "string", //系统类型：WEB、PC、IOS、ANDROID、SERVER，*必填
    "Version": "1.1.1" //系统版本，*必填
}, {
    "...": ""
}]
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回信息
    "Data": [{
        "_id": "ObjectId", //Id
        "LogType": "string", //日志类型，可选值：INFO、DEBUG、WARN、ERROR、FALTAL
        "Content": "string", //日志内容
        "StackTrace": "string", //StackTrace
        "DateTime": "/Date/", //日志产生的时间
        "SystemType": "string", //系统类型：WEB、PC、IOS、ANDROID、SERVER
        "Version": "1.1.1", //系统版本
        "UserId": "ObjectId", //用户Id
        "UserName": "string" //用户姓名
    }
}, {
    "...": ""
}]
```

> **注意事项**

无