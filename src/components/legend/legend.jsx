import React from 'react';

import { Block } from '..';

import styles from './legend.module.scss';

const Legend = ({ processes }) =>
  processes ? (
    <div className={styles.legend}>
      <div className={styles.legendItem}>
        <Block isInvisible />
        <div>Size</div>
        <div>Duration</div>
      </div>
      {processes.map(proc => (
        <div key={proc.index} className={styles.legendItem}>
          <Block value={proc.index} />
          <div>{proc.size}</div>
          <div>{proc.duration}</div>
        </div>
      ))}
    </div>
  ) : null;

export default Legend;
