# Stunjucks

Stunjucks is a static site pico-framework that uses the Nunjucks templating engine.

You supply the templates and specify the routes and context.  Stunjucks builds a static site with a directory structure based on your routes.

### Use case

The main use case for Stunjucks is creating static sites that are served directly from a CDN (e.g. GitHub Pages, Amazon S3) or from a traditional webserver (e.g. Nginx, Apache).

Another use case is quick migration of high-traffic urls off of Python frameworks that use similar templating engines, such as the Jinja2 and Django template engines.  By making high-traffic, non-dynamic pages (e.g. root hero page, landing pages, FAQs, about us pages) totally static, one can avoid many scalability issues. Since Nunjucks is very similar to Jinja2 and therefore the Django templating framework, migrating the templates to Nunjucks is fairly trivial.

### Usage

```
var stunjucksConfig = {
    templateDir: 'templateDir/',
    outputDir: 'static/',
    routes: [
        {
            url: '/',
            templateName: 'homepage.html',
            context: {
                companyName: 'NewCo, Inc.',
                currentYear: new Date().getFullYear()
            },
        },
        {
            url: '/faq/',
            templateName: 'faq.html',
            context: {
                companyName: 'NewCo, Inc.'
            },
        },
    ]
};
stunjucks(stunjucksConfig);
```

### Testing

`npm test`


### Nginx example configs

The basic example:

```
server {
    listen 80;
    server_name www.mysite.com;

    location / {
        root /home/username/path/to/project/static/directory/;
        try_files $uri $uri/index.html =404;
    }
}
```

Alternatively, Nginx can try the url for the static file before defaulting to a webapp (e.g. Flask, Django)
```
server {
    listen 80;
    server_name www.mysite.com;

    location / {
        root /home/username/path/to/project/static/directory/;
        try_files $uri $uri/index.html @mywebapp;
    }
    location @mywebapp {
        proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_redirect off;
        proxy_pass http://127.0.0.1:8001;
        proxy_read_timeout 300s;
    }
}
```
