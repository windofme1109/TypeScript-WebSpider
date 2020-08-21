"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseData = void 0;
/**
 * 返回json格式的数据
 * @param data
 * @param errMsg 可选参数
 */
exports.getResponseData = function (data, errMsg) {
    if (errMsg) {
        return {
            success: false,
            errMsg: errMsg,
            data: data,
        };
    }
    return {
        success: true,
        data: data,
    };
};
