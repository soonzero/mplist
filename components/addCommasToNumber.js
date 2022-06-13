const addCommasToNumber = (num) => {
  const numberReg = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(numberReg, ",");
};

export default addCommasToNumber;
