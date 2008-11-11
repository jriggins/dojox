dojo.provide("dojox.lang.oo.aop");

dojo.require("dojox.lang.oo.Decorator");
dojo.require("dojox.lang.oo.chain");

(function(){
	var oo = dojox.lang.oo, md = oo.makeDecorator, ooa = oo.aop;

	// five decorators implementing light-weight AOP weaving

	ooa.before = oo.chain.before;	// reuse one decorator

	ooa.around = md(function(name, newValue, oldValue){
		// summary: creates an "around" advise,
		// the previous value is passed as a first argument and can be null,
		// arguments are passed as a second argument
		oldValue = typeof oldValue == "function" ? oldValue : null;
		return function(){ return newValue.call(this, oldValue, arguments); };
	});

	ooa.afterReturning = md(function(name, newValue, oldValue){
		// summary: creates an "afterReturning" advise,
		// the returned value is passed as the only argument
		return typeof oldValue == "function" ?
			function(){
				var ret = oldValue.apply(this, arguments);
				newValue.call(this, ret);
				return ret;
			} : function(){ newValue.call(this); };
	});

	ooa.afterThrowing = md(function(name, newValue, oldValue){
		// summary: creates an "afterThrowing" advise,
		// the exception is passed as the only argument
		return typeof oldValue == "function" ?
			function(){
				var ret;
				try{
					ret = oldValue.apply(this, arguments);
				}catch(e){
					newValue.call(this, e);
					throw e;
				}
				return ret;
			} : oldValue;
	});

	ooa.after = md(function(name, newValue, oldValue){
		// summary: creates an "after" advise,
		// it takes no arguments
		return typeof oldValue == "function" ?
			function(){
				var ret;
				try{
					ret = oldValue.apply(this, arguments);
				}finally{
					newValue.call(this);
				}
				return ret;
			} : function(){ newValue.call(this); }
	});
})();