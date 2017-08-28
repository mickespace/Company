//***************************************************************************************************
//mgThis
//***************************************************************************************************
var mgThis = function () {};
//宿主加载后，会设置该属性
mgThis.AppInfo = null;
mgThis.GetResPath = function (name) {
    return mgThis.AppInfo.RootDirectory + '/' + name;
};

//***************************************************************************************************
//mgLog
//***************************************************************************************************
var mgLog = function () {};
mgLog.Debug = function (msg, e) {
    try {
        Native("mgLog.Debug", {
            message: msg,
            exception: e
        });
    } catch (ex) {
        console.log(ex);
    }
};
mgLog.Info = function (msg, e) {
    try {
        Native("mgLog.Info", {
            message: msg,
            exception: e
        });
    } catch (ex) {
        console.log(ex);
    }
};
mgLog.Warn = function (msg, e) {
    try {
        Native("mgLog.Warn", {
            message: msg,
            exception: e
        });
    } catch (ex) {
        console.log(ex);
    }
};
mgLog.Error = function (msg, e) {
    try {
        Native("mgLog.Error", {
            message: msg,
            exception: e
        });
    } catch (ex) {
        console.log(ex);
    }
};
mgLog.Fatal = function (msg, e) {
    try {
        Native("mgLog.Fatal", {
            message: msg,
            exception: e
        });
    } catch (ex) {
        console.log(ex);
    }
};
mgLog.SafeDo = function (action) {
    try {
        action();
    } catch (ex) {
        mgLog.Error("JS错误", ex);
    }
};

//***************************************************************************************************
//mgConfig
//***************************************************************************************************
var mgConfig = function () {};
/*
获取当前平台类型，返回值可能为：Unknown, Server, Web, Pc, Ios, Android, Windows, WinPhone
calcallback: function(string platformType)
*/
mgConfig.GetPlatform = function (callback) {
    mgLog.SafeDo(function () {
        NativeFunc("mgConfig.Platform", null, callback);
    });
};
/*
获取当前应用程序名称
calcallback: function(string applicationName)
*/
mgConfig.GetApplicationName = function (callback) {
    mgLog.SafeDo(function () {
        NativeFunc("mgConfig.ApplicationName", null, callback);
    });
};
/*
获取当前应用程序版本号
calcallback: function(string applicationVersion)
*/
mgConfig.GetApplicationVersion = function (callback) {
    mgLog.SafeDo(function () {
        NativeFunc("mgConfig.ApplicationVersion", null, callback);
    });
};

//***************************************************************************************************
//mgContext
//***************************************************************************************************
var mgContext = function () {};
/*
获取当前登录的用户Id
callback: function(string id) { }
*/
mgContext.GetUserId = function (callback) {
    mgLog.SafeDo(function () {
        NativeFunc("mgContext.UserId", null, callback);
    });
};
/*
获取当前打开的项目Id
callback: function(string id) { }
*/
mgContext.GetProjectId = function (callback) {
    mgLog.SafeDo(function () {
        NativeFunc("mgContext.ProjectId", null, callback);
    });
};
/*
获取当前的连接状态，state有三种可能值：NotLogined，Connected，Offline
callback: function(string state) { }
*/
mgContext.GetConnectionState = function (callback) {
    mgLog.SafeDo(function () {
        NativeFunc("mgContext.ConnectionState", null, callback);
    });
};
/*
获取当前的打开的项目信息
map: string[], 需要返回的项目字段
callback: function(string state) { }
*/
mgContext.GetCurrentProject = function (map, callback) {
    mgLog.SafeDo(function () {
        NativeFunc("mgContext.GetCurrentProject", map, callback);
    });
};
/*
获取当前登录的用户信息
map: string[], 需要返回的用户字段
callback: function(string state) { }
*/
mgContext.GetCurrentUser = function (map, callback) {
    mgLog.SafeDo(function () {
        NativeFunc("mgContext.GetCurrentUser", map, callback);
    });
};

//***************************************************************************************************
//mgCache
//***************************************************************************************************
var mgCache = function () {};
/*
获取指定键的缓存值
key: string，键
callback: function(any)，回调
defaultValue: any，键不存在时返回的默认值
setDefault: bool, 如果键不存在，是否设置键的值为默认值
 */
