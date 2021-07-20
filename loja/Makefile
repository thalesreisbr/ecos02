###################
# NODE Server API
###################

run:
	docker stop Loja || exit 0
	docker rm -f Loja || exit 0
	docker build -t Loja-img .
	docker run --name Loja -d -p 3000:3000 --network="host" --restart always Loja-img
	docker logs -f Loja

stop:
	docker stop Loja || exit 0

remove:
	docker stop Loja || exit 0
	docker rm -f Loja || exit 0
	docker image rm Loja-img || exit 0

build:
	docker build -t Loja-img .
