import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const Button = ({onClick, content}) => <button onClick={onClick}>{content}</button>
  const H1 = ({text}) => <h1>{text}</h1>
  const P = ({text}) => <p>{text}</p>

  const handleVotes = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes)
  };

  const handleNext = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const renderMostVoted = () => {
    if (Math.max(...votes) == 0) {
      return (
        <p>No votes yet.</p>
      )
    }
    const highestIndex = votes.indexOf(Math.max(...votes))
    return (
      <>
      <p>{anecdotes[highestIndex]}</p>
      <p>has {votes[highestIndex]} votes</p>
      </>
    )
  }

  return (
    <div>
      <H1 text="Anecdote of the day" />
      <P text={anecdotes[selected]} />
      <P text={`has ${votes[selected]} votes`} />
      <Button onClick={handleVotes} content="vote" />
      <Button onClick={handleNext} content="next andecdote" />
      <H1 text="Anecdote with most votes" />
      {renderMostVoted()}
    </div>
  )
}

export default App