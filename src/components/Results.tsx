import { formatCurrency, formatCurrencyDolar } from "@/utils/formatCurrency";
import { SetStateAction } from "react";

type ResultsProps = {
  result : number;
  tax: string;
  type?: string;
  currency: number;
  returnCalculate: (value: SetStateAction<number>) => void
  
}


export default function Results ({result, tax, type, currency, returnCalculate}:ResultsProps){

  return(
    <>  
       <button  onClick={() => returnCalculate(0)} >Voltar</button>
         <p> O resultado do cálculo é  {formatCurrency(result)}</p>
         <p> Compra no {type} e taxa de {tax}%</p>
         <p>Cotação do dólar: {formatCurrencyDolar(1)} = {formatCurrency(currency)}</p>
         <p></p>
         
    </>
  )
}