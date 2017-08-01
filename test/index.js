var should = require('chai').expect;
var stunjucks = require('../index');
var rimraf = require('rimraf');
var fs = require("fs");

describe('Stunjucks render', function(){
    it('Renders templates according to config', function(){
        var stunjucksConfig = {
            templateDir: 'test/templateDir/',
            outputDir: 'test/static/',
            routes: [
                {
                    url: '/',
                    templateName: 'test.html',
                    context: {
                        'somevar': 'this is a test'
                    }

                }
            ]
        };
        stunjucks(stunjucksConfig);
        fs.readFileSync('./test/static/index.html', 'utf-8', function(err, data) {
            console.log(err);
            expect(!err);
            expect(data == 'this is a test');
            // cleanup
            rimraf('./test/static/', function(err){
                if (err) {
                    if (err) throw err;
                }
            });

        });
    });
});