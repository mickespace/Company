# 流程管理API设计

[TOC]

## 流程-获取所有流程（筛选、分页、排序、映射）

`task/workflow/list`

> **URL**

https://api.xxx.com/v1/task/workflow/list

> **API级别**

4

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数           | 必选      | 类型         | 说明                   |
| ------------ | ------- | ---------- | -------------------- |
| `UserToken`  | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `ProjectId`  | `true`  | `ObjectId` | 项目编号                 |
| `ListParams` | `false` | `json`     | 集合的筛选、分页、排序、映射参数     |

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
        "_id": "ObjectId", //流程ID
        "ProjectId": "ObjectId", //流程所属的项目Id
        "Name": "string", //流程名称
        "Type": 0, //流程类型：0 常规流程 1 自由流程
        "Manager": ["ObjectId", "..."], //流程的管理者Id
        "InstanceManager": ["ObjectId", "..."], //任务管理者
        "RemoveCompleted": false, //完成任务时是否自动删除false，默认不删除
        "Note": "", //备注说明,
        "Status": 1, //状态 1:设计中 2:已安装 3:已卸载 4:已删除
        "CreateId": "ObjectId", //创建者
        "CreateDate": "/Date/", //创建时间
        "InstallUserId": "ObjectId", //安装者
        "InstallDate": "/Date/", //安装时间
        "Steps": [{
            "_id": "ObjectId", //步骤编号
            "Name": "string", //步骤名称
            "OpinionDisplay": false, //是否显示意见，默认不显示
            "ExpiredPrompt": false, //是否超期提示，默认不提示
            "SignatureType": 0, //审核类型，0为无签批意见栏，1有签批意见（无签章），2有签批意见（有签章）
            "WorkTime": 1, //工时，以小时为单位
            "Archives": false, //是否归档,默认不归档
            "ArchivesParams": "string", //归档参数
            "Note": "string", //说明
            "Position": { //步骤在流程设计器中的位置
                "X": 351,
                "Y": 98,
                "Width": 108,
                "Height": 50
            },
            "FlowType": 0, //流转类型,0为单选一个分支流转，1为系统控制，2为多选几个分支流转
            // "SelectWhenRun": true, //是否允许运行时设置流转类型
            "HandlerType": 0, //处理者类型，0为所有成员，1为成员，2为角色，3为组织，4为发起者，5为前一步骤处理者，6某一步骤处理者
            "SelectHandlers": ["ObjectId", "..."], //可选择的处理者，选择范围
            "DefaultHandler": ["ObjectId", "..."], //默认处理者
            "HandlerStep": "ObjectId", //当处理者类型为6(某一步骤处理者)时的处理者步骤
            "HandlerModel": 0, //处理者策略,0为所有人必须同意，1为一人同意即可，2为依据人数比例，3独立处理
            "Handlerpercentage": 100, //处理者策略百分比
            "BackModel": 0, //退回策略,0为根据处理策略退回，1为不能退回
            "BackType": 0, //退回类型，0为上一步，1为第一步，2为某一步
            "BackStep": "ObjectId", //退回步骤,BackType为某一步时需要使用该值
            "Backpercentage": 100, //退回百分比
            "Countersignature": 0, //会签策略,0为不会签，1为所有步骤同意，2为一个步骤同意即可，3为依据比例
            "CountersignaturePercentage": 100, // 会签策略百分比
            "CopyFor": ["ObjectId", "..."], //抄送人员
            "Forms": [{ //表单
                "_id": "ObjectId", //表单Id
                "Name": "string", //表单名称
                "Sort": 0 //显示顺序
            }, "..."],
            "Handles": [{ //可操作的功能
                "Type": 0, //操作类型
                "Sort": 0, //显示顺序
                "DisplayName": "string" //显示名称
            }, "..."]
        }],
        "Lines": [{ //流向连线
            "_id": "ObjectId", //流向Id
            "From": "ObjectId", //开始步骤Id
            "To": "ObjectId" //结束步骤Id
        }]
    }]
}
```

> **注意事项**

如果`PageIndex`和`PageCount`都为0，则表示不分页；如果搜索表达式为空，则表示不搜索；`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。`Sort`表示按指定的属性升序或降序排列。

