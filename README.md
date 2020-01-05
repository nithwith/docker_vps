## Getting started
First you need docker, and that's pretty much it. 

Add your .env file for define :

`PROXY_DOMAIN`
`DB_DOMAIN`
`WORDPRESS_DOMAIN`
`NEXTCLOUD_DOMAIN`
`PORTAINER_DOMAIN`
`NEXTCLOUD_ADMIN_USER`
`NEXTCLOUD_ADMIN_PASSWORD`
`NEXTCLOUD_DB`
`MYSQL_USER`
`MYSQL_PASSWORD`


After just launch `bash start_all.sh` and it will launch al the services

- traefik for reverse proxy
- ghost for CMS
- nextcloud for personnal cloud platform
- portainer for docker management
- phpmyadmin for db management