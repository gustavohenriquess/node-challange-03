import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FetchCityPetRequest {
  city: string
}

interface FetchCityPetResponse {
  pets: Pet[]
}

export class FetchCityPetUseCase {
  constructor(private petRepo: PetsRepository) {}

  async execute(data: FetchCityPetRequest): FetchCityPetResponse {}
}