mgCache.Get = function (key, callback, defaultValue, setDefault) {
    mgLog.SafeDo(function () {
        NativeFunc("mgCache.Get", {
            key: key,
            default: defaultValue || JSON.stringify(defaultValue),
            setDefault: setDefault
        }, function (s) {
            callback(JSON.parse(s));
        });
    });
};
/*
设置指定键的缓存值
key: string，键
value: any，缓存值
expiredSeconds: int，缓存有效的时间（s），默认为0，表示永久有效
callback: function(bool)，回调，返回是否设定成功
 */
mgCache.Set = function (key, value, expiredSeconds, callback) {
    mgLog.SafeDo(function () {
        NativeFunc("mgCache.Set", {
            key: key,
            value: JSON.stringify(value),
            expiredSeconds: expiredSeconds
        }, callback);
    });
};
/*
移除指定键及缓存
key: string，键
callback: function(bool)，回调，返回是否移除成功
 */
mgCache.Remove = function (key, callback) {
    mgLog.SafeDo(function () {
        NativeFunc("mgCache.Remove", key, callback);
    });
};
/*
指定键是否存在缓存值
key: string，键
callback: function(bool)，回调，返回指定键是否存在
 */
mgCache.Exists = function (key, callback) {
    mgLog.SafeDo(function () {
        NativeFunc("mgCache.Exist", key, callback);
    });
};

//***************************************************************************************************
//mgService
//***************************************************************************************************
var mgService = function () {};
/*
调用同步服务
serviceName：string，调用服务的名称，必填
param：any，调用服务的参数，可为null
callback：function(Result)，回调，返回调用服务后的结果
*/
mgService.Invoke = function (serviceName, param, callback) {
    mgLog.SafeDo(function () {
        NativeFunc("mgService.Invoke", {
            appKey: mgThis.AppInfo.Key,
            serviceName: serviceName,
            param: JSON.stringify(param),
        }, callback);
    });
};
/*
调用异步服务
serviceName：string，调用服务的名称，必填
param：any，调用服务的参数，可为null
callback：function(Result)，回调，返回调用服务后的结果
*/
mgService.InvokeAsync = function (serviceName, param, callback) {
    mgLog.SafeDo(function () {
        NativeFunc("mgService.InvokeAsync", {
            appKey: mgThis.AppInfo.Key,
            serviceName: serviceName,
            param: JSON.stringify(param),
        }, callback);
    });
};

//***************************************************************************************************
//mgSlot
//***************************************************************************************************
var mgSlot = function () {};
/*
插入插头
plug：json，必填字段：Name(string)，SlotName(string)，可选字段：Data(any)，Order(int)
callback: function(string)，回调，返回创建的插头Id
*/
mgSlot.PushPlug = function (plug, callback) {
    mgLog.SafeDo(function () {
        NativeFunc("mgSlot.PushPlug", {
            appKey: mgThis.AppInfo.Key,
            plug: plug,
        }, callback);
    });
};
/*
拔出插头
plugId：string，插头Id，插入插头的回调中会返回该值
*/
mgSlot.PullPlug = function (plugId) {
    mgLog.SafeDo(function () {
        Native("mgSlot.PullPlug", plugId);
    });
};

//***************************************************************************************************
//mgDialog
//***************************************************************************************************
var mgDialog = function () {};
/*
弹出提示框
header：string，标题
content：string，内容
*/
mgDialog.Alert = function (header, content) {
    mgLog.SafeDo(function () {
        Native("mgDialog.Alert", {
            header: header,
            content: content
        });
    });
};
/*
弹出提示框
header：string，标题
content：string，内容
callback: function(string)，回调，返回值为：Ok，Cancel
*/
mgDialog.ShowMessage = function (header, content, callback) {
    mgLog.SafeDo(function () {
        NativeFunc("mgDialog.ShowMessage", {
            header: header,
            content: content
        }, callback);
    });
};

