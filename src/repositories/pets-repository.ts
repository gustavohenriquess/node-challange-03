import { $Enums, Pet, Prisma } from '@prisma/client'

export interface FindPetsArgs {
  city: string
  age: number | null
  energy: $Enums.Energy | null
  size: $Enums.Size | null
  independence: $Enums.Size | null
  sex: $Enums.Sex | null
  type: $Enums.Type | null
  environment: $Enums.Size | null
}

export interface PetsRepository {
  create: (data: Prisma.PetUncheckedCreateInput) => Promise<Pet>
  findByCity: (name: string) => Promise<Pet | null>
  find: (params: FindPetsArgs) => Promise<Pet | null>
  findById: (id: string) => Promise<Pet | null>
}
