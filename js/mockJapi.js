var Japi = function(){
  // Define some children objects, this is necessary because trying to set
  // more than one deep of an undefined object fails.
  // {}.foo=true works but {}.foo.bar=true doesn't: 
  // TypeError: Cannot set property 'bar' of undefined

  var ret = {
    Peer: {
      Ping: {},
      Recommendations: {},
      Polls: {},
    },
    PeerList: {},
    Polls: {
      MyTemplates: {},
    },
  }
  ret.Peer.Ping = function(callback){
    setTimeout(function(){ callback(null, false) }, 200);
  }

  ret.PeerList.List = function(callback){
    return callback(null, ["tim", "bob", "charlie"]);
    //return(["tim", "bob", "charlie"])
  };

  ret.PeerList.Save = function(UUID, XML, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  ret.PeerList.Get = function(UUID, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  ret.PeerList.Delete = function(UUID, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  ret.Peer.Polls.Results = function(CambrianID, UUID, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  ret.Polls.Save = function(UUID, XML, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  ret.Polls.List = function(callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  ret.Polls.Get = function(UUID, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  ret.Polls.Start = function(UUID, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  ret.Polls.Results = function(UUID, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  ret.Polls.Stop = function(UUID, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  ret.Polls.Delete = function(UUID, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  ret.Polls.MyTemplates.Save = function(UUID, XML, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  ret.Polls.MyTemplates.Get = function(UUID, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  ret.Polls.MyTemplates.List = function(callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };
  ret.Polls.MyTemplates.Delete = function(UUID, callback){
    setTimeout(function(){ callback(null, false) }, 200);
  };


  return ret;
}

var myJapi = new Japi();
myJapi.PeerList.List(function(){
  console.log("Hello from the callback to myJapi.PeerList.List");
})

  /*
ret.Peer.Ping
ret.PeerList.List
ret.PeerList.Save
ret.PeerList.Get
ret.PeerList.Delete
ret.Peer.Polls.Results
ret.Polls.Save
ret.Polls.List
ret.Polls.Get
ret.Polls.Start
ret.Polls.Results
ret.Polls.Stop
ret.Polls.Delete
ret.Polls.MyTemplates.Save
ret.Polls.MyTemplates.Get
ret.Polls.MyTemplates.List
ret.Polls.MyTemplates.Delete
*/
