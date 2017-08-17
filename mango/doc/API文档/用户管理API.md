# 用户管理API 

[TOC]

## 用户注册

`user/register`

>**URL**

https://api.xxx.com/v1/user/register

> **API级别**

5

>**HTTP请求方式**

`POST`

>**请求参数：**

| 参数            | 必选      | 类型       | 说明                              |
| ------------- | ------- | -------- | ------------------------------- |
| `AppKey`      | `true`  | `string` | 应用的开发密钥                         |
| `Password`    | `true`  | `string` | 用户密码                            |
| `VerifyCode`  | `true`  | `string` | 手机（或邮箱）验证码                      |
| `Email`       | `false` | `string` | 注册邮箱（手机号二选一，必填）                 |
| `PhoneNumber` | `false` | `string` | 注册手机号（邮箱二选一，必填）                 |
| `RealName`    | `false` | `string` | 真实姓名                            |
| `InviteCode`  | `false` | `string` | 邀请码（包含了邀请人Id，邀请加入的项目Id，有效期这些信息） |
| `Industry`    | `false` | `string` | 单位类型                            |
| `CompanyName` | `false` | `string` | 公司名称                            |
| `JobPosition` | `false` | `string` | 个人职务                            |

>**返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": {
        "_id": "ObjectId", //用户Id
        "Email": "string", //用户邮箱
        "PhoneNumber": "string", //用户手机号
        "RealName": "string" //用户真实姓名
    }
}
```

>**注意事项**

邮箱和手机号都可以作为用户名登录，因此这两个字段必须要填一个。

## 判断用户是否存在

`user/exist`

> **URL**

https://api.xxx.com/v1/user/exist

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数         | 必选     | 类型       | 说明            |
| ---------- | ------ | -------- | ------------- |
| `AppKey`   | `true` | `string` | 应用的开发密钥       |
| `UserName` | `true` | `string` | 用户名，可以是邮箱或手机号 |

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": true //用户是否存在
}
```

> **注意事项**

用户名可以是邮箱或手机号。

## 忘记密码
`user/forgot_password`

>**URL**

https://api.xxx.com/v1/user/forgot_password

> **API级别**

5

>**HTTP请求方式**

`POST`

>**请求参数：**

| 参数            | 必选      | 类型       | 说明             |
| ------------- | ------- | -------- | -------------- |
| `AppKey`      | `true`  | `string` | 应用的开发密钥        |
| `Email`       | `false` | `string` | 用户邮箱（用户手机号二选一） |
| `PhoneNumber` | `false` | `string` | 用户手机号（用户邮箱二选一） |

>**返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": "string" //验证码
}
```

>**注意事项**

忘记密码后，可以通过邮箱及手机号找回，因此手机号及邮箱二者必填一个。

## 重置密码
`user/reset_password`

>**URL**

https://api.xxx.com/v1/user/reset_password

> **API级别**

5

>**HTTP请求方式**

`POST`

>**请求参数：**

| 参数         | 必选     | 类型       | 说明                |
| ---------- | ------ | -------- | ----------------- |
| `ResetKey` | `true` | `string` | 重置密码的密钥，通过邮件或手机发送 |
| `Password` | `true` | `string` | 新密码               |

>**返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": null //返回的数据
}
```

>**注意事项**

可以通过邮箱或手机号找回。

## 注册时获取验证码（邮箱及手机号二选一必填）

`user/register/verify_code`

> **URL**

https://api.xxx.com/v1/user/register/verify_code

> **API级别**

5

> **HTTP请求方式**

`Get`

> **请求参数：**

