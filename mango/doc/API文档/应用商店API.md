# 应用商店API设计

[TOC]

>  重要说明

每个应用都会有一个`ApiLevel`字段，每个`API`也有一个`ApiLevel`字段，如果应用的`ApiLevel`大于等于`API`的`ApiLevel`，则表示应用可以访问该`API`。在开发者中心创建应用时，应用默认的`ApiLevel`为2。普通合作伙伴创建的应用`ApiLevel`为3，高级合作伙伴创建的应用`ApiLevel`为4，公司内部创建的应用`ApiLevel`可以为1-5任意级别。

| API级别 | 说明                   |
| ----- | -------------------- |
| 1     | 最低级别，不需要登录都能访问       |
| 2     | 普通应用能访问该`API`，需要用户登录 |
| 3     | 普通合作伙伴开发的应用能访问该`API` |
| 4     | 高级合作伙伴开发的应用能访问该`API` |
| 5     | 内部开发的应用才能访问该`API`    |



## 开发者-获取用户创建的应用列表（筛选、分页、排序、映射）

`app/list`

> **URL**

https://api.xxx.com/v1/app/list

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数           | 必选      | 类型       | 说明                   |
| ------------ | ------- | -------- | -------------------- |
| `UserToken`  | `true`  | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `ListParams` | `false` | `json`   | 集合的筛选、分页、排序、映射参数     |

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
        "_id": "ObjectId", //Id
        "Key": "GUID", //应用唯一标识
        "Name": "string", //应用名称
        "Developer": "string", //应用开发商
        "Description": "string", //应用描述
        "CreateDate": "/Date/", //应用创建日期
        "Type": 0, //应用类型：0-普通插件; 1-基础插件; 2-主程序；11-表单；21-Revit插件，设置后不能修改
        "SupportedPlatform": 2, //应用支持的平台：2-Web;4-PC;8-iOS;16-Android 注意：值为支持平台的和，如6：web(2),PC(4)
        "Icon": "url", //应用图标
        "IsVisible": true, //在商店中是否可见
    }, {
        "...": "..."
    }]
}
```

> **注意事项**

如果`PageIndex`和`PageCount`都为0，则表示不分页；如果搜索表达式为空，则表示不搜索；`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。`Sort`表示按指定的属性升序或降序排列。

## 开发者-获取应用Id

`app/id`

> **URL**

