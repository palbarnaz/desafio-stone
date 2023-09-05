'use client'
import './home.css'
import Header from '@/components/header/Header';
import Form from '@/components/form/Form';


export default function Home() {
  

  return (
    <main>
      <section className='content-section'>
      <Header/>
      <Form/>
      </section>
    </main>
  )
}
