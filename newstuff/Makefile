NAME=xolocalvendors/reviews-api
VERSION=$$(git rev-parse --short HEAD)
TEST_CONTAINER_NAME=test_$$(date +"%s")

test:
	./node_modules/mocha/bin/mocha --ui tdd --recursive

install:
	rm -rfv ./node_modules
	npm install

clean:
	rm -fv npm-shrinkwrap.json
	rm -rfv ./node_modules
	npm install
	npm shrinkwrap

docker-build:
	docker build -t $(NAME):$(VERSION) -f docker/Dockerfile .
	docker tag -f $(NAME):$(VERSION) $(NAME):latest
	docker tag -f $(NAME):$(VERSION) $(NAME):$(BUILD_ENV) 2>/dev/null

docker-run:
	docker run --env=NODE_ENV=$(NODE_ENV) $(NAME):$(VERSION)

docker-test:
	docker run --env=NODE_ENV=test --name=$(TEST_CONTAINER_NAME) $(NAME):$(VERSION) -t

docker-compose-test:
	cat docker/docker-compose-test.yml.template | sed "s/{version}/$(VERSION)/" > docker/docker-compose-test.yml
	docker-compose  -f docker/docker-compose-test.yml up --allow-insecure-ssl

docker-push:
	docker push $(NAME):$(VERSION)

docker-clean:
	docker rmi -f $(NAME)

aws-build:
	cat docker/Dockerrun.aws.json.template | sed "s/{version}/$(VERSION)/" > deployment/Dockerrun.aws.json

.PHONY: test install clean docker-build docker-run docker-test docker-compose-test docker-push docker-clean aws-build
