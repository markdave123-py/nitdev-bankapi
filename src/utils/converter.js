import { config } from '../config/env.js';

var myHeaders = new Headers();

myHeaders.append("apikey", config.apiLayerKey)


var requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};


export const convertCurrency = async (from, to, amount) => {

    const response = await fetch(`https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions)

    if (response.status !== 200) {
        console.log('Error converting currency')
        return false;
    }

    const responseData = await response.json();
    console.log(responseData.result)

    return responseData.result;
}
