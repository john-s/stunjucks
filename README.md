# Stunjucks

Stunjucks is a static site pico-framework that uses the Nunjucks templating engine.

You supply the templates and specify the routes and context.  Stunjucks builds a static site with a directory structure based on your routes.

## Use cases

The main use case for Stunjucks is creating static sites that are served directly from a CDN (GitHub Pages, Amazon S3, Firebase) or from a traditional webserver (Nginx, Apache).

## Basic Nginx example config

```
server {
    listen 80;
    server_name www.mysite.com;

    location / {
        root /home/username/path/to/project/static/directory/;
        try_files $uri $uri/index.html =404;
    }
```
