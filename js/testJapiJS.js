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

    describe(".formatDivide(numerator, denominator, decimalPlaces)", function(){
      it("exists",function(){
        expect(japi.utils.formatDivide).toBeDefined();
      });

      it("returns a String",function(){
        var oneHalf = japi.utils.formatDivide(1,2,1);
        expect(typeof oneHalf).toEqual("string");
      });

      it("throws ArgumentError if invoked without three Numbers",function(){
        function shouldThrow(){
          var oneHalf = japi.utils.formatDivide(1,2);
        };
        expect(shouldThrow).toThrow();
      });

      it("has decimalPlaces digits behind the decimal point", function(){
        var twoK = japi.utils.formatDivide(10000, 5, 4);
        expect(twoK).toEqual("2000.0000");
      });

      it("returns 'NaN' if you divide nonzero by zero",function(){
        var _NAN = japi.utils.formatDivide(2,0,0);
        expect(_NAN).toEqual("NaN");
      });

      it("returns '0.000...' if you divide zero by zero",function(){
        var zero = japi.utils.formatDivide(0,0,5);
        expect(zero).toEqual("0.00000");
      });

      it("removes a trailing decimal point if decimalPlaces == 0",function(){
        var fourThirds = japi.utils.formatDivide(4,3,0);
        expect(fourThirds).toEqual("1"); //we chomped the precision
      });

    });

    describe(".formatPercent", function(){
      it("exists", function(){
        expect(japi.utils.formatPercent).toBeDefined();
      });
      it("returns a string", function(){
        var result = japi.utils.formatPercent(1,2,1);
        expect(typeof result).toEqual("string");
      });
      it("is 100x larger than a similar division", function(){
        var result = japi.utils.formatPercent(1,2,1);
        expect(result.match(/^50/)).toBeTruthy();
        expect(result.match(/^0\.5/)).toBeFalsy();
      });
      it("puts ' %' after the numeric result", function(){
        var result = japi.utils.formatPercent(1,2,1);
        expect(result.match(/ %$/)).toBeTruthy();
      });
      it("includes decimalPlaces digits after a decimal point", function(){
        var result = japi.utils.formatPercent(1,2,5);
        expect(result).toEqual("50.00000 %");
      });
      it("assumes 0 decimal places if you omit the decimalPlaces argument", function(){
        var result = japi.utils.formatPercent(1,2);
        expect(result).toEqual("50 %");
      });

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

    describe(".build constructor variants", function(){
      describe(".build()", function(){
        it("exists", function(){
          expect(japi.polls.build).not.toEqual({});
          expect(japi.polls.build).not.toEqual(undefined);
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

          it("has an array of 'options'", function(){
            expect(typeof testPoll.options).toEqual("object");
            expect(typeof testPoll.options.length).toEqual("number");
          });

          it("has a string 'status' == 'unsaved'", function(){
            expect(typeof testPoll.status).toEqual("string");
            expect(testPoll.status).toEqual("unsaved");
          });

          it("has a null 'dateStarted'", function(){
            expect(testPoll.dateStarted).toBeNull();
          });

          it("has a null 'dateStopped'", function(){
            expect(testPoll.dateStopped).toBeNull();
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
                expect(typeof testPoll.start).toEqual("function");
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
                expect(typeof testPoll.stop).toEqual("function");
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
                expect(typeof testPoll.getResults).toEqual("function");
              });

              it("returns a pollResults object", function(){
                testPollResults = testPoll.getResults();
                expect(testPollResults).toBeDefined();
              });

            });

            describe(".destroy()", function(){
              it("exists", function(){
                expect(testPoll.destroy).toBeDefined();
                expect(typeof testPoll.destroy).toEqual("function");
              });

              it("returns undefined", function(){
                var result = testPoll.destroy();
                expect(result).not.toBeDefined();
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
                it("is no longer found by japi.polls.get(destroyedPollId)", function(){
                  myPoll = japi.polls.get(testPoll.id);
                  expect(myPoll).toBeNull();
                });

                it("has a status of 'unsaved' on existing reflected objects", function(){
                  expect(testPoll.status).toEqual("unsaved");
                });

              });

            });
          });

        });
      });

      it("sets up a new testPoll after testPoll.destroy()", function(){
        testPoll = japi.polls.build();
        testPoll.title = "test title";
        testPoll.description = "for testing purposes only";
        testPoll.type = "Test Poll";
        testPoll.pollTimeLength = 1000*60*60; // one hour
        testPoll.save();
      });

      describe(".build(testPoll)", function(){
        var copyPoll;

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
        expect(japi.polls.get).not.toEqual(undefined);
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
        expect(japi.polls.getList).not.toEqual(undefined);
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


