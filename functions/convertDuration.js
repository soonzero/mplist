const convertDuration = (time) => {
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const seconds = Math.floor((time / 1000) % 60);
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export default convertDuration;
