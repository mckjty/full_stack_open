
const Course = ({courses}) => {
  return (
    <>
    {courses.map((course) =>
      <div key={course.id}>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )}
    </>
  )
}

const Header = ({name}) => <h1>{name}</h1>

const Content = ({parts}) => {
  return (
  <div>
    {parts.map((x) => (
      <p key={x.id}>{x.name} {x.exercises}</p>
      ))}
  </div>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((sum, x) => sum + x.exercises, 0)
  return <p><strong>total of {total} exercises</strong></p>
}

export default Course