https://api.xxx.com/v1/app/id

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `AppKey`    | `true` | `Guid`   | 应用Key                |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": { 
     "_id": "ObjectId", //应用Id
    }
}
```

> **注意事项**

无

## 开发者-获取应用详细信息

`app/info`

> **URL**

https://api.xxx.com/v1/app/info

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选      | 类型         | 说明                   |
| ----------- | ------- | ---------- | -------------------- |
| `UserToken` | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true`  | `ObjectId` | 应用Id                 |
| `Map`       | `false` | `json`     | 返回的属性映射数组            |

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
    "Data": {
        "_id": "ObjectId", //Id
        "Key": "GUID", //应用唯一标识
        "Name": "string", //应用名称
        "Developer": "string", //应用开发商
        "Description": "string", //应用描述
        "CreateDate": "/Date/", //应用创建日期
        "Type": 0, //应用类型：0-普通应用; 1-基础应用; 2-主程序；11-表单；21-Revit应用，设置后不能修改
        "SupportedPlatform": 2, //应用支持的平台：2-Web;4-PC;8-iOS;16-Android 注意：值为支持平台的和，如6：web(2),PC(4)
        "Icon": "url", //应用图标
        "IsVisible": true, //在商店中是否可见
    }
}
```

> **注意事项**

`SupportedPlatform` 值为支持平台的和，如6：`web`,`PC`。

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 开发者-创建应用

`app/create`

> **URL**

https://api.xxx.com/v1/app/create

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选      | 类型                    | 说明                   |
| ----------- | ------- | --------------------- | -------------------- |
| `UserToken` | `true`  | `string`              | 用户令牌（包含用户Id及访问权限等信息） |
| `Data`      | `true`  | `json`                | 应用信息                 |
| `Icon`      | `false` | `multipart/form-data` | 应用图标                 |

`Data  `的格式为：

```json
{
    "Name": "string", //应用名称，*必填
    "Developer": "string", //应用开发商，*必填
    "Type": 0, //应用类型：0-普通插件; 1-基础插件; 11-表单；21-Revit插件
    "Description": "string", //应用描述，默认为空
    "Price": 0.0, //应用价格，默认为0
    "SupportedPlatform": 30, //应用支持的平台：2-Web;4-PC;8-iOS;16-Android，默认为30，全平台支持
}
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": {
        "_id": "ObjectId", //Id
        "Key": "GUID", //应用唯一标识
        "Name": "string", //应用名称
        "Developer": "string", //应用开发商
        "Description": "string", //应用描述
        "Price": 0.0, //应用价格，默认为0
        "CreateDate": "/Date/", //应用创建日期
        "Type": 0, //应用类型：0-普通插件; 1-基础插件; 2-主程序；11-表单；21-Revit插件，设置后不能修改
        "SupportedPlatform": 2, //应用支持的平台：2-Web;4-PC;8-iOS;16-Android 注意：值为支持平台的和，如6：web(2),PC(4)
        "Icon": "url", //应用图标
        "IsVisible": true, //在商店中是否可见
    }
}
```

> **注意事项**

注意：`SupportedPlatform`值为支持平台的和，如6：`web`,`PC` 。

如果上传了图片需要上传对应的文件流信息。

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

==如果`Data`中包含了其它字段，会被忽略。==

## 开发者-添加应用能够访问的API（批量）

app/add_apis

> **URL**

https://api.xxx.com/v1/app/add_apis

> **API级别**

5

> **HTTP请求**

`POST` 

>  **请求参数**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `ObjectId` | 应用Id                 |
| `Apis`      | `true` | `json`     | 需要添加的`Api`集合         |

`Apis`的格式如下：

```json
["url1","..."]  //Api的url集合，*必填
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": ["url1","..."] //返回添加成功的url
}
```

> **注意事项**

只有`app`的`Type`小于10的应用调用该`Api`才会有效

## 开发者-删除产品能够访问的API（批量）

app/delete_apis

> **URL**

https://api.xxx.com/v1/app/delete_apis

> **API级别**

5

> **HTTP请求**

`POST` 

>  **请求参数**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `ObjectId` | 产品Id                 |
| `Apis`      | `true` | `json`     | 需要删除的Api集合           |

`Apis`的格式如下：

```json
["url1","..."]  //Api的url集合，*必填
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": ["url1","..."] //返回删除成功的Url
}
```

> **注意事项**

只有`product`的`Type`小于10的产品调用该`Api`才会有效

## 开发者-修改应用

product/update

> **URL**

https://api.xxx.com/v1/dev/product/update

> **API级别**

5

> **HTTP请求**

`POST`

> **请求参数**

| 参数          | 必选      | 类型                    | 说明                   |
| ----------- | ------- | --------------------- | -------------------- |
| `UserToken` | `true`  | `string`              | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true`  | `ObjectId`            | 产品Id                 |
| `Data`      | `true`  | `json`                | 产品信息                 |
| `Icon`      | `false` | `multipart/form-data` | 产品图标的文件              |

`Data`的数据格式如下：

