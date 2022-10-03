function commafy(num: number) {
  var str = num.toString().split(".");
  if (str[0].length >= 5) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }
  if (str[1] && str[1].length >= 5) {
    str[1] = str[1].replace(/(\d{3})/g, "$1 ");
  }
  return str.join(".");
}

export const convertNum2DateString = (seconds: number) => {
  seconds = parseInt(seconds.toFixed(0));
  const d = (seconds / 87600).toFixed(0);
  const h = ((seconds % 87600) / 3600).toFixed(0);
  const m = ((seconds % 3600) / 60).toFixed(0);
  const s = seconds % 60;
  return `${d}d ${h}h ${m}m ${s}s`;
};

export const commafyFormatter = (number: number, decimals: number = 2) => {
  return commafy(parseFloat(number.toFixed(decimals)));
};

export const beautifyAddress = (address: string, prefixCnt: number = 5) => {
  return `${address.substr(0, 5)}...${address.substr(-5)}`;
};