| 参数         | 必选     | 类型       | 说明         |
| ---------- | ------ | -------- | ---------- |
| `AppKey`   | `true` | `string` | 应用的开发密钥    |
| `UserName` | `true` | `string` | 用户名（邮箱或手机） |

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": "string" //返回的验证码
}
```

> **注意事项**

用于新用户注册时发送验证码。

## 获取验证码

`user/verify_code/send`

> **URL**

https://api.xxx.com/v1/user/verify_code/send

> **API级别**

5

> **HTTP请求方式**

`Get`

> **请求参数：**

| 参数            | 必选      | 类型       | 说明                   |
| ------------- | ------- | -------- | -------------------- |
| `AppKey`      | `true`  | `string` | 应用的开发密钥              |
| `UserToken`   | `true`  | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Email`       | `false` | `string` | 用户邮箱（用户手机号二选一）       |
| `PhoneNumber` | `false` | `string` | 用户手机号（用户邮箱二选一）       |

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": "string" //返回的验证码
}
```

> **注意事项**

用于绑定手机或邮箱。需要给邮箱或手机号发送验证码，因此手机号及邮箱二者必填一个。

## 判断验证码是否有效

`user/verify_code/is_valid`

> **URL**

https://api.xxx.com/v1/user/verify_code/is_valid

> **API级别**

5

> **HTTP请求方式**

`Get`

> **请求参数：**

| 参数         | 必选      | 类型       | 说明                          |
| ---------- | ------- | -------- | --------------------------- |
| `ResetKey` | `true`  | `string` | 手机或邮箱验证码                    |
| `Type`     | `false` | `int`    | 默认3为绑定邮箱(或手机)，2为重置密码，1为用户注册 |

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

绑定手机或邮箱时，系统会给指定的邮箱及手机号发送验证码。

## 更新用户资料

`user/update`

>**URL**

https://api.xxx.com/v1/user/update

> **API级别**

5

>**HTTP请求方式**

`POST`

>**请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Data`      | `true` | `json`   | 用户信息                 |

`Data`的格式为：

```json
{
    "_id": "ObjectId", //用户Id，*必填
    "...": "" //需要更新的数据
}
```

>**返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": {
        "_id": "ObjectId", //用户Id
        "Email": "string", //用户邮箱
        "PhoneNumber": "string", //用户手机号
        "RealName": "string", //用户真实姓名
        "...": "" //修改后的用户属性
    }
}
```

>**注意事项**

无

## 获取用户头像

`user/avatar`

> **URL**

https://api.xxx.com/v1/user/avatar

> **API级别**

5

> **HTTP请求方式**

`Get`

> **请求参数：**

| 参数         | 必选     | 类型       | 说明      |
| ---------- | ------ | -------- | ------- |
| `AppKey`   | `true` | `string` | 应用的开发密钥 |
| `UserName` | `true` | `string` | 用户名     |

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": "URL" //返回的头像链接
}
```

> **注意事项**

用户名为手机号或者邮箱，二者必填一个。

## 更新用户头像

`user/update_avatar`

> **URL**

