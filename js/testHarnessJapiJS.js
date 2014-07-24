console.log('testHarnessApp.js');
describe("jasmine asynchronous spec", function() {
  it("takes a long time", function(done) {
    setTimeout(function() {
      expect(true).toBeTruthy();
      done();
    }, 2000);
  });
});

describe("JAPI Mock", function(){
  var japi;

  it("Synchronously instantiates JAPI", function(){
    japi = new Cambrian.JAPI();
    expect(japi.utils).not.toEqual({});
    expect(japi.utils).not.toEqual(undefined); // or .not.toBeDefined();
  });

  it("throws  a top-level 'function is undefined' exception", function(){
    function shouldThrow(){
      return japi.nonExistentCall();
    };
    expect(shouldThrow).toThrow();
  });

  it("throws a child-level 'function is undefined' exception", function(){
    function shouldThrow(){
      return japi.nonExistentProperty.nonExistentCall();
    };
    expect(shouldThrow).toThrow();
  });

  describe("japi.peer.*", function(){
    it("is instantiated", function(){
      expect(japi.peer).not.toEqual({});
      expect(japi.peer).not.toEqual(undefined); // or .not.toBeDefined();
    });

    describe(".ping()", function(){
      // Once implemented, ping will be called asynchronously
      it("is instantiated", function(){
        expect(japi.peer.ping).not.toEqual({});
        expect(japi.peer.ping).not.toEqual(undefined); // or .not.toBeDefined();
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

    describe(".poll.results()", function(){
      // Not yet specc'ed, putting here as a reminder
      it("is not instantiated", function(){
        expect(japi.peer.poll).not.toBeDefined();
      });
      it("throws when called", function(){
        function callPollChild(){
          results = japi.peer.poll.results()
        };
        expect(callPollChild).toThrow()
      });
    });
  });

  describe("japi.role.*", function(){
    it("is instantiated", function(){
      expect(japi.role).not.toEqual({});
      expect(japi.role).not.toEqual(undefined); // or .not.toBeDefined();
    });

    describe(".peerList.*", function(){
      it("is instantiated", function(){
        expect(japi.role.peerList).not.toEqual({});
        expect(japi.role.peerList).not.toEqual(undefined); // or .not.toBeDefined();
      });
      describe(".list()", function(){
        // Once implemented, ping will be called asynchronously
        it("is instantiated", function(){
          expect(japi.role.peerList.list).not.toEqual({});
          expect(japi.role.peerList.list).not.toEqual(undefined); // or .not.toBeDefined();
        });

        it("returns an Array", function(){
          lists = japi.role.peerList.list();
          expect(typeof lists).toEqual("object");
          expect(typeof lists.length).toEqual("number");
          expect(lists.pop).toBeDefined();
        });
      });
    });

  });

});
