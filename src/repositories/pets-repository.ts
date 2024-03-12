import { $Enums, Pet, Prisma } from '@prisma/client'

export interface FindPetsArgs {
  city: string
  age?: number
  energy?: $Enums.Energy
  size?: $Enums.Size
  independence?: $Enums.Size
  sex?: $Enums.Sex
  type?: $Enums.Type
  environment?: $Enums.Size
}

export interface PetsRepository {
  create: (data: Prisma.PetUncheckedCreateInput) => Promise<Pet>
  find: (params: FindPetsArgs, page: number) => Promise<Pet[] | null>
  findById: (id: string) => Promise<Pet | null>
}
