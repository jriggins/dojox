dojo.provide("dojox.editor.plugins.CollapsibleToolbar");

dojo.require("dijit._Widget")
dojo.require("dijit._Templated");
dojo.require("dijit._editor._Plugin");

dojo.requireLocalization("dojox.editor.plugins", "CollapsibleToolbar");

dojo.declare("dojox.editor.plugins._CollapsibleToolbarButton", [dijit._Widget, dijit._Templated], {
	// summary:
	//		Simple internal widget for representing a clickable button for expand/collapse
	//		with A11Y support.
	// tags:
	//		private
	templateString: "<div tabindex='0'roll='button'></div>",

	// title [public] String
	//		The text to read by a screen reader that gets button focus.
	title: "",

	// buttonClass [public] String
	//		The classname to apply to the expand/collapse button.
	buttonClass: "",

	// text [public] String
	//		The text to use as expand/collapse in A11Y mode.
	text: "",
	
	// textClass [public] String
	//		The classname to apply to the expand/collapse text.
	textClass: "",

	postCreate: function(){
		// summary:
		//		Over-ride of post create to attach in all the titles, text, etc.
		this.connect(this.domNode, "ondijitclick", "onClick");
		if(this.title){
			dojo.attr(this.domNode, "title", this.title);
		}
		if(this.buttonClass){
			dojo.addClass(this.domNode, this.buttonClass);
		}
		if(this.text){
			var tn = dojo.create("span", {innerHTML: this.text}, this.domNode);
			if(this.textClass){
				dojo.addClass(tn, this.textClass); 
			}
		}
	},

	onClick: function(e){
		// summary:
		//		Simple synthetic event to listen for dijit click events (mouse or keyboard)
	}
});


dojo.declare("dojox.editor.plugins.CollapsibleToolbar",dijit._editor._Plugin,{
	// summary:
	//		This plugin provides a weappable toolbar container to allow expand/collapse
	//		of the editor toolbars.  This plugin should be registered first in most cases to
	//		avoid conflicts in toolbar construction.
	
	setEditor: function(editor){
		// summary:
		//		Over-ride for the setting of the editor.
		// editor: Object
		//		The editor to configure for this plugin to use.
		this.editor = editor;
		this._constructContainer();
	},

	_constructContainer: function(){
		// summary:
		//		Internal function to construct a wrapper for the toolbar/header that allows
		//		it to expand and collapse.  It effectively builds a containing table, 
		//		which handles the layout nicely and gets BIDI support by default.
		// tags:
		//		private
		var strings = dojo.i18n.getLocalization("dojox.editor.plugins", "CollapsibleToolbar");
		
		// Build the containers.
		var container = dojo.create("table", {style: { width: "100%" }, tabindex: -1, "class": "dojoxCollapsibleToolbarContainer"});
		var tbody = dojo.create("tbody", {tabindex: -1}, container);
		var row = dojo.create("tr", {tabindex: -1}, tbody);
		var openTd = dojo.create("td", {"class": "dojoxCollapsibleToolbarControl", tabindex: -1}, row);
		var closeTd = dojo.create("td", {"class": "dojoxCollapsibleToolbarControl",  tabindex: -1}, row);
		var menuTd = dojo.create("td", {style: { width: "100%" }, tabindex: -1}, row);
		var m = dojo.create("span", {style: { width: "100%" }, tabindex: -1}, menuTd);

		var collapseButton = new dojox.editor.plugins._CollapsibleToolbarButton({
			buttonClass: "dojoxCollapsibleToolbarCollapse",
			title: strings.collapse,
			text: "-",
			textClass: "dojoxCollapsibleToolbarCollapseText"
		});
		dojo.place(collapseButton.domNode, openTd);
		var expandButton = new dojox.editor.plugins._CollapsibleToolbarButton({
			buttonClass: "dojoxCollapsibleToolbarExpand",
			title: strings.expand,
			text: "+",
			textClass: "dojoxCollapsibleToolbarExpandText"
		});
		dojo.place(expandButton.domNode, closeTd);

		// Attach everything in now.
		dojo.style(closeTd, "display", "none");
		dojo.place(container, this.editor.toolbar.domNode, "after");
		dojo.place(this.editor.toolbar.domNode, m);

		this.openTd = openTd;
		this.closeTd = closeTd;
		this.menu = m;

		// Establish the events to handle open/close.
		this.connect(collapseButton, "onClick", "_onClose");
		this.connect(expandButton, "onClick", "_onOpen");

		// Set up some focus handlers so hilighting appears on IE.  Focus box needed 
		// to be A11Y compliant.
		if(dojo.isIE){
			this.connect(collapseButton.domNode, "onfocus", function(){
				dojo.addClass(collapseButton.domNode, "dojoxCollapsibleToolbarButtonFocus");
			});
			this.connect(collapseButton.domNode, "onblur", function(){
				dojo.removeClass(collapseButton.domNode, "dojoxCollapsibleToolbarButtonFocus");
			});
			this.connect(expandButton.domNode, "onfocus", function(){
				dojo.addClass(expandButton.domNode, "dojoxCollapsibleToolbarButtonFocus");
			});
			this.connect(expandButton.domNode, "onblur", function(){
				dojo.removeClass(expandButton.domNode, "dojoxCollapsibleToolbarButtonFocus");
			});
		}
	},

	_onClose: function(e){
		// summary:
		//		Internal function for handling a click event that will close the toolbar.
		// e:
		//		The click event.
		// tags:
		//		private
		if(e){ dojo.stopEvent(e); }
		var size = dojo.marginBox(this.editor.domNode);
		dojo.style(this.openTd, "display", "none");
		dojo.style(this.closeTd, "display", "");
		dojo.style(this.menu, "display", "none");
		this.editor.resize({h: size.h});
		dijit.focus(this.closeTd.firstChild);
	},

	_onOpen: function(e) {
		 // summary:
		 //		Internal function for handling a click event that will open the toolbar.
		 // e:
		 //		The click event.
		 // tags:
		 //		private
		 if(e){ dojo.stopEvent(e); }
		 var size = dojo.marginBox(this.editor.domNode);
		 dojo.style(this.closeTd, "display", "none");
		 dojo.style(this.openTd, "display", "");
		 dojo.style(this.menu, "display", "");
		 this.editor.resize({h: size.h});
		 dijit.focus(this.openTd.firstChild);
	}
});

// Register this plugin.
dojo.subscribe(dijit._scopeName + ".Editor.getPlugin",null,function(o){
	if(o.plugin){ return; }
	var name = o.args.name.toLowerCase();
	if(name === "collapsibletoolbar"){
		o.plugin = new dojox.editor.plugins.CollapsibleToolbar({});
	}
});