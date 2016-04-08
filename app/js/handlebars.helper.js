// use template as partials too
Handlebars.partials = Handlebars.templates;
Handlebars.partials = this['App']['Templates'];

Handlebars.registerHelper("timeToMinutes", function(secs) {
  var pad = function(num) {
    return ("0"+num).slice(-2);
  };

  var minutes = Math.floor(secs / 60);
  secs = secs%60;
  
  // var hours = Math.floor(minutes/60)
  //minutes = minutes%60;
  return pad(minutes)+":"+pad(secs);
});

Handlebars.registerHelper("textLength", function(text){
	var words = text.split(" ");

	return (words.length > 1) ? 'long' : 'short';
});

Handlebars.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});