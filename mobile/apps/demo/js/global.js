//处理请求参数
function HandleParams(data) {
    var params = "";
    for (var key in data) {
        params = parparamsamUrl + key + "=" + data[key] + "&";
    }
    return params;
}