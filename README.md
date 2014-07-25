html5-japi-tests
================

A test harness for Cambrian JAPI calls.

These tests are written with the Jasmine library and may all be found in
[js/testHarnessJapiJS.js](https://github.com/CambrianExp/html5-japi-tests/tree/master/js/testHarnessJapiJS.js)

The tests are currently running against a mock version of the japi object. These
mocks are found in 
[js/mockJapi.js](https://github.com/CambrianExp/html5-japi-tests/tree/master/js/mockJapi.js)

To run the tests against the mock japi API:  
clone the repo, then load `mock.html` in your favorite browser.

To run the tests in Cambrian against the real JAPI:  
Navigate to `~/.Cambrian/App/Ballotmaster`  
Delete everything in `~/.Cambrian/App/Ballotmaster`  
Clone the repo  
Copy the repo into the Ballotmaster folder  
Rename or copy `index.html` to `default.htm`  
Start Cambrian  
Open Tools > Ballotmaster  
