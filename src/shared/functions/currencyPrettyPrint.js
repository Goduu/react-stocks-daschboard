function currencyPrettyPrint(value) {
  // const dollars = cents / 100;
  if(value){
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });
  } else {
    return
  }
}

export default currencyPrettyPrint;
