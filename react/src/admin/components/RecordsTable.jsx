import React from 'react';
import { Button, Empty, Table, Typography } from 'antd';
import Pagination from './Pagination';

export default function RecordsTable({ section, sectionKey, records, total, page, pageSize, loading, error, onPageChange, onBookSelect }) {
  return (
    <>
      <div className="page-heading">
        <div>
          <h1>{section.label}</h1>
          <p>浏览与管理平台中的{section.label.slice(0, -2)}记录。</p>
        </div>
        <div className="record-summary">
          <Typography.Text type="secondary">记录总数</Typography.Text>
          <Typography.Title level={3}>
            {total.toLocaleString('zh-CN')}
            <Typography.Text type="secondary">条</Typography.Text>
          </Typography.Title>
        </div>
      </div>
      <div className="table-frame">
        <div className="table-toolbar">
          <span>当前列表</span>
          <Typography.Text type="secondary">每页 {pageSize} 条</Typography.Text>
        </div>
        {error ? <div className="table-error"><Empty description={error} /></div> : <Table
          rowKey="id"
          columns={section.columns.map((column) => ({
            title: column.label,
            dataIndex: column.key,
            key: column.key,
            width: column.width,
            render: (value, record) => {
              const displayValue = column.format ? column.format(value) : value ?? '—';
              if (column.primary && sectionKey === 'books') {
                return (
                  <Button type="link" className="book-title-button" onClick={() => onBookSelect(record)}>
                    {displayValue}
                  </Button>
                );
              }
              return column.primary ? <Typography.Text strong>{displayValue}</Typography.Text> : displayValue;
            },
          }))}
          dataSource={records}
          loading={loading}
          pagination={false}
          locale={{ emptyText: <Empty description="这里还没有记录" /> }}
          scroll={{ x: true }}
        />}
        <Pagination page={page} total={total} pageSize={pageSize} loading={loading} onPageChange={onPageChange} />
      </div>
    </>
  );
}
