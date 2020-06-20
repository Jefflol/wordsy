export const isEmpty = object => {
  for (let i in object) {
    return false;
  }
  
  return true;
};