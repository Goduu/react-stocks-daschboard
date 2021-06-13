import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8080/api/';
// const apiUrl = 'https://stocks-studies-api.herokuapp.com/api/';

export function login(credentials) {
  const headers = { headers: { 'Content-Type': 'application/json' } }

  return new Promise((resolve, reject) => {
    axios.post(apiUrl + 'user/login', credentials, headers)
      .then(res => {
        console.log("RES LOGIN", res.data)
        resolve(res)
      })
      .catch(e => {
        reject(e)
      })
  });
}

export function saveGridElements(gridId, identifier, userId, gridElements, token) {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    }
  }

  const data =
    { id: gridId, identifier: identifier, userId: userId, gridElements: gridElements }

  return new Promise((resolve, reject) => {
    axios.put(apiUrl + 'grid/' + gridId, data, headers)
      .then(res => {
        console.log("Res save grid", res)
        resolve(res.data)
      })
      .catch(e => {
        reject(e)
      })
  });
}

export function saveUser(userId, user, token) {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    }
  }

  console.log("userId,avatr ", userId)
  return new Promise((resolve, reject) => {
    axios.put(apiUrl + 'user/' + userId, user, headers)
      .then(res => {
        console.log("Res save grid", res)
        resolve(res.data)
      })
      .catch(e => {
        reject(e)
      })
  });
}

export function fetchGridElements(userId, token) {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    }
  }

  return new Promise((resolve, reject) => {
    axios.get(apiUrl + 'grid/' + userId, headers)
      .then(res => {
        resolve(res.data)
      })
      .catch(e => {
        reject(e)
      })
  });
}

export function getGridsIdentifiers(userId, token) {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    }
  }

  return new Promise((resolve, reject) => {
    axios.get(apiUrl + 'grid/' + userId + '/tickers', headers)
      .then(res => {
        resolve(res.data)
      })
      .catch(e => {
        reject(e)
      })
  });
}

export function fetchNews(tick) {
  return new Promise((resolve, reject) => {
    axios.get(apiUrl + 'fetchNews/?tick=' + tick)
      .then(res => {
        resolve(res.data)

      })
      .catch(error => reject(error))
  });
}

export function deleteGrid(gridId, token) {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    }
  }

  return new Promise((resolve, reject) => {
    axios.delete(apiUrl + 'grid/' + gridId, headers)
      .then(res => {
        resolve(res)
      })
      .catch(e => {
        reject(e)
      })
  });
}

export function fetchPriceData(ticker, period, token) {

  const data = {
    ticker: ticker,
    amount: period,
    period: 'DAY',
    granularity: 'DAILY'
  }

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    }
  }
  return new Promise((resolve, reject) => {
    axios.post(apiUrl + 'stocks/priceHistory', data, headers)
      .then(res => {
        console.log("fetchPriceData", res)
        resolve(res.data)

      })
      .catch(error => reject(error))
  });
}

export function fetchDividendData(ticker, period, token) {

  const data = {
    ticker: ticker,
    amount: period,
    period: 'DAY',
  }

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    }
  }

  return new Promise((resolve, reject) => {
    axios.post(apiUrl + 'stocks/dividendHistory', data, headers)
      .then(res => {
        console.log("fetchDividendData", res)
        resolve(res.data)

      })
      .catch(error => reject(error))
  });
}

export function fetchIndicators(tick) {
  return new Promise((resolve, reject) => {
    axios.get(apiUrl + 'stocks/stats/' + tick)
      .then(res => {
        resolve(res.data)

      })
      .catch(error => reject(error))
  });
}

export function getQuoteData(tick, token) {

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    }
  }

  return new Promise((resolve, reject) => {
    axios.get(apiUrl + 'stocks/data/' + tick, headers)
      .then(res => {
        console.log("getQuoteData", res)
        resolve(res.data)
      })
  });
}


export function getTickers(page, search, exchange, token) {

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    }
  }

  return new Promise((resolve, reject) => {
    axios.get(apiUrl + 'ticker/' + exchange + '/' + search, headers)
      .then(res => {
        resolve(res.data)
      })
      .catch(error => reject(error))
  });
}

// export function getGridsIdentifiers(user) {
//   return new Promise((resolve, reject) => {
//     axios.get(apiUrl + 'getUserIdentifiers/?user=' + user)
//       .then(res => {
//         res = JSON.parse(res.data).map(el => el.identifier)
//         resolve(res)

//       })
//       .catch(error => reject(error))
//   });
// }


export function addUser(email, password) {
  const headers = { headers: { 'Content-Type': 'application/json' } }

  const avatar = {
    topType: '.',
    hairColor: '.',
    hatColor: '.',
    accessoriesType: '.',
    facialHairType: '.',
    facialHairColor: '.',
    clotheType: '.',
    clotheColor: '.',
    graphicType: '.',
    eyeType: '.',
    eyebrowType: '.',
    mouthType: '.',
    skinColor: '.'
  }
  return new Promise((resolve, reject) => {
    axios.post(apiUrl + 'user/register', { name: email.split("@")[0], email: email, password: password, avatar: avatar }, headers)
      .then(res => {
        resolve(res)
      })
  })
}


export function checkPermission(email, jwt, roleRequired) {
  return new Promise((resolve, reject) => { resolve({ permited: true }) })

  // const headers = {headers: {'Content-Type': 'application/json'}}
  // const data = {
  //   data:  JSON.stringify({email: email, jwt: jwt, role: roleRequired})
  // };
  // return new Promise((resolve, reject) => {
  //   axios.post(apiUrl+'check_permission', data, headers)
  //   .then(res => {
  //     console.log("check_permission res", res)
  //     resolve(res)
  //   })
  // })
}

export function get_user_data(email) {
  return new Promise((resolve, reject) => {
    axios.get(apiUrl + 'get_user_data/?email=' + email)
      .then(res => {
        resolve(res)
      })
  });
}



