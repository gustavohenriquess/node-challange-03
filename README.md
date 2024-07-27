# Find a Friend
O projeto "Find a Friend" é uma aplicação dedicada a facilitar a adoção de pets, permitindo o cadastro de organizações (ORGs) e pets disponíveis para adoção.
Ela foi desenvolvida pela [Rocketseat](https://www.rocketseat.com.br/) como um [desafio](https://efficient-sloth-d85.notion.site/Desafio-03-0b927eb32dbd4f21ab40224ffdf6cf19#a32de3cb7ab146f4af1fa657e94697b1) para o Ignite.


## Boas Práticas Utilizadas:
- **Princípios SOLID**: A aplicação foi desenvolvida seguindo os princípios SOLID, garantindo um código mais limpo, modular e de fácil manutenção.

- **Test-Driven Development (TDD)**: O desenvolvimento foi conduzido utilizando TDD, assegurando que cada funcionalidade fosse testada antes da implementação, resultando em um código mais confiável e menos propenso a erros.

- **Testes Unitários**: Foram criados testes unitários para validar o comportamento isolado de cada componente, assegurando que as partes individuais do sistema funcionem corretamente.

- **Testes End-to-End (E2E)**: Implementação de testes E2E para simular a experiência do usuário, garantindo que todas as funcionalidades da aplicação funcionem como esperado em um ambiente realista.

- **GitHub Actions**: Utilização de GitHub Actions para automação dos testes, garantindo que todos os testes unitários e E2E sejam executados automaticamente em cada push ou pull request, assegurando a qualidade contínua do código.

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
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [x] Para uma ORG acessar a aplicação como admin, ela precisa efetuar login

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
- [CEP_1](https://brasilaberto.com/docs/v1/zipcode)
- [CEP_2](https://viacep.com.br/ws/09070000/json)
