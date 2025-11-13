const Search = ({searchTerm, setSearchTerm}) => {
    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value)
    }
    return <div>filter shown with <input value={searchTerm} onChange={handleSearchTermChange}/></div>
}

export default Search