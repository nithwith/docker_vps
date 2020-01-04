#!/usr/bin/env bash
docker network create web
docker-compose \
	-f docker-compose-traefik.yml \
	-f docker-compose-db.yml \
	-f docker-compose-nextcloud.yml \
	-f docker-compose-hugo.yml \
        pull

docker-compose \
    -f docker-compose-traefik.yml \
    -f docker-compose-db.yml \
	-f docker-compose-hugo.yml \
	-f docker-compose-nextcloud.yml \
        up