/*
弹出模态对话框，仅PC端有效
settings = {
    Address: string, //网页地址，*必填
    Title: string, //对话框标题，默认为应用程序名称
    ShowInTaskBar: bool, //是否显示在任务栏，默认为false
    ShowCancelButton: bool, //是否显示取消按钮，默认为false
    ShowOkButton: bool, //是否显示确定按钮，默认为false
    ShowMinimizeButton: bool, //是否显示最小化按钮，默认为true
    ShowMaximizeButton: bool, //是否显示最大化按钮，默认为true
    ResizeMode: string, //调整窗口大小的模式，有效值：NoResize，CanMinimize，CanResize，CanResizeWithGrip，默认为NoResize
    Width: double, //窗口宽度，默认为自动调整宽度
    Height: double, //窗口高度，默认为自动调整高度
    OkText: string, //确定按钮的文字，默认为"确定"
    CancelText: string, //取消按钮的文字，默认为"取消"
    IsOkDefault: bool, //确定按钮是否是默认按钮，默认为true
    IsCancelDefault: bool, //取消按钮是否是默认按钮，默认为false
    SizeToContent: string //内容填充模式，有效值：Manual，Width，Height，WidthAndHeight，默认为Manual
}
callback：function(string)，回调，返回CloseResult，可能取值为：Cancel，Ok，Hidden
*/
mgDialog.ShowDialog = function (settings, callback) {
    mgLog.SafeDo(function () {
        NativeFunc("mgDialog.ShowDialog", settings, callback);
    });
};

/*
弹出窗体，仅PC端有效
settings = {
    Address: string, //网页地址，*必填
    Title: string, //对话框标题，默认为应用程序名称
    ShowInTaskBar: bool, //是否显示在任务栏，默认为false
    ShowCancelButton: bool, //是否显示取消按钮，默认为false
    ShowOkButton: bool, //是否显示确定按钮，默认为false
    ShowMinimizeButton: bool, //是否显示最小化按钮，默认为true
    ShowMaximizeButton: bool, //是否显示最大化按钮，默认为true
    ResizeMode: string, //调整窗口大小的模式，有效值：NoResize，CanMinimize，CanResize，CanResizeWithGrip，默认为NoResize
    Width: double, //窗口宽度，默认为自动调整宽度
    Height: double, //窗口高度，默认为自动调整高度
    OkText: string, //确定按钮的文字，默认为"确定"
    CancelText: string, //取消按钮的文字，默认为"取消"
    IsOkDefault: bool, //确定按钮是否是默认按钮，默认为true
    IsCancelDefault: bool, //取消按钮是否是默认按钮，默认为false
    SizeToContent: string //内容填充模式，有效值：Manual，Width，Height，WidthAndHeight，默认为Manual 
}
*/
mgDialog.ShowWindow = function (settings) {
    mgLog.SafeDo(function () {
        Native("mgDialog.ShowWindow", settings);
    });
};

//***************************************************************************************************
//mgStatus  仅PC端有效
//***************************************************************************************************
var mgStatus = function () {};
/*
设置状态栏状态信息
message: string，状态栏内容
progress：int，状态栏进度[0-100]，默认为0
showSeconds：int，
*/
mgStatus.SetStatusInfo = function (message, progress, showSeconds) {
    mgLog.SafeDo(function () {
        Native("mgStatus.SetStatusInfo", {
            message: message,
            progress: progress,
            showSeconds: showSeconds
        });
    });
};
/*
将状态栏设置为默认状态
*/
mgStatus.SetDefaultStatus = function () {
    mgLog.SafeDo(function () {
        Native("mgStatus.SetDefaultStatus", null);
    });
}
//***************************************************************************************************
//mgTip
//***************************************************************************************************
var mgTip = function () {};
/*
显示提示信息
message: string，提示内容
progress：int，进度[0-100]，默认为0
*/
mgTip.Show = function (message, progress) {
    mgLog.SafeDo(function () {
        Native("mgTip.Show", {
            message: message,
            progress: progress
        });
    });
};
/*
关闭提示信息
*/
mgTip.Close = function () {
    mgLog.SafeDo(function () {
        Native("mgTip.Close", null);
    });
};

