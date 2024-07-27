import { GetCepResponse, LocationService } from '../location'

export class InMemoryLocationService implements LocationService {
  async getCep(): Promise<GetCepResponse> {
    return {
      city: 'SÃO PAULO',
      state: 'SP',
    }
  }
}
