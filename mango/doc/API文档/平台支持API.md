# 平台支持API

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



## 安装包-获取最新安装包版本信息

`package/latest`

> **URL**

https://api.xxx.com/v1/package/latest

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数         | 必选      | 类型       | 说明                                 |
| ---------- | ------- | -------- | ---------------------------------- |
| `Name`     | `true`  | `string` | 产品名称                               |
| `Platform` | `true`  | `int`    | 产品所属平台：2-Web;4-PC;8-iOS;16-Android |
| `Type`     | `false` | `int`    | 包类型，默认1为完整安装包，2为补丁包                |

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": {
        "_id": "ObjectId", //安装包编号
        "Platform": 2, //产品所属平台：2-Web;4-PC;8-iOS;16-Android
        "CreateDate": "/Date/", //版本提交日期
        "PackageFile": "ObjectId", //安装包文件的Id
        "DownloadCount": 0, //安装包下载次数    
        "Version": 0, //产品版本号
        "Name": "string", //产品名称
        "LogFile": "url", //更新日志下载链接
      	"Type": 1	//包类型，默认1为完整安装包，2为补丁包
    }
}
```

## 安装包-获取安装包id

`package/id`

> **URL**

https://api.xxx.com/v1/package/id

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数         | 必选      | 类型       | 说明                                 |
| ---------- | ------- | -------- | ---------------------------------- |
| `Platform` | `true`  | `int`    | 产品所属平台：2-Web;4-PC;8-iOS;16-Android |
| `Version`  | `true`  | `string` | 产品版本                               |
| `Name`     | `true`  | `string` | 产品名称                               |
| `Type`     | `false` | `int`    | 包类型，默认1为完整安装包，2为补丁包                |

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": {
        "_id": "ObjectId", //安装包编号
    }
}
```

## 安装包-获取安装包信息

`package/info`

> **URL**

https://api.xxx.com/v1/package/info

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数   | 必选     | 类型         | 说明    |
| ---- | ------ | ---------- | ----- |
| `Id` | `true` | `ObjectId` | 安装包Id |

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": {
        "_id": "ObjectId", //文件Id
        "Platform": 2, //产品所属平台：2-Web;4-PC;8-iOS;16-Android
        "CreateDate": "/Date/", //版本提交日期
        "PackageFile": "ObjectId", //安装包文件的Id
        "DownloadCount": 0, //安装包下载次数    
        "Version": 0, //产品版本号
        "Name": "string", //产品名称
        "Type": 1, //包类型，默认1为完整安装包，2为补丁包
        "LogFile": "url" //更新日志下载链接
        "FileSize": 0, //文件大小，（long类型）
        "FileName": "string" //文件名称
    }
}
```

## 安装包-发布新版安装包

`package/publish`

> **URL**

https://api.xxx.com/v1/package/publish

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数         | 必选     | 类型                    | 说明                                 |
| ---------- | ------ | --------------------- | ---------------------------------- |
| `Platform` | `true` | `int`                 | 产品所属平台：2-Web;4-PC;8-iOS;16-Android |
| `Version`  | `true` | `string`              | 产品版本                               |
| `Name`     | `true` | `string`              | 产品名称                               |
| `File`     | `true` | `multipart/form-data` | 安装包文件流                             |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": {
        "_id": "ObjectId", //安装包编号
        "Platform": 2, //产品所属平台：2-Web;4-PC;8-iOS;16-Android
        "CreateDate": "/Date/", //版本提交日期
        "PackageFile": "ObjectId", //安装包文件的Id
        "DownloadCount": 0, //下载次数    
        "Version": 0, //产品版本号
        "Name": "string", //产品名称
        "Type": 1, //包类型，默认1为完整安装包，2为补丁包
    }
}
```



## 安装包-发布安装包补丁

`package/publish_patch`

> **URL**

https://api.xxx.com/v1/package/publish_patch

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数         | 必选     | 类型                    | 说明                                 |
| ---------- | ------ | --------------------- | ---------------------------------- |
| `Platform` | `true` | `int`                 | 产品所属平台：2-Web;4-PC;8-iOS;16-Android |
| `Version`  | `true` | `string`              | 产品版本                               |
| `Name`     | `true` | `string`              | 产品名称                               |
| `File`     | `true` | `multipart/form-data` | 安装包文件流                             |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": {
        "_id": "ObjectId", //安装包编号
        "Platform": 2, //产品所属平台：2-Web;4-PC;8-iOS;16-Android
        "CreateDate": "/Date/", //版本提交日期
        "PackageFile": "ObjectId", //安装包文件的Id
        "DownloadCount": 0, //下载次数    
        "Version": 0, //产品版本号
        "Name": "string", //产品名称
        "Type": 2, //包类型，默认1为完整安装包，2为补丁包
    }
}
```



## 安装包-下载安装包

`package/download`

> **URL**

https://api.xxx.com/v1/package/download

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数   | 必选     | 类型         | 说明    |
| ---- | ------ | ---------- | ----- |
| `Id` | `true` | `ObjectId` | 安装包Id |

> **返回结果**

文件流

## 安装包-上传更新日志

`package/upload_log`

> **URL**

https://api.xxx.com/v1/package/upload_log

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数     | 必选     | 类型                    | 说明      |
| ------ | ------ | --------------------- | ------- |
| `Id`   | `true` | `ObjectId`            | 安装包Id   |
| `File` | `true` | `multipart/form-data` | 更新日志文件流 |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": {
        "LogFile": "url" //更新日志下载链接
    }
}
```

## 视频教学-获取视频列表（分页、筛选、排序、映射）

