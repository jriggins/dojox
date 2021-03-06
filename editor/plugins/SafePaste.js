define("dojox/editor/plugins/SafePaste", ["dojo", "dijit", "dojox", "dojox/editor/plugins/PasteFromWord", "dojo/i18n", "i18n!dojox/editor/plugins/nls/SafePaste"], function(dojo, dijit, dojox) {

dojo.declare("dojox.editor.plugins.SafePaste", [dojox.editor.plugins.PasteFromWord],{
	// summary:
	//		This plugin extends from the PasteFromWord plugin and provides
	//		'safe pasting', meaning that it will not allow keyboard/menu pasting
	//		into the dijit editor.  It still runs all of the word cleanup code, 
	//		including script strippers.  If you use this plugin, you don't need to 
	//		use the 'PasteFromWord Plugin'

	_initButton: function(){
		// summary:
		//		Over-ride the editor paste controls
		var strings = dojo.i18n.getLocalization("dojox.editor.plugins", "SafePaste");

		this._uId = dijit.getUniqueId(this.editor.id);

		strings.uId = this._uId;
		strings.width = this.width || "400px";
		strings.height = this.height || "300px";

		this._dialog = new dijit.Dialog({title: strings["paste"]}).placeAt(dojo.body());
		this._dialog.set("content", dojo.string.substitute(this._template, strings));

		// Make it translucent so we can fade in the window when the RTE is created.
		// the RTE has to be created 'visible, and this is a ncie trick to make the creation
		// 'pretty'.
		dojo.style(dojo.byId(this._uId + "_rte"), "opacity", 0.001);

		// Link up the action buttons to perform the insert or cleanup.
		this.connect(dijit.byId(this._uId + "_paste"), "onClick", "_paste");
		this.connect(dijit.byId(this._uId + "_cancel"), "onClick", "_cancel");
		this.connect(this._dialog, "onHide", "_clearDialog");
	},
	
	updateState: function(){
		// summary:
		//		Overrides _Plugin.updateState(). 
		// tags:
		//		protected
		// Do nothing.
	},
	
	setEditor: function(editor){
		// summary:
		//		Over-ride for the setting of the editor.
		// editor: Object
		//		The editor to configure for this plugin to use.
		this.editor = editor;
		this._initButton();
		this.editor.onLoadDeferred.addCallback(dojo.hitch(this, function(){
			var spFunc = dojo.hitch(this, function(e){
				if(e){
					dojo.stopEvent(e);
				}
				this._openDialog();
				return true;
			});
			this.connect(this.editor.editNode, "onpaste", spFunc);
			this.editor._pasteImpl = spFunc;
		}));
	}
});

// Register this plugin.
dojo.subscribe(dijit._scopeName + ".Editor.getPlugin",null,function(o){
	if(o.plugin){ return; }
	var name = o.args.name.toLowerCase();
	if(name === "safepaste"){
		o.plugin = new dojox.editor.plugins.SafePaste({
			width: ("width" in o.args)?o.args.width:"400px",
			height: ("height" in o.args)?o.args.width:"300px"
		});
	}
});

return dojox.editor.plugins.SafePaste;

});
