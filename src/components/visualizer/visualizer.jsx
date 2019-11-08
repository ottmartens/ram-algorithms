import React, { useState, useEffect } from 'react';

import { useInterval } from '../../hooks';
import { MemoryState } from '../../utils';
import { BlockRow, Counter } from '..';

import styles from './visualizer.module.scss';

const Visualizer = ({
  processes,
  algorithm,
  started,
  setStarted,
  setError,
  error
}) => {
  const [currentState, setCurrentState] = useState(new MemoryState());
  const [processHistroy, setProcessHistory] = useState([]);
  const [stepCount, setStepCount] = useState(0);

  useInterval(
    () => {
      step();
    },
    started ? 1000 : null
  );

  useEffect(() => {
    if (started) {
      setCurrentState(new MemoryState());
      setProcessHistory([]);
      setStepCount(0);
      setError('');
    }
  }, [setError, started]);

  const step = () => {
    // increment progress of jobs in memory
    currentState.incrementProgress();

    // remove completed jobs
    currentState.removeCompletedProcesses();

    // push new jobs
    try {
      if (processes[stepCount])
        currentState.addProcess(processes[stepCount], algorithm);
    } catch (err) {
      setStarted(false);
      setError(err.message);
    }
    // snapshot to history
    setProcessHistory(processHistroy.concat([currentState.state]));

    // finish if no more jobs
    if (!processes[stepCount + 1] && !currentState.hasUncompletedJobs())
      setStarted(false);

    // increment step count
    setStepCount(stepCount + 1);
  };

  return (
    <div className={styles.visualizer}>
      <BlockRow isIndexRow values={[...Array(50).keys()].map(x => ++x)} />
      {processHistroy.map((state, index) => (
        <BlockRow key={index} values={state.map(s => (s ? s.index : null))} />
      ))}
      { error === 'Not enough free memory' && (
        <BlockRow isErrorRow values={Array(50).fill(null)} />
      )}

      <Counter stepCount={stepCount} />
    </div>
  );
};

export default Visualizer;
