# 系统支持API

[TOC]

> 重要说明

每个应用都会有一个`ApiLevel`字段，每个`API`也有一个`ApiLevel`字段，如果应用的`ApiLevel`大于等于`API`的`ApiLevel`，则表示应用可以访问该`API`。在开发者中心创建应用时，应用默认的`ApiLevel`为2。普通合作伙伴创建的应用`ApiLevel`为3，高级合作伙伴创建的应用`ApiLevel`为4，公司内部创建的应用`ApiLevel`可以为1-5任意级别。

| API级别 | 说明                   |
| ----- | -------------------- |
| 1     | 最低级别，不需要登录都能访问       |
| 2     | 普通应用能访问该`API`，需要用户登录 |
| 3     | 普通合作伙伴开发的应用能访问该`API` |
| 4     | 高级合作伙伴开发的应用能访问该`API` |
| 5     | 内部开发的应用才能访问该`API`    |



## 信息收集-获取收集的登录信息（分页、筛选、排序、映射）

`collect/login/list`

> **URL**

https://api.xxx.com/v1/collect/login/list

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数           | 必选      | 类型     | 说明               |
| ------------ | ------- | ------ | ---------------- |
| `ListParams` | `false` | `json` | 集合的筛选、分页、排序、映射参数 |

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
    "Message": "string", //返回信息
    "Data": [{
        "_id": "ObjectId", //Id
        "Email": "string", //邮箱
        "PhoneNumber": "string", //手机号
        "RealName": "string", //用户姓名
        "Ip": "string", //客户端Ip地址
        "IpHome": "string", //地理位置
        "LoginTime": "/Date/", //登录时间
        "LogoutTime": "/Date/", //退出时间
        "Platform": 2, //产品所属平台：2-Web;4-PC;8-iOS;16-Android
        "Version": 0, //版本
        "ProductName": "string", //产品名称
        "MachineName": "string", //客户端计算机名
        "ServerKey": "string", //务器标识
        "ServerAddress": "string" //服务器Ip地址
    }, {
        "...": ""
    }]
}
```

> **注意事项**

如果`PageIndex`和`PageCount`都为0，则表示不分页；如果搜索表达式为空，则表示不搜索；`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。`Sort`表示按指定的属性升序或降序排列。 

## 信息收集-添加登录信息

`collect/login/push`

> **URL**

https://api.xxx.com/v1/collect/login/push

> **API级别**

 5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数         | 必选     | 类型     | 说明    |
| ---------- | ------ | ------ | ----- |
| `Platform` | `true` | `int`  | 所属平台  |
| `Data`     | `true` | `json` | 收集的信息 |

`Data`格式为：

```json
{
    "Email": "string", //邮箱
    "PhoneNumber": "string", //手机号
    "RealName": "string", //用户姓名
    "Ip": "string", //客户端Ip地址
    "IpHome": "string", //地理位置
    "LoginTime": "/Date/", //登录时间
    "LogoutTime": "/Date/", //退出时间
    "Version": 0, //版本
    "ProductName": "string", //产品名称
    "MachineName": "string", //客户端计算机名
    "ServerKey": "string", //务器标识
    "ServerAddress": "string" //服务器Ip地址
}
```

> **返回结果**

```json
{
    "IsOk": true,  //是否成功
    "Code": 200,    //返回码
    "Message": "string",//返回的信息
    "Data": null
}
```

> **注意事项**

无

## 信息收集-获取收集的短信记录（分页、筛选、排序、映射）

`collect/sms/list`

> **URL**

https://api.xxx.com/v1/collect/sms/list

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数           | 必选      | 类型     | 说明               |
| ------------ | ------- | ------ | ---------------- |
| `ListParams` | `false` | `json` | 集合的筛选、分页、排序、映射参数 |

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
    "Message": "string", //返回信息
    "Data": [{
        "_id": "ObjectId", //Id
        "ToPhone": "string", //接收手机
        "ServerKey": "string", //服务器标识
        "SendTime": "/Date/" //发送时间
    }, {
        "...": ""
    }]
}
```

> **注意事项**

如果`PageIndex`和`PageCount`都为0，则表示不分页；如果搜索表达式为空，则表示不搜索；`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。`Sort`表示按指定的属性升序或降序排列。 

## 信息收集-添加短信发送记录

`collect/sms/push`

> **URL**

https://api.xxx.com/v1/collect/sms/push

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明       |
| ----------- | ------ | -------- | -------- |
| `ServerKey` | `true` | `string` | 服务器Key   |
| `ToPhone`   | `true` | `string` | 接收短信的手机号 |

> **返回结果**

```json
{
	"IsOk": true,//是否成功
  	"Code": 200,//返回码
	"Message": "string",//返回的信息
	 "Data": null
}
```

> **注意事项**

无

## 服务器-获取服务器信息（分页、筛选、排序、映射）

`collect/login/list`

> **URL**

https://api.xxx.com/v1/collect/login/list

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数           | 必选      | 类型     | 说明               |
| ------------ | ------- | ------ | ---------------- |
| `ListParams` | `false` | `json` | 集合的筛选、分页、排序、映射参数 |

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
    "Message": "string", //返回信息
    "Data": [{
        "_id": "ObjectId", //Id
        "ServerKey": "string", //服务器Key
        "Name": "string", //服务器名
        "IsEnabled": "string", //是否启用
        "AttachInfo":{//附加信息
          "属性名":"值",
          "...":""
         } 
    }, {
        "...": ""
    }]
}
```

> **注意事项**

如果`PageIndex`和`PageCount`都为0，则表示不分页；如果搜索表达式为空，则表示不搜索；`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。`Sort`表示按指定的属性升序或降序排列。 

## 服务器-添加新的服务器

`system/server/add`

> **URL**

https://api.xxx.com/v1/system/server/add

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选      | 类型       | 说明     |
| ----------- | ------- | -------- | ------ |
| `ServerKey` | `true`  | `string` | 服务器Key |
| `Name`      | `true`  | `string` | 名称     |
| `Data`      | `false` | `json`   | 附加信息   |

`Data`格式为：

```json
{
   "属性名":"值",
   "...":""
}
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200,    //返回码
    "Message": "string",//返回的信息
    "Data": null
}
```

> **注意事项**

无

## 服务器-验证服务器状态

`system/server/validate`

> **URL**

https://api.xxx.com/v1/system/server/validate

> **API级别**

1

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明     |
| ----------- | ------ | -------- | ------ |
| `ServerKey` | `true` | `string` | 服务器Key |

无

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": {
      "IsEnabled"=false //是否启用
    }
}
```

## 服务器-设置服务器状态

`system/server/set`

> **URL**

https://api.xxx.com/v1/system/server/set

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明     |
| ----------- | ------ | -------- | ------ |
| `ServerKey` | `true` | `string` | 服务器Key |
| `IsEnabled` | `true` | `bool`   | 是否启用   |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200,    //返回码
    "Message": "string",//返回的信息
    "Data": null
}
```

> **注意事项**

无