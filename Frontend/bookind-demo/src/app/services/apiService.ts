import { getAccessToken } from "../lib/auth";

const apiService = {
  get: async function (url: string): Promise<any> {
    console.log('get', url);

    const token = await getAccessToken();

    return new Promise((resolve, reject) => {
      fetch(`${"http://127.0.0.1:8000/"}${url}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then((json) => {
          console.log('Response:', json);

          resolve(json);
        })
        .catch((error => {
          reject(error);
        }))
    })
  },

  post: async function (url: string, data: any): Promise<any> {
    console.log('post', url, data);

    const token = await getAccessToken();
    console.log(token, "token")

    return new Promise((resolve, reject) => {
      fetch(`${"http://127.0.0.1:8000/"}${url}`, {
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Bearer ${token}`,
          //'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => response.json())
        .then((json) => {
          console.log('Response:', json);

          resolve(json);
        })
        .catch((error => {
          reject(error);
        }))
    })
  },

  put: async function (url: string, data: any): Promise<any> {
    console.log('put', url, data);

    const token = await getAccessToken();

    return new Promise((resolve, reject) => {
      fetch(`${"http://127.0.0.1:8000/"}${url}`, {
        method: 'PUT',
        body: data,
        headers: {
          'Authorization': `Bearer ${token}`,
          // 'Content-Type': 'application/json' // Uncomment if needed
        }
      })
        .then(response => response.json())
        .then((json) => {
          console.log('Response:', json);
          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  delete: async function (url: string): Promise<any> {
    console.log('delete', url);

    const token = await getAccessToken();

    return new Promise((resolve, reject) => {
      fetch(`${"http://127.0.0.1:8000/"}${url}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          // Check if the response is okay (status code in the range 200-299)
          if (!response.ok) {
            // If the response is not okay, reject with the response status
            return reject(`HTTP error! status: ${response.status}`);
          }
          // Check if the response has content
          if (response.status === 204) {
            // 204 No Content: Resolve with null or a custom message
            return resolve(null); // or resolve('Deleted successfully');
          }
          // Parse JSON response if it's not empty
          return response.json();
        })
        .then((json) => {
          console.log('Response:', json);
          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  postWithoutToken: async function (url: string, data: any): Promise<any> {
    console.log('post', url, data);

    return new Promise((resolve, reject) => {
      fetch(`${"http://127.0.0.1:8000/"}${url}`, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((json) => {
          console.log('Response:', json);

          resolve(json);
        })
        .catch((error => {
          reject(error);
        }))
    })
  }
}

export default apiService;