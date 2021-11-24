export default class Api {
  base_path = 'http://localhost:8000/'

  get(resource: string) {
    let uri = this.base_path + resource
    return fetch(uri).then(response => response.json())
  }

  post(resource: string, params: any) {
    let uri = this.base_path + resource
    return this.execute(uri, params, 'post')
  }

  put(resource: string, params: any) {
    let uri = this.base_path + resource
    return this.execute(uri, params, 'put')
  }

  private execute(uri: string, params: any, verb: string) {
    return fetch(
      uri,
      {
        method: verb,
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      }
    ).then(response => {
      return response.json()
    });
  }
}