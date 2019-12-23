import React from 'react';

import styles from './link.module.scss';

const Link = () => (
  <div className={styles.link}>
    <a href="https://ottmartens.github.io/cpu-algorithms/">CPU Scheduler</a>
    <a href="https://ottmartens.github.io/disk-algorithms/">Disk Scheduler</a>
  </div>
);

export default Link;