https://api.xxx.com/v1/user/update_avatar

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选     | 类型                    | 说明                   |
| ----------- | ------ | --------------------- | -------------------- |
| `UserToken` | `true` | `string`              | 用户令牌（包含用户Id及访问权限等信息） |
| `File`      | `true` | `multipart/form-data` | 用户头像文件数据             |

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": "string"//头像url
}
```

> **注意事项**

用户头像文件只能传一个。

## 用户绑定邮箱或者手机号

`user/update_email_phone`

> **URL**

https://api.xxx.com/v1/user/update_email_phone

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数            | 必选      | 类型       | 说明                   |
| ------------- | ------- | -------- | -------------------- |
| `UserToken`   | `true`  | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Email`       | `false` | `string` | 用户邮箱（用户手机号二选一）       |
| `PhoneNumber` | `false` | `string` | 用户手机号（用户邮箱二选一）       |

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": true//绑定是否成功
}
```

> **注意事项**

绑定手机或邮箱时，必须要传一个。

## 获取用户信息（映射）

`user/info`

>**URL**

https://api.xxx.com/v1/user/info

> **API级别**

5

>**HTTP请求方式**

`GET`

>**请求参数：**

| 参数          | 必选      | 类型       | 说明                   |
| ----------- | ------- | -------- | -------------------- |
| `UserToken` | `true`  | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `Id`        | `true`  | `string` | 用户Id                 |
| `Map`       | `false` | `json`   | 返回的属性的映射数组           |

`Map`格式为：

```json
["PropertyName1", "..."]  //返回的属性映射数组，默认为空数组，表示返回所有属性
```

>**返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": {
        "_id": "ObjectId", //Id
        "Email": "xxx@qq.com", //邮箱，可作为用户名登录
        "PhoneNumber": "(86)136xxxxxxxx", //手机号，可作为用户名登录
        "RealName": "张三", //用户姓名
        "Avatar": "https://api.xxx.com/v1/file/data?id=fsg20895noijsldgsg145", //用户头像链接
        "Industry": "开发商", //行业类型
    	"CompanyName": "深圳筑星科技", //公司名称
    	"JobPosition": "实施", //工作职位
        "Sex": 0, //性别：0-未透露；1-男性；2-女性
        "Birthdate": "/Date/", //出生日期
        "Location": "广东 深圳", //所在地
        "QQ": "2256xxxxxx", //qq号
        "Projects": ["ObjectId", "..."], //用户参与的项目列表
        "Setting": { //用户偏好设置
            "Notice": {
                "SortType": 0, //通知默认排序：0-时间优先；1-未读优先
                "...": "" //todo:其它设置
            },
            "...": "" //todo:其它项设置
        },
        "RegisterDate": "/Date/", //用户注册时间
        "LoginInfo": [{ //最近登录信息
            "DateTime": "/Date/", //最近登录时间
            "IP": "xxx.xxx.xx.xxx", //最近登录的地址
            "Address": "广东省深圳市 电信", //最近登录地址
            "SystemType": "WEB", //最近登录的系统类型：WEB、PC、IOS、ANDROID
            "DeviceName": "dell-pc", //最近登录设备名称
            "DeviceId": "string" //最近登录的设备Id
        }, {
            "...": ""
        }]
    }
}
```

>**注意事项**

根据用户的属性名返回属性值，如果用户不存在该属性，则返回的结果不包含该属性；如果不指定属性名称，则返回用户的全部信息。

`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。

## 获取用户信息列表（筛选、分页、排序、映射）

`user/list`

> **URL**

https://api.xxx.com/v1/user/list

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

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

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": [{
        "_id": "ObjectId", //Id
        "Email": "xxx@qq.com", //邮箱，可作为用户名登录
        "PhoneNumber": "(86)136xxxxxxxx", //手机号，可作为用户名登录
        "RealName": "张三", //用户姓名
        "Avatar": "https://api.xxx.com/v1/file/data?id=fsg20895noijsldgsg145", //用户头像链接
        "Industry": "开发商", //行业类型
    	"CompanyName": "深圳筑星科技", //公司名称
    	"JobPosition": "实施", //工作职位
        "Sex": 0, //性别：0-未透露；1-男性；2-女性
        "Birthdate": "/Date/", //出生日期
        "Location": "广东 深圳", //所在地
        "QQ": "2256xxxxxx", //qq号
        "Projects": ["ObjectId", "..."], //用户参与的项目列表
        "Setting": { //用户偏好设置
            "Notice": {
                "SortType": 0, //通知默认排序：0-时间优先；1-未读优先
                "...": "" //todo:其它设置
            },
            "...": "" //todo:其它项设置
        },
        "RegisterDate": "/Date/", //用户注册时间
        "LoginInfo": [{ //最近登录信息
            "DateTime": "/Date(/", //最近登录时间
            "IP": "xxx.xxx.xx.xxx", //最近登录的地址
            "Address": "广东省深圳市 电信", //最近登录地址
            "SystemType": "WEB", //最近登录的系统类型：WEB、PC、IOS、ANDROID
            "DeviceName": "dell-pc", //最近登录设备名称
            "DeviceId": "string" //最近登录的设备Id
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

## 用户登录

`user/login`

>**URL**

https://api.xxx.com/v1/user/login

> **API级别**

5

>**HTTP请求方式**

`GET`

>**请求参数：**

| 参数         | 必选     | 类型       | 说明                |
| ---------- | ------ | -------- | ----------------- |
| `AppKey`   | `true` | `string` | 开放平台的开发密钥         |
| `UserName` | `true` | `string` | 用户名，可以是邮箱，也可以是手机号 |
| `Password` | `true` | `string` | 密码                |

>**返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": {
        "_id": "ObjectId", //用户Id
        "Email": "string", //用户邮箱
        "PhoneNumber": "string", //用户手机号
        "RealName": "string", //用户真实姓名
        "Avatar": "url", //用户头像
        "TokenKey": "token_key", //根据该TokenKey可以得到UserToken
      	"UserType": 1 //用户类型：0：普通用户、1：内测用户、2：内部用户、10：高级用户、100：企业用户
    }
}
```

