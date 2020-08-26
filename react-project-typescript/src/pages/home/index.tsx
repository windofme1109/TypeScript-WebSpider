import React, { Component } from 'react';
import { Button, message } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { Redirect } from 'react-router-dom';

import ReactEcharts from 'echarts-for-react';
import moment from 'moment';

import instance from '../../request';
import './style.css';

interface State {
    isLogin: boolean;
    loaded: boolean;
    courseData: ResponseResult.DataStructure;
}

interface chartData {
    name: string;
    type: string;
    data: Array<number>;
}

interface TempData {
    [key: string]: Array<number>;
}

export default class Home extends Component {
    state: State = {
        isLogin: true,
        loaded: false,
        courseData: {},
    };

    getOption = () => {
        const { courseData } = this.state;

        const xAxisData: Array<string> = [];
        const legendData: Array<string> = [];
        let singleCourseInfo: Array<chartData> = [];
        const tempData: TempData = {};
        for (let i in courseData) {
            let item = courseData[i];

            // 获取时间戳，并将时间戳转换为正常的日期时间格式，使用moment这个模块
            xAxisData.push(moment(Number(i)).format('YYYY-MM-DD hh:mm:ss'));

            // 取出课程的标题，作为图例
            item.forEach((course, index) => {
                let { title, count } = course;
                if (legendData.indexOf(title) === -1) {
                    legendData.push(title);
                }
                tempData[title]
                    ? tempData[title].push(count)
                    : (tempData[title] = [count]);
            });
        }
        for (let title in tempData) {
            singleCourseInfo.push({
                name: title,
                type: 'line',
                data: tempData[title],
            });
        }
        // 获获取每个课程的用户数据
        const chartOptions = {
            title: {
                text: '课程实时学习人数',
            },
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                data: legendData,
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            toolbox: {
                feature: {
                    saveAsImage: {},
                },
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xAxisData,
            },
            yAxis: {
                type: 'value',
            },
            series: singleCourseInfo,
        };
        return chartOptions;
    };

    componentDidMount() {
        instance.get('/api/isLogin').then(
            res => {
                let data: ResponseResult.isLogin = res.data;
                console.log('home', data);
                if (!data) {
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

        instance.get('/api/showData').then(
            res => {
                let data: ResponseResult.DataStructure = res.data;
                if (data) {
                    console.log('course', data);

                    this.setState({
                        courseData: data,
                    });
                }
            },
            err => {}
        );
    }

    handleGetData = () => {
        instance.get('/api/getData').then(
            res => {
                let data: ResponseResult.getData = res.data;
                console.log('home', res);
                if (data) {
                    message.success('成功获取数据');
                } else {
                    message.error('获取数据失败');
                }
            },
            err => {}
        );
    };

    handleLogout = (e: React.MouseEvent) => {
        instance.get('/api/logout').then(
            res => {
                let data: ResponseResult.logout = res.data;
                console.log('home', res);
                if (data) {
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
                        <div className="user-action">
                            <Button type="primary" onClick={this.handleGetData}>
                                爬取数据
                            </Button>
                            <Button type="primary" onClick={this.handleLogout}>
                                退出
                            </Button>
                        </div>
                        <div className="charts">
                            <ReactEcharts option={this.getOption()} />
                        </div>
                    </div>
                );
            }
            return null;
        } else {
            return <Redirect to="/login" />;
        }
    }
}
