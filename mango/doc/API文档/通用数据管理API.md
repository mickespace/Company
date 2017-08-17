# 自定义数据管理API

[TOC]

## 创建索引

`data/create_index`

> **URL**

https://api.xxx.com/v1/data/create_index

> **API级别**

3

> **HTTP请求方式**

`Post`

> **请求参数：**

| 参数           | 必选      | 类型       | 说明                   |
| ------------ | ------- | -------- | -------------------- |
| `UserToken`  | `true`  | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Name`       | `true`  | `string` | 数据集名称                |
| `FieldNames` | `true`  | `json`   | 属性名集合                |
| `IsUnique`   | `false` | `true`   | 是否是唯一键               |

`FieldNames`格式为：

```json
["PropertyName1", "..."]   //属性名集合，*必填
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

## 获取自定义数据列表（筛选、分页、排序、映射）

`data/list`

> **URL**

https://api.xxx.com/v1/data/list

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数           | 必选      | 类型       | 说明                   |
| ------------ | ------- | -------- | -------------------- |
| `UserToken`  | `true`  | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Name`       | `true`  | `string` | 数据集名称                |
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

> **返回结果**

```json
{
  "IsOk": true,//是否成功
  "Code": 200, //返回码
  "Message": "string",//返回信息
  "Data": [
    {
      "...": ""	 //自定义数据
  	},{
      "...": ""	 //自定义数据
  	}
  ]
}
```

> **注意事项**

如果`PageIndex`和`PageCount`都为0，则表示不分页；如果搜索表达式为空，则表示不搜索；`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。`Sort`表示按指定的属性升序或降序排列。

## 获取自定义数据详情（映射）

`data/info`

> **URL**

https://api.xxx.com/v1/data/info

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选      | 类型       | 说明                   |
| ----------- | ------- | -------- | -------------------- |
| `UserToken` | `true`  | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Name`      | `true`  | `string` | 数据集名称                |
| `Id`        | `true`  | `string` | 自定义数据的Id             |
| `Map`       | `false` | `json`   | 返回的属性映射集合            |

`Map`的格式如下：

```json
["PropertyName1","..."] //返回的属性映射数组,默认为空数组，表示返回所有属性
```

> **返回结果**

```json
{
  "IsOk": true,//是否成功
  "Code": 200,//返回码
  "Message": "string",//返回信息
  "Data": {
    "_id": "ObjectId",	//自定义数据Id
    "...": ""	//需要返回的属性
  }
}
```

> **注意事项**

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 添加自定义数据（批量）

`data/add`

> **URL**

https://api.xxx.com/v1/data/add

> **API级别**

3

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Name`      | `true` | `string` | 数据集名称                |
| `Data`      | `true` | `json`   | 自定义数据内容，数组格式         |

`Data`格式如下：

```json
[{
    "...": "" //自定义数据内容
}, {
    "...": "" //自定义数据内容
}]
```

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Message": "string",//返回信息
    "Code": 200,//返回码
    "Data": [{ //返回添加成功的自定义数据集合
        "_id": "ObjectId", //自定义数据Id
        "...": "" //自定义数据的属性
    }, {
        "_id": "ObjectId", //自定义数据Id
        "...": "" //自定义数据的属性
    }]
}
```

> **注意事项**

无

## 删除自定义数据（批量）

`data/delete`

> **URL**

https://api.xxx.com/v1/data/delete

> **API级别**

3

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Name`      | `true` | `string` | 数据集名称                |
| `Ids`       | `true` | `json`   | 自定义数据的`Id`集合         |

`Ids`的格式为

```json
["ObjectId", "..."]   //自定义数据Id集合，*必填
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

## 修改自定义数据（批量）

`data/update`

> **URL**

https://api.xxx.com/v1/data/update

> **API级别**

3

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Name`      | `true` | `string` | 数据集名称                |
| `Data`      | `true` | `json`   | 修改的自定义数据内容集合         |

