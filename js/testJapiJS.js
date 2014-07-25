console.log('testHarnessApp.js');

var japi;
japi = new Cambrian.JAPI();

describe("japi.js", function(){

  it("Synchronously instantiates JAPI", function(){
    // Moved instantiation above top describe block, so it's available if you
    // run a sibling spec solo.
    expect(japi).not.toEqual({});
    expect(japi).not.toEqual(undefined); // or .not.toBeDefined();
  });

  it("japi.nonExistentCall() throws exception", function(){
    function shouldThrow(){
      return japi.nonExistentCall();
    };
    expect(shouldThrow).toThrow();
  });

  it("japi.nonExistentProperty.nonExistentCall() throws exception", function(){
    function shouldThrow(){
      return japi.nonExistentProperty.nonExistentCall();
    };
    expect(shouldThrow).toThrow();
  });
});


describe("japi.utils", function(){
  it("exists", function(){
    //expect(japi.utils).not.toEqual({});
    expect(japi.utils).not.toEqual(undefined); // or .not.toBeDefined();
  });
  it("is aliased as util", function(){
    var utils = japi.utils;
    var util = japi.util;
    expect(utils).toBe(util);
  });
});

describe("japi.polls", function(){
  var savedPoll; // we'll use this in a couple places

  it("exists", function(){
    expect(japi.polls).not.toEqual({});
    expect(japi.polls).not.toEqual(undefined); // or .not.toBeDefined();
  });

  describe(".build constructor", function(){
    describe(".build()", function(){
      it("exists", function(){
        expect(japi.polls.build).not.toEqual({});
        expect(japi.polls.build).not.toEqual(undefined); // or .not.tobedefined();
      });
      it("returns a skeleton poll object", function(){
        var myPoll = japi.polls.build();
        expect(typeof myPoll).toEqual("object");
        expect(typeof myPoll.id).toEqual("string");
        expect(typeof myPoll.title).toEqual("string");
        expect(myPoll.status).toEqual("deleted");
      });
    });

    describe(".build(oldPoll)", function(){
      var oldPoll;
      var newPoll;

      it("returns a newPoll object", function(){
        oldPoll = japi.polls.build();
        newPoll = japi.polls.build(oldPoll);
        expect(typeof newPoll).toEqual("object");
        expect(typeof newPoll.save).toEqual("function");
      });
      it("copies the appropriate properties from oldPoll to newPoll", function(){
        expect(newPoll.title).toEqual(oldPoll.title);
      });
      it("sets some properties of newPoll to .build() defaults", function(){
        expect(newPoll.id).not.toEqual(oldPoll.id);
        expect(newPoll.dateStarted).toBeNull();
        expect(newPoll.status).toEqual("deleted");
      });
    });

    describe(".build(pollTemplate)", function(){
      var pollTemplateSpec = undefined;
      it("is not specced", function(){
        expect(pollTemplateSpec).not.toBeDefined();
      });
    });

  });

  describe("polls.getList()", function(){
    it("exists", function(){
      expect(japi.polls.getList).not.toEqual({});
      expect(japi.polls.getList).not.toEqual(undefined); // or .not.tobedefined();
    });

    it("returns an array of poll objects", function(){
      var myPolls = japi.polls.getList();
      expect(typeof myPolls).toEqual("object");
      expect(typeof myPolls.length).toEqual("number");
      expect(myPolls[0].id).not.toEqual(myPolls[1].id);
    });
  });

  describe("polls.get(id)", function(){
    it("exists", function(){
      expect(japi.polls.get).not.toEqual({});
      expect(japi.polls.get).not.toEqual(undefined); // or .not.tobedefined();
    });

    it("returns a found poll object by ID", function(){
      var newPoll = japi.poll.build();
      var id1 = newPoll.id;
      newPoll.title = "Test Poll";
      newPoll.save();
      var id2 = newPoll.id;
      expect(id1).toEqual(id2);

      var foundPoll = japi.polls.get(id1);
      expect(typeof foundPoll).toEqual("object");
      expect(foundPoll.title).toEqual("Test Poll");
      expect(foundPoll.id).toEqual(id1);
    });

    it("returns false if no poll object is found", function(){
      var myPoll = japi.polls.get("UUID100");
      expect(myPoll).toBe(false);
    });
  });

});
