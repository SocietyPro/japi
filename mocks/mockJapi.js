var Cambrian = Cambrian || {isMockCambrian:true}

Cambrian.idSeed = 0;

Cambrian.mockJAPI = function(){
  // Define some children objects, this is necessary because trying to set
  // more than one deep of an undefined object fails.
  // {}.foo=true works but {}.foo.bar=true doesn't: 
  // TypeError: Cannot set property 'bar' of undefined

  var japi = {
    me: {
    },
    peer: {
      ping: {},
      recommendations: {},
      polls: {},
    },
    role: {
      peerList: {},
    },
    utils: {
    },
    polls: {
      templates: {},
      myTemplates: {},
    },
  }

  var destroyPoll = function (poll) {
    var index = listOfPolls.indexOf(poll);

    if (index > -1) {
      listOfPolls.splice(index, 1);
    }
  };

  /* Our mocks don't have a start or delete function but we need it for testing. Adding
   * here:
   */
  var listOfPollMocks = Cambrian.pollApp.mockPolls;
  var listOfPolls = listOfPollMocks.map(function(mock){
    mock.destroy = function () {
      console.log('Destroying mock');
      destroyPoll(this);
    };
    mock.start = function(){
      console.log('Starting mock');
      mock.status = 'started';
      mock.dateStarted = new Date();
    };
    return mock;
  });

  var destroyTemplate = function (template) {
    var index = listOfTemplates.indexOf(template);

    if (index > -1) {
      listOfTemplates.splice(index, 1);
    }
  };

  var listOfTemplateMocks = Cambrian.pollApp.mockTemplates;
  var listOfTemplates = listOfTemplateMocks.map(function(mock){
    mock.destroy = function () {
      console.log("Destroying mock");
      destroyTemplate(this);
    };
    return mock;
  });
  var listOfExampleTemplates = Cambrian.pollApp.exampleTemplates;
  var listOfRecommendedTemplates = Cambrian.pollApp.mockPeerTemplates;
  
  /* 
   * JAPI ME API
   * These functions give apps access to context about the current role
   */

  japi.me.peers = function(){
    return Cambrian.pollApp.mockTargets.peers;
  };

  japi.me.groups = function(){
    return Cambrian.pollApp.mockTargets.groups;
  };

  japi.me.peerLists = function(){
    return Cambrian.pollApp.mockTargets.peerLists;
  };

  /* 
   * JAPI PEER API
   * These functions involve communications with other Cambrian Peers
   */

  japi.peer.ping = function(callback){
    //setTimeout(function(){ callback(null, false) }, 200);
    return 33;
  }

  /* // NOT YET SPECCED:
  japi.peer.polls.results = function(cambrianID, UUID, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  */

  /*
   * JAPI ROLE API
   * These functions are like japi.utils. The difference is utils are
   * convenience functions that always do the same thing for every user and
   * role. japi.role is where we put functions that handle role-specific data.
   */

  japi.role.peerList.list = function(callback){
    //setTimeout(function(){ callback(null, false) }, 200);
    return [["hiro", "plato"], ["hiro", "henry", "harriet"]];
  };

  japi.role.peerList.save = function(UUID, peerListObj, callback){
//    setTimeout(function(){ callback(null, false) }, 200);
    return true;
  };
  japi.role.peerList.get = function(UUID, callback){
    //setTimeout(function(){ callback(null, false) }, 200);
    return ["hiro", "plato"];
  };
  japi.role.peerList.delete = function(UUID, callback){
    //setTimeout(function(){ callback(null, false) }, 200);
    return true;
  };
  
  /*
   * JAPI UTILS API
   * japi.utils is a collection of functions available without any permissions.
   * It includes only functions that don't manipulate data owned by a role.
   * Those functions are instead in japi.role
   */

  japi.utils.getUUID = function(){
    Cambrian.idSeed++;
    return "UUID" + Cambrian.idSeed.toString();
  };



  /*
   * JAPI POLLS API
   * japi.polls is a set of functions to create and use Poll objects.
   */

  japi.polls.build = function(source, callback){
    // This might be called with one source argument, one callback argument, one
    // of each, or something else invalid.
    var mockPoll = {
        id: japi.utils.getUUID(), 
        title: "",
        status: "deleted", 
        dateStarted: null,
        options: [],
        counts: [],
        save: function(){
          savePoll(this);
        },
        start: function(){
          console.log("Starting Poll");
          this.dateStarted = new Date();
          this.status = "started";
        },
        stop: function(){},
        getResults: function(){},
        destroy: function(){
          destroyPoll(this);
        },
      };

    var savePoll = function (poll) {
      for (var i = 0; i < listOfPolls.length; i++) {
        if (listOfPolls[i].id === poll.id) {
          listOfPolls[i] = poll;
          return undefined;
        };
        listOfPolls.push(poll);
        return undefined;
      }
    };

    var startPoll = function (poll) {
      poll.dateStarted = new Date();
      poll.status = "started";
      return undefined;
    }

    function copyPoll(source){
      //  source might be a poll OR a template 
      // copy all properties from source:
      var tmp = {};
      for( prop in source ){
        if(source.hasOwnProperty(prop)){
          tmp[prop] = source[prop];
        };
      };
      // override some properties with defaults:
      tmp.id = japi.utils.getUUID;
      tmp.status = "deleted";
      tmp.save = tmp.save || function(){savePoll(this)};
      tmp.start = tmp.start || function(){startPoll(this)};
      tmp.destroy = tmp.destroy || function(){destroyPoll(this)};
      tmp.counts = tmp.counts || [];
      //listOfPolls.push(tmp);
      return tmp;
    };

    if(arguments.length === 0){ 
      // No arguments. Return a new poll synchronously.
      var builtPoll = mockPoll;
      return builtPoll;
    } else if(arguments.length === 1 && typeof source === "function"){
      // One callback argument passed in. 
      // Return undefined now; call the callback asynchronously w/ the new poll.
      setTimeout(function(){ 
        callback(null, function () {
          var builtPoll = mockPoll;
          return builtPoll;
        }); 
      }, 200);
      return undefined;
    } else if(arguments.length === 1 && typeof source === "object") {
      // One source object passed in.
      // Create a similar object from source object + defaults and return it sync.
      return copyPoll(source);
    } else if(typeof source !== "object" && typeof callback !== "function"){
      // Bad argument syntax
      return new Error("japi.polls.build() called with invalid arguments:\n"+arguments)
    } else {
      // we have at least 2 args AND source is an object AND callback is a fn
      // Create a similar object from source object + defaults;
      // Return undefined now; call the callback asynchronously w/ the new poll.
      setTimeout(function(){ 
        var newPoll = copyPoll(source);
        callback(null, newPoll) 
      }, 200);
      return undefined;
    };
  };

  japi.polls.getList = function(callback){
    //setTimeout(function(){ callback(null, false) }, 200);
    //var poll1 = japi.polls.build();
    //var poll2 = japi.polls.build();
    return listOfPolls;
  };

  japi.polls.get = function(UUID, callback){
    //setTimeout(function(){ callback(null, false) }, 200);
    /*if(UUID.match(/^UUID[0-9]$/)){ // Succeed on UUID0 to UUID9; otherwise fail
      var myPoll = japi.polls.build();
      myPoll.id = UUID;
      return myPoll;
    } else {
      return false;
    }; */

    for (var i = 0; i < listOfPolls.length; i++) {
      if (listOfPolls[i].id === UUID) {
        return listOfPolls[i];
      }
      return false;
    }
  };

  japi.polls.getExamples = function(){
    return listOfPolls;
  };

  japi.polls.getPeerRecommended = function(){
    return listOfRecommendedTemplates;
  };

  japi.polls.templates.list = function(){
    return listOfTemplates;
  };

  japi.polls.templates.listExamples = function () {
    return listOfExampleTemplates;
  };


  japi.polls.templates.build = function(source, callback){
    // This might be called with one source argument, one callback argument, one
    // of each, or something else invalid.
    var mockTemplate = {
        id: japi.utils.getUUID(), 
        title: "", 
        options: [],
        allowMultipleChoices: false,
        allowComments: false,
        dismissText: "Dismiss",
        submitText: "Submit",
        save: function(){
          saveTemplate(this)
        },
        destroy: function(){
          destroyTemplate(this);
        },
      };

    var saveTemplate = function (template) {
      for (var i = 0; i < listOfTemplates.length; i++) {
        if (listOfTemplates[i].id === template.id) {
          listOfTemplates[i] = template;
          return undefined;
        };
        listOfTemplates.push(template);
        return undefined;
      }
    };

    function copyTemplate(source){
      //  source might be a poll OR a template 
      // copy all properties from source:
      var tmp = {};
      for( prop in source ){
        if(source.hasOwnProperty(prop)){
          tmp[prop] = source[prop];
        };
      };
      // override some properties with defaults:
      tmp.id = japi.utils.getUUID;
      listOfTemplates.push(tmp);
      return tmp;
    };

    if(arguments.length === 0){ 
      // No arguments. Return a new poll synchronously.
      var builtTemplate = mockTemplate;
      return builtTemplate;
    } else if(arguments.length === 1 && typeof source === "function"){
      // One callback argument passed in. 
      // Return undefined now; call the callback asynchronously w/ the new poll.
      setTimeout(function(){ 
        callback(null, function () {
          var builtTemplate = mockTemplate;
          return builtTemplate;
        }); 
      }, 200);
      return undefined;
    } else if(arguments.length === 1 && typeof source === "object") {
      // One source object passed in.
      // Create a similar object from source object + defaults and return it sync.
      return copyTemplate(source);
    } else if(typeof source !== "object" && typeof callback !== "function"){
      // Bad argument syntax
      return new Error("japi.polls.templates.build() called with invalid arguments:\n"+arguments)
    } else {
      // we have at least 2 args AND source is an object AND callback is a fn
      // Create a similar object from source object + defaults;
      // Return undefined now; call the callback asynchronously w/ the new poll.
      setTimeout(function(){ 
        var newTemplate = copyTemplate(source);
        callback(null, newTemplate) 
      }, 200);
      return undefined;
    };
  };

  /* set aliases after defining everything: */
  japi.util = japi.utils;

  return japi;
}