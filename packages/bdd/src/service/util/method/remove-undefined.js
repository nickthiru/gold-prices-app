module.exports = function removeUndefined(obj) {
  console.log("\n");
  console.log("(+) Inside 'removeUndefined()'");

  Object.keys(obj).forEach((key) => console.log(`(+) ${key}: ` + obj[key]));

  const objCopy = { ...obj };

  Object.keys(objCopy).forEach((key) => objCopy[key] === undefined && delete objCopy[key]);

  return objCopy;
}