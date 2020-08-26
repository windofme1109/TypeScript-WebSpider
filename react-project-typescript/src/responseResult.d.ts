declare namespace ResponseResult {
    interface DataStructure {
        [key: number]: Array<CourseInfo>;
    }

    interface CourseInfo {
        title: string;
        count: number;
    }

    type isLogin = boolean;
    type login = boolean;
    type logout = boolean;
    type getData = boolean;
    type showData = DataStructure;
}
