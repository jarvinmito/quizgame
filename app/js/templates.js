this["App"] = this["App"] || {};
this["App"]["Templates"] = this["App"]["Templates"] || {};

this["App"]["Templates"]["header-player"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"header__player\" data-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.place : stack1), depth0))
    + "\">\r\n	<img class=\"player__avatar--small\" src=\"assets/images/player-1.png\" alt=\"\">\r\n  <div class=\"player__details\">\r\n	<h4 class=\"player__name\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h4>\r\n	<p class=\"player__badge\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.badge : stack1), depth0))
    + "</p>\r\n	<p class=\"player__score\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.score : stack1), depth0))
    + "</p>\r\n  </div>\r\n</div>";
},"useData":true});

this["App"]["Templates"]["header-points"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p class=\"points__title\">Points</p>\r\n<h4 class=\"points__value\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.game : depth0)) != null ? stack1.points : stack1), depth0))
    + "</h4>";
},"useData":true});

this["App"]["Templates"]["header"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"header\">\r\n"
    + ((stack1 = container.invokePartial(partials["header-player"],depth0,{"name":"header-player","hash":{"player":((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.left : stack1)},"data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "	<div class=\"header__points\">\r\n"
    + ((stack1 = container.invokePartial(partials["header-points"],depth0,{"name":"header-points","hash":{"game":(depth0 != null ? depth0.game : depth0)},"data":data,"indent":"\t  ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "	</div>\r\n"
    + ((stack1 = container.invokePartial(partials["header-player"],depth0,{"name":"header-player","hash":{"player":((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.right : stack1)},"data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</div>";
},"usePartial":true,"useData":true});

this["App"]["Templates"]["landing"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<input type=\"text\" id=\"name\" placeholder=\"Type your name here\" />\r\n<button class=\"btn btn-default btn__play\">Play</button>\r\n<button class=\"btn btn-default btn__follow\">Follow</button>\r\n<button class=\"btn btn-default btn__rank\">Rankings</button>\r\n<button class=\"btn btn-default btn__leave\">Leave</button>";
},"useData":true});

this["App"]["Templates"]["loading"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"loading-screen\"></div>\r\n<div class=\"loading-screen__sky\"></div>\r\n<div class=\"loading-screen__clouds\"></div>\r\n\r\n<img class=\"loading-screen__cloud-one\" src=\"./assets/images/cloud-one.svg\" alt=\"\">\r\n<img class=\"loading-screen__cloud-two\" src=\"./assets/images/cloud-two.svg\" alt=\"\">\r\n<img class=\"loading-screen__cloud-three\" src=\"./assets/images/cloud-three.svg\" alt=\"\">\r\n<img class=\"loading-screen__cloud-four\" src=\"./assets/images/cloud-four.svg\" alt=\"\">\r\n<img class=\"loading-screen__cloud-five\" src=\"./assets/images/cloud-five.svg\" alt=\"\">\r\n\r\n<img class=\"loading-screen__flag\" src=\"./assets/images/flag.svg\" alt=\"\">\r\n<img class=\"loading-screen__jeep\" src=\"./assets/images/jeepney.svg\" alt=\"\">";
},"useData":true});

this["App"]["Templates"]["modal"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "is-half";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.modal : depth0)) != null ? stack1.buttons : stack1),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "          <a class=\"pop-up__button "
    + alias2(alias1((depth0 != null ? depth0["class"] : depth0), depth0))
    + "\" href=\"#\">"
    + alias2(alias1((depth0 != null ? depth0.caption : depth0), depth0))
    + "</a>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "          <a class=\"pop-up__button pop-up__exit\" href=\"#\">Go Back</a>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};

  return "<div class=\"pop-up\">\r\n  <div class=\"pop-up__wrap\">\r\n    <div class=\"pop-up__header\">\r\n      <h4 class=\"pop-up__title\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.modal : depth0)) != null ? stack1.title : stack1), depth0))
    + "</h4>\r\n      <a class=\"pop-up__close\" href=\"#\"><img src=\"assets/images/close.svg\" alt=\"\"></a>\r\n    </div>\r\n    <div class=\"pop-up__body\">\r\n      <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.modal : depth0)) != null ? stack1.message : stack1), depth0))
    + "</p>\r\n    </div>\r\n    <div class=\"pop-up__footer "
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.modal : depth0)) != null ? stack1.isprompt : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n    \r\n"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.modal : depth0)) != null ? stack1.isprompt : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + "    </div>\r\n  </div>\r\n</div>";
},"useData":true});

this["App"]["Templates"]["options"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<!--	<button class=\"options game-button ingame__options--"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depths[1] != null ? depths[1].data : depths[1])) != null ? stack1.image : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.program(4, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "\" data-value=\""
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(alias5(depth0, depth0))
    + "</button>-->\r\n	\r\n	<a href=\"#\" class=\"options game-button\" data-value=\""
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
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression;

  return "<h1 class=\"question question--"
    + alias1((helpers.textLength || (depth0 && depth0.textLength) || helpers.helperMissing).call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.question : stack1),{"name":"textLength","hash":{},"data":data}))
    + "\">"
    + alias1(container.lambda(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.question : stack1), depth0))
    + "</h1>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.image : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});

this["App"]["Templates"]["results-buttons"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"result-page__list\">\r\n	<button class=\"game-button result-page__button game-button--rematch game-button--light-blue\">Rematch</button>\r\n	<button class=\"game-button result-page__button game-button--random game-button--blue-green\">Another Opponent</button>\r\n	<button class=\"game-button result-page__button game-button--leave game-button--red \">Leave</button>\r\n</div>";
},"useData":true});

