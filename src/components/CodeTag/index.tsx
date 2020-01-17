import React from 'react';
import styles from './index.less';

const CodeTag: React.FC = (props) => {
  return (
    <span className={styles.code}>{props.children}</span>
  )
}
export default CodeTag;
