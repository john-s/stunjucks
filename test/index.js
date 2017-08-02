var assert = require('assert');
var stunjucks = require('../index');
var rimraf = require('rimraf');
var fs = require('fs');

describe('Stunjucks', function(){
    var stunjucksConfig = {
        templateDir: 'test/templateDir/',
        outputDir: 'test/static/',
        routes: [
            {
                url: '/',
                templateName: 'test.html',
                context: {
                    title: 'This is a test'
                }

            }
        ]
    };
    stunjucks(stunjucksConfig);
    it('renders directory structure according to config', function(){
        fs.accessSync('./test/static/index.html', fs.F_OK);
    });
    it('renders templates accurately', function(){
        var data = fs.readFileSync('test/static/index.html', 'utf-8');
        assert(data == 'This is a test');
        assert(data != 'This is not a test');
        console.log(data);
        // cleanup
        rimraf.sync('./test/static/', {}, function(err){
            if (err) {
                if (err) throw err;
            }
        });
    });

});