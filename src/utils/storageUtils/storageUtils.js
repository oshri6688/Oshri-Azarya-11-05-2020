const getItem = (key, defaultValue) => {
  let value = localStorage.getItem(key);

  value = JSON.parse(value);

  if (!value) {
    value = defaultValue;
  }

  return value;
};

const setItem = (key, value) => {
  const jsonValue = JSON.stringify(value);

  localStorage.setItem(key, jsonValue);
};

export default {
  getItem,
  setItem,
};