```json
{
    "Name": "string", //产品名称,产品名称唯一，可选
    "Developer": "string", //产品开发商，可选
    "Description": "string", //产品描述，可选
    "Price": 0.0, //应用价格，默认为0
    "SupportedPlatform": 2, //产品支持的平台：2-Web;4-PC;8-iOS;16-Android，可选 
    "IsVisible": true //在商店中是否可见，可选
}
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": {
        "_id": "ObjectId", //Id
        "Key": "GUID", //产品唯一标识
        "Name": "string", //产品名称
        "Developer": "string", //产品开发商
        "Description": "string", //产品描述
    	"Price": 0.0, //应用价格，默认为0
        "CreateDate": "/Date/", //产品创建日期
        "Type": 0, //产品类型：0-普通产品; 1-基础产品; 2-主程序；11-表单；21-Revit插件
        "SupportedPlatform": 2, //产品支持的平台：2-Web;4-PC;8-iOS;16-Android 注意：值为支持平台的和，如6：web(2),PC(4)
        "Icon": "url", //产品图标 存objectId,返回给用户时给Url
        "IsVisible": true, //在商店中是否可见
    }
}
```

> **注意事项**

`SupportedPlatform` 值为支持平台的和，如6：web,PC。

如果修改图标的需要上传对应的文件信息。

==如果`Data`中包含了其它字段，会被忽略。==

## 开发者-删除应用

`app/delete`

> **URL**

https://api.xxx.com/v1/app/delete

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `ObjectId` | 应用Id                 |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": {
        "_id": "ObjectId" //已被删除的应用Id 
    }
}
```

> **注意事项**

暂无

## 开发者-提交产品

`product/submit`

> **URL**

https://api.xxx.com/v1/product/submit

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型                    | 说明                   |
| ----------- | ------ | --------------------- | -------------------- |
| `UserToken` | `true` | `string`              | 用户令牌（包含用户Id及访问权限等信息） |
| `Data`      | `true` | `json`                | 产品信息                 |
| `Files`     | `true` | `multipart/form-data` | 上传的图片和文件的流           |

`Data`的数据格式：

```json
{
    "AppKey": "Guid", //所属应用的Key，*
    "Platform": 2, //产品所属平台：2-Web;4-PC;8-iOS;16-Android，*必填
    "FileName": "string", //产品文件的名称，*必填
    "Version": "string", //产品版本号，*必填
    "DisplayName": "string", //产品显示名称，可选，默认为应用名称
    "DisplayIconName": "string", //产品显示图标名称，可选，默认为应用图标
    "ScreenshotNames": ["string", "..."], //产品截图名称集合，可选，默认为空数组
    "Description": "string", //产品描述，可选，默认为应用描述
    "UpdateLog": "string", //产品更新日志，可选，默认为null
    "Distro": 2, // 发行版：0-测试版；1-预览版；2-稳定版，可选，默认为2-稳定版
}
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": {
        "_id": "ObjectId", //Id
        "AppKey": "Guid", //所属应用的Key
        "AppId": "ObjectId", //所属应用的Id
        "AppType": 0, //应用类型：0-普通插件; 1-基础插件; 2-主程序；11-表单；21-Revit插件
        "Platform": 2, //产品所属平台：2-Web;4-PC;8-iOS;16-Android
        "SubmitDate": "/Date/", //产品提交日期
        "FileId": "ObjectId", //产品安装包文件的Id
        "FileSize": 0, //产品安装包大小
        "DownloadCount": 0, //产品下载次数
        "Version": 0, //产品版本号
        "DisplayName": "string", //产品显示名称
        "DisplayIcon": "url", //产品显示图标 存objectId,返回给用户时给Url
        "Screenshots": ["url", "..."], //产品截图 存objectId,返回给用户时给Url
        "Description": "string", //产品描述
        "UpdateLog": "string", //产品更新日志
        "State": 0, //产品状态：0-未审核；1-审核未通过；2-审核通过未发布；3-已发布
        "Distro": 0, // 发行版：0-测试版；1-预览版；2-稳定版
    }
}
```

> **注意事项**

`FileName`，`DisplayIconName`，`ScreenshotNames` 是为了区分上传的文件流中的多个文件，请填写文件的完整路径

==如果`Data`中包含了其它字段，会被忽略。==

## 开发者-发布产品

`product/publish`

> **URL**

https://api.xxx.com/v1/product/publish

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `ObjectId` | 产品Id                 |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": {
        "_id": "ObjectId" //发布的产品Id 
    }
}
```

