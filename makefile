.PHONY: all dev_dependencies eslint_config files

LINTFILE = ./.eslintrc.json
LINTIGNORE = ./.eslintignore

all: create_project dependencies dev_dependencies files folder_structure

create_project:
	npm init -y
	@echo "save-exact=true" > .npmrc

dependencies:
	npm install fastify @fastify/cookie @fastify/jwt bcryptjs dotenv zod @prisma/client

dev_dependencies:
	npm install -D typescript tsx tsup @types/node @types/bcryptjs prisma
	npm install -D eslint @rocketseat/eslint-config
	npm install -D vitest @vitest/ui vite-tsconfig-paths supertest @types/supertest @vitest/coverage-v8

eslint_config:
	@echo "{"\
	"\"extends\": [\"@rocketseat/eslint-config/node\"],"\
	"\"rules\": {"\
	"\"camelcase\": \"off\","\
	"\"no-useless-constructor\": \"off\""\
	"}"\
	"}" > ${LINTFILE}
	
	@echo "node_modules\nbuild" > ${LINTIGNORE}

	npx eslint .eslintrc.json --fix --rule 'no-unused-expressions: "off"'

folder_structure:
	mkdir src
	mkdir src/@types
	mkdir src/env
	mkdir src/http
	mkdir src/lib
	mkdir src/repositories
	mkdir src/repositories/in-memory
	mkdir src/use-cases
	mkdir src/use-cases/erros
	mkdir src/use-cases/factories
	mkdir src/utils
	mkdir .github
	mkdir .github/workflows

files: eslint_config
	@echo "node_modules\nbuild\ncoverage\n\n.env" > .gitignore
	
	@echo "NODE_ENV=dev\nPORT=3333" > .env
	@echo "NODE_ENV=dev\nPORT=3333" > .env.example

	@echo "# PROJECT" > README.md

	npx tsc --init