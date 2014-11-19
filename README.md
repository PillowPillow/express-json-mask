express-json-mask
=================

Express middleware for filtering the JSON responses

#Installation
    npm install --save express-json-mask

#Usage
````javascript
    var express = require('express'),
    expressJsonMask = require('express-json-mask'),
    app = express();
    
    var json = {
        name: 'Express',
        version: 'version',
        description: 'description',
        repository: {
            type: 'git',
            url: 'url'
        }
    };
    
    app.use(expressJsonMask(/*[optional] query parameter to use (defaults to fields)*/));
    // example: app.use(expressJsonMask('field'));
    
    
    app.get('/', function(request, response) {
        response.status(200).json(json/*, [optional] filtering target*/);
        // example: xxx.json(json, 'repository');
        // curl: http://localhost:1337/?fields=type
        // response: { 
        //      name: 'Express',
        //      version: 'version',
        //      description: 'description',
        //      repository: {
        //          type: 'git',
        //      } 
        //  }
        // -------------------------------------------
        // example: xxx.json(json);
        // curl: http://localhost:1337/?fields=type
        // -- the filter does not match any fields in the  root of the json
        // response: {
        //      name: 'Express',
        //      version: 'version',
        //      description: 'description',
        //      repository: {
        //          type: 'git',
        //          url: 'url'
        //      }
        //  }
        // -------------------------------------------
        // example: xxx.json(json);
        // curl: http://localhost:1337/?fields=name,version,repository(url)
        // response: {
        //      name: 'Express',
        //      version: 'version',
        //      repository: {
        //          url: 'url'
        //      }
        // }
    });
    
    app.listen(1337);
````

#Syntax
Look at the awesome module [Json-Mask](https://github.com/nemtsov/json-mask) for the available syntax