> **注意事项**

无

## 开发者-解压包文件

`product/package_info`

> **URL**

https://api.xxx.com/v1/product/package_info

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型                    | 说明                   |
| ----------- | ------ | --------------------- | -------------------- |
| `UserToken` | `true` | `string`              | 用户令牌（包含用户Id及访问权限等信息） |
| ` File`     | `true` | `multipart/form-data` | 插件的打包文件              |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": {
        "Key": "Guid",
        "Name": "string",
        "Version": "X.X.X.X",
        "Description": "string",
        "Developer": "string"
    }
}
```

> **注意事项**

无



## 使用者-获取应用商店可见的所有应用（筛选、分页、排序、映射）

`app/store/list`

> **URL**

https://api.xxx.com/v1/app/store/list

> **API级别**

  5

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数           | 必选      | 类型       | 说明                               |
| ------------ | ------- | -------- | -------------------------------- |
| `UserToken`  | `false` | `string` | 用户令牌（包含用户Id及访问权限等信息），可以为空，表示匿名用户 |
| `ListParams` | `false` | `json`   | 集合的筛选、分页、排序、映射参数                 |

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
        "_id": "ObjectId", //Id
        "Key": "GUID", //应用唯一标识
        "Name": "string", //应用名称
        "Developer": "string", //应用开发商
        "Description": "string", //应用描述
        "Type": 0, //应用类型：0-普通插件; 1-基础插件; 2-主程序；11-表单；21-Revit插件
        "SupportedPlatform": 2, //应用支持的平台：2-Web;4-PC;8-iOS;16-Android 注意：值为支持平台的和，如6：web(2),PC(4)
        "Icon": "ObjectId", //应用图标 存objectId,返回给用户时给Url
        "Price": 0.0, //应用价格
        "DownloadCount": 0, //应用总的下载次数
        "AvgStar": 0.0, // 应用平均星级
        "AllStars": 0, //总的星级
        "MinPackageSize": 0, //最小安装包的大小
        "MaxPackageSize": 0, //最大安装包的大小
        "Owned": false //是否已拥有
    }, {
        "...": ""
    }]
}
```

> **注意事项**

如果`PageIndex`和`PageCount`都为0，则表示不分页；如果搜索表达式为空，则表示不搜索；`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。`Sort`表示按指定的属性升序或降序排列。

## 使用者-获取应用商店中应用的详细信息

`app/store/info`

> **URL**

https://api.xxx.com/v1/app/store/info

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选      | 类型         | 说明                               |
| ----------- | ------- | ---------- | -------------------------------- |
| `Id`        | `true`  | `ObjectId` | 应用Id                             |
| `UserToken` | `false` | `string`   | 用户令牌（包含用户Id及访问权限等信息），可以为空，表示匿名用户 |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": {
        "_id": "ObjectId", //Id
        "Key": "GUID", //应用唯一标识
        "Name": "string", //应用名称
        "Developer": "string", //应用开发商
        "Description": "string", //应用描述
        "Type": 0, //应用类型：0-普通插件; 1-基础插件; 2-主程序；3-运维插件；4-施工插件；11-表单；21-Revit插件
        "SupportedPlatform": 2, //应用支持的平台：2-Web;4-PC;8-iOS;16-Android 注意：值为支持平台的和，如6：web(2),PC(4)
        "Icon": "ObjectId", //应用图标 存objectId,返回给用户时给Url
        "Price": 0.0, //应用价格
        "DownloadCount": 0, //应用总的下载次数
        "AvgStar": 0.0, // 应用平均星级
        "AllStars": 0, //总的星级
        "CommentCount": 0, //评论总数
        "MinPackageSize": 0, //最小安装包的大小
        "MaxPackageSize": 0, //最大安装包的大小
        "Owned": false //是否已拥有
    }
}
```

> **注意事项**

