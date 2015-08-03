NAME=mf/api
#CVERSION=$$(git rev-parse --short HEAD)
TEST_CONTAINER_NAME=test_$$(date +"%s")

test:
	./node_modules/mocha/bin/mocha --ui bdd --recursive

install:
	rm -rfv ./node_modules
	npm install

clean:
	#rm -fv npm-shrinkwrap.json
	rm -rfv ./node_modules
	npm install
	#npm shrinkwrap

docker-build:
	docker build -t $(NAME) .
	#docker tag -f $(NAME):$(VERSION) $(NAME):latest
	#docker tag -f $(NAME):$(VERSION) $(NAME):$(BUILD_ENV) 2>/dev/null

docker-run:
	docker run --env=NODE_ENV=$(NODE_ENV) $(NAME)

docker-test:
	docker run --env=NODE_ENV=test --name=$(TEST_CONTAINER_NAME) $(NAME) -t

docker-compose-test:
	cat docker-compose-test.yml.template | sed "s/{version}/$(VERSION)/" > docker/docker-compose-test.yml
	docker-compose  -f docker-compose-test.yml up --allow-insecure-ssl

docker-push:
	docker push $(NAME)

docker-clean:
	docker rmi -f $(NAME)

#aws-build:
#	cat docker/Dockerrun.aws.json.template | sed "s/{version}/$(VERSION)/" > deployment/Dockerrun.aws.json

.PHONY: test install clean docker-build docker-run docker-test docker-compose-test docker-push docker-clean
#aws-build
