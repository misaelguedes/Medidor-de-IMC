import './App.css'
import Footer from "./components/Footer"
import Header from "./components/Header"

import {useState} from 'react'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import balanca from '../../imc/src/assets/peso.jpeg'

export default function App() {

  const [peso, setPeso] = useState('')
  const [altura, setAltura] = useState('')
  const [imc, setImc] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [imcClass, setImcClass] = useState('')

  function calcular(e) {
    e.preventDefault();
    const pesoFloat = parseFloat(peso.replace('.', ','));
    const alturaFloat = parseFloat(altura.replace('.', ','));

    if (peso === '' || altura === '') {
      toast.warn('Preencha todos os campos!', {autoClose: 2000})
      return
    } else if (isNaN(pesoFloat) || isNaN(alturaFloat)) {
      toast.warn('Os valores inseridos devem ser numéricos.', {autoClose: 2000});
    } else {
      const imcValue = pesoFloat / (alturaFloat ^ 2);
      setImc(imcValue.toFixed(2).replace('.', ','));

      if (imcValue < 17) {
        setMensagem('MUITO ABAIXO DO PESO')
        setImcClass('muito-abaixo-do-peso')
      } else if (imcValue < 18.5) {
        setMensagem('ABAIXO DO PESO')
        setImcClass('abaixo-do-peso')
      } else if (imcValue < 25) {
        setMensagem('PESO IDEAL')
        setImcClass('peso-ideal')
      } else if (imcValue < 30) {
        setMensagem('SOBREPESO')
        setImcClass('sobrepeso')
      } else if (imcValue < 35) {
        setMensagem('OBESIDADE')
        setImcClass('obesidade')
      } else if (imcValue < 40) {
        setMensagem('OBESIDADE SEVERA')
        setImcClass('obesidade-severa')
      } else {
        setMensagem('OBESIDADE MÓRBIDA')
        setImcClass('obesidade-morbida')
      }

      setPeso('');
      setAltura('');
    }
  }

  return (
    <div>
      <Header/>
      <section>
        <form onSubmit={calcular}>
          <div className='form'>
            <label>DIGITE SEU PESO: </label>
            <input type='text' placeholder='60,5' value={peso} onChange={(e) => setPeso(e.target.value)}/>
          </div>
          <div className='form'>
            <label>DIGITE SUA ALTURA: </label>
            <input type='text' placeholder='1,75' value={altura} onChange={(e) => setAltura(e.target.value)}/>
          </div>
          <button type='submit'>Calcular</button>
        </form>
        {imc && (
          <div className={`res ${imcClass}`}>
            IMC: {imc} <br/>
            STATUS: {mensagem}
          </div>
        )}
        <div className='img'>
          <img src={balanca} alt='Balança'/>
        </div>
      </section>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}