`SupportedPlatform` 值为支持平台的和，如6：`web`,`PC`。

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 使用者-获取产品Id

`product/id`

> **URL**

https://api.xxx.com/v1/product/id

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数         | 必选     | 类型         | 说明                               |
| ---------- | ------ | ---------- | -------------------------------- |
| `AppId`    | `true` | `ObjectId` | 应用Id                             |
| `Platform` | `true` | `int`      | 产品所属平台                           |
| `Version`  | `true` | `string`   | 产品的版本号，格式为：x.x.x.x，x取值范围[0-9999] |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": {
        "_id": "ObjectId", //产品Id
    }
}
```

> **注意事项**

无

## 使用者-获取产品的所有版本号

`product/versions`

> **URL**

https://api.xxx.com/v1/product/versions

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选      | 类型         | 说明                               |
| ----------- | ------- | ---------- | -------------------------------- |
| `UserToken` | `false` | `json`     | 用户令牌（包含用户Id及访问权限等信息），可以为空，表示匿名用户 |
| `AppId`     | `true`  | `ObjectId` | 应用Id                             |
| `Platform`  | `true`  | `int`      | 产品所属平台                           |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": ["2.0.0.0", ...] //产品版本号集合
}
```

> **注意事项**

无

## 使用者-设置产品的稳定性

`product/set_distro`

> **URL**

https://api.xxx.com/v1/product/set_distro

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选      | 类型         | 说明                    |
| ----------- | ------- | ---------- | --------------------- |
| `UserToken` | `false` | `json`     | 用户令牌（包含用户Id及访问权限等信息）  |
| `Id`        | `true`  | `ObjectId` | 产品ID                  |
| `Distro`    | `true`  | `int`      | 发行版：0-测试版；1-预览版；2-稳定版 |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": {} 
}
```

> **注意事项**

只有内部用户才能设置产品稳定性

## 使用者-获取指定产品的详细信息

`product/info`

> **URL**

https://api.xxx.com/v1/product/info

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数   | 必选     | 类型         | 说明   |
| ---- | ------ | ---------- | ---- |
| `Id` | `true` | `ObjectId` | 产品Id |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": {
        "_id": "ObjectId", //Id
        "AppKey": "Guid", //所属应用的Key
        "AppId": "ObjectId", //所属应用的Id
        "AppType": 0, //应用类型：0-普通插件; 1-基础插件; 2-主程序；11-表单；21-Revit插件
        "Platform": 2, //产品所属平台：2-Web;4-PC;8-iOS;16-Android
      	"FileSize": 0, //产品安装包大小
        "DownloadCount": 0, //该版本产品的下载次数
        "Version": 0, //产品版本号
        "DisplayName": "string", //产品显示名称
        "DisplayIcon": "url", //产品显示图标 存objectId,返回给用户时给Url
        "Screenshots": ["url", "..."], //产品截图 存objectId,返回给用户时给Url
        "Description": "string", //产品描述
        "UpdateLog": "string", //产品更新日志
        "PublishDate": "/Date/", //产品的发布日期
    }
}
```

> **注意事项**

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 使用者-获取最新产品的详细信息

`product/latest_info`

> **URL**

