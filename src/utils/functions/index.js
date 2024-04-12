export const isObjectEmpty = (obj) => {
  let empty = Object.keys(obj).filter(
    (key) => obj[key] === null || obj[key] === undefined || obj[key] === ""
  );

  return empty.length !== 0;
};
