import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsComplementsRepository } from '@/repositories/pets-complements-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FetchCityPetRequest {
  city: string
}

interface FetchCityPetResponse {
  pets: Pet[]
}

export class FetchCityPetUseCase {
  constructor(
    private petRepo: PetsRepository,
    private petComplementRepo: PetsComplementsRepository,
    private orgRepo: OrgsRepository,
  ) {}

  async execute(data: FetchCityPetRequest): FetchCityPetResponse {}
}
