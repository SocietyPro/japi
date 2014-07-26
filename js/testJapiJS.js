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

    var testPoll; 
    var testPollResults;
    // we'll use this throughout our tests

    /*
    describe("testPoll = poll.build()", function(){
      it("returns an object", function(){
        expect(testPoll).toBeDefined();
      });
      it("has a string id", function(){
        expect(typeof testPoll.id).toEqual("string");
      });
      it("has a save method", function(){
        expect(typeof testPoll.save).toEqual("function");
      });
    });
    */


    describe(".build constructor variants", function(){
      describe(".build()", function(){
        it("exists", function(){
          expect(japi.polls.build).not.toEqual({});
          expect(japi.polls.build).not.toEqual(undefined); // or .not.tobedefined();
        });
        it("returns a skeleton poll object", function(){
          testPoll = japi.polls.build();
          //var myPoll = japi.polls.build();
          expect(typeof testPoll).toEqual("object");
        });
        describe("skeleton poll object", function(){
          it("has a string 'id'", function(){
            expect(typeof testPoll.id).toEqual("string");
          });

          it("has an empty string 'type'", function(){
            expect(typeof testPoll.type).toEqual("string");
            expect(testPoll.type).toEqual("");
          });

          it("has an empty string 'title'", function(){
            expect(typeof testPoll.title).toEqual("string");
            expect(testPoll.title).toEqual("");
          });

          it("has an empty string 'description'", function(){
            expect(typeof testPoll.description).toEqual("string");
            expect(testPoll.description).toEqual("");
          });

          it("has a string 'status' == 'unsaved'", function(){
            expect(typeof testPoll.status).toEqual("string");
            expect(testPoll.status).toEqual("unsaved");
          });

          it("has a null 'dateStarted'", function(){
            expect(testPoll.dateStarted).toEqual("null");
          });

          it("has a null 'dateStopped'", function(){
            expect(testPoll.dateStopped).toEqual("null");
          });

          it("has a falsy 'pollTimeLength'", function(){
            expect(testPoll.pollTimeLength).toBeFalsy(); // 0 or null acceptable defaults for no-time-limit
          });

          describe("methods", function(){
            describe(".save()", function(){
              it("saves a modified poll and returns true", function(){
                testPoll.title="Test Poll";
                var result = testPoll.save();
                expect(result).toEqual(true);
              });
            });

            describe(".start()", function(){
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

            describe(".stop()", function(){
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

            describe(".getResults", function(){
              it("exists", function(){
                expect(testPoll.getResults).toBeDefined();
                expect(typeof testPoll.getResults).toEqual("function"); // or .not.tobedefined();
              });

              it("returns a pollResults object", function(){
                testPollResults = testPoll.getResults();
                expect(testPollResults).toBeDefined();
              });

            });

            describe(".destroy()", function(){
              it("exists", function(){
                expect(testPoll.destroy).toBeDefined();
                expect(typeof testPoll.destroy).toEqual("function"); // or .not.tobedefined();
              });

              it("returns true", function(){
                var result = testPoll.destroy();
                expect(result).toBe(true);
              });

              describe("a destroyed poll", function(){
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

                it("has a status of 'destroyed' on existing reflected objects", function(){
                  expect(testPoll.status).toEqual("destroyed");
                });

                it("has a status of 'destroyed' on japi.poll.get(destroyed_id)", function(){
                  myPoll = japi.polls.get(testPoll.id);
                  expect(myPoll.status).toEqual("destroyed");
                });
              });

            });
          });

        });
      });

      it("sets up a new testPoll after testPoll.destroy()", function(){
        testPoll = japi.polls.build();
      });

      describe(".build(testPoll)", function(){

        it("returns a copyPoll object", function(){
          //testPoll = japi.polls.build();
          copyPoll = japi.polls.build(testPoll);
          expect(typeof copyPoll).toEqual("object");
          expect(typeof copyPoll.save).toEqual("function");
        });
        describe('Copied properties', function(){

          it("copies the type", function(){
            expect(copyPoll.type).toEqual(testPoll.type);
          });

          it("copies the title", function(){
            expect(copyPoll.title).toEqual(testPoll.title);
          });

          it("copies the description", function(){
            expect(copyPoll.description).toEqual(testPoll.description);
          });

          it("copies the pollTimeLength", function(){
            expect(copyPoll.pollTimeLength).toEqual(testPoll.pollTimeLength);
          });

        });

        describe('Default properties', function(){

          it("sets a new string id", function(){
            expect(typeof copyPoll.id).toEqual("string");
            expect(copyPoll.id).not.toEqual(testPoll.id);
          });

          it("sets dateStarted to null", function(){
            expect(copyPoll.dateStarted).toBeNull();
          });

          it("sets dateStopped to null", function(){
            expect(copyPoll.dateStopped).toBeNull();
          });

          it("sets status to 'unsaved'", function(){
            expect(copyPoll.status).toEqual('unsaved');
          });

        });
      });

      describe(".build(pollTemplate)", function(){
        it("is specced", function(){
          expect(pollTemplateSpec).toBeDefined();
        });
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


    describe("pollResults", function(){

      it("reflects changes from its parent poll object", function(){
        testPoll.description = "reflect me";
        testPoll.save();
        testPollResults = testPoll.getResults();
        expect(testPollResults.description).toEqual("reflect me");
      });

      it("has an array of 'comments'", function(){
        expect(typeof testPollResults.comments).toEqual("object"); 
        expect(typeof testPollResults.comments.length).toEqual("number"); 
      });

      it("has an array of 'counts'", function(){
        expect(typeof testPollResults.counts).toEqual("object"); 
        expect(typeof testPollResults.counts.length).toEqual("number"); 
      });

      describe("inherited properties", function(){
        it("matches the 'id' of the source poll", function(){
          expect(testPollResults.id).toEqual(testPoll.id)
        });

        it("matches the 'title' of the source poll", function(){
          expect(testPollResults.title).toEqual(testPoll.title)
        });

        it("matches the 'description' of the source poll", function(){
          expect(testPollResults.description).toEqual(testPoll.description)
        });

        it("matches the 'status' of the source poll", function(){
          expect(testPollResults.status).toEqual(testPoll.status)
        });

        it("matches the 'dateStarted' of the source poll", function(){
          expect(testPollResults.dateStarted).toEqual(testPoll.dateStarted)
        });

        it("matches the 'dateStopped' of the source poll", function(){
          expect(testPollResults.dateStopped).toEqual(testPoll.dateStopped)
        });

        it("matches the 'options' of the source poll", function(){
          expect(testPollResults.options).toEqual(testPoll.options)
        });

        it("matches the 'title' of the source poll", function(){
          expect(testPollResults.title).toEqual(testPoll.title)
        });
      });

      describe("pollResults.'stats'", function(){
        it("is an object", function(){
          expect(typeof testPollResults.stats).toEqual("object"); 
        });
        it("has an integer 'sent' property", function(){
          expect(typeof testPollResults.stats.sent).toEqual("number"); 
          expect(testPollResults.stats.sent % 1).toEqual(0); 
        });
        it("has an integer 'responded' property", function(){
          expect(typeof testPollResults.stats.responded).toEqual("number"); 
          expect(testPollResults.stats.responded % 1).toEqual(0); 
        });
        it("has an integer 'pending' property", function(){
          expect(typeof testPollResults.stats.pending).toEqual("number"); 
          expect(testPollResults.stats.pending % 1).toEqual(0); 
        });
        it("has an integer 'invalid' property", function(){
          expect(typeof testPollResults.stats.invalid).toEqual("number"); 
          expect(testPollResults.stats.invalid % 1).toEqual(0); 
        });
      });

    });


  });



});


