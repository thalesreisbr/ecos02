###################
# NODE Server API
###################

run:
	docker stop curso || exit 0
	docker rm -f curso || exit 0
	docker build -t curso-img .
	docker run --name curso -d -p 3000:3000 --network="host" --restart always curso-img
	docker logs -f curso

stop:
	docker stop curso || exit 0

remove:
	docker stop curso || exit 0
	docker rm -f curso || exit 0
	docker image rm curso-img || exit 0

build:
	docker build -t curso-img .
