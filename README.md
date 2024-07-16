# Find a Friend

## Regras da aplicação
- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG

## Regras de negócio
- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## ToDO
- [x] Melhorar Filter pets inMemory
- [x] Criar Prisma Repositories
- [x] Criar Factories
- [ ] Criar Rotas HTTP
- [ ] Criar Testes 2e2
- [ ]

## Pets
- id
- name
- about
- age 
- energy [1 to 5]
- size [small, medium, large]
- independence [small, medium, large]
- sex [male, fem]
- type [cat, dog]
- environment
- pets_complements[]
- ORG

## Pets Complements
- id
- pet_id
- photo
- requirement

## ORGs
- id
- name
- person_responsible
- postal_code
- cell_phone
- password_hash
- state
- city
- latitude
- longitude
- pets[]


## Services
[CEP_1](https://brasilaberto.com/docs/v1/zipcode)
[CEP_2](https://viacep.com.br/ws/09070000/json)
