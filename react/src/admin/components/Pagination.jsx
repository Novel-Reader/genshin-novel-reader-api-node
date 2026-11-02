import React from 'react';
import { Pagination as AntPagination, Typography } from 'antd';

export default function Pagination({ page, total, pageSize, loading, onPageChange, label = '条' }) {
  const range = total ? `显示 ${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, total)} 条，共 ${total} 条` : `显示 0 ${label}`;

  return (
    <footer className="pagination-bar">
      <Typography.Text type="secondary">{range}</Typography.Text>
      <AntPagination current={page} total={total} pageSize={pageSize} disabled={loading} onChange={onPageChange} showSizeChanger={false} showQuickJumper={false} size="small" />
    </footer>
  );
}