https://api.xxx.com/v1/product/latest_info

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数         | 必选     | 类型         | 说明                               |
| ---------- | ------ | ---------- | -------------------------------- |
| `AppId`    | `true` | `ObjectId` | 应用Id                             |
| `Platform` | `true` | `int`      | 平台类型：2-Web;4-PC;8-iOS;16-Android |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": [{
        "_id": "ObjectId", //Id
        "AppKey": "Guid", //所属应用的Key
        "AppId": "ObjectId", //所属应用的Id
        "AppType": 0, //应用类型：0-普通插件; 1-基础插件; 2-主程序；11-表单；21-Revit插件
        "Platform": 2, //产品所属平台：2-Web;4-PC;8-iOS;16-Android
      	"FileSize": 0, //产品安装包大小
        "DownloadCount": 0, //该版本产品的下载次数
        "Version": 0, //产品版本号
        "DisplayName": "string", //产品显示名称
        "DisplayIcon": "url", //产品显示图标 存objectId,返回给用户时给Url
        "Screenshots": ["url", "..."], //产品截图 存objectId,返回给用户时给Url
        "Description": "string", //产品描述
        "UpdateLog": "string", //产品更新日志
        "PublishDate": "/Date/", //产品的发布日期
    },{
        "...": ""
    }]
}
```

> **注意事项**

 `Platform`采用或运算，如果想同时获取PC端和Web端的最新产品，则`Platform`取6（2+4），如果获取所有端的最新产品，则`Platform`取32（2+4+8+16）

## 使用者-获取评论列表（筛选、分页、排序、映射）

`app/store/comment/list`

> **URL**

https://api.xxx.com/v1/app/store/comment/list

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数           | 必选      | 类型     | 说明               |
| ------------ | ------- | ------ | ---------------- |
| `AppId`      | `true`  | `Id`   | 评论针对的应用的Id       |
| `ListParams` | `false` | `json` | 集合的筛选、分页、排序、映射参数 |

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
        "_id": "ObjectId", //评论Id
        "AppId": "ObjectId", //针对的应用Id
        "ProductId": "ObjectId", //针对的产品Id
        "Platform": 0, //评论针对的产品的平台
        "Version": 0, //评论针对的产品的版本
        "Star": 1, //星级
        "Content": "string", //评论内容
        "CreateDate": "/Date/", //创建日期
        "UserName": "string", //评论人
    }, {
        "...": ""
    }]
}
```

> **注意事项**

暂无

## 使用者-获取评论统计信息

`app/store/comment/statistics`

> **URL**

https://api.xxx.com/v1/app/store/comment/statistics

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数       | 必选     | 类型     | 说明          |
| -------- | ------ | ------ | ----------- |
| `AppKey` | `true` | `GUID` | 评论针对的应用的key |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": {
        "AppKey": "ObjectId", //应用的Key
        "TotalCount": 0, //评论的总数
        "Detail": [{
            "Star": 1, //星级
            "Count": 0 //该星级的评论数量
        }, {
            "...": ""
        }]
    }
}
```

> **注意事项**

暂无

## 使用者-添加评论

`app/store/comment/add`

> **URL**

https://api.xxx.com/v1/app/store/comment/add

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                                       |
| ----------- | ------ | -------- | ---------------------------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息）                     |
| `AppKey`    | `true` | `GUID`   | 评论针对的应用的key                              |
| `Platform`  | `true` | `int`    | 评论针对的产品的平台:`2-Web;4-PC;8-iOS;16-Android` |
| `Version`   | `true` | `long`   | 评论针对的产品的版本                               |
| `Star`      | `true` | `int`    | 评论星级[1,5]                                |
| ` Content`  | `true` | `string` | 评论内容                                     |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": {
        "_id": "ObjectId", //评论Id
        "AppId": "ObjectId", //针对的应用Id
        "ProductId": "ObjectId", //针对的产品Id
        "Platform": 0, //评论针对的产品的平台
        "Version": 0, //评论针对的产品的版本
        "Star": 1, //星级
        "Content": "string", //评论内容
        "CreateDate": "/Date/", //创建日期
        "UserName": "string", //评论人名字
    }
}
```

> **注意事项**

暂无

## 使用者-删除评论

`app/store/comment/delete`

> **URL**

