import React from 'react';
import { Alert, Button, Card, List, Skeleton, Space, Statistic, Typography, Row, Col } from 'antd';
import AuthorChart from './AuthorChart';
import Pagination from './Pagination';

function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString('zh-CN');
}

export default function BookStatistics({ book, statistics, page, pageSize, loading, error, onPageChange, onBack }) {
  if (!book) return (
    <Card loading />
  );
  const comments = statistics?.comments || { data: [], total: 0 };

  return (
    <>
      <div className="page-heading detail-heading">
        <div>
          <Button className="back-link" type="link" onClick={onBack}>← 返回书籍列表</Button>
          <div className="eyebrow">BOOK STATISTICS&nbsp; / &nbsp;#{book.id}</div>
          <h1>{book.name}</h1>
          <p>{book.author || '佚名'} · {Number(book.size || 0).toLocaleString('zh-CN')} 字</p>
        </div>
      </div>
      {error ? <Alert message={error} type="error" showIcon /> : (
        <>
          <Row gutter={[16, 16]} className="stat-cards">
            <Col xs={24} sm={8}>
              <Card>
                <Statistic title="阅读次数" value={Number(book.download_count || 0)} suffix="次" />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic title="评论总数" value={Number(comments.total || 0)} loading={loading} suffix="条" />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic title="评论作者" value={statistics?.commentAuthors?.length || 0} loading={loading} suffix="位" />
              </Card>
            </Col>
          </Row>
          {loading ? <Card><Skeleton active paragraph={{ rows: 4 }} /></Card> : <AuthorChart authors={statistics?.commentAuthors} title="评论作者分布" description="按评论数量排列" />}
          <Card className="comments-panel" title="读者评论" extra={<Typography.Text type="secondary">共 {comments.total} 条</Typography.Text>}>
            <List
              loading={loading}
              dataSource={comments.data}
              locale={{ emptyText: '暂无评论' }}
              renderItem={(comment) => <List.Item>
                <Space direction="vertical" size={6} className="comment-item">
                  <Space wrap>
                    <Typography.Text strong>{comment.author || '匿名'}</Typography.Text>
                    <Typography.Text type="secondary">{formatDate(comment.created_at)}</Typography.Text>
                  </Space>
                  <Typography.Paragraph className="comment-content">{comment.detail}</Typography.Paragraph>
                </Space>
              </List.Item>}
            />
            <Pagination page={page} total={comments.total} pageSize={pageSize} loading={loading} onPageChange={onPageChange} label="评论" />
          </Card>
        </>
      )}
    </>
  );
}
