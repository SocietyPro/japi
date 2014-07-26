html5-japi-tests
================

This repo holds japi.js and its associated test suite.
japi.js is a javascript library for client scripts to make calls to the Society<sup>PRO</sup> Javascript API.

## japi.js

`japi.js` is a javascript API for Society<sup>PRO</sup> users. 

Society<sup>PRO</sup> natively provides some API calls from an object called
SO_PRO that is found in every javascript global scope within Society<sup>PRO</sup>.

japi.js creates a Javascript function object SO_PRO.JAPI. When invoked () it
returns a client-side module, documented at [http://group.cambrian.org/wiki/doku.php?id=japi.js](http://group.cambrian.org/wiki/doku.php?id=japi.js)

Expected use:

    var japi = SO_PRO.JAPI();
    console.log(japi.me.name); // "plato-dev"
    var thisAppPermissionGranted
        = japi.permissions.role.getAllNymRoles; //false
    
    japi.role.getAllNymRoles()
    // Throws Error: "Permission Denied: japi.role.getAllNymRoles()"
    
    japi.$.asset("PlatoBTC").qty("0.00001").sendTo("hiro-dev"); 
    // If I have permissions, pops up a wallet UI with everything prefilled
    // If I don't, throws Permission Denied error


japi calls currently return their results synchronously. 

Future work: asynchronous japi, asynchronous japi mocks, asynchronous japi tests

## Tests against japi.js
These tests are written with the Jasmine library.

 * [japi.js library] (https://github.com/CambrianExp/html5-japi-tests/tree/master/js/japi.js).

 * [tests against japi.js](https://github.com/CambrianExp/html5-japi-tests/tree/master/js/testJapiJS.js).

 * [mockJapi.js mock object](https://github.com/CambrianExp/html5-japi-tests/tree/master/js/mockJapi.js).

 * [tests against mockJapi.js](https://github.com/CambrianExp/html5-japi-tests/tree/master/js/testMockJapi.js)

###To run the tests against the mock japi API:  
clone the repo, then load `mock.html` in your favorite browser.

###To run the tests in Cambrian against the real JAPI:  
Navigate to `~/.Cambrian/App/Ballotmaster`  
Delete everything in `~/.Cambrian/App/Ballotmaster`  
Clone the repo  
Copy the repo into the Ballotmaster folder  
Rename or copy `index.html` to `default.htm`  
Start Cambrian  
Open Tools > Ballotmaster  

## Example Mock JAPI Function

    var Cambrian = Cambrian || {}
    Cambrian.JAPI = function(){
    var japi = {
      peer: {
        ping: {},
      }
    };
     ...
    japi.peer.ping = function(callback){
      //setTimeout(function(){ callback(null, false) }, 200);
      return 33;
    }
     ...
    return japi;

## Example Mock JAPI Test

    describe(".ping()", function(){
      // Once implemented, ping will be called asynchronously
      it("exists", function(){
        expect(japi.peer.ping).not.toEqual({});
        expect(japi.peer.ping).not.toEqual(undefined); // or toBeDefined();
      });

      it("returns a Number", function(){
        var time;
        function callback(err, timeMS){
          // time = timeMS
          // expect(typeof time).toEqual("number")
          // expect(time > 0).toBeTruthy()
          // done()
        }
        time = japi.peer.ping(callback);
        expect(typeof time).toEqual("number")
        expect(time > 0).toBeTruthy()
      });
    });


