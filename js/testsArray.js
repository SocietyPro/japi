var Cambrian = Cambrian || {};
Cambrian.japiTests = Cambrian.japiTests || {};

// Instantiate japi so interpreter doesn't complain about undefined.things:
var japi = new Cambrian.JAPI();

Cambrian.japiTests.tests = 
[
  {
    name: "peerPing",
    comment: "",
    functionCall: japi.peer.ping,
    arguments: [ ],
    expected: false
  },
  {
    name: "peerListing",
    comment: "",
    functionCall: japi.peerList.list,
    arguments: [ ],
    expected: ""
  },
  {
    name: "savePeerListing",
    comment: "",
    functionCall: japi.peerList.save,
    arguments: [ "PeerList UUID", "XML"],
    expected: ""
  },
  {
    name: "getPeerList",
    comment: "",
    functionCall: japi.peerList.get,
    arguments: [ "PeerList ID"],
    expected: ""
  },
  {
    name: "deletePeerList",
    comment: "",
    functionCall: japi.peerList.delete,
    arguments: [ "PeerList ID"],
    expected: ""
  },
  {
    name: "pollResults",
    comment: "",
    functionCall: japi.peer.polls.results,
    arguments: [ "JID/Cambrian ID", "POLL ID"],
    expected: ""
  },
  {
    name: "pollSave",
    comment: "",
    functionCall: japi.polls.save,
    arguments: [ "POLL_UUID", "POLL XML"],
    expected: ""
  },
  {
    name: "pollsList",
    comment: "",
    functionCall: japi.polls.list,
    arguments: [],
    expected: ""
  },
  {
    name: "pollGet",
    comment: "",
    functionCall: japi.polls.get,
    arguments: [ "POLL_UUID"],
    expected: ""
  },
  {
    name: "pollStart",
    comment: "",
    functionCall: japi.polls.start,
    arguments: [ "POLL_UUID"],
    expected: ""
  },
  {
    name: "pollResults",
    comment: "",
    functionCall: japi.polls.results,
    arguments: [ "POLL_UUID"],
    expected: ""
  },
  {
    name: "pollStop",
    comment: "",
    functionCall: japi.polls.stop,
    arguments: [ "POLL_UUID"],
    expected: ""
  },
  {
    name: "pollDelete",
    comment: "",
    functionCall: japi.polls.delete,
    arguments: [ "POLL ID"],
    expected: ""
  },
  {
    name: "templateSave",
    comment: "",
    functionCall: japi.polls.myTemplates.save,
    arguments: [ "TEMPLATE_UUID", "TEMPLATE XML"],
    expected: ""
  },
  {
    name: "templateGet",
    comment: "",
    functionCall: japi.polls.myTemplates.get,
    arguments: ["TEMPLATE_UUID"],
    expected: ""
  },
  {
    name: "templatesList",
    comment: "",
    functionCall: japi.polls.myTemplates.list,
    arguments: [],
    expected: ""
  },
  {
    name: "templatesDelete",
    comment: "",
    functionCall: japi.polls.myTemplates.delete,
    arguments: [ "TEMPLATE_UUID"],
    expected: ""
  } 
]
