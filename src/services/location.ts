export interface GetCepResponse {
  city: string
  state: string
}

export interface LocationService {
  getCep: (postal_code: string) => Promise<GetCepResponse>
}
