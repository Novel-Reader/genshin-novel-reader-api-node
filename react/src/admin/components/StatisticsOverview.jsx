import React from 'react';
import { Alert, Button, Card, Col, Row, Skeleton, Statistic } from 'antd';
import AuthorChart from './AuthorChart';

export default function StatisticsOverview({ statistics, loading, error, onBrowseBooks }) {
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">CONTENT OPERATIONS&nbsp; / &nbsp;OVERVIEW</div>
          <h1>统计概览</h1>
          <p>平台内容与读者互动的整体情况。</p>
        </div>
      </div>
      {error ? <Alert message={error} type="error" showIcon /> : (
        <>
          <Row gutter={[16, 16]} className="stat-cards">
            <Col xs={24} sm={8}><Card loading={loading}><Statistic title="注册用户" value={Number(statistics?.users || 0)} suffix="位" /></Card></Col>
            <Col xs={24} sm={8}><Card loading={loading}><Statistic title="书籍作品" value={Number(statistics?.books || 0)} suffix="本" /></Card></Col>
            <Col xs={24} sm={8}><Card loading={loading}><Statistic title="读者评论" value={Number(statistics?.comments || 0)} suffix="条" /></Card></Col>
          </Row>
          {loading ? <Card><Skeleton active paragraph={{ rows: 4 }} /></Card> :
            <AuthorChart authors={statistics?.commentAuthors} books={statistics?.commentBooks} />
          }
          <Button className="overview-books-link" block onClick={onBrowseBooks}>浏览书籍并查看单本统计 →</Button>
        </>
      )}
    </>
  );
}
