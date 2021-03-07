import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash'
import { Form, Input, message } from 'antd'
import Promptbox from '../component/PromptBox/index'
import axios from 'axios'
import servicePath from '../config/apiUrl'



function Register(props) {

    const [state, setState] = useState({
        focusItem: -1,   //当前焦点聚焦在哪一项上
        loading: false   //注册的loding
    })
    /**
     * 返回登录面板
     */
    const backLogin = () => {
        props.form.resetFields()
        props.toggleShow()
    }
    const onSubmit = () => {
        props.form.validateFields((errors, values) => {
            if (!errors) {
                onRegister(values)
            }
        });
    }
    /**
     * 注册函数
     */
    const onRegister = async (values) => {
        //如果正在注册，则return，防止重复注册
        if (state.loading) {
            return
        }
        setState({
            ...state,
            loading: true
        })
        const hide = message.loading('注册中...', 0)
        //密码
        const Password = values.registerPassword
        const res = await axios.post(`${servicePath.register}`, {
            username: values.registerUsername,
            password: Password,
        })
        setState({
            loading: false
        })
        hide()
        if (res.status === 200) {
            console.log('res ', res)
            if (res.data.message === '用户名已存在') {
                message.error('用户名已存在')
            } else {
                message.success('注册成功')
                props.history.push('/')
            }
        }
    }

    /**
     * @description: 检查用户名是否重复，这里用了函数防抖（函数防抖的典型应用），防抖函数要注意this和事件对象
     * 也可以在input的失去焦点的时候验证，这时候不用函数防抖
     * @param {type} 事件对象
     * @return: 
     */
    const checkName = debounce(async (value) => {
        if (value) {
            const res = await axios(`${servicePath.checkName}${value}`)
            if (res.status === 200 && res.data.num) {
                props.form.setFields({
                    registerUsername: {
                        value,
                        errors: [new Error('用户名已存在')]
                    }
                })
            }
        }
    })

    const { getFieldDecorator, getFieldValue, getFieldError } = props.form
    const { focusItem } = state
    return (
        <div>
            <h3 className="title">管理员注册</h3>
            <Form hideRequiredMark>
                <Form.Item
                    help={<Promptbox info={getFieldError('registerUsername') && getFieldError('registerUsername')[0]} />}
                    style={{ marginBottom: 10 }}
                    wrapperCol={{ span: 20, pull: focusItem === 0 ? 1 : 0 }}
                    labelCol={{ span: 3, pull: focusItem === 0 ? 1 : 0 }}
                    label={<span className='iconfont icon-User' style={{ opacity: focusItem === 0 ? 1 : 0.6 }} />}
                    colon={false}>
                    {getFieldDecorator('registerUsername', {
                        validateFirst: true,
                        rules: [
                            { required: true, message: '用户名不能为空' },
                            { pattern: /^[^\s']+$/, message: '不能输入特殊字符' },
                            { min: 3, message: '用户名至少为3位' }
                        ]
                    })(
                        <Input
                            maxLength={16}
                            className="myInput"
                            autoComplete="new-password"  //禁用表单自动填充(不管用？)
                            onFocus={() => setState({ ...state, focusItem: 0 })}
                            onBlur={() => setState({ ...state, focusItem: -1 })}
                            onPressEnter={onSubmit}
                            onChange={(e) => checkName(e.target.value)}
                            placeholder="用户名"
                        />
                    )}
                </Form.Item>
                <Form.Item
                    help={<Promptbox info={getFieldError('registerPassword') && getFieldError('registerPassword')[0]} />}
                    style={{ marginBottom: 10 }}
                    wrapperCol={{ span: 20, pull: focusItem === 1 ? 1 : 0 }}
                    labelCol={{ span: 3, pull: focusItem === 1 ? 1 : 0 }}
                    label={<span className='iconfont icon-suo1' style={{ opacity: focusItem === 1 ? 1 : 0.6 }} />}
                    colon={false}>
                    {getFieldDecorator('registerPassword', {
                        validateFirst: true,
                        rules: [
                            { required: true, message: '密码不能为空' },
                            { pattern: '^[^ ]+$', message: '密码不能有空格' },
                            { min: 3, message: '密码至少为3位' },
                        ]

                    })(
                        <Input
                            maxLength={16}
                            className="myInput"
                            type="password"
                            onFocus={() => setState({ focusItem: 1 })}
                            onBlur={() => setState({ focusItem: -1 })}
                            onPressEnter={onSubmit}
                            placeholder="密码"
                        />
                    )}
                </Form.Item>
                <Form.Item
                    help={<Promptbox info={getFieldError('confirmPassword') && getFieldError('confirmPassword')[0]} />}
                    style={{ marginBottom: 35 }}
                    wrapperCol={{ span: 20, pull: focusItem === 2 ? 1 : 0 }}
                    labelCol={{ span: 3, pull: focusItem === 2 ? 1 : 0 }}
                    label={<span className='iconfont icon-suo1' style={{ opacity: focusItem === 2 ? 1 : 0.6 }} />}
                    colon={false}>
                    {getFieldDecorator('confirmPassword', {
                        rules: [
                            { required: true, message: '请确认密码' },
                            {
                                validator: (rule, value, callback) => {
                                    if (value && value !== getFieldValue('registerPassword')) {
                                        callback('两次输入不一致！')
                                    }
                                    callback()
                                }
                            },
                        ]
                    })(
                        <Input
                            className="myInput"
                            type="password"
                            onFocus={() => setState({ ...state, focusItem: 2 })}
                            onBlur={() => setState({ ...state, focusItem: -1 })}
                            onPressEnter={onSubmit}
                            placeholder="确认密码"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    <div className="btn-box">
                        <div className="loginBtn" onClick={onSubmit}>注册</div>
                        <div className="registerBtn" onClick={backLogin}>返回登录</div>
                    </div>
                </Form.Item>
            </Form>
            <div className="footer">欢迎登陆后台管理系统</div>
        </div>
    )
}

export default Form.create()(Register)