import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import zhTW from 'antd/locale/zh_TW';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { antdTheme } from './theme.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* `layer` puts antd styles in @layer antd so Tailwind utilities win */}
    <StyleProvider layer>
      <ConfigProvider theme={antdTheme} locale={zhTW}>
        <App />
      </ConfigProvider>
    </StyleProvider>
  </StrictMode>
);
