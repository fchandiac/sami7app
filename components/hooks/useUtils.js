export default function useUtils() {
  const formatRut = (rut) => {
    var valor = rut.replace(/[.-]/g, "");
    valor = valor.replace(/^(\d{1,2})(\d{3})(\d{3})(\w{1})$/, "$1.$2.$3-$4");
    return valor;
  };

  const addThousandsSeparator = (number) => {
    let numberAsString = typeof number === 'number' ? number.toString() : number;
    numberAsString = numberAsString.replace(/[^\d]/g, '');
    return numberAsString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const removeThousandsSeparator = (numberString) => {
    const stringWithoutSeparator = numberString.replace(/\./g, '');
    const integerNumber = parseInt(stringWithoutSeparator, 10);
    return integerNumber;
  }

  const grossPrice = (net, taxes) => {
    let netPrice = net || 0;
    let taxesAmount = 0;
    taxes.map((tax) => {
      taxesAmount += (tax.percentage * netPrice) / 100;
    });
    let grossPrice = netPrice + taxesAmount;
    grossPrice = Math.ceil(grossPrice);
    return grossPrice;
  };

  const taxesAmount = (net, taxes) => {
    let netPrice = net || 0;
    let taxesAmount = 0;
    if (taxes.length === 0) {
      return taxesAmount;
    }
    taxes.map((tax) => {
      taxesAmount += (tax.percentage * netPrice) / 100;
    });

    return Math.floor(taxesAmount);
  };

  const calculateTaxesFromGross = (grossPrice, taxes) => {
    let percentageSum = 0;
  
    taxes.forEach((tax) => {
      percentageSum += tax.percentage;
      
    });
  
    return Math.floor((grossPrice * percentageSum) / 100);
  };

  const netPrice = (gross, taxes) => {
    let taxesTotalPercentage = 0;

    taxes.forEach((tax) => {
      taxesTotalPercentage += tax.percentage;
    });

    const taxValue = taxesTotalPercentage / 100 + 1;
    const netValue = gross / taxValue;
    const taxAmount = gross - netValue;
    const netPrice = (gross - taxAmount);

    console.log("netPrice", netPrice);


    return Math.floor(netPrice);
  };

  


  return {
    formatRut,
    addThousandsSeparator,
    removeThousandsSeparator,
    grossPrice,
    netPrice,
    taxesAmount,
    calculateTaxesFromGross,
  };
}
