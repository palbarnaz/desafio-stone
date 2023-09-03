export const formatCurrency = (value: number)=>{

  return new Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(value)

}


export const formatCurrencyDolar = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}
