# 仪表板管理API

[TOC]

## 获取仪表板列表（筛选、分页、排序、映射）

`dashboard/list`

> **URL**

https://api.xxx.com/v1/dashboard/list

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
        "UserId": "ObjectId", //所属用户Id
        "ProjectId": "ObjectId", //所属项目Id
        "Name": "string", //仪表板名称
      	"IsDefault": true, //是否是默认的仪表板
        "Widgets": [{ //仪表板中的小部件集合
            "_id": "ObjectId", //Id
            "Name": "string", //小部件名称
            "DisplayName": "string", //小部件的显示名称
            "AppKey": "GUID", //小部件所在的APP的Key
            "WidgetKey": "GUID", //小部件的Key
            "IsDefault": true, //是否是默认显示的部件
            "IsUpdate": true, //是否显示刷新按钮
            "Position": [0, 0], //容器坐标位置
            "Height": 100, //高度
            "Width": 100, //宽度
            "Color": [255, 0, 0, 255], //边框颜色[r,g,b,a]
            "Content": {
                "...": "" //小部件的内容
            }
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

## 添加仪表板（映射）

`dashboard/add`

> **URL**

https://api.xxx.com/v1/dashboard/add

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选      | 类型         | 说明                   |
| ----------- | ------- | ---------- | -------------------- |
| `UserToken` | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `ProjectId` | `true`  | `ObjectId` | 项目Id                 |
| `Name`      | `true`  | `string`   | 仪表板名称                |
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
        "UserId": "ObjectId", //所属用户Id
        "ProjectId": "ObjectId", //所属项目Id
        "Name": "string", //仪表板名称
        "IsDefault": true, //是否是默认的仪表板
        "Widgets": [{ //仪表板中的小部件集合
            "_id": "ObjectId", //Id
            "Name": "string", //小部件名称
            "DisplayName": "string", //小部件的显示名称
            "AppKey": "GUID", //小部件所在的APP的Key
            "WidgetKey": "GUID", //小部件的Key
            "IsDefault": true, //是否是默认显示的部件
            "IsUpdate": true, //是否显示刷新按钮
            "Position": [0, 0], //容器坐标位置
            "Height": 100, //高度
            "Width": 100, //宽度
            "Color": [255, 0, 0, 255], //边框颜色[r,g,b,a]
            "Content": {
                "...": "" //小部件的内容
            }
        }, {
            "...": ""
        }]
    }
}
```

> **注意事项**

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 删除仪表板（批量）

`dashboard/delete`

> **URL**

https://api.xxx.com/v1/dashboard/delete

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Ids`       | `true` | `json`   | 仪表板`Id`集合            |

`Ids`的格式为

```json
["ObjectId", "..."]  //仪表板Id集合，*必填
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

## 更新仪表板

`dashboard/update`

> **URL**

https://api.xxx.com/v1/dashboard/update

> **API级别**

3

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Data`      | `true` | `json`   | 需要修改的仪表板信息           |

`Data`格式为：

```json
{
    "_id": "ObjectId", //Id，*必填
    "UserId": "ObjectId", //所属用户Id，默认为null
    "ProjectId": "ObjectId", //所属项目Id，默认为null
    "Name": "string", //仪表板名称，默认为null
    "IsDefault": true //是否是默认的仪表板
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
        "UserId": "ObjectId", //所属用户Id
        "ProjectId": "ObjectId", //所属项目Id
        "Name": "string", //仪表板名称
        "IsDefault": true, //是否是默认的仪表板
        "Widgets": [{ //仪表板中的小部件集合
            "_id": "ObjectId", //Id
            "Name": "string", //小部件名称
            "DisplayName": "string", //小部件的显示名称
            "AppKey": "GUID", //小部件所在的APP的Key
            "WidgetKey": "GUID", //小部件的Key
            "IsDefault": true, //是否是默认显示的部件
            "IsUpdate": true, //是否显示刷新按钮
            "Position": [0, 0], //容器坐标位置
            "Height": 100, //高度
            "Width": 100, //宽度
            "Color": [255, 0, 0, 255], //边框颜色[r,g,b,a]
            "Content": {
                "...": "" //小部件的内容
            }
        }, {
            "...": ""
        }]
    }
}
```

> **注意事项**

无

## 获取仪表板中的小部件列表（筛选、分页、排序、映射）

`dashboard/widget/list`