`Data`格式为：

```json
[{
    "_id": "ObjectId", //自定义数据Id，*必填
    "...": "" //自定义数据内容
}, {
    "...": ""
}]
```

> **返回结果**

```json
{
  "IsOk": true,//是否成功
  "Message": "string",//返回信息
  "Code": 200,//返回码
  "Data": ["ObjectId", "..."] //返回修改成功的Id
}
```

> **注意事项**

无

## 树-获取自定义数据树列表（筛选、映射）

`data/tree_list`

> **URL**

https://api.xxx.com/v1/data/tree_list

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数           | 必选     | 类型       | 说明                   |
| ------------ | ------ | -------- | -------------------- |
| `UserToken`  | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Name`       | `true` | `string` | 数据集名称                |
| `ListParams` | `true` | `json`   | 集合的筛选、映射参数           |

`ListParams`格式为：

```json
{
    "Search": "[Expression]", //筛选表达式，默认为空，表示不筛选
    "Map": ["PropertyName1", "..."] //返回的属性映射数组,默认为空数组，表示返回所有属性
}
```

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Message": "string",//返回信息
    "Code": 200,//返回码
    "Data": [{
        "_id": "ObjectId", //自定义数据Id
        "Ancestors": ["ObjectId", "..."], //祖先节点Id集合
        "SortIndex": 0, //排序索引
        "...": "", //需要返回的属性
        "Children": [{
            "_id": "ObjectId",
            "...": ""
        }, {
            "...": ""
        }]
    }, {
        "...": ""
    }]
}
```

> **注意事项**

`ListParams`中的`Search`表示根节点搜索表达式。

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 树-获取自定义数据树结构（映射）

`data/tree`

> **URL**

https://api.xxx.com/v1/data/tree

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选      | 类型         | 说明                   |
| ----------- | ------- | ---------- | -------------------- |
| `UserToken` | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Name`      | `true`  | `string`   | 数据集名称                |
| `NodeId`    | `true`  | `ObjectId` | 根节点`Id`              |
| `Map`       | `false` | `json`     | 返回的属性映射数组            |

`Map`格式为：

```json
["PropertyName1", "..."] //返回的属性映射数组,默认为空数组，表示返回所有属性
```

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Message": "string",//返回信息
    "Code": 200,//返回码
    "Data": {
        "_id": "ObjectId", //自定义数据Id
        "Ancestors": ["ObjectId", "..."], //祖先节点Id集合
        "SortIndex": 0, //排序索引
        "...": "", //需要返回的属性
        "Children": [{
            "_id": "ObjectId",
            "...": ""
        }, {
            "...": ""
        }]
    }
}
```

> **注意事项**

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 树-判断是否是后代节点

`data/tree_is_descendant`

> **URL**

https://api.xxx.com/v1/data/tree_is_descendant

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Name`      | `true` | `string`   | 数据集名称                |
| `NodeId`    | `true` | `ObjectId` | 节点`Id`               |
| `TargetId`  | `true` | `ObjectId` | 目标节点`Id`             |

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Message": "string",//返回信息
    "Code": 200,//返回码
    "Data": true//是否是后代节点
}
```

> **注意事项**

`data/tree_is_descendant`判断的是`NodeId`节点是否是`TargetId`节点的后代节点。

## 树-获取节点的后代节点（筛选、分页、排序、映射）

`data/tree_descendants`

> **URL**

https://api.xxx.com/v1/data/tree_descendants

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数           | 必选      | 类型         | 说明                   |
| ------------ | ------- | ---------- | -------------------- |
| `UserToken`  | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Name`       | `true`  | `string`   | 数据集名称                |
| `NodeId`     | `true`  | `ObjectId` | 树的根节点                |
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
        "_id": "ObjectId", //自定义数据Id
        "Ancestors": ["ObjectId", "..."], //祖先节点Id集合
        "SortIndex": 0, //排序索引
        "...": "", //需要返回的属性
    }, {
      "...": ""
    }]
}
```

