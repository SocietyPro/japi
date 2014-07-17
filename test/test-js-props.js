var obj = {
  prop1: {an:"object"},
  prop2: {an:"different object"},
};

for(prop in obj){
  console.log(prop)
  console.log(obj[prop].an)
}
