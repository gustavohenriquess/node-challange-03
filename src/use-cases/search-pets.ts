import { PetsComplementsRepository } from '@/repositories/pets-complements-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface SearchPetsRequest {
  city: string
  page: number
  age?: number
  energy?: 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE'
  size?: 'SMALL' | 'MEDIUM' | 'LARGE'
  independence?: 'SMALL' | 'MEDIUM' | 'LARGE'
}

interface SearchPetsResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(
    private petRepo: PetsRepository,
    private petComplementRepo: PetsComplementsRepository,
  ) {}

  async execute(data: SearchPetsRequest): SearchPetsResponse {}
}
