/**
 * 自定义的类型文件，用来扩展Express原本的类型定义
 * 定义方式要与Express的类型定义文件相同
 */
declare namespace Express {
    interface Request {
        teacherName: string;
    }
}
