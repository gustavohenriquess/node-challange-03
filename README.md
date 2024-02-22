# Find a Friend

## Regras da aplicação
- [ ] Deve ser possível cadastrar um pet
- [ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [ ] Deve ser possível filtrar pets por suas características
- [ ] Deve ser possível visualizar detalhes de um pet para adoção
- [ ] Deve ser possível se cadastrar como uma ORG
- [ ] Deve ser possível realizar login como uma ORG

## Regras de negócio
- [ ] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [ ] Uma ORG precisa ter um endereço e um número de WhatsApp
- [ ] Um pet deve estar ligado a uma ORG
- [ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [ ] Todos os filtros, além da cidade, são opcionais
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada


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
[CEP](https://brasilaberto.com/docs/v2/zipcode)
