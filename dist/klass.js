
(function klassWrapper(){var initializing=false,fnTest=/xyz/.test(function(){xyz;})?/\b(_super|_klass)\b/:/.*/;this.Klass=function KlassBase(name,props){if(this instanceof arguments.callee){}else{return arguments.callee.subclassAs(name,props);}};this.Klass.prototype.method=function method(){if(arguments.length==0||typeof arguments[0]!="string")
throw"You must specify a method name (as a String)";var self=this,args=Array.prototype.slice.call(arguments),name=args.shift(),meth=self[name];if(typeof meth==='function')
return function(){return meth.apply(self,args.concat(Array.prototype.slice.call(arguments)));}
else
throw"Method "+name+" not found!";};function mergeProperties(from,to,parent,self){for(var name in from){to[name]=typeof from[name]=="function"&&typeof parent[name]=="function"&&fnTest.test(from[name])?(function(name,fn){return function(){var tmp=this._super;this._super=parent[name];var ret=fn.apply(this,arguments);this._super=tmp;return ret;};})(name,from[name]):from[name];}}
Klass.subclassAs=function subclassAs(klassName,prop){if(typeof klassName=='object'&&typeof prop=='undefined'){prop=klassName;klassName='';}
var _super=this.prototype,klassIdent=(klassName||""),klassPath=klassIdent.split('.'),klassName=klassPath.pop(),klassMeths=prop['klass'],supKlasMeths=this['_staticMethods'],ctx=window;delete prop['klass'];for(var i=0;i<klassPath.length;i++){var pathSeg=klassPath[i];if(!ctx[pathSeg])ctx[pathSeg]={};ctx=ctx[pathSeg];};klassPath=klassPath.join('.');initializing=true;var prototype=new this();initializing=false;if(klassName!=''){Klass._name=klassName;Klass._ns=klassPath;Klass._fullname=klassIdent;Klass._staticMethods=klassMeths;prototype._klass=Klass;}
mergeProperties(prop,prototype,_super,this);function Klass(klassName,props){if(this instanceof arguments.callee){if(!initializing&&this.init)
this.init.apply(this,arguments);}else{arguments.callee.subclassAs(klassName,props)}}
Klass.prototype=prototype;Klass.constructor=Klass;if(supKlasMeths)mergeProperties(supKlasMeths,Klass,{},Klass);mergeProperties(klassMeths,Klass,(supKlasMeths||{}),Klass);Klass.subclassAs=arguments.callee;ctx[klassName]=Klass;return Klass;};})();if(typeof Object.getPrototypeOf!=="function"){if(typeof"test".__proto__==="object"){Object.getPrototypeOf=function(object){return object.__proto__;};}else{Object.getPrototypeOf=function(object){return object.constructor.prototype;};}}
Object.setPrototypeOf=(function(){if({}.__proto__){return function(o,proto){o.__proto__=proto;return o;}}else{return function(o,proto){o.constructor.prototype=proto;return o;}}})();var typeOf=(function(){var arrayCtor=(new Array).constructor,dateCtor=(new Date).constructor,regexpCtor=(new RegExp).constructor;return function(v){var typeStr=typeof(v);if(typeStr=="object"||typeStr=='function'){if(v===null)return"null";if(v.constructor==arrayCtor)return"array";if(v.constructor==dateCtor)return"date";if(v.constructor==regexpCtor)return"regexp";}
return typeStr;}})();if(!({}).watch&&({}).__defineGetter__){(function setupWatch(){var _watchCache={_values:{},_objs:{},init:function(obj,key){if(!_watchCache._values[obj])_watchCache._values[obj]={};if(!_watchCache._objs[obj])_watchCache._objs[obj]=0;_watchCache._values[obj][key]=obj[key];_watchCache._objs[obj]+=1;},get:function(obj,key){return _watchCache._values[obj][key];},set:function(obj,key,value){_watchCache._values[obj][key]=value;},remove:function(obj,key){if(_watchCache._values[obj]&&(key in _watchCache._values[obj])){delete _watchCache._values[obj][key];_watchCache._objs[obj]-=1;if(_watchCache._objs[obj]==0){delete _watchCache._objs[obj];delete _watchCache._values[obj];}}}};Object.prototype.watch=function(key,callback){if(typeof key!="string")return;if(typeof callback!="function")return;var self=this;_watchCache.init(self,key);this.__defineGetter__(key,function(){return _watchCache.get(self,key);});this.__defineSetter__(key,function(newValue){var oldValue=_watchCache.get(self,key),newValue=newValue,newFromWatch=null,newFromWatch=callback.apply(self,[key,oldValue,newValue]);if(newFromWatch!=oldValue)
_watchCache.set(self,key,newFromWatch);});}
Object.prototype.unwatch=function(key){if(typeof key!="string")return;if(!_watchCache._values[this])return;var oldVal=_watchCache.get(this,key);_watchCache.remove(this,key);delete this[key];this[key]=oldVal;}
Object.clearWatchCache=function(){_watchCache._values={};_watchCache._objs={};}
Object.unwatchAllFor=new Function();Object.unwatchAll=new Function();})();}else{Object.clearWatchCache=new Function();Object.unwatchAllFor=new Function();Object.unwatchAll=new Function();}
Date.prototype.toRelativeTime=function(fromDate){var delta=(fromDate||new Date())-this;var units=null;var conversions={millisecond:1,second:1000,minute:60,hour:60,day:24,month:30,year:12};for(var key in conversions){if(delta<conversions[key]){break;}else{units=key;delta=delta/conversions[key];}}
delta=Math.floor(delta);if(delta!==1){units+="s";}
return[delta,units,"ago"].join(" ");}
Date.prototype.strftime=(function(){function interpret(value){return value==null?'':String(value);};function pad(num,count,padChar){padChar=padChar||'0';var numZeropad=num+'';while(numZeropad.length<count){numZeropad=padChar+numZeropad;}
return numZeropad;}
function gsub(source,pattern,replacement){var result='',match;if(typeof pattern=='string')pattern=RegExp.escape(pattern);if(!(pattern.length||pattern.source)){replacement=replacement('');return replacement+source.split('').join(replacement)+replacement;}
while(source.length>0){if(match=source.match(pattern)){result+=source.slice(0,match.index);result+=interpret(replacement(match));source=source.slice(match.index+match[0].length);}else{result+=source,source='';}}
return result;}
return function(format){var self=this,day=self.getUTCDay(),month=self.getUTCMonth();hours=self.getUTCHours(),minutes=self.getUTCMinutes();return gsub(format,/\%([aAbBcdeHiImMpSwyY])/,function(part){switch(part[1]){case'a':return Date.SHORT_DAYS[day];break;case'A':return Date.LONG_DAYS[day];break;case'b':return Date.SHORT_MONTHS[month];break;case'B':return Date.LONG_MONTHS[month];break;case'c':return self.toString();break;case'd':return pad(self.getUTCDate(),2);break;case'e':return pad(self.getUTCDate(),2,' ');break;case'H':return pad(hours,2);break;case'i':return(hours===12||hours===0)?12:(hours+12)%12;break;case'I':return pad((hours===12||hours===0)?12:(hours+12)%12,2);break;case'm':return pad(month+1,2);break;case'M':return pad(minutes,2);break;case'p':return hours>11?'PM':'AM';break;case'S':return pad(self.getUTCSeconds(),2);break;case'w':return day;break;case'y':return pad(self.getUTCFullYear()%100,2);break;case'Y':return self.getUTCFullYear().toString();break;}});}})();Date.SHORT_DAYS=("Sun Mon Tue Wed Thu Fri Sat").split(' ');Date.LONG_DAYS=("Sunday Monday Tuesday Wednesday Thursday Friday Saturday").split(' ');Date.SHORT_MONTHS=("Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec").split(' ');Date.LONG_MONTHS=("January February March April May June July August September October November December").split(' ');Date.fromString=function(str){return new Date(Date.parse(str));};function parseArgs(){var callerArgs=parseArgs.caller.arguments;for(var i=0;i<arguments.length;i++){var matchArgs=[],matchNames=[],matchCount=0;matched={matchedOn:i};for(var prop in arguments[i]){if(arguments[i].hasOwnProperty(prop)){matchArgs.push(arguments[i][prop]);matchNames.push(prop);}}
if(callerArgs.length==matchArgs.length){for(var j=0;j<matchArgs.length;j++){if(callerArgs[j]&&callerArgs[j].constructor===matchArgs[j]){matched[matchNames[j]]=callerArgs[j];matchCount++;}else{isMatched=false;}};if(matchCount==callerArgs.length)
return matched;}}
return{matchedOn:-1};}