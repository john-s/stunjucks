![build status](https://circleci.com/gh/john-s/stunjucks.svg?style=shield&circle-token=:circle-token)
# Stunjucks

Stunjucks is a static site pico-framework for Node.js.  It uses [Nunjucks](https://mozilla.github.io/nunjucks/) as it's templateing engine.

You supply the templates and specify the routes and context.  Stunjucks builds a static site with a directory structure based on your routes.

### Use case

The main use case for Stunjucks is creating static sites that are served directly from a CDN (e.g. GitHub Pages, Amazon S3) or from a traditional webserver (e.g. [Nginx](https://www.nginx.com/resources/wiki/), [Apache](https://httpd.apache.org/)).

Another use case is quick migration of high-traffic urls off of Python frameworks that use similar templating engines, such as the [Jinja2](http://jinja.pocoo.org/) and [Django](https://www.djangoproject.com/) template engines.  By making high-traffic, non-dynamic pages (e.g. root hero page, landing pages, FAQs, about us pages) totally static, one can avoid many scalability issues. Since Nunjucks is very similar to Jinja2, and therefore the Django templating framework, migrating the templates to Nunjucks is fairly trivial.

### Usage

#### Command line usage

##### Installation

`npm install -g stunjucks`

##### Example

In `mystunjucks.config.js`:
```
module.exports = {
    templateDir: 'templateDir/',
    outputDir: 'static/',
    routes: [
        {
            url: '/landing/deserve/',
            templateName: 'landing.html',
            context: {
                currentYear: new Date().getFullYear(),
                heroCopy: 'The static site framework you deserve!'
            },
        },
        {
            url: '/faq/',
            templateName: 'faq.html'
        },
    ],
    globalContext: {
        companyName: 'NewCo, Inc.'
    }
};
```

From the directory that contains your config file run:
`$ stunjucks mystunjucks.config.js`


#### Programmatic usage

##### Installation

`npm install stunjucks`

##### Example

```
var stunjucks = require('stunjucks');

var stunjucksConfig = {
    templateDir: 'templateDir/',
    outputDir: 'static/',
    routes: [
        {
            url: '/landing/deserve/',
            templateName: 'landing.html',
            context: {
                currentYear: new Date().getFullYear(),
                heroCopy: 'The static site framework you deserve!'
            },
        },
        {
            url: '/faq/',
            templateName: 'faq.html'
        },
    ],
    globalContext: {
        companyName: 'NewCo, Inc.'
    }
};

// Call stunjucks with config
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
