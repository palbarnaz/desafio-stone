import axios from "../../node_modules/axios/index";

const api = axios.create({
  baseURL: 'https://economia.awesomeapi.com.br'
}
)

export const getValueCurrency = async () => {
  const response = await api.get("/last/USD-BRL")
  return response.data
}