const Filter = ({newSearchTerm, setNewSearchTerm}) => {
    const handleSearchTermChange = (event) => {
        setNewSearchTerm(event.target.value)
    }
    return <div>filter shown with <input value={newSearchTerm} onChange={handleSearchTermChange}/></div>
}

export default Filter