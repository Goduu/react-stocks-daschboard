import axios from 'axios';

const apiUrl = 'http://127.0.0.1:5000/api/';

export function login(credentials){
  const headers = {headers: {'Content-Type': 'application/json'}}
  const data = {
    data:  JSON.stringify(credentials)
  };
  return new Promise((resolve, reject) => {
    axios.post(apiUrl+'login', data,headers)
      .then(res => {
        resolve(res)
      })
      .catch(e =>{
        reject(e)
      })
  });
}

export function saveGridElements(identifier, user,gridElements, layout){
  const headers = {headers: {'Content-Type': 'application/json'}}
  const data = {
    data:  JSON.stringify({id: identifier, user: user, grid: gridElements, layout: layout } )
  };
  return new Promise((resolve, reject) => {
    axios.post(apiUrl+'post_grid_elements', data,headers)
      .then(res => {
        resolve(res)
      })
      .catch(e =>{
        reject(e)
      })
  });
}

export function fetchGridElements(user){
  const headers = {headers: {'Content-Type': 'application/json'}}
  const data = {
    data:  JSON.stringify({user: user } )
  };
  return new Promise((resolve, reject) => {
    axios.post(apiUrl+'get_grid_elements', data,headers)
      .then(res => {
        resolve(res)
      })
      .catch(e =>{
        reject(e)
      })
  });
}

export function fetchPriceData(tick, period){
  return new Promise((resolve, reject) => {
    console.log("fetchPriceData",tick, period)
    axios.get(apiUrl+'priceData/?tick=' + tick + '&period=' + period)
      .then(res => {
          console.log("res price", res.data)
          resolve(res.data)
        
      })
      .catch(error => reject(error))
  });
}

export function fetchDividendData(tick, period){
  return new Promise((resolve, reject) => {
    console.log("fetchDividendData",tick, period)
    axios.get(apiUrl+'dividendData/?tick=' + tick + '&period=' + period)
      .then(res => {
          console.log("res dividend", res.data)
          resolve(res.data)
        
      })
      .catch(error => reject(error))
  });
}

export function getTickers(page, search,exchange){
  return new Promise((resolve, reject) => {
    console.log("getTickers",page, search)
    axios.get(apiUrl+'getTickers/?page=' + page + '&search=' + search + '&exchange=' + exchange)
      .then(res => {
          console.log("res getTickers", JSON.parse(res.data))
          resolve(JSON.parse(res.data))
        
      })
      .catch(error => reject(error))
  });
}

export function getGridsIdentifiers(user){
  return new Promise((resolve, reject) => {
    console.log("getUserIdentifiers",user)
    axios.get(apiUrl+'getUserIdentifiers/?user=' + user)
      .then(res => {
        res = JSON.parse(res.data).map(el => el.identifier)
        console.log("res getUserIdentifiers",res)
          resolve(res)
        
      })
      .catch(error => reject(error))
  });
}


export function addUser(email, password){
  const headers = {headers: {'Content-Type': 'application/json'}}
  const data = {
    data:  JSON.stringify({email: email, password: password})
  };
  return new Promise((resolve, reject) => {
    axios.post(apiUrl+'add_user', data, headers)
    .then(res => {
      console.log("add user res", res)
      resolve(res)
    })
  })
}


export function checkPermission(email, jwt, roleRequired){
  return new Promise((resolve, reject) => { resolve({permited: true})})
  
  const headers = {headers: {'Content-Type': 'application/json'}}
  const data = {
    data:  JSON.stringify({email: email, jwt: jwt, role: roleRequired})
  };
  return new Promise((resolve, reject) => {
    axios.post(apiUrl+'check_permission', data, headers)
    .then(res => {
      console.log("check_permission res", res)
      resolve(res)
    })
  })
}

export function get_user_data(email){
  return new Promise((resolve, reject) => {
    axios.get(apiUrl+'get_user_data/?email='+ email)
      .then(res => {
        resolve(res)
      })
  });
}

export function get_analysts_info(){
    axios.get(apiUrl+'analyst_info/')
      .then(res => {
        let result = {}
        result['earnings_estimate'] = JSON.parse(res.data[0])
        result['revenue_estimate'] = JSON.parse(res.data[1])
        result['earnings_history'] = JSON.parse(res.data[2])
        result['EPS_trend'] = JSON.parse(res.data[3])
        result['EPS_revisions'] = JSON.parse(res.data[3])
        result['growth_estimates'] = JSON.parse(res.data[3])
        console.log(result)
        return result
      })
  }

export function get_live_price(tick){
  return new Promise((resolve, reject) => {
    axios.get(apiUrl+'price/?tick=' + tick)
      .then(res => {
        if(res.data.price){
          resolve(res.data.price.toFixed(2))
        }
      })
      .catch(error => reject(error))
  });
}



export function getQuoteData(tick){
  return new Promise((resolve, reject) => {
    axios.get(apiUrl+'quote_data/?tick=' + tick)
      .then(res => {
        resolve(res.data)
      })
  });
}

export function getEarningsHistory(tick){
  return new Promise((resolve, reject) => {
    axios.get(apiUrl+'get_earnings_history/?tick=' + tick)
      .then(res => {
        console.log('get_earns_history',res )
        resolve(res.data)
      })
  });
}

export function getData(tick){
  return new Promise((resolve, reject) => {
    axios.get(apiUrl+'data/?tick='+ tick)
      .then(res => {
        let close_data = res.data.close
        let values = []
        let dates = []
        for(let date in close_data){
            if(date && close_data[date]){
            values.push(close_data[date].toFixed(2))
            dates.push(new Date(date*1).toLocaleDateString())}
        }
        resolve([dates, values])
      })
  });
}

export function getDividends(tick){
  console.log("TICK no request", tick)
  return new Promise((resolve, reject) => {
    axios.get(apiUrl+'dividends/?tick='+tick)
      .then(res => {
        console.log(res)
        let dividend = res.data.dividend
        let values = []
        let dates = []
        for(let date in dividend){
            values.push(dividend[date].toFixed(2))
            dates.push(new Date(date*1).toLocaleDateString())
        }
        console.log(dates,values)
        resolve([dates, values])
      })
  });
}