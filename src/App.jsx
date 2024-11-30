import { useState } from 'react'
import './App.css'
import bmi_image from './assets/bmi_chart.jpg'

function App(){
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [bmi, setBmi] = useState(null)
  const [bmiStatus, setBmiStatus]= useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const calculateBmi = ()=>{
    const isValidHeight = /^\d*\.?\d+$/.test(height)
    const isValidWeight = /^\d*\.?\d+$/.test(weight)
    if(isValidHeight && isValidWeight){
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters)
      setBmi(bmiValue.toFixed(2))
      if(bmiValue < 18.5){
        setBmiStatus("Underweight")
      }
      else if(bmiValue >18.5 && bmiValue<24.9){
        setBmiStatus("Normal")
      }
      else if(bmiValue>24.9 && bmiValue<29.9){
        setBmiStatus("Overweight")
      }
      else{
        setBmiStatus("Obese")
      }
      setErrorMsg("")
    }
    else{
      setBmi(null)
      setBmiStatus("")
      setErrorMsg("Please enter valid numeric values for heigth and weight")
    }
  }
  const clearAll = ()=>{
    setHeight("")
    setWeight("")
    setBmi(null)
    setBmiStatus("")
    setErrorMsg("")
  }

  return(
    <>
    <div className='container'>
      <div className='box'>
        <img src={bmi_image} alt="" />
      </div>
        <div className='data'>
        <h1>BMI Calculator</h1>
        {errorMsg && <p className='error'>{errorMsg}</p>}
          <div className='input_data'>
            <label htmlFor="height">Height (cm)</label>
            <input type="text" id="height" value={height} onChange={(e)=>setHeight(e.target.value)} />
          </div>
          <div className='input_data'>
            <label htmlFor="weight">Weigth (kg)</label>
            <input type="text" id="weight" value={weight} onChange={(e)=>setWeight(e.target.value)} />
          </div>
          <button onClick={calculateBmi} >Calculate BMI</button>
          <button onClick={clearAll} className='clear' >Clear</button>
          {bmi !== null && (
            <div className='result'>
              <p>Your BMI value : <span className={bmiStatus}>{bmi}</span></p>
              <p>BMI Status : <span className={bmiStatus}>{bmiStatus}</span></p>
            </div>
          )}
        </div>
    </div>
    </>
  )
}
export default App