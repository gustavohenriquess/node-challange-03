.PHONY: all dev_dependencies eslint_config files gh

LINTFILE = ./.eslintrc.json
LINTIGNORE = ./.eslintignore

all: create_project folder_structure dependencies dev_dependencies files 

create_project:
	npm init -y
	@echo "save-exact=true" > .npmrc

dependencies:
	npm install fastify @fastify/cookie @fastify/jwt bcryptjs dotenv zod @prisma/client

dev_dependencies:
	npm install -D typescript tsx tsup @types/node @types/bcryptjs prisma
	npm install -D eslint @rocketseat/eslint-config
	npm install -D vitest @vitest/ui vite-tsconfig-paths supertest @types/supertest @vitest/coverage-v8
	npm install -D @faker-js/faker

eslint_config:
	@echo "{"\
	"\"extends\": [\"@rocketseat/eslint-config/node\"],"\
	"\"rules\": {"\
	"\"camelcase\": \"off\","\
	"\"no-useless-constructor\": \"off\""\
	"}"\
	"}" > ${LINTFILE}
	
	@echo "node_modules\nbuild" > ${LINTIGNORE}

	#npx eslint .eslintrc.json --fix --rule 'no-unused-expressions: "off"'

folder_structure:
	mkdir src
	mkdir src/@types
	mkdir src/env
	mkdir src/http
	mkdir src/http/controllers
	mkdir src/http/middlewares
	mkdir src/lib
	mkdir src/repositories
	mkdir src/repositories/in-memory
	mkdir src/use-cases
	mkdir src/use-cases/erros
	mkdir src/use-cases/factories
	mkdir src/utils
	mkdir .github
	mkdir .github/workflows
	mkdir test
	mkdir test/factories

files: eslint_config gh_workflows

	@echo "node_modules\nbuild\ncoverage\n\n.env" > .gitignore
	
	@echo "NODE_ENV=dev\nPORT=3333" > .env
	@echo "NODE_ENV=dev\nPORT=3333" > .env.example

	@echo "# PROJECT" > README.md

	npx tsc --init

gh_workflows:
	@echo "name: Run Unit Tests\n\n"\
	"on: [push]\n\n"\
	"jobs:\n"\
	"  run-unit-tests:\n"\
	"    name: Run Unit Tests\n"\
	"    runs-on: ubuntu-latest\n"\
	"    steps:\n"\
	"      - uses: actions/checkout@v4\n\n"\
	"      - uses: actions/setup-node@v4\n"\
	"        with:\n"\
	"          node-version: 18\n"\
	"          cache: 'npm'\n"\
	"      - run: npm ci\n"\
	"      - run: npm run test\n" > .github/workflows/run-unit-tests.yml

	@echo "name: Run e2e Tests\n\n"\
	"on: [pull_request]\n\n"\
	"jobs:\n"\
	"  run-unit-tests:\n"\
	"    name: Run e2e Tests\n"\
	"    runs-on: ubuntu-latest\n\n"\
	"    services:\n"\
	"      postgres:\n"\
	"          image: bitnami/postgresql:latest\n"\
	"          ports:\n"\
	"            - 5432:5432\n"\
	"          env:\n"\
	"            POSTGRESQL_USERNAME: docker\n"\
	"            POSTGRESQL_PASSWORD: docker\n"\
	"            POSTGRESQL_DATABASE: database\n\n"\
	"    steps:\n"\
	"      - uses: actions/checkout@v4\n\n"\
	"      - uses: actions/setup-node@v4\n"\
	"        with:\n"\
	"          node-version: 18\n"\
	"          cache: 'npm'\n"\
	"      - run: npm ci\n\n"\
	"      - run: npm run test:e2e\n"\
	"        env:\n"\
	"          JWT_SECRET: teste_e2e\n"\
	"          DATABASE_URL: postgresql://docker:docker@localhost:5432/database?schema=public" > .github/workflows/run-e2e-tests.yml
