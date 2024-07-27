import axios from 'axios'
import { GetCepResponse, LocationService } from '../location'

export class LocationServicePartner implements LocationService {
  async getCep(postal_code: string): Promise<GetCepResponse> {
    try {
      const {
        data: { localidade: city, uf: state },
      } = await axios.get(`https://viacep.com.br/ws/${postal_code}/json`)
      return {
        city,
        state,
      }
    } catch (error) {
      console.log('error on Location Service')
      throw error
    }
  }
}
