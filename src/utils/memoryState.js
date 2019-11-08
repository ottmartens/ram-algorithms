function MemoryState(initialState = null) {
  this.state = initialState ? initialState : Array(50).fill(null);
}

MemoryState.prototype.toString = function() {
  return this.state.join();
};

MemoryState.prototype.addProcess = function(proc, algorithm) {
  const slots = this.getAvailableSlotsForProcess(proc.size);

  if (slots.length === 0) throw new Error('Not enough free memory');
  let slot;

  switch (algorithm) {
    case 'LAST':
      slot = slots[slots.length - 1];
      break;
    case 'BEST':
      slot = slots.sort((a, b) => a.size - b.size)[0];
      break;
    case 'WORST':
      slot = slots.sort((a, b) => b.size - a.size)[0];
      break;
    case 'RANDOM':
      const index = Math.floor(Math.random() * (slots.length - 1));
      slot = slots[index];
      break;
    default:
      throw new Error('This algorithm is not implemented');
  }

  this.addProcessAtIndex(proc, slot.startIndex);
};

MemoryState.prototype.hasUncompletedJobs = function() {
  return this.state.filter(
    element => element && element.done + 1 < element.duration
  ).length;
};

MemoryState.prototype.incrementProgress = function() {
  this.state = this.state.map(element =>
    element
      ? {
          ...element,
          done: element.done + 1
        }
      : null
  );
};

MemoryState.prototype.removeCompletedProcesses = function() {
  this.state = this.state.map(element =>
    element ? (element.done === element.duration ? null : element) : null
  );
};

MemoryState.prototype.addProcessAtIndex = function(proc, startIndex) {
  this.state = [
    ...this.state.slice(0, startIndex),
    ...Array(proc.size).fill({
      ...proc,
      done: 0
    }),
    ...this.state.slice(startIndex + proc.size)
  ];
};

MemoryState.prototype.getAvailableSlotsForProcess = function(processSize) {
  let availableSlots = [];
  // available slot
  // {
  //     startIndex
  //     size
  // }

  let currentSlot;

  for (let i = 0; i < this.state.length; i++) {
    if (this.state[i] === null) {
      if (currentSlot) {
        currentSlot.size = currentSlot.size + 1;
      } else {
        currentSlot = {
          startIndex: i,
          size: 1
        };
      }
      if (
        i === this.state.length - 1 &&
        currentSlot &&
        currentSlot.size >= processSize
      )
        availableSlots.push(currentSlot);
    } else {
      if (currentSlot) {
        if (currentSlot.size >= processSize) availableSlots.push(currentSlot);
        currentSlot = null;
      } else {
      }
    }
  }

  return availableSlots;
};

export default MemoryState;