//***************************************************************************************************
//mgWeb
//***************************************************************************************************
var mgWeb = function () {};
/*
添加服务器端消息处理函数
handlerKey: string, 处理函数的唯一标识符
message: string，消息名称
callback: function(any)，回调，返回的数据类型为
{
    MsgName: string, //消息名称
    Data: string //消息附加的数据
}
*/
mgWeb.AddWebMsgHandler = function (handlerKey, message, callback) {
    mgLog.SafeDo(function () {
        NativeFunc("mgWeb.AddWebMsgHandler", {
            _key: handlerKey,
            appKey: mgThis.AppInfo.Key,
            message: message
        }, callback);
    });
};
/*
移除服务器端消息处理函数
handlerKey: string, 处理函数的唯一标识符
message: string，消息名称
*/
mgWeb.RemoveWebMsgHandler = function (handlerKey, message) {
    mgLog.SafeDo(function () {
        Native("mgWeb.RemoveWebMsgHandler", {
            _key: handlerKey,
            appKey: mgThis.AppInfo.Key,
            message: message
        });
    });
};
/*
广播消息
message: string, 消息名称
content: any, 消息内容
boardcastType: string，广播类型，可选值：None, Self, ProjectGroup, ProjectGroupOther, Other, All，默认为Self
callback: function(Result)，回调，返回广播是否成功
*/
mgWeb.SendWebMsg = function (message, content, boardcastType, callback) {
    mgLog.SafeDo(function () {
        NativeFunc("mgWeb.SendWebMsg", {
            message: message,
            content: content,
            boardcastType: boardcastType
        }, callback);
    });
};
/*
获取url
apiPath: string，api地址
urlParam：any，url参数
callback: function(string), 回调
*/
mgWeb.GetUrl = function (apiPath, urlParam, callback) {
    mgLog.SafeDo(function () {
        NativeFunc("mgWeb.GetUrl", {
            apiPath: apiPath,
            urlParam: urlParam
        }, callback);
    });
};
/*
HTTP GET请求
settings = {
    apiPath: string, //api地址，*必填
    urlParam: any, //url参数
    showProgress: bool //是否显示进度信息
}
callback: function(Result), 回调，返回结果
*/
mgWeb.GetResult = function (settings, callback) {
    mgLog.SafeDo(function () {
        settings.appKey = mgThis.AppInfo.Key;
        NativeFunc("mgWeb.GetResult", settings, callback);
    });
};
/*
HTTP POST请求
settings = {
    apiPath: string, //api地址，*必填
    urlParam: any, //url参数
    files: string[], //待上传的文件路径集合
    showProgress: bool //是否显示进度信息
}
callback: function(Result), 回调，返回结果
*/
mgWeb.Post = function (settings, callback) {
    mgLog.SafeDo(function () {
        settings.appKey = mgThis.AppInfo.Key;
        NativeFunc("mgWeb.Post", settings, callback);
    });
};

//***************************************************************************************************
//mgNavi
//***************************************************************************************************
var mgNavi = function () {};
/*
导航到指定页面
address: string，内部地址或网址，*必填
titie: string，标题，可选
data: any，其它需要传递的数据，可选
*/
mgNavi.Go = function (address, title, data) {
    mgLog.SafeDo(function () {
        Native("mgNavi.Go", {
            appKey: mgThis.AppInfo.Key,
            address: address,
            title: title,
            data: data
        });
    });
};
/*
后退
data: any，需要传递的数据，可选
*/
mgNavi.GoBack = function (data) {
    mgLog.SafeDo(function () {
        Native("mgNavi.GoBack", data);
    });
};
/*
获取上一个页面传递过来的参数
callback: function(any), 回调，返回data
*/
mgNavi.GetData = function (callback) {
    mgLog.SafeDo(function () {
        NativeFunc("mgNavi.GetData", null, callback)
    });
};

//***************************************************************************************************
//mgPage
//***************************************************************************************************
var mgPage = function () {};
//页面加载后，宿主会设置该属性
mgPage.Key = '';
//页面加载后，宿主会调用该函数
mgPage.OnLoaded = function (data) {};
//页面出现后，宿主会调用该函数
mgPage.OnAppearing = function (data) {};
//页面消失后，宿主会调用该函数
mgPage.OnDisappearing = function (data) {};
//设置title
mgPage.SetTitle = function (title) {
    mgLog.SafeDo(function () {
        Native("mgPage.SetTitle", {
            key: mgPage.Key,
            title: title
        });
    });
};