/**
 * 定义接口返回数据的格式
 */
interface Result<T> {
    success: boolean;
    errMsg?: string;
    data: T;
}

/**
 * 返回json格式的数据
 * @param data
 * @param errMsg 可选参数
 */
export const getResponseData = <T>(data: T, errMsg?: string): Result<T> => {
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
