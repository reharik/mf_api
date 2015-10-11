NAME=api
VERSION=latest

test:
	./node_modules/.bin/mocha -w -d --recursive

clean:
	rm -rf ./node_modules
	npm install

install:
	rm -rf ./node_modules
	npm install

docker-build:
	docker build -t $(NAME) .

run:	#docker-build
	docker-compose run --rm api

jenkins-cover:
	./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha -- --recursive test -R spec
	CODECLIMATE_REPO_TOKEN=fe8532fa67feabb2f94fa982a648b255ade5e5b55ff20e92bb330b3eb4a31852 ./node_modules/.bin/codeclimate-test-reporter < coverage/lcov.info

.PHONY: test clean install docker-build run jenkins-cover
