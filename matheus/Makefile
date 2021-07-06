###################
# NODE Server API
###################

run:
	docker stop gizele || exit 0
	docker rm -f gizele || exit 0
	docker build -t gizele-img .
	docker run --name gizele -d -p 3000:3000 --network="host" --restart always gizele-img
	docker logs -f gizele

stop:
	docker stop gizele || exit 0

remove:
	docker stop gizele || exit 0
	docker rm -f gizele || exit 0
	docker image rm gizele-img || exit 0

build:
	docker build -t gizele-img .
