function formatAmount(value) {
    let val;
    if (value === '0.00' || value === '0' || value === 0 || value === 'null' || value === null) {
      return 0;
    } else if ((value / 1) < 1) {
      val = (value / 1).toFixed(2).replace('.', ',');
    } else {
      val = (value / 1).toFixed(0).replace('.', ',');
    }
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };
  
  export {formatAmount}