## 流程-获取流程详细信息（映射）

`task/workflow/detail`

> **URL**

https://api.xxx.com/v1/task/workflow/detail

> **API级别**

4

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选      | 类型         | 说明                   |
| ----------- | ------- | ---------- | -------------------- |
| `UserToken` | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true`  | `ObjectId` | 流程编号                 |
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
        "_id": "ObjectId", //流程ID
        "ProjectId": "ObjectId", //流程所属的项目Id
        "Name": "string", //流程名称
        "Type": 0, //流程类型：0 常规流程 1 自由流程
        "Manager": ["ObjectId", "..."], //流程的管理者Id
        "InstanceManager": ["ObjectId", "..."], //任务管理者
        "RemoveCompleted": false, //完成任务时是否自动删除false，默认不删除
        "Note": "", //备注说明,
        "Status": 1, //状态 1:设计中 2:已安装 3:已卸载 4:已删除
        "CreateId": "ObjectId", //创建者
        "CreateDate": "/Date/", //创建时间
        "InstallUserId": "ObjectId", //安装者
        "InstallDate": "/Date/", //安装时间
        "Steps": [{
            "_id": "ObjectId", //步骤编号
            "Name": "string", //步骤名称
            "OpinionDisplay": false, //是否显示意见，默认不显示
            "ExpiredPrompt": false, //是否超期提示，默认不提示
            "SignatureType": 0, //审核类型，0为无签批意见栏，1有签批意见（无签章），2有签批意见（有签章）
            "WorkTime": 1, //工时，以小时为单位
            "Archives": false, //是否归档,默认不归档
            "ArchivesParams": "string", //归档参数
            "Note": "string", //说明
            "Position": { //步骤在流程设计器中的位置
                "X": 351,
                "Y": 98,
                "Width": 108,
                "Height": 50
            },
            "FlowType": 0, //流转类型,0为单选一个分支流转，1为系统控制，2为多选几个分支流转
            // "SelectWhenRun": true, //是否允许运行时设置流转类型
            "HandlerType": 0, //处理者类型，0为所有成员，1为成员，2为角色，3为组织，4为发起者，5为前一步骤处理者，6某一步骤处理者
            "SelectHandlers": ["ObjectId", "..."], //可选择的处理者，选择范围
            "DefaultHandler": ["ObjectId", "..."], //默认处理者
            "HandlerStep": "ObjectId", //当处理者类型为6(某一步骤处理者)时的处理者步骤
            "HandlerModel": 0, //处理者策略,0为所有人必须同意，1为一人同意即可，2为依据人数比例，3独立处理
            "Handlerpercentage": 100, //处理者策略百分比
            "BackModel": 0, //退回策略,0为根据处理策略退回，1为不能退回
            "BackType": 0, //退回类型，0为上一步，1为第一步，2为某一步
            "BackStep": "ObjectId", //退回步骤,BackType为某一步时需要使用该值
            "Backpercentage": 100, //退回百分比
            "Countersignature": 0, //会签策略,0为不会签，1为所有步骤同意，2为一个步骤同意即可，3为依据比例
            "CountersignaturePercentage": 100, // 会签策略百分比
            "CopyFor": ["ObjectId", "..."], //抄送人员
            "Forms": [{ //表单
                "_id": "ObjectId", //表单Id
                "Name": "string", //表单名称
                "Sort": 0 //显示顺序
            }, "..."],
            "Handles": [{ //可操作的功能
                "Type": 0, //操作类型
                "Sort": 0, //显示顺序
                "DisplayName": "string" //显示名称
            }, "..."]
        }],
        "Lines": [{ //流向连线
            "_id": "ObjectId", //流向Id
            "From": "ObjectId", //开始步骤Id
            "To": "ObjectId" //结束步骤Id
        }]
    }
}
```

