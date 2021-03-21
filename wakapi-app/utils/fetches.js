import axios from 'axios'

  export const getCountry = async () => {
    try {
      const response = await axios.get('https://restcountries.eu/rest/v2/')
      return response
    } catch (e) {
      throw e.response ? new Error(e.response.data.message) : new Error(e.message)
    }
  }