> **注意事项**

如果`PageIndex`和`PageCount`都为0，则表示不分页；如果搜索表达式为空，则表示不搜索；`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。`Sort`表示按指定的属性升序或降序排列。

## 树-获取节点的后代节点，包括自身（筛选、分页、排序、映射）

`data/tree_descendants_self`

> **URL**

https://api.xxx.com/v1/data/tree_descendants_self

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数           | 必选      | 类型         | 说明                   |
| ------------ | ------- | ---------- | -------------------- |
| `UserToken`  | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Name`       | `true`  | `string`   | 数据集名称                |
| `NodeId`     | `true`  | `ObjectId` | 树的根节点                |
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
        "_id": "ObjectId", //自定义数据Id
        "Ancestors": ["ObjectId", "..."], //祖先节点Id集合
        "SortIndex": 0, //排序索引
        "...": "", //需要返回的属性
    }, {
      "...": ""
    }]
}
```

> **注意事项**

如果`PageIndex`和`PageCount`都为0，则表示不分页；如果搜索表达式为空，则表示不搜索；`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。`Sort`表示按指定的属性升序或降序排列。

## 树-获取节点的祖先节点列表（映射）

`data/tree_ancestors`

> **URL**

https://api.xxx.com/v1/data/tree_ancestors

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选      | 类型         | 说明                   |
| ----------- | ------- | ---------- | -------------------- |
| `UserToken` | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Name`      | `true`  | `string`   | 数据集名称                |
| `NodeId`    | `true`  | `ObjectId` | 节点Id                 |
| `Map`       | `false` | `json`     | 返回的属性映射数组            |

`Map`格式为：

```json
["PropertyName1","..."] //返回的属性映射数组,默认为空数组，表示返回所有属性
```

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Message": "string",//返回信息
    "Code": 200,//返回码
    "Data": [{
        "_id": "ObjectId", //自定义数据Id
        "Ancestors": ["ObjectId", "..."], //祖先节点Id集合
        "SortIndex": 0, //排序索引
        "...": "" //需要返回的属性
    }, {
        "...": "" //需要返回的属性
    }]
}
```

> **注意事项**

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 树-获取节点的祖先节点列表，包括自身（映射）

`data/tree_ancestors_self`

> **URL**

https://api.xxx.com/v1/data/tree_ancestors_self

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选      | 类型         | 说明                   |
| ----------- | ------- | ---------- | -------------------- |
| `UserToken` | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Name`      | `true`  | `string`   | 数据集名称                |
| `NodeId`    | `true`  | `ObjectId` | 节点Id                 |
| `Map`       | `false` | `json`     | 返回的属性映射数组            |

`Map`格式为：

```json
["PropertyName1","..."] //返回的属性映射数组,默认为空数组，表示返回所有属性
```

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Message": "string", //返回信息
    "Code": 200,//返回码
    "Data": [{
        "_id": "ObjectId", //自定义数据Id
        "Ancestors": ["ObjectId", "..."], //祖先节点Id集合
        "SortIndex": 0, //排序索引
        "...": "" //需要返回的属性
    }, {
        "...": "" //需要返回的属性
    }]
}
```