> **URL**

https://api.xxx.com/v1/dashboard/widget/list

> **API级别**

2

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数            | 必选      | 类型         | 说明                   |
| ------------- | ------- | ---------- | -------------------- |
| `UserToken`   | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `DashboardId` | `true`  | `ObjectId` | 仪表板Id                |
| `ListParams`  | `false` | `json`     | 集合的筛选、分页、排序、映射参数     |

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
        "Name": "string", //小部件名称
        "DisplayName": "string", //小部件的显示名称
        "AppKey": "GUID", //小部件所在的APP的Key
        "WidgetKey": "GUID", //小部件的Key
        "IsDefault": true, //是否是默认显示的部件
        "IsUpdate": true, //是否显示刷新按钮
        "Position": [0, 0], //容器坐标位置
        "Height": 100, //高度
        "Width": 100, //宽度
        "Color": [255, 0, 0, 255], //边框颜色[r,g,b,a]
        "Content": {
            "...": "" //小部件的内容
        }
    }, {
        "...": ""
    }]
}
```

> **注意事项**

如果`PageIndex`和`PageCount`都为0，则表示不分页；如果搜索表达式为空，则表示不搜索；`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。`Sort`表示按指定的属性升序或降序排列。

## 在仪表板中添加小部件（映射）

`dashboard/widget/add`

> **URL**

https://api.xxx.com/v1/dashboard/widget/add

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数            | 必选      | 类型         | 说明                   |
| ------------- | ------- | ---------- | -------------------- |
| `UserToken`   | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `DashboardId` | `true`  | `ObjectId` | 仪表板Id                |
| `Data`        | `true`  | `json`     | 小部件信息                |
| `Map`         | `false` | `json`     | 返回的属性映射数组            |

`Data`格式为：

```json
{
    "WidgetKey": "GUID", //小部件的Key,*必填
    "Position": "0,0", //容器坐标位置,*必填
    "Height": 100, //高度,*必填
    "Width": 100, //宽度,*必填
    "Color": [255, 0, 0, 255] //边框颜色，默认为空
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
    "Data": {
        "_id": "ObjectId", //Id
        "Name": "string", //小部件名称
        "DisplayName": "string", //小部件的显示名称
        "AppKey": "GUID", //小部件所在的APP的Key
        "WidgetKey": "GUID", //小部件的Key
        "IsDefault": true, //是否是默认显示的部件
        "IsUpdate": true, //是否显示刷新按钮
        "Position": [0, 0], //容器坐标位置
        "Height": 100, //高度
        "Width": 100, //宽度
        "Color": [255, 0, 0, 255], //边框颜色[r,g,b,a]
        "Content": {
            "...": "" //小部件的内容
        }
    }
}
```

> **注意事项**

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 从仪表板中删除小部件（批量）

`dashboard/widget/delete`

> **URL**

https://api.xxx.com/v1/dashboard/widget/delete

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数            | 必选     | 类型         | 说明                   |
| ------------- | ------ | ---------- | -------------------- |
| `UserToken`   | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `DashboardId` | `true` | `ObjectId` | 仪表板Id                |
| `Ids`         | `true` | `json`     | 小部件`Id`集合            |

`Ids`格式为：

```json
["ObjectId", "..."]  //小部件Id集合，*必填
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

## 更新小部件信息

`dashboard/widget/update`

> **URL**

https://api.xxx.com/v1/dashboard/widget/update

> **API级别**

3

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Data`      | `true` | `json`   | 需要修改的小部件信息           |

`Data`格式为：

```json
{
    "_id": "ObjectId", //Id,*必填
    "Name": "string", //小部件名称，默认为null
    "DisplayName": "string", //小部件的显示名称，默认为null
    "AppKey": "GUID", //小部件所在的APP的Key，默认为null
    "WidgetKey": "GUID", //小部件的Key，默认为null
    "IsDefault": true, //是否是默认显示的部件
    "IsUpdate": true, //是否显示刷新按钮
    "Position": [0, 0], //容器坐标位置，默认为null
    "Height": 100, //高度，默认为null
    "Width": 100, //宽度，默认为null
    "Color": [255, 0, 0, 255], //边框颜色[r,g,b,a]，默认为null
    "Content": {
        "...": "" //小部件的内容
    }
}
```

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": "ObjectId" //返回修改成功的小部件Id
    }
}
```

> **注意事项**

无

