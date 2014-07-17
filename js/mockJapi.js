var Japi = function(){
  // Define some children objects, this is necessary because trying to set
  // more than one deep of an undefined object fails.
  // {}.foo=true works but {}.foo.bar=true doesn't: 
  // TypeError: Cannot set property 'bar' of undefined

  var ret = {
    peer: {
      ping: {},
      recommendations: {},
      polls: {},
    },
    peerList: {},
    polls: {
      myTemplates: {},
    },
  }
  ret.peer.ping = function(callback){
    setTimeout(function(){ callback(null, false) }, 200);
  }

  ret.peerList.list = function(callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };

  ret.peerList.save = function(UUID, XML, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  ret.peerList.get = function(UUID, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  ret.peerList.delete = function(UUID, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  ret.peer.polls.results = function(cambrianID, UUID, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  ret.polls.save = function(UUID, XML, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  ret.polls.list = function(callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  ret.polls.get = function(UUID, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  ret.polls.start = function(UUID, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  ret.polls.results = function(UUID, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  ret.polls.stop = function(UUID, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  ret.polls.delete = function(UUID, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  ret.polls.myTemplates.save = function(UUID, XML, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  ret.polls.myTemplates.get = function(UUID, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  ret.polls.myTemplates.list = function(callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  ret.polls.myTemplates.delete = function(UUID, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };


  return ret;
}
