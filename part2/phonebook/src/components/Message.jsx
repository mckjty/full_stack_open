const Message = ({ message, type }) => {
    if (message === null) {
    return null
  }
    if (type == "message") {
  return (
    <div className="messageStyle">
      {message}
    </div>
  )}
    if (type == "error") {
        return (
            <div className="errorStyle">
                {message}
            </div>
        )
    }
}

export default Message