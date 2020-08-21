/**
 * 定义接口返回数据的格式
 */
interface Result {
    success: boolean;
    errMsg?: string;
    data: any;
}

/**
 * 返回json格式的数据
 * @param data
 * @param errMsg 可选参数
 */
export const getResponseData = (data: any, errMsg?: string): Result => {
    if (errMsg) {
        return {
            success: false,
            errMsg,
            data,
        };
    }

    return {
        success: true,
        data,
    };
};
