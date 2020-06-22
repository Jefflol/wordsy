// Checks if object is empty
export const isEmpty = object => {
  for (let i in object) {
    return false;
  }
  
  return true;
};

// Debounce function to call at the end of a bunch of events
export const debounce = (fn, ms, args) => {
  let timer;

  return () => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, ms);
  };
;}