import React, { useState, useEffect } from 'react';
import './style.css'
import { Card, Input, Icon, Button, Spin, message, Form, Row, Col } from 'antd';
import Promptbox from '../component/PromptBox/index'
import 'antd/dist/antd.css';
import '../static/css/Login.css';
import servicePath from '../config/apiUrl'
import axios from 'axios'



function Login(props) {
    // state
    const [isLoading, setIsLoading] = useState(false)
    const [state, setState] = useState({
        focusItem: -1,   //当前焦点聚焦在哪一项上
        code: ''  //验证码
    })
    const { getFieldDecorator, getFieldError } = props.form
    const canvasRef = React.useRef(null)
    // useEffect
    useEffect(() => {
        _createCode()
    }, [])

    // function
    const checkLogin = (values) => {
        const { password, username, captcha } = values
        // 表单登录时，若验证码长度小于4则不会验证，所以我们这里要手动验证一次
        if (state.code.toUpperCase() !== captcha.toUpperCase()) {
            props.form.setFields({
                captcha: {
                    value: captcha,
                    errors: [new Error('验证码错误')]
                }
            })
            return
        }
        setIsLoading(true)
        if (!username) {
            message.error('用户名不能为空')
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
            return false
        } else if (!password) {
            message.error('密码不能为空')
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
            return false
        }
        let dataProps = {
            'userName': username,
            'password': password
        }
        axios({
            method: 'post',
            url: servicePath.checkLogin,
            data: dataProps,
            withCredentials: true
        }).then(
            res => {
                setIsLoading(false)
                if (res.data.data === '登录成功') {
                    window.localStorage.setItem('openId', res.data.openId)
                    props.history.push('/Article')
                } else {
                    message.error('用户名密码错误')
                }
            }
        )

        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }

    /**
    * 转换面板为注册面板
    */
    const goRegister = () => {
        props.form.resetFields()
        props.toggleShow()
        console.log(' props.toggleShow() :>> ', props.toggleShow());
        _createCode()
    }
    const onSubmit = () => {
        props.form.validateFields((errors, values) => {
            if (!errors) {
                checkLogin(values)
            }
        });
    }
    /**
     * 生成验证码
     */
    const _createCode = () => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const chars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        let code = ''
        ctx.clearRect(0, 0, 80, 40)
        for (let i = 0; i < 4; i++) {
            const char = chars[randomNum(0, 57)]
            code += char
            ctx.font = randomNum(20, 25) + 'px SimHei'  //设置字体随机大小
            ctx.fillStyle = '#D3D7F7'
            ctx.textBaseline = 'middle'
            ctx.shadowOffsetX = randomNum(-3, 3)
            ctx.shadowOffsetY = randomNum(-3, 3)
            ctx.shadowBlur = randomNum(-3, 3)
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
            let x = 80 / 5 * (i + 1)
            let y = 40 / 2
            let deg = randomNum(-25, 25)
            /**设置旋转角度和坐标原点**/
            ctx.translate(x, y)
            ctx.rotate(deg * Math.PI / 180)
            ctx.fillText(char, 0, 0)
            /**恢复旋转角度和坐标原点**/
            ctx.rotate(-deg * Math.PI / 180)
            ctx.translate(-x, -y)
        }
        setState({
            ...state,
            code
        })
    }
    // 验证码
    const changeCaptcha = () => {
        props.form.resetFields(['captcha'])
        _createCode()
    }
    // 随机数
    const randomNum = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }



    return (
        <div>
            <h3 className="title">管理员登录</h3>
            <Form hideRequiredMark>
                <Form.Item
                    help={<Promptbox info={getFieldError('username') && getFieldError('username')[0]} />}
                    style={{ marginBottom: 10 }}
                    wrapperCol={{ span: 20, pull: state.focusItem === 0 ? 1 : 0 }}
                    labelCol={{ span: 3, pull: state.focusItem === 0 ? 1 : 0 }}
                    label={<span className='iconfont icon-User' style={{ opacity: state.focusItem === 0 ? 1 : 0.6 }} />}
                    colon={false}>
                    {getFieldDecorator('username', {
                        validateFirst: true,
                        rules: [
                            { required: true, message: '请输入用户名' },
                            { pattern: /^[^\s']+$/, message: '不能输入特殊字符' },
                        ]
                    })(
                        <Input
                            className="myInput"
                            onFocus={() => setState({ ...state, focusItem: 0 })}
                            onBlur={() => setState({ ...state, focusItem: -1 })}
                            onPressEnter={onSubmit}
                            placeholder="用户名"
                        />
                    )}
                </Form.Item>
                <Form.Item
                    help={<Promptbox info={getFieldError('password') && getFieldError('password')[0]} />}
                    style={{ marginBottom: 10 }}
                    wrapperCol={{ span: 20, pull: state.focusItem === 1 ? 1 : 0 }}
                    labelCol={{ span: 3, pull: state.focusItem === 1 ? 1 : 0 }}
                    label={<span className='iconfont icon-suo1' style={{ opacity: state.focusItem === 1 ? 1 : 0.6 }} />}
                    colon={false}>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }]
                    })(
                        <Input
                            className="myInput"
                            type="password"
                            onFocus={() => setState({ ...state, focusItem: 1 })}
                            onBlur={() => setState({ ...state, focusItem: -1 })}
                            onPressEnter={onSubmit}
                            placeholder="密码"
                        />
                    )}
                </Form.Item>
                <Form.Item
                    help={<Promptbox info={getFieldError('captcha') && getFieldError('captcha')[0]} />}
                    style={{ marginBottom: 20 }}
                    wrapperCol={{ span: 20, pull: state.focusItem === 2 ? 1 : 0 }}
                    labelCol={{ span: 3, pull: state.focusItem === 2 ? 1 : 0 }}
                    label={<span className='iconfont icon-securityCode-b' style={{ opacity: state.focusItem === 2 ? 1 : 0.6 }} />}
                    colon={false}>
                    <Row gutter={8}>
                        <Col span={15}>
                            {getFieldDecorator('captcha', {
                                validateFirst: true,
                                rules: [
                                    { required: true, message: '请输入验证码' },
                                    {
                                        validator: (rule, value, callback) => {
                                            if (value.length >= 4 && state.code.toUpperCase() !== value.toUpperCase()) {
                                                callback('验证码错误')
                                            }
                                            callback()
                                        }
                                    }
                                ]
                            })(
                                <Input
                                    className="myInput"
                                    onFocus={() => setState({ ...state, focusItem: 2 })}
                                    onBlur={() => setState({ ...state, focusItem: -1 })}
                                    onPressEnter={onSubmit}
                                    placeholder="验证码"
                                />
                            )}
                        </Col>
                        <Col span={9}>
                            <canvas onClick={changeCaptcha} width="80" height='40' ref={canvasRef} />
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item>
                    <div className="btn-box">
                        <div className="loginBtn" onClick={onSubmit}>登录</div>
                        <div className="registerBtn" onClick={goRegister}>注册</div>
                    </div>
                </Form.Item>
            </Form>
            <div className="footer">欢迎登陆后台管理系统</div>
        </div>
    )
}


export default Form.create()(Login)
