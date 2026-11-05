import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Alert, Button, Card, ConfigProvider, Form, Input, Typography } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

import 'antd/dist/reset.css';
import './style.css';

const { Paragraph, Title } = Typography;

export function LoginApp() {
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit({ email, password }) {
    setError('');
    setSubmitting(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const result = await response.json();
      if (!response.ok || !result.token) {
        throw new Error('邮箱或密码错误，请检查后重试。');
      }

      const maxAge = 60 * 60;
      document.cookie = `novelToken=${encodeURIComponent(result.token)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
      document.cookie = `username=${encodeURIComponent(email.trim())}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
      const returnTo = new URL(
        new URLSearchParams(window.location.search).get('returnTo') || '/novel',
        window.location.origin
      );
      window.location.assign(returnTo.origin === window.location.origin ? returnTo.href : '/novel');
    } catch (loginError) {
      setError(loginError.message || '登录失败，请稍后重试。');
      setSubmitting(false);
    }
  }

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#657d68', borderRadius: 10 } }}>
      <main className="login-page">
        <Card className="login-card" bordered={false}>
          <div className="login-mark" aria-hidden="true">阅</div>
          <Paragraph className="login-eyebrow">GENSHIN NOVEL READER</Paragraph>
          <Title level={2} className="login-title">欢迎回来</Title>
          <Paragraph className="login-description">登录以继续管理你的阅读空间。</Paragraph>

          <Form layout="vertical" requiredMark={false} onFinish={handleSubmit}>
            <Form.Item
              label="邮箱"
              name="email"
              rules={[
                { required: true, message: '请输入邮箱' },
                { type: 'email', message: '请输入有效的邮箱地址' },
              ]}
            >
              <Input
                autoComplete="username"
                prefix={<MailOutlined />}
                placeholder="name@example.com"
                size="large"
              />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                autoComplete="current-password"
                prefix={<LockOutlined />}
                placeholder="请输入密码"
                size="large"
              />
            </Form.Item>
            {error && <Alert className="login-alert" type="error" showIcon message={error} />}
            <Button
              className="login-submit"
              type="primary"
              htmlType="submit"
              size="large"
              loading={submitting}
              block
            >
              登录
            </Button>
          </Form>
          <Paragraph className="login-register-link">
            还没有账户？ <a href="/register">立即注册</a>
          </Paragraph>
        </Card>
      </main>
    </ConfigProvider>
  );
}

ReactDOM.createRoot(document.getElementById('react-app')).render(<LoginApp />);
