import React from 'react';
import './App.css';

interface IUser {
  id: number
  firstname: string
  lastname: string
}

interface IState {
  users: IUser[]
}

class Api {
  base_path = 'http://localhost:8000/'

  get(resource: string) {
    let uri = this.base_path + resource
    return fetch(uri).then(response => response.json())
  }
}

class App extends React.Component {

  state: IState
  api: Api = new Api()

  constructor(props: any) {
    super(props);
    this.state = {
      users: []
    }
  }

  fetch_users() {
    this.api.get('users')
        .then(response => {
          this.setState({
            users: response.users
          })
        })
  }

  render() {
    return <div>
      <h1>Hospital</h1>
      <h2>
        Users
        <button onClick={() => this.fetch_users()}>cargar...</button>
      </h2>
      {
        !this.state.users ?
        <div>no results</div> :
        <table>
          <tr>
            <th>id</th>
            <th>first name</th>
            <th>last name</th>
          </tr>
          {
            this.state.users.map((user) => {
              return <tr>
                <td>{user.id}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
              </tr>
            })
          }
        </table>
      }
    </div>
  }
}

export default App;
