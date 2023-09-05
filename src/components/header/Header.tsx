import { formatDate, formatHour } from '@/utils/formatDate'
import './header.css'

export default function Header(){
  return(
       <div className='header-section'>
        <img src="./images/stone-logo.png" alt="logo-stone" ></img>
        <div className='info-header'>
        <p className='date-p'> {formatDate()} | {formatHour()} UTC</p>
        <p className='message-p'>Dados de câmbio disponibilizados pela Morningstar.</p>
        </div>
       </div>
  )
}