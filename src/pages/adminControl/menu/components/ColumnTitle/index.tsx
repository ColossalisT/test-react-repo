import { Button, Row, Col, Typography } from 'antd';
import React from 'react';
import styles from './index.less';

const { Title } = Typography;

interface ColumnTitleProps {
  titleName: string,
  method: () => void;
}

const ColumnTitle: React.FC<ColumnTitleProps> = ({ titleName, method }) => {
  return (
    <Row className={styles.colTitleWrapper}>
      <Col span={12} className={styles.colTitleText}><Title level={4}>{titleName}</Title></Col>
      <Col span={12} className={styles.colTitleButton}><Button icon="plus" type="primary" onClick={method}>添加</Button></Col>
    </Row>
  )
}
export default ColumnTitle;