> **注意事项**

 `Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 树-判断是否是兄弟节点

`data/tree_is_brother`

> **URL**

https://api.xxx.com/v1/data/tree_is_brother

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Name`      | `true` | `string`   | 数据集名称                |
| `NodeId`    | `true` | `ObjectId` | 节点`Id`               |
| `TargetId`  | `true` | `ObjectId` | 目标节点`Id`             |

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Message": "string",//返回信息
    "Code": 200,//返回码
    "Data": true//是否是兄弟节点
}
```

> **注意事项**

`data/tree_is_brother`判断的`NodeId`节点是否是`TargetId`节点的兄弟节点。

## 树-获取节点的兄弟节点（筛选、分页、排序、映射）

`data/tree_brothers`

> **URL**

https://api.xxx.com/v1/data/tree_brothers

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数           | 必选      | 类型         | 说明                   |
| ------------ | ------- | ---------- | -------------------- |
| `UserToken`  | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Name`       | `true`  | `string`   | 数据集名称                |
| `NodeId`     | `true`  | `ObjectId` | 树的根节点                |
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
        "_id": "ObjectId", //自定义数据Id
        "Ancestors": ["ObjectId", "..."], //祖先节点Id集合
        "SortIndex": 0, //排序索引
        "...": "", //需要返回的属性
    }, {
      "...": ""
    }]
}
```

> **注意事项**

如果`PageIndex`和`PageCount`都为0，则表示不分页；如果搜索表达式为空，则表示不搜索；`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。`Sort`表示按指定的属性升序或降序排列。

## 树-获取节点的兄弟节点，包括自身（筛选、分页、排序、映射）

`data/tree_brothers_self`

> **URL**

https://api.xxx.com/v1/data/tree_brothers_self

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数           | 必选      | 类型         | 说明                   |
| ------------ | ------- | ---------- | -------------------- |
| `UserToken`  | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Name`       | `true`  | `string`   | 数据集名称                |
| `NodeId`     | `true`  | `ObjectId` | 树的根节点                |
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
        "_id": "ObjectId", //自定义数据Id
        "Ancestors": ["ObjectId", "..."], //祖先节点Id集合
        "SortIndex": 0, //排序索引
        "...": "", //需要返回的属性
    }, {
      "...": ""
    }]
}
```

> **注意事项**

如果`PageIndex`和`PageCount`都为0，则表示不分页；如果搜索表达式为空，则表示不搜索；`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。`Sort`表示按指定的属性升序或降序排列。

## 树-判断是否是父节点

`data/tree_is_parent`

> **URL**

https://api.xxx.com/v1/data/tree_is_parent

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Name`      | `true` | `string`   | 数据集名称                |
| `NodeId`    | `true` | `ObjectId` | 节点`Id`               |
| `TargetId`  | `true` | `ObjectId` | 目标节点`Id`             |

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Message": "string",//返回信息
    "Code": 200,//返回码
    "Data": true//是否是父节点
}
```

> **注意事项**

`data/tree_is_parent`判断的是`NodeId`节点是否是`TargetId`节点的父节点。

## 树-获取节点的父节点（映射）

`data/tree_parent`

> **URL**

https://api.xxx.com/v1/data/tree_parent

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选      | 类型         | 说明                   |
| ----------- | ------- | ---------- | -------------------- |
| `UserToken` | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Name`      | `true`  | `string`   | 数据集名称                |
| `NodeId`    | `true`  | `ObjectId` | 节点Id                 |
| `Map`       | `false` | `json`     | 返回的属性映射数组            |

`Map`格式为：

```json
["PropertyName1","..."] //返回的属性映射数组，如果为空，则返回所有属性
```

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Message": "string",//返回信息
    "Code": 200,//返回码
    "Data": {
        "_id": "ObjectId", //自定义数据Id
        "Ancestors": ["ObjectId", "..."], //祖先节点Id集合
        "SortIndex": 0, //排序索引
        "...": "" //需要返回的属性
    }
}
```

> **注意事项**

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 树-获取节点的子节点（筛选、分页、排序、映射）

`data/tree_children`

> **URL**

https://api.xxx.com/v1/data/tree_children

> **API级别**

3

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数           | 必选      | 类型         | 说明                   |
| ------------ | ------- | ---------- | -------------------- |
| `UserToken`  | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Name`       | `true`  | `string`   | 数据集名称                |
| `NodeId`     | `true`  | `ObjectId` | 节点Id                 |
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
        "_id": "ObjectId", //自定义数据Id
        "Ancestors": ["ObjectId", "..."], //祖先节点Id集合
        "SortIndex": 0, //排序索引
        "...": "", //需要返回的属性
    }, {
      "...": ""
    }]
}
```

> **注意事项**

如果`PageIndex`和`PageCount`都为0，则表示不分页；如果搜索表达式为空，则表示不搜索；`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。`Sort`表示按指定的属性升序或降序排列。

