#!/usr/bin/env bash
docker network create web
docker-compose \
	-f docker-compose-traefik.yml \
	-f docker-compose-portainer.yml \
	-f docker-compose-db.yml \
	-f docker-compose-nextcloud.yml \
	-f docker-compose-odoo.yml \
	-f docker-compose-ghost.yml \
        pull

docker-compose \
-f docker-compose-traefik.yml \
-f docker-compose-portainer.yml \
-f docker-compose-db.yml \
-f docker-compose-nextcloud.yml \
-f docker-compose-odoo.yml \
-f docker-compose-ghost.yml \
        up