https://api.xxx.com/v1/app/store/comment/delete

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `GUID`   | 评论`Id`               |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": "Id", //返回被删除的评论的Id
}
```

> **注意事项**

暂无

## 使用者-获取购买的应用订单集合（筛选、分页、排序、映射）

`app/order/list`

> **URL**

https://api.xxx.com/v1/app/order/list

> **API级别**

5

> **HTTP请求方式**

`Get`

> **请求参数：**

| 参数           | 必选      | 类型       | 说明                   |
| ------------ | ------- | -------- | -------------------- |
| `UserToken`  | `true`  | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `ListParams` | `false` | `json`   | 集合的筛选、分页、排序、映射参数     |

`ListParams  `的格式为：

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
    "Data": [{ //返回的数据
        "_id": "ObjectId", //编号
        "Status": 1, //订单状态：-1删除；0未付款；1已完成
        "CreateDate": "/Date/", //购买时间
        "Price": 100.00, //购买价格
        "App": {
            "_id": "ObjectId", //应用Id
            "Key": "GUID", //应用唯一标识
            "Name": "string", //应用名称
            "Developer": "string", //应用开发商
            "Description": "string", //应用描述
            "Type": 0, //应用类型：0-普通插件; 1-基础插件; 2-主程序；11-表单；21-Revit插件，设置后不能修改
            "SupportedPlatform": 2, //应用支持的平台：2-Web;4-PC;8-iOS;16-Android 注意：值为支持平台的和，如6：web(2),PC(4)
            "Icon": "ObjectId", //应用图标 存objectId,返回给用户时给Url
            "Price": 0.0, //应用价格
        }
    }, {
        "...": "..."
    }]
}
```

> **注意事项**

如果`PageIndex`和`PageCount`都为0，则表示不分页；如果搜索表达式为空，则表示不搜索；`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。`Sort`表示按指定的属性升序或降序排列。

`SupportedPlatform` 值为支持平台的和，如6：web,PC；

## 使用者-创建订单

`app/order/create`

> **URL**

https://api.xxx.com/v1/app/order/create

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Price`     | `true` | `double`   | 订单价格                 |
| `AppId`     | `true` | `ObjectId` | 应用Id                 |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": { //返回的数据
        "_id": "ObjectId", //编号
        "Status": 1, //订单状态：-1删除；0未付款；1已完成
        "CreateDate": "/Date/", //购买时间
        "Price": 100.00, //购买价格
        "App": {
            "_id": "ObjectId", //应用Id
            "Key": "GUID", //应用唯一标识
            "Name": "string", //应用名称
            "Developer": "string", //应用开发商
            "Description": "string", //应用描述
            "Type": 0, //应用类型：0-普通插件; 1-基础插件; 2-主程序；11-表单；21-Revit插件，设置后不能修改
            "SupportedPlatform": 2, //应用支持的平台：2-Web;4-PC;8-iOS;16-Android 注意：值为支持平台的和，如6：web(2),PC(4)
            "Icon": "ObjectId", //应用图标 存objectId,返回给用户时给Url
            "Price": 0.0, //应用价格
        }
    }
}
```

> **注意事项**

暂无

## 使用者-删除订单（批量）

`app/order/delete`

> **URL**

https://api.xxx.com/v1/app/order/delete

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Ids`       | `true` | `json`   | 订单Id集合               |

`Ids` 的数据结构为

```json
["Id1","Id2","..."]   //待删除的订单Id数组，*必填
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": ["Id1","Id2","..."] //返回删除成功的订单Id
}
```

> **注意事项**

暂无

## 使用者-订单结算

`app/order/account`

> **URL**

https://api.xxx.com/v1/app/order/account

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Ids`       | `true` | `json`   | 订单Id集合               |

`Ids  `的格式为：

```json
["Id1","Id2","..."]  //订单Id数组，*必填
```

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": 100.00 //返回订单的总价
}
```

> **注意事项**

暂无

## 获取产品安装包

`product/download`

> **URL**

https://api.xxx.com/v1/product/download

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                                  |
| ----------- | ------ | -------- | ----------------------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息）                |
| `AppKey`    | `true` | `GUID`   | 应用的Key                              |
| `Platform`  | `true` | `int`    | 产品平台类型： 2-Web;4-PC;8-iOS;16-Android |
| `Version`   | `true` | `string` | 产品版本号                               |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": "multipart/form-data" //返回的文件流数据
}
```

> **注意事项**

无