## 树-添加节点（批量）

`data/tree_add_nodes`

> **URL**

https://api.xxx.com/v1/data/tree_add_nodes

> **API级别**

3

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选      | 类型       | 说明                   |
| ----------- | ------- | -------- | -------------------- |
| `UserToken` | `true`  | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Name`      | `true`  | `string` | 数据集名称                |
| `ParentId`  | `false` | `string` | 父节点Id，不填为null        |
| `Data`      | `true`  | `json`   | 自定义数据内容，树节点集合        |

`Data`格式如下：

```json
[{
    "SortIndex": 0, //排序索引
    "...": "", //其它属性
    "Children": [{
        "...": ""
    }, {
        "...": ""
    }]
}, {
    "...": ""
}]
```

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Message": "string",//返回信息
    "Code": 200,//返回码
    "Data": [{
        "_id": "ObjectId", //节点Id
        "ParentId": "ObjectId", //父节点Id
        "SortIndex": 0, //排序索引
        "...": "", //其它属性
        "Children": [{
            "_id": "ObjectId",
            "ParentId": "ObjectId",
            "...": ""
        }, {
            "...": ""
        }]
    }, {
        "...": ""
    }]
}
```

> **注意事项**

无

## 树-删除节点（批量）

`data/tree_remove_nodes`

> **URL**

https://api.xxx.com/v1/data/tree_remove_nodes

> **API级别**

3

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Name`      | `true` | `string` | 数据集名称                |
| `NodeIds`   | `true` | `json`   | 待删除的节点`Id`集合         |

`NodeIds`格式如下：

```json
["ObjectId", "..."]  //待删除的节点Id数组，*必填
```

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Message": "string",//返回信息
    "Code": 200,//返回码
    "Data": 0 //返回删除成功的节点数量
}
```

> **注意事项**

删除节点时，会删除该节点及其下面的所有后代节点。

## 树-上移节点

`data/tree_node_up`

> **URL**

https://api.xxx.com/v1/data/tree_node_up

> **API级别**

3

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Name`      | `true` | `string`   | 数据集名称                |
| `NodeId`    | `true` | `ObjectId` | 节点Id                 |

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

## 树-下移节点

`data/tree_node_down`

> **URL**

https://api.xxx.com/v1/data/tree_node_down

> **API级别**

3

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Name`      | `true` | `string`   | 数据集名称                |
| `NodeId`    | `true` | `ObjectId` | 节点Id                 |

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

## 树-升级节点

`data/tree_node_promotion`

> **URL**

https://api.xxx.com/v1/data/tree_node_promotion

> **API级别**

3

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Name`      | `true` | `string`   | 数据集名称                |
| `NodeId`    | `true` | `ObjectId` | 需要升级的节点Id            |

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

## 树-移动节点

`data/tree_node_move`

> **URL**

https://api.xxx.com/v1/data/tree_node_move

> **API级别**

3

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数              | 必选      | 类型         | 说明                   |
| --------------- | ------- | ---------- | -------------------- |
| `UserToken`     | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Name`          | `true`  | `string`   | 数据集名称                |
| `NodeIds`       | `true`  | `json`     | 待移动的节点Id集合           |
| `TargetId`      | `true`  | `ObjectId` | 目标节点Id               |
| `MovePos`       | `true`  | `int`      | 移动位置，1为前面，2为里面，4为后面  |
| `IgnoreInvalid` | `false` | `bool`     | 是否忽略移动非法的节点，默认为false |

`NodeIds`格式为：

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