>**注意事项**

无

## 获取应用的UserToken

`user/token`

> **URL**

https://api.xxx.com/v1/user/token

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数         | 必选     | 类型       | 说明            |
| ---------- | ------ | -------- | ------------- |
| `AppKey`   | `true` | `string` | 应用的开发密钥       |
| `TokenKey` | `true` | `string` | 用户登录成功后能获取到该值 |

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,
    "Message": "string",//返回信息
    "Data": {
        "UserToken": "string" //UserToken
    }
}
```

> **注意事项**

无

## 获取用户购买的应用列表

`user/apps`

> **URL**

https://api.xxx.com/v1/user/apps

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选      | 类型         | 说明                                       |
| ----------- | ------- | ---------- | ---------------------------------------- |
| `UserToken` | `true`  | `string`   | 用户令牌（包含用户Id及访问权限等信息）                     |
| `Platform`  | `false` | `int`      | 默认获取所有，平台类型：`2-Web;4-PC;8-iOS;16-Android` |
| `OwnerId`   | `false` | `ObjectId` | 查询指定用户购买的应用，为空时查询当前登录用户购买的应用             |

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": [{
      	"AppKey": "GUID", //应用Guid标识
        "Name": "string", //应用名称
        "Icon":"string"//应用图标url
      	"AppType":1, //应用类型
        "Info": [{ //购买信息
            "Platform": 2, //应用所属平台：2-Web;4-PC;8-iOS;16-Android
            "Version": "string"
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

## 修改用户当前使用的应用的版本号

`set_app_version`

> **URL**

https://api.xxx.com/v1/user/set_app_version

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数          | 必选      | 类型         | 说明                               |
| ----------- | ------- | ---------- | -------------------------------- |
| `UserToken` | `false` | `string`   | 用户令牌（包含用户Id及访问权限等信息）             |
| `AppId`     | `true`  | `ObjectId` | 应用Id                             |
| `Platform`  | `true`  | `int`      | 产品所属平台                           |
| `Version`   | `true`  | `string`   | 产品的版本号，格式为：x.x.x.x，x取值范围[0-9999] |

> **返回结果**

```json
{
    "IsOk": true, //是否成功
    "Code": 200, //返回码
    "Message": "string", //返回的信息
    "Data": {} //
}
```

> **注意事项**

无

## 获取用户在指定项目上具有权限的应用列表

`user/project_apps`

> **URL**

https://api.xxx.com/v1/user/project_apps

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选     | 类型         | 说明                                 |
| ----------- | ------ | ---------- | ---------------------------------- |
| `UserToken` | `true` | `string`   | 用户令牌（包含用户Id及访问权限等信息）               |
| `ProjectId` | `true` | `ObjectId` | 项目`Id`                             |
| `Platform`  | `true` | `int`      | 平台类型：`2-Web;4-PC;8-iOS;16-Android` |

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": [{
        "AppKey": "GUID", //应用Guid标识
        "Name": "string", //应用名称
        "Version": "string" //当前版本号
    }, {
        "...": ""
    }]
}
```