> **注意事项**

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 流程-保存流程（映射）

`task/workflow/save`

> **URL**

https://api.xxx.com/v1/task/workflow/save

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选      | 类型       | 说明                   |
| ----------- | ------- | -------- | -------------------- |
| `UserToken` | `true`  | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Data`      | `true`  | `json`   | 流程定义                 |
| `Map`       | `false` | `json`   | 返回的属性映射数组            |

`Map`的格式为：

```json
["PropertyName1","..."]   //返回的属性映射数组，默认为空数组，表示返回所有属性
```

`Data`的格式为：

```json
{
    "_id": "ObjectId", //流程ID，可选，存在时为更新流程、否则创建流程
    "ProjectId": "ObjectId", //流程所属的项目Id
    "Name": "string", //流程名称
    "Type": 0, //流程类型：0 常规流程 1 自由流程
    "Manager": ["ObjectId", "..."], //流程的管理者Id
    "InstanceManager": ["ObjectId", "..."], //任务管理者
    "RemoveCompleted": false, //完成任务时是否自动删除false，默认不删除
    "Note": "", //备注说明,
    "Status": 1, //状态 1:设计中 2:已安装 3:已卸载 4:已删除
    "CreateId": "ObjectId", //创建者
    "CreateDate": "/Date/", //创建时间
    "InstallUserId": "ObjectId", //安装者
    "InstallDate": "/Date/", //安装时间
    "Steps": [{
        "_id": "ObjectId", //步骤编号
        "Name": "string", //步骤名称
        "OpinionDisplay": false, //是否显示意见，默认不显示
        "ExpiredPrompt": false, //是否超期提示，默认不提示
        "SignatureType": 0, //审核类型，0为无签批意见栏，1有签批意见（无签章），2有签批意见（有签章）
        "WorkTime": 1, //工时，以小时为单位
        "Archives": false, //是否归档,默认不归档
        "ArchivesParams": "string", //归档参数
        "Note": "string", //说明
        "Position": { //步骤在流程设计器中的位置
            "X": 351,
            "Y": 98,
            "Width": 108,
            "Height": 50
        },
        "FlowType": 0, //流转类型,0为单选一个分支流转，1为系统控制，2为多选几个分支流转
        // "SelectWhenRun": true, //是否允许运行时设置流转类型
        "HandlerType": 0, //处理者类型，0为所有成员，1为成员，2为角色，3为组织，4为发起者，5为前一步骤处理者，6某一步骤处理者
        "SelectHandlers": ["ObjectId", "..."], //可选择的处理者，选择范围
        "DefaultHandler": ["ObjectId", "..."], //默认处理者
        "HandlerStep": "ObjectId", //当处理者类型为6(某一步骤处理者)时的处理者步骤
        "HandlerModel": 0, //处理者策略,0为所有人必须同意，1为一人同意即可，2为依据人数比例，3独立处理
        "Handlerpercentage": 100, //处理者策略百分比
        "BackModel": 0, //退回策略,0为根据处理策略退回，1为不能退回
        "BackType": 0, //退回类型，0为上一步，1为第一步，2为某一步
        "BackStep": "ObjectId", //退回步骤,BackType为某一步时需要使用该值
        "Backpercentage": 100, //退回百分比
        "Countersignature": 0, //会签策略,0为不会签，1为所有步骤同意，2为一个步骤同意即可，3为依据比例
        "CountersignaturePercentage": 100, // 会签策略百分比
        "CopyFor": ["ObjectId", "..."], //抄送人员
        "Forms": [{ //表单
            "_id": "ObjectId", //表单Id
            "Name": "string", //表单名称
            "Sort": 0 //显示顺序
        }, "..."],
        "Handles": [{ //可操作的功能
            "Type": 0, //操作类型
            "Sort": 0, //显示顺序
            "DisplayName": "string" //显示名称
        }, "..."]
    }],
    "Lines": [{ //流向连线
        "_id": "ObjectId", //流向Id
        "From": "ObjectId", //开始步骤Id
        "To": "ObjectId" //结束步骤Id
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
        "_id": "ObjectId", //流程ID
        "ProjectId": "ObjectId", //流程所属的项目Id
        "Name": "string", //流程名称
        "Type": 0, //流程类型：0 常规流程 1 自由流程
        "Manager": ["ObjectId", "..."], //流程的管理者Id
        "InstanceManager": ["ObjectId", "..."], //任务管理者
        "RemoveCompleted": false, //完成任务时是否自动删除false，默认不删除
        "Note": "", //备注说明,
        "Status": 1, //状态 1:设计中 2:已安装 3:已卸载 4:已删除
        "CreateId": "ObjectId", //创建者
        "CreateDate": "/Date/", //创建时间
        "InstallUserId": "ObjectId", //安装者
        "InstallDate": "/Date/", //安装时间
        "Steps": [{
            "_id": "ObjectId", //步骤编号
            "Name": "string", //步骤名称
            "OpinionDisplay": false, //是否显示意见，默认不显示
            "ExpiredPrompt": false, //是否超期提示，默认不提示
            "SignatureType": 0, //审核类型，0为无签批意见栏，1有签批意见（无签章），2有签批意见（有签章）
            "WorkTime": 1, //工时，以小时为单位
            "Archives": false, //是否归档,默认不归档
            "ArchivesParams": "string", //归档参数
            "Note": "string", //说明
            "Position": { //步骤在流程设计器中的位置
                "X": 351,
                "Y": 98,
                "Width": 108,
                "Height": 50
            },
            "FlowType": 0, //流转类型,0为单选一个分支流转，1为系统控制，2为多选几个分支流转
            // "SelectWhenRun": true, //是否允许运行时设置流转类型
            "HandlerType": 0, //处理者类型，0为所有成员，1为成员，2为角色，3为组织，4为发起者，5为前一步骤处理者，6某一步骤处理者
            "SelectHandlers": ["ObjectId", "..."], //可选择的处理者，选择范围
            "DefaultHandler": ["ObjectId", "..."], //默认处理者
            "HandlerStep": "ObjectId", //当处理者类型为6(某一步骤处理者)时的处理者步骤
            "HandlerModel": 0, //处理者策略,0为所有人必须同意，1为一人同意即可，2为依据人数比例，3独立处理
            "Handlerpercentage": 100, //处理者策略百分比
            "BackModel": 0, //退回策略,0为根据处理策略退回，1为不能退回
            "BackType": 0, //退回类型，0为上一步，1为第一步，2为某一步
            "BackStep": "ObjectId", //退回步骤,BackType为某一步时需要使用该值
            "Backpercentage": 100, //退回百分比
            "Countersignature": 0, //会签策略,0为不会签，1为所有步骤同意，2为一个步骤同意即可，3为依据比例
            "CountersignaturePercentage": 100, // 会签策略百分比
            "CopyFor": ["ObjectId", "..."], //抄送人员
            "Forms": [{ //表单
                "_id": "ObjectId", //表单Id
                "Name": "string", //表单名称
                "Sort": 0 //显示顺序
            }, "..."],
            "Handles": [{ //可操作的功能
                "Type": 0, //操作类型
                "Sort": 0, //显示顺序
                "DisplayName": "string" //显示名称
            }, "..."]
        }],
        "Lines": [{ //流向连线
            "_id": "ObjectId", //流向Id
            "From": "ObjectId", //开始步骤Id
            "To": "ObjectId" //结束步骤Id
        }]
    }
}
```

> **注意事项**

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 流程-删除流程

`task/workflow/delete`

> **URL**

https://api.xxx.com/v1/task/workflow/delete

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `ObjectId` | 流程编号                 |

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

## 流程-安装流程

`task/workflow/install`

> **URL**

https://api.xxx.com/v1/task/workflow/install

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `ObjectId` | 流程编号                 |

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

## 流程-卸载流程

`task/workflow/uninstall`

> **URL**

https://api.xxx.com/v1/task/workflow/uninstall

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `ObjectId` | 流程编号                 |

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

## 任务-获取任务列表（筛选、分页、排序、映射）

`task/list`

> **URL**

https://api.xxx.com/v1/task/list

> **API级别**

4

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数           | 必选      | 类型       | 说明                              |
| ------------ | ------- | -------- | ------------------------------- |
| `UserToken`  | `true`  | `string` | 用户令牌（包含用户Id及访问权限等信息）            |
| `ProjectId`  | `true`  | `string` | 项目编号                            |
| `QueryType`  | `false` | `int`    | 请求类型：0-全部任务;1-待办事项;2-已办事项;。默认为0 |
| `ListParams` | `false` | `json`   | 集合的筛选、分页、排序、映射参数                |

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
        "_id": "ObjectId", //任务Id
        "ProjectId": "ObjectId", //任务所属项目Id
        "InstanceId": "ObjectId", //实例Id
        "PrevId": "ObjectId", //上一任务Id
        "PrevStepId": "ObjectId", //上一步骤Id
        "StepId": "ObjectId", //步骤Id
        "StepName": "步骤名称", //步骤名称
        "Title": "任务标题", //任务标题
        "FlowId": "ObjectId", //所属流程Id
        "Type": 0, //任务类型:0-正常;1-指派;2-委托;3-转交;4-退回;5-抄送
        "Sender": { //发送人
            "_id": "ObjectId", //用户Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //真实姓名
        },
        "SenderTime": "/Date/", //发送时间
        "Receive": { //接收人
            "_id": "ObjectId", //用户Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //真实姓名
        },
        "ReceiveTime": "/Date/", //接收时间
        "OpenTime": "/Date/", //打开时间
        "PlanFinished": "/Date/", //规定完成时间
        "ActualFinished": "/Date/", //实际完成时间
        "Comment": "string", //审核意见
        "IsSign": false, //是否签章
        "Status": 0, //状态 0 待处理 1打开 2完成 3退回 4他人已处理 5他人已退回
        "Note": "string", //其它说明
        "Sort": 0 //显示顺序
    }]
}
```

> **注意事项**

如果`PageIndex`和`PageCount`都为0，则表示不分页；如果搜索表达式为空，则表示不搜索；`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。`Sort`表示按指定的属性升序或降序排列。

## 任务-获取可管理的实例列表（筛选、分页、排序、映射）

`task/instance/list`

> **URL**

https://api.xxx.com/v1/task/instance/list

> **API级别**

4

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数           | 必选      | 类型         | 说明                   |
| ------------ | ------- | ---------- | -------------------- |
| `UserToken`  | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `ProjectId`  | `true`  | `ObjectId` | 项目编号                 |
| `ListParams` | `false` | `json`     | 集合的筛选、分页、排序、映射参数     |

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
        "CurTaskId": "ObjectId", //当前任务Id
        "ProjectId": "ObjectId", //任务所属项目Id
        "InstanceId": "ObjectId", //实例Id
        "PrevId": "ObjectId", //上一任务Id
        "PrevStepId": "ObjectId", //上一步骤Id
        "StepId": "ObjectId", //当前步骤Id
        "StepName": "步骤名称", //当前步骤名称
        "Title": "标题", //标题
        "FlowId": "ObjectId", //所属流程Id
      	"FlowName": "string", //所属流程名称
        "Type": 0, //任务类型:0-正常;1-指派;2-委托;3-转交;4-退回;5-抄送
        "Sender": { //发送人
            "_id": "ObjectId", //用户Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //真实姓名
        },
        "SenderTime": "/Date/", //发送时间
        "Receive": { //接收人
            "_id": "ObjectId", //用户Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //真实姓名
        },
        "ReceiveTime": "/Date/", //接收时间
        "OpenTime": "/Date/", //打开时间
        "PlanFinished": "/Date/", //规定完成时间
        "ActualFinished": "/Date/", //实际完成时间
        "Comment": "string", //审核意见
        "IsSign": false, //是否签章
        "Status": 0, //状态 0 待处理 1打开 2完成 3退回 4他人已处理 5他人已退回
        "Note": "string", //其它说明
        "Sort": 0 //显示顺序
    }]
}
```

> **注意事项**

如果`PageIndex`和`PageCount`都为0，则表示不分页；如果搜索表达式为空，则表示不搜索；`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。`Sort`表示按指定的属性升序或降序排列。

## 任务-删除实例

`task/instance/delete`

> **URL**

https://api.xxx.com/v1/task/instance/delete

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `ObjectId` | 实例编号                 |

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

## 任务-获取实例的所有任务

`task/instance/detail`

> **URL**

https://api.xxx.com/v1/task/instance/detail

> **API级别**

4

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数           | 必选     | 类型       | 说明                   |
| ------------ | ------ | -------- | -------------------- |
| `UserToken`  | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `InstanceId` | `true` | `string` | 实例编号                 |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": [{
        "_id": "ObjectId", //任务Id
        "ProjectId": "ObjectId", //任务所属项目Id
        "InstanceId": "ObjectId", //实例Id
        "PrevId": "ObjectId", //上一任务Id
        "PrevStepId": "ObjectId", //上一步骤Id
        "StepId": "ObjectId", //步骤Id
        "StepName": "步骤名称", //步骤名称
        "Title": "任务标题", //任务标题
        "FlowId": "ObjectId", //所属流程Id
        "Type": 0, //任务类型:0-正常;1-指派;2-委托;3-转交;4-退回;5-抄送
        "Sender": { //发送人
            "_id": "ObjectId", //用户Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //真实姓名
        },
        "SenderTime": "/Date/", //发送时间
        "Receive": { //接收人
            "_id": "ObjectId", //用户Id
            "Email": "xxx@qq.com", //邮箱
            "PhoneNumber": "(86)136xxxxxxxx", //手机号
            "RealName": "超级管理员" //真实姓名
        },
        "ReceiveTime": "/Date/", //接收时间
        "OpenTime": "/Date/", //打开时间
        "PlanFinished": "/Date/", //规定完成时间
        "ActualFinished": "/Date/", //实际完成时间
        "Comment": "string", //审核意见
        "IsSign": false, //是否签章
        "Status": 0, //状态 0 待处理 1打开 2完成 3退回 4他人已处理 5他人已退回
        "Note": "string", //其它说明
        "Sort": 0 //显示顺序
    }]
}
```

> **注意事项**

暂无

## 任务-指派任务

`task/designate`

> **URL**

https://api.xxx.com/v1/task/designate

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `ObjectId` | 当前任务编号               |
| `Data`      | `true` | `json`     | 用户编号集合               |

`Data  `的格式为：

```json
["ObjectId","..."] //用户编号集合
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

## 任务-提交任务

`task/submit`

> **URL**

https://api.xxx.com/v1/task/submit

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选      | 类型         | 说明                   |
| ----------- | ------- | ---------- | -------------------- |
| `UserToken` | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true`  | `ObjectId` | 当前任务编号               |
| `StepId`    | `false` | `ObjectId` | 下个执行的步骤编号            |

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

## 任务-获取任务可回退的步骤

`task/back_steps`

> **URL**

https://api.xxx.com/v1/task/back_steps

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                   |
| ----------- | ------ | ---------- | -------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true` | `ObjectId` | 当前任务编号               |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": [{
        "StepId": "ObjectId", //步骤编号
        "StepName": "string" //步骤名称
    }, {
        "...": ""
    }]
}
```

> **注意事项**

暂无

## 任务-回退任务

`task/back`

> **URL**

https://api.xxx.com/v1/task/back

> **API级别**

4

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数           | 必选     | 类型         | 说明                   |
| ------------ | ------ | ---------- | -------------------- |
| `UserToken`  | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`         | `true` | `ObjectId` | 当前任务编号               |
| `BackStepId` | `true` | `ObjectId` | 回退的步骤编号              |

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





