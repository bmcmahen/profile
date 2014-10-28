build: node_modules
	@node builder.js

node_modules: package.json
	npm install

.PHONY: build
