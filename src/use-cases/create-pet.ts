import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsComplementsRepository } from '@/repositories/pets-complements-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet, PetComplement } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface Complements {
  photo_url?: string | undefined
  requirement?: string | undefined
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
  complements?: Complements[] | undefined
}

interface CreatePetResponse extends Pet {
  complements?: PetComplement[]
}

export class CreatePetUseCase {
  constructor(
    private petRepo: PetsRepository,
    private petComplementRepo: PetsComplementsRepository,
    private orgRepo: OrgsRepository,
  ) {}

  async execute({
    name,
    about,
    age,
    energy,
    size,
    independence,
    sex,
    type,
    environment,
    orgId,
    complements,
  }: CreatePetRequest): Promise<CreatePetResponse> {
    const org = await this.orgRepo.findById(orgId)

    if (!org) throw new ResourceNotFoundError()

    const pet = await this.petRepo.create({
      name,
      about,
      age,
      energy,
      size,
      independence,
      city: org.city,
      sex,
      type,
      environment,
      org_id: orgId,
    })
    let petComplements: PetComplement[] = []

    if (complements) {
      petComplements = await Promise.all(
        complements.map(async (complement) => {
          const complementCreated = await this.petComplementRepo.create({
            ...complement,
            pet_id: pet.id,
          })
          return complementCreated
        }),
      )
    }
    return { ...pet, complements: petComplements }
  }
}