> **注意事项**

无

## 获取用户设置

`user/setting`

> **URL**

https://api.xxx.com/v1/user/setting

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数          | 必选     | 类型       | 说明                   |
| ----------- | ------ | -------- | -------------------- |
| `UserToken` | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data": {
        "Setting": { //用户偏好设置
        		"Notice": {
           			"SortType": 0, //通知默认排序：0-时间优先；1-未读优先
            		"...": "" //todo:其它设置
        		},
        "...": "" //todo:其它项设置
   		 }
    }
}
```

> **注意事项**

无

## 判断用户新旧密码是否一致

`user/issame_password`

> **URL**

https://api.xxx.com/v1/user/issame_password

> **API级别**

5

> **HTTP请求方式**

`GET`

> **请求参数：**

| 参数            | 必选     | 类型       | 说明                   |
| ------------- | ------ | -------- | -------------------- |
| `UserToken`   | `true` | `string` | 用户令牌（包含用户Id及访问权限等信息） |
| `NewPassword` | `true` | `string` | 用户新填写的密码             |

> **返回结果**

```json
"IsOk": true,//是否成功
"Code": 200,//返回码
"Message": "string",//返回信息
"Data": true //新旧密码是否一样
}
```



> **注意事项**

返回结果是true说明新旧密码相同，false说明新旧密码不同。

## 添加用户反馈信息

`user/feedback/add`

> **URL**

https://api.xxx.com/v1/user/feedback/add

> **API级别**

5

> **HTTP请求方式**

`POST`

> **请求参数：**

| 参数            | 必选           | 类型                    | 说明                   |
| ------------- | ------------ | --------------------- | -------------------- |
| `UserToken`   | `true`       | `string`              | 用户令牌（包含用户Id及访问权限等信息） |
| `Description` | `true`       | `string`              | 描述                   |
| `ContactWay`  | `ContactWay` | `string`              | 联系方式                 |
| `Files`       | `false`      | `multipart/form-data` | 文件数据                 |

> **返回结果**

```json
{
    "IsOk": true,//是否成功
    "Code": 200,//返回码
    "Message": "string",//返回信息
    "Data":{
        "_id": "ObjectId", 
      	"UserId":"ObjectId", //用户Id
        "Description": "string", //描述
        "ContactWay": "string", //联系方式
        "CreateTime": "string", //创建日期
        "State": 0, //状态
        "FileIds": ["ObjectId",...] //文件id集合
    }
}
```

> **注意事项**

无

## 获取用户反馈信息列表（筛选、分页、排序、映射）

`user/feedback/list`

> **URL**

https://api.xxx.com/v1/user/feedback/list

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

> **返回结果**

```json
  {
      "IsOk": true, //是否成功
      "Code": 200, //返回码
      "Message": "string", //返回的信息
      "Data": [{
          	"_id": "ObjectId", 
      		"UserId":"ObjectId", //用户Id
       	 	"Description": "string", //描述
        	"ContactWay": "string", //联系方式
        	"CreateTime": "string", //创建日期
        	"State": 0, //状态
        	"FileIds": ["ObjectId",...] //文件id集合
      }, {
          "...": ""
      }]
  }
```

> **注意事项**

如果`PageIndex`和`PageCount`都为0，则表示不分页；如果搜索表达式为空，则表示不搜索；`Map`表示需要结果中需要返回的属性，表达式为`["PropertyName1","PropertyName2"]`表示只包含`PropertyName1`和`PropertyName2`的属性，或者 `["^PropertyName1","^PropertyName2"]`表示不包含`PropertyName1`和`PropertyName2`的所有属性。`Sort`表示按指定的属性升序或降序排列。

