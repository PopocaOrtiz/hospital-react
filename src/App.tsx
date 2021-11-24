import React from 'react';
import './App.css';
import Api from './Api'

interface IUser {
  id: number
  firstname: string
  lastname: string
}

interface IState {
  users: IUser[]
  newUser: IUser
}

class App extends React.Component {

  state: IState
  api: Api = new Api()

  constructor(props: any) {
    super(props);
    this.state = {
      users: [],
      newUser: {
        id: 0,
        firstname: '',
        lastname: ''
      }
    }
  }

  fetchUsers() {
    this.api.get('users')
      .then(response => {
        this.setState({
          users: response.users
        })
      })
  }

  createUser() {
    this.api.post('users', this.state.newUser)
      .then(response => {
        this.setState({
          newUser: {
            id: 0,
            firstname: '',
            lastname: ''
          },
          users: [...this.state.users, response.user]
        })
      })
  }

  updateUser(user: IUser) {
    this.api.put(`users/${user.id}`, user)
      .then(response => {
      })
  }

  render() {
    return <div>
      <h1>Hospital</h1>
      <h2>
        Users
        <button onClick={() => this.fetchUsers()}>cargar...</button>
      </h2>
      {
        !this.state.users ?
          <div>no results</div> :
          <table>
            <thead>
            <tr>
              <th>id</th>
              <th>first name</th>
              <th>last name</th>
            </tr>
            </thead>
            <tbody>
            {
              this.state.users.map((user) => {
                return <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                </tr>
              })
            }
            <tr>
              <td>
                <button onClick={() => this.createUser()}>Create</button>
              </td>
              <td>
                <input type="text"
                       value={this.state.newUser.firstname}
                       onChange={
                         (event) => this.setState(
                           {
                             newUser: {
                               ...this.state.newUser,
                               firstname: event.target.value
                             }
                           })
                       }/>
              </td>
              <td>
                <input type="text"
                       value={this.state.newUser.lastname}
                       onChange={
                         (event) => this.setState({
                           newUser: {
                             ...this.state.newUser,
                             lastname: event.target.value
                           }
                         })
                       }/>
              </td>
            </tr>
            </tbody>
          </table>
      }
    </div>
  }
}

export default App;
