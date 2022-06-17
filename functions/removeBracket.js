const removeBracket = (item) => {
  // 괄호 안에 내용물 없앤 string 반환
  return item.split("(")[0];
};

export default removeBracket;
