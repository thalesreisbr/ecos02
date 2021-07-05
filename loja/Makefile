###################
# NODE Server API
###################

run:
	docker stop Loja-ESCOS12 || exit 0
	docker rm -f Loja-ESCOS12 || exit 0
	docker build -t Loja-ESCOS12-img .
	docker run --name Loja-ESCOS12 -d -p 3000:3000 --network="host" --restart always Loja-ESCOS12-img
	docker logs -f Loja-ESCOS12

stop:
	docker stop Loja-ESCOS12 || exit 0

remove:
	docker stop Loja-ESCOS12 || exit 0
	docker rm -f Loja-ESCOS12 || exit 0
	docker image rm Loja-ESCOS12-img || exit 0

build:
	docker build -t Loja-ESCOS12-img .
