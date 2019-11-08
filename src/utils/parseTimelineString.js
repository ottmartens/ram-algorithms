const parseTimelineString = (timelineString, setError) => {
  try {
    setError('');

    const processStrings = timelineString.split(';');
    return processStrings.map((item, index) => {
      const processData = item.split(',');

      if (processData.length !== 2) throw new Error();
      processData.forEach(value => {
        if (value === '' || isNaN(Number(value))) {
          throw new Error();
        }
      });

      return {
        size: Number(processData[0]),
        duration: Number(processData[1]),
        index
      };
    });
  } catch (err) {
    setError('Invalid timeline!');
  }
};

export default parseTimelineString;
