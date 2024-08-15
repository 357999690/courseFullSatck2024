const Course = ({ course }) => {
    return (
      <>
        <Title course={course}/>
        <div>
          <Header course={course[1]}/>
          <Content course={course[1]}/>
          <Total course={course[1]}/>
        </div>
        <div>
          <Header course={course[2]}/>
          <Content course={course[2]}/>
          <Total course={course[2]}/>
        </div>
      </>
      
    )
  }

  const Title = ({ course }) => <h1>{course[0]}</h1>

const Header = ({ course }) => {
  return (
    <>
      <h2>{course.name}</h2>
    </>
  )
}

const Part = ({ part }) => {
  return (
    <>
      <li>
        {part.name} {part.exercises}
      </li>
    </>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      <ul>
      {course.parts.map(part =>
        <Part key={part.id} part={part}/>
      )}  
      </ul>
    </div>
  )
}

const Total = ( {course} ) => {
  const exercises = course.parts.map((part) => part.exercises)
  let sumTotal = exercises.reduce((a,b) => {
    return a + b
  })
  // let sumTotal = 0
  // course.parts.forEach((part) => sumTotal += part.exercises)
  return (
    <>
     <p>total of {sumTotal} exercises</p>
    </>
  )
}
 export default Course