import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { Alert, Button, Card, ConfigProvider, Form, Input, Typography } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import CONFIG from '../../config/config.json';
import LOCAL_CONFIG from '../../config/config-local.json';

import 'antd/dist/reset.css';
import './style.css';

const config = LOCAL_CONFIG || CONFIG;
const server = `http://${config.expressHost}:${config.expressPort}`;
const { Paragraph, Title } = Typography;

export function RegisterApp() {
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit({ email, name, password }) {
    setError('');
    setRegistered(false);
    setSubmitting(true);

    try {
      const response = await axios.post(`${server}/api/user`, {
        email: email.trim(),
        name: name.trim(),
        password,
      });

      if (response.data === 'success') {
        setRegistered(true);
      } else {
        setError(response.data?.error_message || response.data?.error_massage || '注册失败，请稍后重试。');
      }
    } catch (requestError) {
      const responseData = requestError.response?.data;
      const serverMessage = responseData?.error_message || responseData?.error_massage;
      setError(serverMessage || (requestError.response ? '注册失败，请稍后重试。' : '无法连接服务器，请检查网络后重试。'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#657d68', borderRadius: 10 } }}>
      <main className="register-page">
        <Card className="register-card" bordered={false}>
          <div className="register-mark" aria-hidden="true">阅</div>
          <Paragraph className="register-eyebrow">GENSHIN NOVEL READER</Paragraph>
          <Title level={2} className="register-title">创建你的账户</Title>
          <Paragraph className="register-description">注册后即可开启专属阅读空间。</Paragraph>

          <Form layout="vertical" requiredMark={false} onFinish={handleSubmit} onValuesChange={() => {
            setError('');
            setRegistered(false);
          }}>
            <Form.Item
              label="邮箱"
              name="email"
              rules={[
                { required: true, whitespace: true, message: '请输入邮箱' },
                { type: 'email', message: '请输入有效的邮箱地址' },
              ]}
            >
              <Input
                autoComplete="email"
                prefix={<MailOutlined />}
                placeholder="name@example.com"
                size="large"
              />
            </Form.Item>
            <Form.Item
              label="用户名"
              name="name"
              rules={[{ required: true, whitespace: true, message: '请输入用户名' }]}
            >
              <Input
                autoComplete="nickname"
                prefix={<UserOutlined />}
                placeholder="给自己取个名字"
                size="large"
              />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 6, message: '密码至少需要 6 位' },
              ]}
            >
              <Input.Password
                autoComplete="new-password"
                prefix={<LockOutlined />}
                placeholder="至少 6 位字符"
                size="large"
              />
            </Form.Item>
            {error && <Alert className="register-alert" type="error" showIcon message={error} />}
            {registered && (
              <Alert
                className="register-alert"
                type="success"
                showIcon
                message="注册成功"
                description="账户已创建，现在可以前往登录。"
              />
            )}
            <Button
              className="register-submit"
              type="primary"
              htmlType="submit"
              size="large"
              loading={submitting}
              block
            >
              创建账户
            </Button>
          </Form>
          <Paragraph className="register-footnote">
            已有账户？ <a href="/login">前往登录</a>
          </Paragraph>
        </Card>
      </main>
    </ConfigProvider>
  );
}

ReactDOM.createRoot(document.getElementById('react-app')).render(<RegisterApp />);
