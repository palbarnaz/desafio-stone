import { formatCurrency, formatCurrencyDolar } from "@/utils/formatCurrency";
import { timeStamp } from "console";
import { SetStateAction } from "react";
import './results.css';



type ResultsProps = {
  result : number;
  tax: string;
  type?: string;
  currency: number;
  returnCalculate: (value: SetStateAction<number>) => void
  
}


export default function Results ({result, tax, type, currency, returnCalculate}:ResultsProps){

  return(
   
       <div className="container">
       <button  onClick={() => returnCalculate(0)} >  
       <img src="images/arrow-left.png" alt="" />
       Voltar
       </button>
       <div className="form-block">
       <p> O resultado do cálculo é</p>
       <p className="p-total">{formatCurrency(result)}</p>
       </div>

        <div className="radio-block">
        <p> Compra no {type == "card" ? "cartão" : "dinheiro"} e taxa de {tax}%</p>
         <p>Cotação do dólar: {formatCurrencyDolar(1)} = {formatCurrency(currency)}</p>
        </div>
        
       </div>   
    
  )
}