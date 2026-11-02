import React, { useEffect, useRef, useState } from 'react';
import { Chart } from '@antv/g2';
import { Card, Select, Space, Typography } from 'antd';

export default function AuthorChart({ authors = [], books = [], title = '活跃评论作者', description = '评论数最多的 12 位作者' }) {
  const container = useRef(null);
  const chart = useRef(null);
  const [dimension, setDimension] = useState('author');
  const [chartType, setChartType] = useState('interval');

  useEffect(() => {
    const source = dimension === 'author' ? authors : books;
    if (!container.current || !source.length) return undefined;
    chart.current?.destroy();
    const chartData = source.map((item) => ({
      name: dimension === 'author' ? (item.author || '匿名') : (item.name || `书籍 ${item.book}`),
      count: Number(item.count),
    }));
    const instance = new Chart({
      container: container.current,
      autoFit: true,
      height: 290,
      padding: [20, 20, 58, 42],
    });
    instance.data(chartData);
    instance.scale('count', { min: 0, nice: true });
    instance.axis('name', { label: { autoRotate: true, autoHide: false, style: { fill: '#738075', fontSize: 10 } } });
    instance.axis('count', { label: { style: { fill: '#8c978c', fontSize: 10 } }, grid: { line: { style: { stroke: '#edf0eb', lineDash: [3, 3] } } } });
    instance.tooltip({ showMarkers: false });
    if (chartType === 'interval') instance.interval().position('name*count').color('#82977c');
    else {
      instance.line().position('name*count').color('#657d68').shape('smooth');
      instance.point().position('name*count').color('#657d68').shape('circle').style({ stroke: '#fff', lineWidth: 2 });
    }
    instance.render();
    chart.current = instance;

    return () => {
      instance.destroy();
      if (chart.current === instance) chart.current = null;
    };
  }, [authors, books, chartType, dimension]);

  return (
    <Card
      className="chart-panel"
      title={
        <Space direction="vertical" size={0}>
          <Typography.Text type="secondary">COMMUNITY / ANALYTICS</Typography.Text>
          <Typography.Title level={5}>{title}</Typography.Title>
        </Space>
      }
      extra={<Space wrap>
        <Typography.Text type="secondary">{description}</Typography.Text>
        {books.length > 0 &&
          <Select aria-label="统计维度" value={dimension} onChange={setDimension} options={[{ value: 'author', label: '评论作者' }, { value: 'book', label: '书籍' }]} />
        }
        <Select aria-label="图表类型" value={chartType} onChange={setChartType} options={[{ value: 'interval', label: '柱状图' }, { value: 'line', label: '折线图' }]} />
      </Space>}
    >
      {(dimension === 'author' ? authors : books).length ?
        <div className="chart-canvas" ref={container} />
        :
        <Typography.Paragraph className="stats-empty" type="secondary">暂无评论统计</Typography.Paragraph>
      }
    </Card>
  );
}
