import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsComplementsRepository } from '@/repositories/pets-complements-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet, PetComplement } from '@prisma/client'

interface GetPetRequest {
  id: string
}

interface GetPetResponse {
  pet: Pet
  complements?: PetComplement[]
}

export class GetPetUseCase {
  constructor(
    private petRepo: PetsRepository,
    private petComplementRepo: PetsComplementsRepository,
  ) {}

  async execute(data: GetPetRequest): Promise<GetPetResponse> {}
}
