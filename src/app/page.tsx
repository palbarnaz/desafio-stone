'use client'
import Results from '@/components/Results';
import { getValueCurrency } from '@/services/index';
import { formatCurrency } from '@/utils/formatCurrency';
import { useEffect, useState } from 'react'
import { format } from 'util';


export default function Home() {
  const [valueInput, setValueInput] = useState("");
  const [currency, setCurrency] = useState<number>(0);
  const [tax, setTax] = useState("");  
  const [total, setTotal] = useState<number>(0);  
  const [valueRadio, setValueRadio] = useState<string>()


   useEffect(()=>{
    getCurrency();
   },[])

   const getCurrency = async() => {
    const response = await getValueCurrency()
    setCurrency(Number(response.USDBRL.high))
 }
   

   const handleSubmit = async ()=>{
    calculate()
    
   }

   const calculate = ()=>{
    
    const value = Number(valueInput.replace(",", "."))
    const valueTax = Number(tax.replace(",", ".")) / 100
    
    const dolarComImposto = value + (value*valueTax)

    if (valueRadio == 'cash'){
        setTotal(calculateMoneyType(dolarComImposto, value))  
        return
    }
    setTotal(calculateCardType(dolarComImposto, value))  
   }


   const calculateMoneyType = (dolarComImposto: number, valueInput: number ) => {
    const iof =  0.011
      return dolarComImposto * (currency + (iof * (valueInput*currency)))
   }

   const calculateCardType =  (dolarComImposto: number, valueInput: number ) => {
    const iof =  0.064
      return (dolarComImposto + (iof * (valueInput*currency))) * currency
  
   }

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      {total < 1 ? (<>
      <label htmlFor="dolar">Valor em dólar</label>
      <input type="text" value={valueInput} onChange={(e)=>setValueInput(e.target.value)}  id="dolar" aria-label="dolar" />
      <form >
      <input type="radio" id="cash"  onChange={(e) => setValueRadio(e.target.value)} value="cash"/>
        <label htmlFor="cash">Dinheiro</label>
         <input type="radio" id="card"  onChange={(e) => setValueRadio(e.target.value)} value="card"/>
        <label htmlFor="card">Cartão</label>
      </form>
       
      <label htmlFor="tax">Taxa de Estado</label>
      <input type="text" name="dolar" value={tax} onChange={(e)=>setTax(e.target.value)}  id="tax" aria-label="tax" />
      <button onClick={handleSubmit}>Converter</button>
      </>) : (
        <>
          <Results returnCalculate={()=> setTotal(0)} currency={currency}  result={total} tax={tax} type={valueRadio} />
        </>
      )}
      
      
     
     
    </main>
  )
}
