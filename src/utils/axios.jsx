import axios from "axios";

const instance = axios.create({
  baseURL:"https://api.themoviedb.org/3/",
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YjU2MzA3ZjVhMDgxYjFlMTlhYjIxNzk1N2Q1Yzk3ZiIsIm5iZiI6MTc0MjY2MDM0OS41MDg5OTk4LCJzdWIiOiI2N2RlZTJmZDI5OTIzNzg0OTM3YWI5YmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.X3aRHyjLjqoGEOjm45FCuFUudnDT3kLzUA1jRbbPvfY'
  }
})

export default instance;