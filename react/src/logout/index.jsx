import React from 'react';
import ReactDOM from 'react-dom/client';
import { Button, Card, ConfigProvider, Result } from 'antd';

import 'antd/dist/reset.css';
import './style.css';

export function LogoutApp() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#657d68', borderRadius: 10 } }}>
      <main className="logout-page">
        <Card className="logout-card" bordered={false}>
          <Result
            status="success"
            title="已安全退出"
            subTitle="你的登录状态已清除。再次登录后即可继续访问阅读空间。"
            extra={(
              <Button type="primary" size="large" href="/login">
                返回登录
              </Button>
            )}
          />
        </Card>
      </main>
    </ConfigProvider>
  );
}

ReactDOM.createRoot(document.getElementById('react-app')).render(<LogoutApp />);
