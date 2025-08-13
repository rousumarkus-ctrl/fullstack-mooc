import { useState } from 'react'

const Button = ({onClick,text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticsLine = ({text,value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good,neutral,bad}) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = good / total
  if (total == 0){
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good}></StatisticsLine>
        <StatisticsLine text="neutral" value={neutral}></StatisticsLine>
        <StatisticsLine text="bad" value={bad}></StatisticsLine>
        <StatisticsLine text="all" value={total}></StatisticsLine>
        <StatisticsLine text="average" value={average}></StatisticsLine>
        <StatisticsLine text="positive" value={positive*100 +" %"}></StatisticsLine>
      </tbody>
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={(()=>setGood(good+1))} text="good"></Button>
      <Button onClick={(()=>setNeutral(neutral+1))} text="neutral"></Button>
      <Button onClick={(()=>setBad(bad+1))} text="bad"></Button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App