`video/list`

> **URL**

https://api.xxx.com/v1/video/list

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数            | 必选      | 类型       | 说明               |
| ------------- | ------- | -------- | ---------------- |
| `ProductName` | `true`  | `string` | 产品名称             |
| `ListParams`  | `false` | `json`   | 集合的筛选、分页、排序、映射参数 |

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
    	"Name": "string", //视频名称
    	"ImageUrl":"url",//图片链接
		"VideoUrl":"url",//视频链接
		"Description":"string",//描述
		"Duration":"string",//持续时间
		"CreateUser":"ObjectId",//创建者
		"CreateTime":"/Date/",//创建时间
		"ProductName":"string",//产品名称
    }, {
        "...": ""
    }]
}
```

> **注意事项**

如果`PageIndex`和`PageCount`都为0，则表示不分页；如果搜索表达式为空，则表示不搜索；`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。`Sort`表示按指定的属性升序或降序排列。 

## 视频教学-添加视频

`video/add`

> **URL**

https://api.xxx.com/v1/video/add

> **API级别**

 5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数      | 必选      | 类型                    | 说明            |
| ------- | ------- | --------------------- | ------------- |
| `Files` | `true`  | `multipart/form-data` | 文件数据，先传图片再传视频 |
| `Data`  | `true`  | `json`                | 视频信息          |
| `Map`   | `false` | `json`                | 返回的属性映射数组     |

`Data`格式为：

```json
{
    "Name": "string", //视频名称，*必填
	"Description":"string",//描述
	"Duration":"string",//持续时间，*必填
	"ProductName":"string",//产品名称，*必填
}
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
    "Data":{
     	"_id": "ObjectId", //Id
    	"Name": "string", //视频名称
    	"ImageUrl":"url",//图片链接
		"VideoUrl":"url",//视频链接
		"Description":"string",//描述
		"Duration":"string",//持续时间
		"CreateUser":"ObjectId",//创建者
		"CreateTime":"/Date/",//创建时间
		"ProductName":"string",//产品名称
    }
}
```

> **注意事项**

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 视频教学-删除视频（批量）

`video/delete`

> **URL**

https://api.xxx.com/v1/video/delete

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数    | 必选     | 类型     | 说明     |
| ----- | ------ | ------ | ------ |
| `Ids` | `true` | `json` | 视频Id集合 |

`Ids`格式为：

```json
["ObjectId", "..."]//待删除的视频Id数组，*必填
```

> **返回结果**

```json
{
	"IsOk": true,//是否成功
  	"Code": 200,//返回码
	"Message": "string",//返回的信息
	"Data": ["ObjectId", "..."]//返回删除成功的视频Id
}
```

> **注意事项**

无

## 视频教学-修改视频基本信息

`video/update`

> **URL**

https://api.xxx.com/v1/video/update

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数     | 必选     | 类型         | 说明      |
| ------ | ------ | ---------- | ------- |
| `Id`   | `true` | `ObjectId` | 视频Id    |
| `Data` | `true` | `json`     | 修改的视频信息 |

`Data`格式为：

```json
{
    "Name": "string", //视频名称
	"Description":"string",//描述
	"Duration":"string",//持续时间
	"ProductName":"string",//产品名称
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

## 信息-获取所有行业

`config/industrys`

> **URL**

https://api.xxx.com/v1/config/industrys

> **API级别**

1

> **HTTP请求方式**

`GET`

> **请求参数：**

无

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": ["开发商","建筑公司","..."]
}
```

## 信息-获取所有职务

`config/jobs`

> **URL**

https://api.xxx.com/v1/config/jobs

> **API级别**

1

> **HTTP请求方式**

`GET`

> **请求参数：**

无

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data":["总经理","工程师","..."]
}
```

## 信息-获取所有省

`config/provinces`

> **URL**

https://api.xxx.com/v1/config/provinces

> **API级别**

1

> **HTTP请求方式**

`GET`

> **请求参数：**

无

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": [{
      	"Id":1,//省的编号
      	"Name":"广东"//省名
    }, {
        "...": ""
    }]
}
```

## 信息-获取所有市

`config/citys`

> **URL**

https://api.xxx.com/v1/config/citys

> **API级别**

1

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数           | 必选     | 类型    | 说明   |
| ------------ | ------ | ----- | ---- |
| `ProvinceId` | `true` | `int` | 省的编号 |

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": [{
      	"Id":1,//市的编号
      	"Name":"广东"//市名
    }, {
        "...": ""
    }]
}
```

## 信息-获取所有区县

`config/counties`

> **URL**

https://api.xxx.com/v1/config/counties

> **API级别**

1

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数       | 必选     | 类型    | 说明   |
| -------- | ------ | ----- | ---- |
| `CityId` | `true` | `int` | 市的编号 |

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": [{
      	"Id":1,//区县的编号
      	"Name":"广东"//区县名
    }, {
        "...": ""
    }]
}
```

## 信息-获取用户类型配置数据

`config/userTypes`

> **URL**

https://api.xxx.com/v1/config/userTypes

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

无

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": [{
      	"UserType":0,//用户类型
     	"TypeName":"普通用户",//用户类型对应的名称
      	"ProjectCount":3,//能创建的项目数量
      	"ProjectModelCount":1,//项目内最多能添加的模型数量
      	"ModelMaxSize":1,//每个模型文件的大小最大值
      	"CanModifyDefaultProject":1,//是否可以修改默认项目的实体模型数据
      	"DefaultProjectCount":1//系统默认添加的项目的个数
    }, {
        "...": ""
    }]
}
```

##  