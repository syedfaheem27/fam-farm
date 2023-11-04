module.exports = (input, data) => {
  let output = input.replace(/{%PRODUCT_IMAGE%}/g, data.image);
  output = output.replace(/{%PRODUCT_NAME%}/g, data.productName);
  output = output.replace(/{%PRODUCT_QUANTITY%}/g, data.quantity);
  output = output.replace(/{%PRODUCT_PRICE%}/g, data.price);
  output = output.replace(/{%ID%}/g, data.id);
  output = output.replace(/{%PRODUCT_LOCATION%}/g, data.from);
  output = output.replace(/{%PRODUCT_NUTRIENTS%}/g, data.nutrients);
  output = output.replace(/{%PRODUCT_DESCRIPTION%}/g, data.description);

  if (!data.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  } else {
    output = output.replace(/{%NOT_ORGANIC%}/g, "");
  }

  return output;
};