this["App"]["Templates"]["results"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"result-page--parent result-page result-page--"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.result : stack1), depth0))
    + "\">\r\n  <h1 class=\"result-page__title\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.status : stack1), depth0))
    + "</h1>\r\n  <div class=\"result-page main-player\" data-id=\"b\">\r\n    <img class=\"main-player__avatar\" src=\"assets/images/player-1.png\" alt=\"\">\r\n    <div class=\"main-player__details ribbon-content\">\r\n      <h4 class=\"main-player__name \">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.me : stack1)) != null ? stack1.badge : stack1), depth0))
    + "</h4>\r\n      <!--          <span class=\"result-page__badge\">Magaling</span>-->\r\n      <span class=\"main-player__score\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.me : stack1)) != null ? stack1.score : stack1), depth0))
    + " POINTS</span>\r\n    </div>\r\n  </div>\r\n  <div class=\"result-page opponent\">\r\n    <div class=\"opponent__text\">\r\n      <p>OPPONENT</p>\r\n      <p>DETAILS</p>\r\n    </div>\r\n    <div class=\"opponent__avatar\">\r\n      <img class=\"\" src=\"assets/images/player-1.png\" alt=\"\">\r\n    </div>\r\n    <div class=\"opponent__level-points\">\r\n      <p>LEVEL: "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.opponent : stack1)) != null ? stack1.badge : stack1), depth0))
    + "</p>\r\n      <p>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.opponent : stack1)) != null ? stack1.score : stack1), depth0))
    + " POINTS</p>\r\n    </div>\r\n  </div>\r\n\r\n"
    + ((stack1 = container.invokePartial(partials["results-buttons"],depth0,{"name":"results-buttons","data":data,"indent":"  ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</div>";
},"usePartial":true,"useData":true});

this["App"]["Templates"]["round"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression;

  return "<div class=\"waiting-screen\">\r\n  <img class=\"waiting-screen__logo\" src=\"assets/images/vanamo_logo.png\" alt=\"\">\r\n  <h3 class=\"waiting-screen__topic\">"
    + alias1(container.lambda(((stack1 = (depth0 != null ? depth0.topic : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h3>\r\n  <p>"
    + alias1(((helper = (helper = helpers.round || (depth0 != null ? depth0.round : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"round","hash":{},"data":data}) : helper)))
    + "</p>\r\n</div>";
},"useData":true});

this["App"]["Templates"]["versus"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"versus\">\r\n  <div class=\"versus__vs\">VS</div>\r\n  <div class=\"versus__one player--one\">\r\n   \r\n      <img class=\"player__avatar player__avatar--left\" src=\"assets/images/player-1.png\" alt=\"\">\r\n      <div class=\"player__details\">\r\n        <div class=\"player__name\"><b>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.left : stack1)) != null ? stack1.name : stack1), depth0))
    + "</b></div>\r\n        <div class=\"player__badge\"><small>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.left : stack1)) != null ? stack1.badge : stack1), depth0))
    + "</small></div>\r\n        <div class=\"player__score\"></div>\r\n      </div>\r\n    \r\n  </div>\r\n\r\n  <div class=\"versus__two player--two\">\r\n    \r\n      <img class=\"player__avatar player__avatar--right\" src=\"assets/images/player-2.png\" alt=\"\">\r\n      <div class=\"player__details\">\r\n        <div class=\"player__name\"><b>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.right : stack1)) != null ? stack1.name : stack1), depth0))
    + "</b></div>\r\n        <div class=\"player__badge\"><small>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.right : stack1)) != null ? stack1.badge : stack1), depth0))
    + "</small></div>\r\n        <div class=\"player__score\"></div>\r\n      </div>\r\n\r\n  </div>\r\n</div>";
},"useData":true});

this["App"]["Templates"]["waiting-rematch"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"rematch\">\r\n<h3 class=\"rematch__title\">Waiting for the other player</h3>\r\n<time class=\"rematch_time\">"
    + ((stack1 = container.invokePartial(partials["waiting-timer"],depth0,{"name":"waiting-timer","hash":{"time":(depth0 != null ? depth0.time : depth0)},"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</time>\r\n<button class=\"game-button result-page__button game-button--cancel game-button--red \">Cancel</button>\r\n</div>";
},"usePartial":true,"useData":true});

this["App"]["Templates"]["waiting-timer"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<span>"
    + container.escapeExpression((helpers.timeToMinutes || (depth0 && depth0.timeToMinutes) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.time : depth0),{"name":"timeToMinutes","hash":{},"data":data}))
    + "<span>";
},"useData":true});

this["App"]["Templates"]["waiting"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"waiting-screen\">\r\n  <img class=\"waiting-screen__logo\" src=\"assets/images/vanamo_logo.png\" alt=\"\">\r\n  <h3 class=\"waiting-screen__topic\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.topic : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h3>\r\n  <div class=\"waitin-screen__wrap\">\r\n  	<p>waiting for the player to accept the challenge</p>\r\n  	<time class=\"waiting-screen__timer\">"
    + ((stack1 = container.invokePartial(partials["waiting-timer"],depth0,{"name":"waiting-timer","hash":{"time":(depth0 != null ? depth0.time : depth0)},"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</time>\r\n  </div>\r\n</div>";
},"usePartial":true,"useData":true});