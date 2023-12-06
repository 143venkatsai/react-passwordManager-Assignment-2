import {Component} from 'react'
import {v4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

class PasswordManager extends Component {
  state = {
    passwordsList: [],
    websiteInput: '',
    username: '',
    password: '',
    searchInput: '',
    showPassword: false,
  }

  deletePassword = id => {
    const {passwordsList} = this.state

    const filteredPasswordsList = passwordsList.filter(
      eachPassword => eachPassword.id !== id,
    )

    this.setState({passwordsList: filteredPasswordsList})
  }

  getSearchPasswordsList = () => {
    const {searchInput, passwordsList} = this.state

    return passwordsList.filter(eachPassword =>
      eachPassword.url.toLowerCase().includes(searchInput.toLowerCase()),
    )
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeCheckbox = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onAddPassword = event => {
    event.preventDefault()
    const {websiteInput, username, password} = this.state

    const newPassword = {
      id: v4(),
      url: websiteInput,
      name: username,
      pass: password,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      websiteInput: '',
      username: '',
      password: '',
    }))
  }

  render() {
    const {
      websiteInput,
      username,
      password,
      searchInput,
      showPassword,
    } = this.state
    const searchResults = this.getSearchPasswordsList()

    return (
      <>
        <div className="bg-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="logo-img"
          />
          <div className="user-password-container">
            <form className="form-container" onSubmit={this.onAddPassword}>
              <h2 className="form-name">Add New Password</h2>
              <div className="user-input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-img"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="input-element"
                  value={websiteInput}
                  onChange={this.onChangeWebsite}
                />
              </div>
              <div className="user-input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-img"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="input-element"
                  value={username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="user-input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-img"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="input-element"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>
              <button
                type="submit"
                className="add-button"
                onClick={this.onAddPassword}
              >
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-lg"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="password-sm"
            />
          </div>
          <div className="passwords-container">
            <div className="top-section">
              <div className="password-section">
                <h1 className="details">Your Passwords</h1>
                <p className="count-passwords">{searchResults.length}</p>
              </div>
              <div className="search-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-icon"
                />
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                />
              </div>
            </div>
            <hr className="horizontal-line" />
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="checkbox"
                className="checkbox"
                onChange={this.onChangeCheckbox}
              />
              <label htmlFor="checkbox" className="checkbox-label">
                Show Passwords
              </label>
            </div>
            <div className="display-password-container">
              {searchResults.length === 0 ? (
                <div className="no-passwords-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    alt="no passwords"
                    className="no-image"
                  />
                  <p className="no-passwords-text">No Passwords</p>
                </div>
              ) : (
                <ul className="unordered-passwords-list">
                  {searchResults.map(eachPassword => (
                    <PasswordItem
                      passwordDetails={eachPassword}
                      key={eachPassword.id}
                      showPassword={showPassword}
                      deletePassword={this.deletePassword}
                    />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default PasswordManager
