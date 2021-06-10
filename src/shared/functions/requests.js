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

export function saveGridElements(gridId,identifier, userId, gridElements,token) {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    }
  }

  const data = 
    { id:gridId, identifier: identifier, userId: userId, gridElements: gridElements}
  
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

export function fetchNews(tick) {
  return new Promise((resolve, reject) => {
    axios.get(apiUrl + 'fetchNews/?tick=' + tick)
      .then(res => {
        resolve(res.data)

      })
      .catch(error => reject(error))
  });
}

export function deleteGrid(user, identifier) {
  const headers = { headers: { 'Content-Type': 'application/json' } }
  const data = {
    data: { user: user, identifier: identifier }
  };
  return new Promise((resolve, reject) => {
    axios.delete(apiUrl + 'deleteGrid', data, headers)
      .then(res => {
        resolve(res)
      })
      .catch(e => {
        reject(e)
      })
  });
}

export function fetchPriceData(tick, period) {
  return new Promise((resolve, reject) => {
    axios.get(apiUrl + 'stocks/priceHistory/' + tick)
      .then(res => {
        console.log("fetchPriceData", res)
        resolve(res.data)

      })
      .catch(error => reject(error))
  });
}

export function fetchDividendData(tick, period) {
  return new Promise((resolve, reject) => {
    axios.get(apiUrl + 'stocks/dividendHistory/' + tick)
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

export function getQuoteData(tick) {
  return new Promise((resolve, reject) => {
    axios.get(apiUrl + 'stocks/data/' + tick)
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
        axios.get(apiUrl + 'stocks/stats/FRT', headers)
      })
      .catch(error => reject(error))
  });
}

export function getGridsIdentifiers(user) {
  return new Promise((resolve, reject) => {
    axios.get(apiUrl + 'getUserIdentifiers/?user=' + user)
      .then(res => {
        res = JSON.parse(res.data).map(el => el.identifier)
        resolve(res)

      })
      .catch(error => reject(error))
  });
}


export function addUser(email, password) {
  const headers = { headers: { 'Content-Type': 'application/json' } }
  const data = {

  };
  return new Promise((resolve, reject) => {
    axios.post(apiUrl + 'user/register', { name: email.split("@")[0], email: email, password: password }, headers)
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

export function get_analysts_info() {
  axios.get(apiUrl + 'analyst_info/')
    .then(res => {
      let result = {}
      result['earnings_estimate'] = JSON.parse(res.data[0])
      result['revenue_estimate'] = JSON.parse(res.data[1])
      result['earnings_history'] = JSON.parse(res.data[2])
      result['EPS_trend'] = JSON.parse(res.data[3])
      result['EPS_revisions'] = JSON.parse(res.data[3])
      result['growth_estimates'] = JSON.parse(res.data[3])
      return result
    })
}

export function get_live_price(tick) {
  return new Promise((resolve, reject) => {
    axios.get(apiUrl + 'price/?tick=' + tick)
      .then(res => {
        if (res.data.price) {
          resolve(res.data.price.toFixed(2))
        }
      })
      .catch(error => reject(error))
  });
}


export function getEarningsHistory(tick) {
  return new Promise((resolve, reject) => {
    axios.get(apiUrl + 'get_earnings_history/?tick=' + tick)
      .then(res => {
        resolve(res.data)
      })
  });
}

export function getData(tick) {
  return new Promise((resolve, reject) => {
    axios.get(apiUrl + 'data/?tick=' + tick)
      .then(res => {
        let close_data = res.data.close
        let values = []
        let dates = []
        for (let date in close_data) {
          if (date && close_data[date]) {
            values.push(close_data[date].toFixed(2))
            dates.push(new Date(date * 1).toLocaleDateString())
          }
        }
        resolve([dates, values])
      })
  });
}

export function getDividends(tick) {
  return new Promise((resolve, reject) => {
    axios.get(apiUrl + 'dividends/?tick=' + tick)
      .then(res => {
        let dividend = res.data.dividend
        let values = []
        let dates = []
        for (let date in dividend) {
          values.push(dividend[date].toFixed(2))
          dates.push(new Date(date * 1).toLocaleDateString())
        }
        resolve([dates, values])
      })
  });
}