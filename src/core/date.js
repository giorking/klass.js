
Date.prototype.toRelativeTime = function(fromDate) {
 var delta       = (fromDate || new Date()) - this;
 var units       = null;
 var conversions = {
   millisecond: 1, // ms    -> ms
   second: 1000,   // ms    -> sec
   minute: 60,     // sec   -> min
   hour:   60,     // min   -> hour
   day:    24,     // hour  -> day
   month:  30,     // day   -> month (roughly)
   year:   12      // month -> year
 };

 for(var key in conversions) {
   if(delta < conversions[key]) {
     break;
   } else {
     units = key; // keeps track of the selected key over the iteration
     delta = delta / conversions[key];
   }
 }

 // pluralize a unit when the difference is greater than 1.
 delta = Math.floor(delta);
 if(delta !== 1) { units += "s"; }
 return [delta, units, "ago"].join(" ");
}
 
Date.prototype.strftime = (function(){ 

  function interpret(value) { return value == null ? '' : String(value); };
  function pad(num,count,padChar) {
    padChar = padChar || '0';
    var numZeropad = num + '';
    while(numZeropad.length < count) { numZeropad = padChar + numZeropad; }
    return numZeropad;
  }
  function gsub(source, pattern, replacement) {
    var result = '', match;
    if (typeof pattern == 'string') pattern = RegExp.escape(pattern);
    if (!(pattern.length || pattern.source)) {
      replacement = replacement('');
      return replacement + source.split('').join(replacement) + replacement;
    }
    while (source.length > 0) {
      if (match = source.match(pattern)) {
        result += source.slice(0, match.index);
        result += interpret(replacement(match));
        source  = source.slice(match.index + match[0].length);
      } else {
        result += source, source = '';
      }
    }
    return result;
  }
      
  return function(format) {
    var self = this,
        day = self.getUTCDay(), month = self.getUTCMonth();
        hours = self.getUTCHours(), minutes = self.getUTCMinutes();
    return gsub(format, /\%([aAbBcdeHiImMpSwyY])/, function(part) {
      switch(part[1]) {
        case 'a': return Date.SHORT_DAYS[day]; break;
        case 'A': return Date.LONG_DAYS[day]; break;
        case 'b': return Date.SHORT_MONTHS[month]; break;
        case 'B': return Date.LONG_MONTHS[month]; break;
        case 'c': return self.toString(); break;
        case 'd': return pad(self.getUTCDate(), 2); break;
        case 'e': return pad(self.getUTCDate(), 2, ' '); break;
        case 'H': return pad(hours, 2); break;
        case 'i': return (hours === 12 || hours === 0) ? 12 : (hours + 12) % 12; break;
        case 'I': return pad((hours === 12 || hours === 0) ? 12 : (hours + 12) % 12, 2); break;
        case 'm': return pad(month + 1, 2); break;
        case 'M': return pad(minutes, 2); break;
        case 'p': return hours > 11 ? 'PM' : 'AM'; break;
        case 'S': return pad(self.getUTCSeconds(), 2); break;
        case 'w': return day; break;
        case 'y': return pad(self.getUTCFullYear() % 100, 2); break;
        case 'Y': return self.getUTCFullYear().toString(); break;
      }
    });
  }
})();

Date.SHORT_DAYS   = ("Sun Mon Tue Wed Thu Fri Sat").split(' ');
Date.LONG_DAYS    = ("Sunday Monday Tuesday Wednesday Thursday Friday Saturday").split(' ');
Date.SHORT_MONTHS = ("Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec").split(' ');
Date.LONG_MONTHS  = ("January February March April May June July August September October November December").split(' ');
/*
 * Wraps up a common pattern used with this plugin whereby you take a String 
 * representation of a Date, and want back a date object.
 */
Date.fromString = function(str) {
  return new Date(Date.parse(str));
};