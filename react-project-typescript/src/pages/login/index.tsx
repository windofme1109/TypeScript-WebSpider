import React, { Component, FC } from 'react';
import { Button, Form, Input, message } from 'antd';
import { Redirect } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

import instance from '../../request';
import './style.css';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

interface Values {
    password: string;
}

class Login extends Component {
    state = {
        login: false,
    };

    /**
     *
     * @param values
     */
    onFinish = (values: Values) => {
        // console.log('Success:', values);
        const { password } = values;
        instance.post('/api/login', { password }).then((res: AxiosResponse) => {
            let data: ResponseResult.login = res.data;
            console.log('login', data);
            if (data) {
                this.setState({
                    login: true,
                });
            } else {
                message.error('登录失败');
            }
        });
    };

    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    render() {
        const { login } = this.state;

        if (login) {
            console.log('isLogin login', login);
            // 登录成功，重定向到主页
            return <Redirect to="/" />;
        }
        return (
            <div className="login-page">
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Login;
