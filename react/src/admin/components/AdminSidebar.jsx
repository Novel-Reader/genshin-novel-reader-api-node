import React from 'react';
import { Layout, Menu } from 'antd';

export default function AdminSidebar({ navigation, activeKey, detailOpen, onSelect }) {
  return (
    <Layout.Sider className="admin-sidebar" breakpoint="md" collapsedWidth="64">
      <a className="admin-brand" href="/" aria-label="返回首页">
        <span className="brand-mark">N</span>
        <span className="brand-name">Novel<span className="brand-caption">STUDIO / ADMIN</span></span>
      </a>
      <Menu
        aria-label="管理导航"
        className="admin-nav"
        mode="inline"
        selectedKeys={detailOpen ? [] : [activeKey]}
        items={navigation.map((item, index) => ({
          key: item.key,
          label: item.label,
          title: item.label,
          icon: <span className="nav-index">{String(index + 1).padStart(2, '0')}</span>,
        }))}
        onClick={({ key }) => onSelect(key)}
      />
      <div className="sidebar-footer">内容管理系统<span>ADMIN / 01</span></div>
    </Layout.Sider>
  );
}
