#!/usr/bin/env bash
docker network create web
docker-compose \
	-f docker-compose-traefik.yml \
        -f docker-compose-db.yml \
	-f docker-compose-wordpress.yml \
        pull

docker-compose \
        -f docker-compose-traefik.yml \
        -f docker-compose-db.yml \
	-f docker-compose-wordpress.yml \
        up
