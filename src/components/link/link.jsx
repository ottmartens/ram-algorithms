import React from 'react';

import styles from './link.module.scss';

const Link = () => (
  <a
    className={styles.link}
    href="https://ottmartens.github.io/cpu-algorithms/"
  >
    CPU Scheduler
  </a>
);

export default Link;
