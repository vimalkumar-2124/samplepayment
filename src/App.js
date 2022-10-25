
import { useEffect } from 'react';
import './App.css';
import Payment from './components/Payment';



function App() {
  const loadscript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = src
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }
  useEffect(() => {
    loadscript("https://checkout.razorpay.com/v1/checkout.js") // razorpay script has to be loaded 
  },[])
  return <>
    <Payment/>
  </>

}

export default App;
