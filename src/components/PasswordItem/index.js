import './index.css'

const PasswordItem = props => {
  const profileColors = [
    'blue',
    'yellow',
    'orange',
    'green',
    'white',
    'black',
    'warning',
  ]
  const profilePicColor =
    profileColors[Math.ceil(Math.random() * profileColors.length - 1)]

  const {passwordDetails, showPassword, deletePassword} = props
  const {id, url, name, pass} = passwordDetails
  const firstLetter = name.slice(0, 1)

  const passwordPattern = showPassword ? (
    <p className="password-detail">{pass}</p>
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="stars-img"
    />
  )

  const onDeletePassword = () => {
    deletePassword(id)
  }

  return (
    <li className="list-element">
      <div className="left-container">
        <div className="first-name-container size">
          <p className={`first-name ${profilePicColor}`}>{firstLetter}</p>
        </div>
        <div className="detail-container">
          <p className="url">{url}</p>
          <p className="name">{name}</p>
          {passwordPattern}
        </div>
      </div>
      <div className="delete-container">
        <button
          type="button"
          className="delete-button"
          data-testid="delete"
          onClick={onDeletePassword}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-img"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordItem
