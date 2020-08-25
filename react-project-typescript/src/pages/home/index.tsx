import React, { Component } from 'react';
import { Button, message } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { Redirect } from 'react-router-dom';

import './style.css';

interface isLogin {
    isLogin: boolean;
    loaded: boolean;
}

export default class Home extends Component {
    state = {
        isLogin: true,
        loaded: false,
    };

    componentDidMount() {
        axios.get('/api/isLogin').then(
            (res: AxiosResponse) => {
                let { data } = res;
                console.log('home', data);
                if (!data.data) {
                    this.setState({
                        isLogin: false,
                        loaded: true,
                    });
                } else {
                    this.setState({
                        loaded: true,
                    });
                }
            },
            err => {}
        );
    }

    handleGetData = () => {
        axios.get('/api/getData').then(
            (res: AxiosResponse) => {
                let { data } = res;
                console.log('home', res);
                if (data.data) {
                    message.success('成功获取数据');
                } else {
                    message.error('获取数据失败');
                }
            },
            err => {}
        );
    };

    handleLogout = (e: React.MouseEvent) => {
        axios.get('/api/logout').then(
            (res: AxiosResponse) => {
                let { data } = res;
                console.log('home', res);
                if (data.data) {
                    this.setState({
                        isLogin: false,
                    });
                } else {
                    message.error('退出失败');
                }
            },
            err => {}
        );
    };

    render() {
        const { isLogin, loaded } = this.state;
        console.log('home', isLogin);
        if (isLogin) {
            if (loaded) {
                return (
                    <div className="home-page">
                        <Button type="primary" onClick={this.handleGetData}>
                            爬取数据
                        </Button>
                        <Button type="primary">展示数据</Button>
                        <Button type="primary" onClick={this.handleLogout}>
                            退出
                        </Button>
                    </div>
                );
            }
            return null;
        } else {
            return <Redirect to="/login" />;
        }
    }
}
