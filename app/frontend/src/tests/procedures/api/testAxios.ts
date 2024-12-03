import axios from "axios"


export default async function testAxios() {
  
  console.log("testing Axios...")

  let axiosInstance = axios.create({
    baseURL: "http://backend:8000/api",
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await axiosInstance.get('/business/products');

  console.log(data.data.results)
}
