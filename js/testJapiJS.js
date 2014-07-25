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


    it("exists", function(){
      expect(japi.polls).not.toEqual({});
      expect(japi.polls).not.toEqual(undefined); // or .not.toBeDefined();
    });

    describe(".build constructor variants", function(){
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
    
    var testPoll; // we'll use this throughout our tests

    describe("testPoll = poll.build()", function(){
      it("returns an object", function(){
        testPoll = japi.polls.build();
        expect(testPoll).toBeDefined();
      });
      it("has a string id", function(){
        expect(typeof testPoll.id).toEqual("string");
      });
      it("has a save method", function(){
        expect(typeof testPoll.save).toEqual("function");
      });
    });

    describe("testPoll.save()", function(){
      it("saves a modified poll and returns true", function(){
        testPoll.title="Test Poll";
        var result = testPoll.save();
        expect(result).toEqual(true);
      });
    });

    describe("japi.polls.get(testPoll.id)", function(){
      /*
      it('Still has testPoll in scope', function(){
        expect(testPoll).toBeDefined();
        expect(testPoll.id).toBeDefined();
        expect(typeof testPoll.id).toEqual("string");
      });
      */
      it("exists", function(){
        expect(japi.polls.get).not.toEqual({});
        expect(japi.polls.get).not.toEqual(undefined); // or .not.tobedefined();
      });

      it("returns a found poll object by ID", function(){
        var idToSearch = testPoll.id;
        var foundPoll = japi.polls.get(idToSearch);
        expect(typeof foundPoll).toEqual("object");
        expect(foundPoll.title).toEqual("Test Poll");
        expect(foundPoll.id).toEqual(idToSearch);
      });

      it("returns null if no poll object is found", function(){
        var myPoll = japi.polls.get("UUID100");
        expect(myPoll).toBe(null);
      });

    });

    describe("japi.polls.getList()", function(){
      it("exists", function(){
        expect(japi.polls.getList).not.toEqual({});
        expect(japi.polls.getList).not.toEqual(undefined); // or .not.tobedefined();
      });

      var myPolls;
      it("returns an array of poll objects", function(){
        myPolls = japi.polls.getList();
        expect(typeof myPolls).toEqual("object");
        expect(typeof myPolls.length).toEqual("number");
      });

      it("includes testPoll in the returned objects", function(){
        var found = false;
        for(var i=0; i<myPolls.length; i++){
          if(myPolls[i].id === testPoll.id){
            found = true;
          };
        };
        expect(found).toBe(true);
      });
    });

    describe("poll.start()", function(){
      it("exists", function(){
        expect(testPoll.start).toBeDefined();
        expect(typeof testPoll.start).toEqual("function"); // or .not.tobedefined();
      });

      it("Sets the parent poll's .status field to 'started'", function(){
        testPoll.start();
        expect(testPoll.status).toEqual("started"); 
      });

      it("Sets the parent poll's .timeStarted field to now", function(){
        var tStart = new Date(testPoll.timeStarted).valueOf();
        var tNow = new Date().valueOf();
        var msDiff = Math.abs(tStart-tNow);
        expect(msDiff < 1000*60).toEqual("true"); 
        // Less than one minute between Cambrian marking the poll as started, and this script executing the test
      });
    });

    describe("poll.stop()", function(){
      it("exists", function(){
        expect(testPoll.stop).toBeDefined();
        expect(typeof testPoll.stop).toEqual("function"); // or .not.tobedefined();
      });

      it("Sets the parent poll's .status field to 'stopped'", function(){
        testPoll.stop();
        expect(testPoll.status).toEqual("stopped"); 
      });

      it("Sets the parent poll's .timeStopped field to now", function(){
        var tStop = new Date(testPoll.timeStopped).valueOf();
        var tNow = new Date().valueOf();
        var msDiff = Math.abs(tStop-tNow);
        expect(msDiff < 1000*60).toEqual("true"); 
        // Less than one minute between Cambrian marking the poll as stopped, and this script executing the test
      });
    });

    describe("poll.getResults", function(){
      it("exists", function(){
        expect(testPoll.getResults).toBeDefined();
        expect(typeof testPoll.getResults).toEqual("function"); // or .not.tobedefined();
      });

      var results;
      it("returns a pollResults object", function(){
        results = testPoll.getResults();
        expect(results).toBeDefined();
      });

      describe("pollResults", function(){

        it("reflects changes from its parent poll object", function(){
          testPoll.description = "reflect me";
          testPoll.save();
          expect(results.description).toEqual("reflect me");
        });

        it("has an array of comments", function(){
          expect(typeof results.comments).toEqual("object"); 
          expect(typeof results.comments.length).toEqual("number"); 
        });

        it("has an array of counts", function(){
          expect(typeof results.counts).toEqual("object"); 
          expect(typeof results.counts.length).toEqual("number"); 
        });

        describe("inherited properties", function(){
          it("matches the ID of the source poll", function(){
            expect(results.id).toEqual(testPoll.id)
          });

          it("matches the title of the source poll", function(){
            expect(results.title).toEqual(testPoll.title)
          });

          it("matches the description of the source poll", function(){
            expect(results.description).toEqual(testPoll.description)
          });

          it("matches the status of the source poll", function(){
            expect(results.status).toEqual(testPoll.status)
          });

          it("matches the dateStarted of the source poll", function(){
            expect(results.dateStarted).toEqual(testPoll.dateStarted)
          });

          it("matches the dateStopped of the source poll", function(){
            expect(results.dateStopped).toEqual(testPoll.dateStopped)
          });

          it("matches the options of the source poll", function(){
            expect(results.options).toEqual(testPoll.options)
          });

          it("matches the title of the source poll", function(){
            expect(results.title).toEqual(testPoll.title)
          });
        });

        describe("pollResults.stats", function(){
          it("is an object", function(){
            expect(typeof results.stats).toEqual("object"); 
          });
          it("has an integer .sent property", function(){
            expect(typeof results.stats.sent).toEqual("number"); 
            expect(results.stats.sent % 1).toEqual(0); 
          });
          it("has an integer .responded property", function(){
            expect(typeof results.stats.responded).toEqual("number"); 
            expect(results.stats.responded % 1).toEqual(0); 
          });
          it("has an integer .pending property", function(){
            expect(typeof results.stats.pending).toEqual("number"); 
            expect(results.stats.pending % 1).toEqual(0); 
          });
          it("has an integer .invalid property", function(){
            expect(typeof results.stats.invalid).toEqual("number"); 
            expect(results.stats.invalid % 1).toEqual(0); 
          });
        });

      });
    });

    describe("poll.delete()", function(){
      it("exists", function(){
        expect(testPoll.delete).toBeDefined();
        expect(typeof testPoll.delete).toEqual("function"); // or .not.tobedefined();
      });

      it("returns true", function(){
        var result = testPoll.delete();
        expect(result).toBe(true);
      });

      var myPolls;
      it("is no longer found in japi.polls.getList()", function(){
        myPolls = japi.polls.getList();
        expect(typeof myPolls).toEqual("object");
        expect(typeof myPolls.length).toEqual("number");

        var found = false;
        for(var i=0; i<myPolls.length; i++){
          if(myPolls[i].id === testPoll.id){
            found = true;
          };
        };
        expect(found).toBe(false);
 
      });
    });

  });



});


