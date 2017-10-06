const Promise = require('bluebird');

let cache = {};

const mainFunc = (key,value,ttl) =>{
  value.ttl = ttl || 10000;
  cache[key] = value;
  return key
};

const checkTTL = () =>{
  let keys = Object.keys(cache);
  if(keys.length > 0){
    keys.map(key=>{
      cache[key].ttl--;
      if(cache[key].ttl === 0){
        delete cache[key];
      }
    })
  }
};

const checkNested = item =>{
  let keys = Object.keys(item);
  for(let i=0,len=keys.length;i<len;i++){
    if(typeof item[keys[i]] === 'object'){
      return true;
    }
  }
  return false;
};

const isPrimitive = test => test !== Object(test);


const setCache = (key, value, ttl) =>{
  return Promise.try(()=>{
    if(isPrimitive(key)){
      if(!Array.isArray(value) && typeof value === 'object'){
        if(checkNested(value) === true){
          throw new Error('value can not be a nested object, only 1 level deep object is allowed!');
        }
        else return mainFunc(key,value,ttl);
      }
      else throw new Error('Value must be an object!');
    }
    else throw new Error('Key must be a string or a number!');
  });
};

const getCache = key => Promise.try(()=> cache[key]);

setInterval(()=>checkTTL(),1000);



setCache('r_cache_01',{person:"adam",height:187},10)
  .then(key=>getCache(key))
  .then(answer=>console.log(answer))
  .catch(err=>console.error(err))