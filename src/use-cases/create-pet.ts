import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsComplementsRepository } from '@/repositories/pets-complements-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet, PetComplement } from '@prisma/client'

interface Complements {
  photo_url?: string
  requirement?: string
}

interface CreatePetRequest {
  name: string
  about: string
  age: number
  energy: 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE'
  size: 'SMALL' | 'MEDIUM' | 'LARGE'
  independence: 'SMALL' | 'MEDIUM' | 'LARGE'
  sex: 'MALE' | 'FEMALE'
  type: 'DOG' | 'CAT' | 'BIRD' | 'FISH' | 'REPTILE' | 'RODENT' | 'OTHER'
  environment: 'SMALL' | 'MEDIUM' | 'LARGE'
  orgId: string
  complements?: Complements[]
}

interface CreatePetResponse {
  pet: Pet
  complements?: PetComplement[]
}

export class CreatePetUseCase {
  constructor(
    private petRepo: PetsRepository,
    private petComplementRepo: PetsComplementsRepository,
    private orgRepo: OrgsRepository,
  ) {}

  async execute(data: CreatePetRequest): Promise<CreatePetResponse> {}
}
