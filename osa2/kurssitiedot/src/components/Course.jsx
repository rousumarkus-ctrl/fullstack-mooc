const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

const Header = (props) => {
  return (
    <>
    <h2>{props.course}</h2>
    </>
  )
}
const Content = ({parts}) => {
  return (
    <>
    {parts.map((part)=><Part course={part} key={part.id}></Part>)}
    </>
  )
}
const Total = ({parts}) => {
  return (
    <>
    <h3>total of {parts.reduce((sum,part)=>sum+part.exercises,0)} exercises</h3>
    </>
  )
}
const Part = (props) => {
  return (
    <>
    <p>{props.course.name} {props.course.exercises}</p>
    </>
  )
}

export default Course