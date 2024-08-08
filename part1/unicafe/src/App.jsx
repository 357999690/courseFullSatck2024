import { useState } from "react";

const StatistcLine = ({ text, value }) => {
  return (
    <tr>
      <th>{text}</th>
      <td>{value}</td>
    </tr>
  )
} 

const Statistcs = ({ good, neutral, bad }) => {

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good * 100 / all

  if(all === 0) {
    return (
      <>
        <h2>statistics</h2>
        <h3>No feedback given</h3>
      </>
    )
  }

  return (
    <>
      <h2>statistics</h2>
      <table>
      <tbody>
      <StatistcLine text={'good'} value={good}/>
      <StatistcLine text={'neutral'} value={neutral}/>
      <StatistcLine text={'bad'} value={bad}/>
      <StatistcLine text={'all'} value={all}/>
      <StatistcLine text={'average'} value={average}/>
      <StatistcLine text={'positive'} value={`${positive}%`}/>
      </tbody>
    </table>
    </>
    
    
  )

}

const Button = ({ handleClick, text }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1 )
  const handleNeutralClick = () => setNeutral(neutral + 1 )
  const handleBadClick = () => setBad(bad + 1) 

    return (
    <>
     <h1>give feedback</h1>
     <div>
      <Button handleClick={handleGoodClick} text={'good'}/>
      <Button handleClick={handleNeutralClick} text={'neutral'}/>
      <Button handleClick={handleBadClick} text={'bad'}/>
      </div> 
      <Statistcs good={good} neutral={neutral} bad={bad}/>
    </>
    
  )
}

export default App