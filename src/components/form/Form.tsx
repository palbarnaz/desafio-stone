'use client'
import './form.css'
import { IMaskInput } from "react-imask";

import { getValueCurrency } from "@/services";
import { FormEvent, useEffect, useState } from "react";
import Results from "../Results";



export default function Form() {
  const [valueInput, setValueInput] = useState("");
  const [currency, setCurrency] = useState<number>(0);
  const [tax, setTax] = useState("");
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

    const value = Number(valueInput.replace(",", "."))
    const valueTax = Number(tax.replace(",", ".")) / 100

    const dolarComImposto = value + (value * valueTax)

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

            <IMaskInput
              placeholder='$ '
              mask="$ num"
              blocks={{
                num: {
                  mask: Number,
                  thousandsSeparator: '.'
                }}}
              className='input-field'
              name="tax"
              type="text"
              value={valueInput}
              onAccept={(value, mask)=> setValueInput(mask.unmaskedValue)}
              // onChange={(e,) => setValueInput(e.target.)}
              id="dolar"
              aria-label="dolar"
            />

          </div>
          <div className="form-group">
            <label htmlFor="tax">Taxa do Estado</label>
            <IMaskInput 
              placeholder='0%' 
              mask="num %"
              blocks={{
                num: {
                  mask: Number,
                  thousandsSeparator: '.',
                  
                }}}
              className='input-field'
              type="text" name="dolar"
              value={tax}
              onAccept={(value, mask)=> setTax(mask.unmaskedValue)}
              id="tax" 
              aria-label="tax" 
            />

          </div>

        </div>

        <form className="form-radio">
          <p>Tipo de compra</p>
          <div className="group-radio">
            <input type="radio" id="cash" onChange={(e) => setValueRadio(e.target.value)} value="cash" />
            <label htmlFor="cash">Dinheiro</label>

            <input type="radio" id="card" onChange={(e) => setValueRadio(e.target.value)} value="card" />
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