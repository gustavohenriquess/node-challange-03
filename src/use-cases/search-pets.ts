import { PetsComplementsRepository } from '@/repositories/pets-complements-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet, PetComplement } from '@prisma/client'

interface SearchPetsRequest {
  city: string
  page: number
  age?: number
  energy?: 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE'
  size?: 'SMALL' | 'MEDIUM' | 'LARGE'
  independence?: 'SMALL' | 'MEDIUM' | 'LARGE'
  type?: 'DOG' | 'CAT' | 'BIRD' | 'FISH' | 'REPTILE' | 'RODENT' | 'OTHER'
}

interface petFind extends Pet {
  complements: PetComplement[] | null
}

interface SearchPetsResponse {
  pets: petFind[]
}

export class SearchPetsUseCase {
  constructor(
    private petsRepo: PetsRepository,
    private petsComplementRepo: PetsComplementsRepository,
  ) {}

  async execute({
    city,
    page,
    age,
    energy,
    size,
    independence,
    type,
  }: SearchPetsRequest): Promise<SearchPetsResponse> {
    const pets = await this.petsRepo.find(
      {
        city,
        age,
        energy,
        size,
        independence,
        type,
      },
      page,
    )
    if (!pets) {
      return { pets: [] }
    }

    return {
      pets: await Promise.all(
        pets.map(async (pet) => {
          const complements = await this.petsComplementRepo.findByPetId(pet.id)
          return { ...pet, complements }
        }),
      ),
    }
  }
}
