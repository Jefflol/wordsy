export const isEmpty = object => {
  for (var i in object) {
    return false;
  }
  
  return true;
};