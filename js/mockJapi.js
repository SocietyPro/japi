var Cambrian = Cambrian || {}
Cambrian.JAPI = function(){
  // Define some children objects, this is necessary because trying to set
  // more than one deep of an undefined object fails.
  // {}.foo=true works but {}.foo.bar=true doesn't: 
  // TypeError: Cannot set property 'bar' of undefined

  var japi = {
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
      myTemplates: {},
    },
  }

  japi.peer.ping = function(callback){
    //setTimeout(function(){ callback(null, false) }, 200);
    return 33;
  }

  /*
  japi.peer.polls.results = function(cambrianID, UUID, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  */
  japi.role.peerList.list = function(callback){
    //setTimeout(function(){ callback(null, false) }, 200);
    return [["hiro", "plato"], ["hiro", "henry", "harriet"]];
  };

  japi.role.peerList.save = function(UUID, XML, callback){
//    setTimeout(function(){ callback(null, false) }, 200);
    japi.explodeDueToBadCall();
  };
  japi.role.peerList.get = function(UUID, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  japi.role.peerList.delete = function(UUID, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  
  japi.utils.getUUID = function(){
    return "UUID1";
  };

  japi.polls.save = function(UUID, XML, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  japi.polls.list = function(callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  japi.polls.get = function(UUID, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  japi.polls.start = function(UUID, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  japi.polls.results = function(UUID, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  japi.polls.stop = function(UUID, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  japi.polls.delete = function(UUID, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  japi.polls.myTemplates.save = function(UUID, XML, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  japi.polls.myTemplates.get = function(UUID, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  japi.polls.myTemplates.list = function(callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  japi.polls.myTemplates.delete = function(UUID, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };


  return japi;
}
