import axios from 'axios'
import TokenServices from '@/services/token'
class ApiServices {
  constructor () {
    this.service = axios.create({
      baseURL: 'http://localhost:9090'
    })
    
    this.tokenService = TokenServices

    this.service.interceptors.request.use((config) => {
      if (this.tokenService.token() !== undefined) {
        config.headers.Authorization = `Bearer ${this.tokenService.token()}`
      }
      return config
    })
  }

  signup (data) {
    return this.service.post('/user/signup', data)
  }
}
export default ApiServices
// # sourceMappingURL=api.js.map
