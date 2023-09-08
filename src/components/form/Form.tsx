'use client'
import './form.css'
import { IMaskInput } from "react-imask";

import { getValueCurrency } from "@/services";
import { FormEvent, useEffect, useState } from "react";
import Results from "../Results";
import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';
import CurrencyInput from 'react-currency-input-field';



export default function Form() {
  const [valueInput, setValueInput] = useState<number | null>();
  const [currency, setCurrency] = useState<number>(0);
  const [tax, setTax] = useState<number | null>();
  const [total, setTotal] = useState<number>(0);
  const [valueRadio, setValueRadio] = useState<string>()


  useEffect(() => {
    getCurrency();
  }, [])

  const getCurrency = async () => {
    const response = await getValueCurrency()
    setCurrency(Number(response.USDBRL.high))
  }

  const handleSubmit = async () => {
    calculate()
  }

  const calculate = () => {

    const value = valueInput || 0
    let valueTax = (tax || 0) / 100
 

    const dolarComImposto = value + (value * valueTax)
    console.log(dolarComImposto);
    
    if (valueRadio == 'cash') {
      setTotal(calculateMoneyType(dolarComImposto, value))
      return
    }
    setTotal(calculateCardType(dolarComImposto, value))
  }

  const calculateMoneyType = (dolarComImposto: number, valueInput: number) => {
    const iof = 0.011
    return dolarComImposto * (currency + (iof * (valueInput * currency)))
  }

  const calculateCardType = (dolarComImposto: number, valueInput: number) => {
    const iof = 0.064
    return (dolarComImposto + (iof * (valueInput * currency))) * currency

  }
  return (
    <section className="form-container" >
      {total < 1 ? (<>

        <div className="group-input">
          <div className="form-group">
            <label htmlFor="dolar">Dólar</label>
          <CurrencyInput
              placeholder='$'
              intlConfig={ {
                locale: 'en-US',
                currency: 'USD',
              }}
              decimalsLimit={6}
              step={1}
              className='input-field'
              onValueChange={(value,name,values)=> setValueInput(values?.float)}
              id="dolar"
              aria-label="dolar"
            />
          </div>
          <div className="form-group">
            <label htmlFor="tax">Taxa do Estado</label>

            <CurrencyInput
              placeholder='0%'
              suffix="%"
              min={1}
              max={100}
              className='input-field'
              type="text" 
              name="dolar"
              onValueChange={(value,name,values)=> setTax(values?.float)}
              id="tax"
              aria-label="tax"
            />
          </div>

        </div>

        <form className="form-radio" >
          <p>Tipo de compra</p>
          <div  className="group-radio">
        
            <input type="radio" name="myRadios"  id="cash" onChange={(e) => setValueRadio(e.target.value)} value="cash" />
            <label htmlFor="cash">Dinheiro</label>
           
           
           <input type="radio" name="myRadios"  id="card" onChange={(e) => setValueRadio(e.target.value)} value="card" />
            <label htmlFor="card">Cartão</label>
          
            
          </div>
        </form>


        <button className="btn-container" onClick={handleSubmit}>
          <img src="images/logo-button.png" alt="" />
          <p>Converter</p>

        </button>
      </>) : (
        <>
          <Results returnCalculate={() => setTotal(0)} currency={currency} result={total} tax={tax} type={valueRadio} />
        </>
      )}
    </section>
  )
}