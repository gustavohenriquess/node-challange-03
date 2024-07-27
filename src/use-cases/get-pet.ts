import { PetsComplementsRepository } from '@/repositories/pets-complements-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet, PetComplement } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface GetPetRequest {
  id: string
}

interface GetPetResponse extends Pet {
  complements?: PetComplement[] | null
}

export class GetPetUseCase {
  constructor(
    private petRepo: PetsRepository,
    private petComplementRepo: PetsComplementsRepository,
  ) {}

  async execute({ id }: GetPetRequest): Promise<GetPetResponse> {
    const pet = await this.petRepo.findById(id)

    if (!pet) throw new ResourceNotFoundError()

    const complements = await this.petComplementRepo.findByPetId(id)

    return {
      ...pet,
      complements,
    }
  }
}
