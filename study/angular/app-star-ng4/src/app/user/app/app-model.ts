/*
 * @Author: zsq 
 * @Date: 2017-06-20 18:06:56 
 * @Last Modified by: 
 * @Last Modified time: 2017-06-20 18:08:27
 * @Desc: 应用model
 */
export class App {
    AppKey: string; // 应用Guid标识
    AppType: number; // 应用类型 0：普通应用，1：基础应用
    Name: string; // 应用名称
    Icon: string; // 应用图标url
    Statue = true; // 自定义添加 应用状态（默认开启）
    // ...
}