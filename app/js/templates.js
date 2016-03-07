this["App"] = this["App"] || {};
this["App"]["Templates"] = this["App"]["Templates"] || {};

this["App"]["Templates"]["header-player"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"header__player\" data-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.place : stack1), depth0))
    + "\">\r\n	<img class=\"player__avatar--small\" src=\"assets/images/player-1.png\" alt=\"\">\r\n	<h4 class=\"player__name\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h4>\r\n	<p class=\"player__badge\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.badge : stack1), depth0))
    + "</p>\r\n	<p class=\"player__score\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.score : stack1), depth0))
    + "</p>\r\n</div>";
},"useData":true});

this["App"]["Templates"]["header-points"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p class=\"points__title\">Points</p>\r\n<h4 class=\"points__value\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.game : depth0)) != null ? stack1.points : stack1), depth0))
    + "</h4>";
},"useData":true});

this["App"]["Templates"]["header"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"header\">\r\n  <div class=\"player__round grid--40 text-align--center\">\r\n"
    + ((stack1 = container.invokePartial(partials["header-player"],depth0,{"name":"header-player","hash":{"player":((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.left : stack1)},"data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "  </div>\r\n  <div class=\"grid--20 header__points text-align--center\">\r\n"
    + ((stack1 = container.invokePartial(partials["header-points"],depth0,{"name":"header-points","hash":{"game":(depth0 != null ? depth0.game : depth0)},"data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "  </div>\r\n  <div class=\"player__round grid--40 text-align--center\">\r\n"
    + ((stack1 = container.invokePartial(partials["header-player"],depth0,{"name":"header-player","hash":{"player":((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.right : stack1)},"data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "  </div>\r\n</div>";
},"usePartial":true,"useData":true});

this["App"]["Templates"]["landing"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<input type=\"text\" id=\"name\" placeholder=\"Type your name here\" />\r\n<button class=\"btn btn-default btn__play\">Play</button>\r\n<button class=\"btn btn-default btn__follow\">Follow</button>\r\n<button class=\"btn btn-default btn__rank\">Rankings</button>\r\n<button class=\"btn btn-default btn__leave\">Leave</button>";
},"useData":true});

this["App"]["Templates"]["loading"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "Finding a match... please wait...";
},"useData":true});

this["App"]["Templates"]["options"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<!--	<button class=\"options game-button ingame__options--"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depths[1] != null ? depths[1].data : depths[1])) != null ? stack1.image : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.program(4, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "\" data-value=\""
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(alias5(depth0, depth0))
    + "</button>-->\r\n	\r\n	<a href=\"#\" class=\"options game-button ingame__options--"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depths[1] != null ? depths[1].data : depths[1])) != null ? stack1.image : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.program(4, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "\" data-value=\""
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(alias5(depth0, depth0))
    + "\r\n<!--	<span class=\"answer-me\"></span>-->\r\n	<!-- <span class=\"answer-opponent\"></span> -->\r\n	</a>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "half";
},"4":function(container,depth0,helpers,partials,data) {
    return "full";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.options : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});

this["App"]["Templates"]["question"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<img src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.image : stack1), depth0))
    + "\" alt=\"Yeah\">\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<h1 class=\"question question--short\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.question : stack1), depth0))
    + "</h1>\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.image : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["App"]["Templates"]["results"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<h1>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.status : stack1), depth0))
    + "</h1>\r\n<div>"
    + ((stack1 = container.invokePartial(partials["header-player"],depth0,{"name":"header-player","hash":{"player":((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.me : stack1)},"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</div>\r\n<div>"
    + ((stack1 = container.invokePartial(partials["header-player"],depth0,{"name":"header-player","hash":{"player":((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.opponent : stack1)},"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</div>\r\n<button class=\"game-button game-button--result game-button--red\">Rematch</button>\r\n<button class=\"game-button game-button--result game-button--blue-green\">Another Opponent</button>\r\n<button class=\"game-button game-button--result game-button--light-blue\">Leave</button>";
},"usePartial":true,"useData":true});

this["App"]["Templates"]["round"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"round text-align--center\">\r\n  <img src=\"assets/images/round-img.png\" alt=\"\">\r\n  <h1>"
    + container.escapeExpression(((helper = (helper = helpers.round || (depth0 != null ? depth0.round : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"round","hash":{},"data":data}) : helper)))
    + "</h1>\r\n</div>";
},"useData":true});

this["App"]["Templates"]["versus"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"versus\">\r\n\r\n  <div class=\"players__player player clearfix view-width--50\">\r\n    <div>\r\n      <img class=\"player__avatar player__avatar--left\" src=\"assets/images/player-1.png\" alt=\"\">\r\n      <div class=\"player__name\"><b>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.left : stack1)) != null ? stack1.name : stack1), depth0))
    + "</b></div>\r\n      <div class=\"player__badge\"><small>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.left : stack1)) != null ? stack1.badge : stack1), depth0))
    + "</small></div>\r\n      <div class=\"player__score\"></div>\r\n    </div>\r\n  </div>\r\n  <!--Seprators-->\r\n<!--\r\n  <div class=\"versus__separator view-height-10\">\r\n    <b>VasdasdasdS</b>\r\n    <svg height=\"100\" width=\"100\">\r\n      <circle cx=\"50\" cy=\"50\" r=\"40\" stroke=\"black\" stroke-width=\"3\" fill=\"red\" />\r\n    </svg>\r\n  </div>\r\n-->\r\n  <!--Player 2-->\r\n  <div class=\"players__player player player--right clearfix view-width--50\">\r\n   <img class=\"player__avatar player__avatar--right\" src=\"assets/images/player-2.png\" alt=\"\">\r\n    <div class=\"player__name\"><b>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.right : stack1)) != null ? stack1.name : stack1), depth0))
    + "</b></div>\r\n    <div class=\"player__badge\"><small>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.right : stack1)) != null ? stack1.badge : stack1), depth0))
    + "</small></div>\r\n    <div class=\"player__score\"></div>\r\n  </div>\r\n</div>";
},"useData":true});