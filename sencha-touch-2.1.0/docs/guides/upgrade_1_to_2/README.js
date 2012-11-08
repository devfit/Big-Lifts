Ext.data.JsonP.upgrade_1_to_2({"title":"Migrating from 1.x","guide":"<h1>Upgrading from Sencha Touch 1.x to 2.x</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ol>\n<li><a href='#!/guide/upgrade_1_to_2-section-1'>Class System</a></li>\n<li><a href='#!/guide/upgrade_1_to_2-section-2'>MVC Migration</a></li>\n<li><a href='#!/guide/upgrade_1_to_2-section-3'>Further Help</a></li>\n</ol>\n</div>\n\n<p>Sencha Touch 2 brings a number of refinements to the framework. Some of these changes require you to update parts of your application's code - this guide takes you through the changes you'll need to make.</p>\n\n<p>In addition to the guide, Sencha Touch 2 comes with a backwards-compatibility build that makes the migration process easier. <strong>Note that this build does not automatically guarantee your 1.x app will work out of the box</strong>. Wherever possible, the compatibility build will figure out what your 1.x app code is trying to do and route it through to the 2.x API. Whenever it does this, the compat build will log a warning to the console telling you what you need to update.</p>\n\n<p>As of Sencha Touch3 PR4 the backwards-compatibility support is baked into all builds, from beta 1 onwards you will need to use a different build to keep the compatibility intact while you migrate your app. Following the steps below and then correcting any warnings the compatibility layer informs you about should result in an application that will run on Sencha Touch 2.x.</p>\n\n<p><a href=\"#!/video/migrating-from-1-to-2\">See the Migrating from Touch 1.x to 2.0 Video from SenchaCon 2011</a></p>\n\n<h2 id='upgrade_1_to_2-section-1'>Class System</h2>\n\n<p>When it comes to migrating your app, the biggest change you'll need to make is how classes are defined. Sencha Touch 2 uses the upgraded class system from Ext JS 4, which brings powerful new capabilities like mixins, dynamic loading and the config system.</p>\n\n<p>In Sencha Touch 1.x, there were 2 main ways of defining classes - using <a href=\"#!/api/Ext-method-extend\" rel=\"Ext-method-extend\" class=\"docClass\">Ext.extend</a> or using one of the MVC-specific convenience functions like regModel and regController. In Sencha Touch 2, all classes are defined the same way using <a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>. Let's take this 1.x class and see how we would migrate it to 2.x:</p>\n\n<pre><code>Geo.views.BillSummary = <a href=\"#!/api/Ext-method-extend\" rel=\"Ext-method-extend\" class=\"docClass\">Ext.extend</a>(<a href=\"#!/api/Ext.Panel\" rel=\"Ext.Panel\" class=\"docClass\">Ext.Panel</a>, {\n    scroll: 'vertical',\n    html: \"Loading...\",\n    styleHtmlContent: true,\n    initComponent: function() {\n        this.tpl = <a href=\"#!/api/Ext.XTemplate-static-method-from\" rel=\"Ext.XTemplate-static-method-from\" class=\"docClass\">Ext.XTemplate.from</a>('billsummary');\n        Geo.views.BillSummary.superclass.initComponent.call(this);\n    },\n\n    /**\n     * Get the billSummary and update the contents of the panel.\n     */\n    getBill: function(bill) {\n        Geo.CongressService.getBillSummary({\n            bill: bill\n        }, this.onBillSummaryResponse, this);\n    },\n\n    // private\n    onBillSummaryResponse: function(billSummary) {\n        if (<a href=\"#!/api/Ext-method-isArray\" rel=\"Ext-method-isArray\" class=\"docClass\">Ext.isArray</a>(billSummary.Paragraph)) {\n            this.update(billSummary);\n        } else {\n            this.update('No Bill Summary Available');\n        }\n\n    }\n});\n</code></pre>\n\n<p>In 2.x, we would instead write this:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('Geo.view.BillSummary', {\n    extend: '<a href=\"#!/api/Ext.Panel\" rel=\"Ext.Panel\" class=\"docClass\">Ext.Panel</a>',\n\n    config: {\n        scroll: 'vertical',\n        html: 'Loading...',\n        styleHtmlContent: true\n    },\n\n    initialize: function() {\n        this.callParent(arguments);\n\n        this.tpl = <a href=\"#!/api/Ext.Template-static-method-from\" rel=\"Ext.Template-static-method-from\" class=\"docClass\">Ext.Template.from</a>('billsummary');\n    },\n\n    /**\n     * Get the billSummary and update the contents of the panel.\n     */\n    getBill: function(bill) {\n        Geo.CongressService.getBillSummary({\n            bill: bill\n        }, this.onBillSummaryResponse, this);\n    },\n\n    // private\n    onBillSummaryResponse: function(billSummary) {\n        if (<a href=\"#!/api/Ext-method-isArray\" rel=\"Ext-method-isArray\" class=\"docClass\">Ext.isArray</a>(billSummary.Paragraph)) {\n            this.setHtml(billSummary);\n        } else {\n            this.setHtml('No Bill Summary Available');\n        }\n    }\n});\n</code></pre>\n\n<p>The first thing to notice is that we've swapped out <a href=\"#!/api/Ext-method-extend\" rel=\"Ext-method-extend\" class=\"docClass\">Ext.extend</a> for <a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>. All of the old constituent parts are still present, we've just shuffled them around to use the new syntax. Notice that in 2.x all of the class names are string based. This is what enables the dynamic loading system to automatically load those classes onto the page if they are not already present. See the <a href=\"#!/guide/class_system\">class system guide</a> for more details.</p>\n\n<p>The next thing we did is to move all of the configuration options into a config object. The configuration options for each class can be found in the its class documentation. Anything found in the configuration section of a class should be placed into the config object of the class when defining it.</p>\n\n<p>The config system provides some key benefits, primarily a guarantee of API consistency. For example, the <a href=\"#!/api/Ext.Panel-cfg-html\" rel=\"Ext.Panel-cfg-html\" class=\"docClass\">html</a> config option guarantees that we can call <a href=\"#!/api/Ext.Panel-method-getHtml\" rel=\"Ext.Panel-method-getHtml\" class=\"docClass\">getHtml</a> and <a href=\"#!/api/Ext.Panel-method-setHtml\" rel=\"Ext.Panel-method-setHtml\" class=\"docClass\">setHtml</a> at any time, removing the guesswork from figuring out which functions to call. Every single config option has getter and setter functions that follow the same pattern as getHtml and setHtml. We use this to our advantage in the onBillSummaryResponse function, where we replaced the old 'update' function with the clearer <a href=\"#!/api/Ext.Panel-method-setHtml\" rel=\"Ext.Panel-method-setHtml\" class=\"docClass\">setHtml</a> function.</p>\n\n<p>Finally, we replaced initComponent with initialize. In 1.x, initComponent was only available on Component classes, which excludes all of the other classes like Models, Controllers and utilities. In 2.x, every class has an initialize function that you can implement if you want some logic to be performed on instantiation. The other detail to note here is that you no longer need the ugly <em>Geo.views.BillSummary.superclass.initComponent.call(this);</em> - instead you can always call <em>this.callParent(arguments)</em> to call the superclass function.</p>\n\n<h2 id='upgrade_1_to_2-section-2'>MVC Migration</h2>\n\n<p>The MVC architecture in Sencha Touch 2 is a refinement on the approach from Sencha Touch 1. Most of the concepts are the same, but some of the syntax has been improved to make the API more expressive, and your code more readable and testable.</p>\n\n<h3>Models</h3>\n\n<p>As with all of the other classes in Sencha Touch 2, Models and the rest of the data package now expect their configurations to be placed into a config block. Sencha Touch 2 also unifies the way you define all of your application's classes: <a href=\"#!/api/Ext-method-regModel\" rel=\"Ext-method-regModel\" class=\"docClass\">Ext.regModel</a> is no longer needed - instead a Model is just <a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">defined</a> like any other class. Migrating your Models is very simple - where once you had a Model like this:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-regModel\" rel=\"Ext-method-regModel\" class=\"docClass\">Ext.regModel</a>('MyApp.model.User', {\n    fields: [\n        {name: 'name',  type: 'string'},\n        {name: 'age',   type: 'int'},\n        {name: 'alive', type: 'boolean', defaultValue: true}\n    ],\n\n    validations: [\n        {type: 'presence', field: 'age'},\n        {type: 'length',   field: 'name', min: 2}\n    ],\n\n    sayName: function() {\n        alert(this.get('name'));\n    }\n});\n</code></pre>\n\n<p>In Sencha Touch 2 the same Model would look like this:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('MyApp.model.User', {\n    extend: '<a href=\"#!/api/Ext.data.Model\" rel=\"Ext.data.Model\" class=\"docClass\">Ext.data.Model</a>',\n\n    config: {\n        fields: [\n            {name: 'name',  type: 'string'},\n            {name: 'age',   type: 'int'},\n            {name: 'alive', type: 'boolean', defaultValue: true}\n        ],\n\n        validations: [\n            {type: 'presence', field: 'age'},\n            {type: 'length',   field: 'name', min: 2}\n        ]\n    },\n\n    sayName: function() {\n        alert(this.get('name'));\n    }\n});\n</code></pre>\n\n<p>A Model is generally migrated in 4 steps:</p>\n\n<ol>\n<li>Replace <a href=\"#!/api/Ext-method-regModel\" rel=\"Ext-method-regModel\" class=\"docClass\">Ext.regModel</a> with <a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a></li>\n<li>Make sure your new Model class extends <a href=\"#!/api/Ext.data.Model\" rel=\"Ext.data.Model\" class=\"docClass\">Ext.data.Model</a></li>\n<li>Move all of your Model's configurations into its config block</li>\n<li>Leave any custom functions (like sayName above) outside of the config block</li>\n</ol>\n\n\n<h3>Views</h3>\n\n<p>Aside from migrating to the new class system syntax, view migration is quite simple. The main thing to keep in mind is the convention around view class names. In Sencha Touch 2 and onward we recommend that your view class names follow the pattern MyApp.view.SomeViewName. Note that the 'view' is singular - this enables the class system to automatically load the view class from the file app/view/SomeViewName.js.</p>\n\n<h3>Application</h3>\n\n<p>When it comes to the Ext.application definition, you can keep most of the syntax from your 1.x app:</p>\n\n<pre><code>Ext.application({\n    name: 'MyApp',\n\n    icon: 'resources/images/logo.png',\n\n    launch: function() {\n        <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('MyApp.view.Main');\n    }\n});\n</code></pre>\n\n<p>The only thing new here is that we're using <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a> to instantiate MyApp.view.Main, which is our app's main screen.</p>\n\n<p>In addition to this change though is a slight change in approach when it comes to loading the models, views, controllers and stores your application needs. In 1.x, it was common to define all of your controllers inside the Ext.application block, along with <em>some</em> of your models, views and stores. The rest of the dependencies could be scattered throughout your application, making it difficult to easily understand exactly what the app is composed of.</p>\n\n<p>In Sencha Touch 2 we encourage you to define all of your application's dependencies inside the Ext.application block instead of placing some of them inside Controllers. An example might look like this:</p>\n\n<pre><code>Ext.application({\n    name: 'MyApp',\n\n    icon: 'resources/images/logo.png',\n\n    models: ['User', 'Group'],\n    controllers: ['Users', 'Login'],\n    views: ['Main', 'Users'],\n    stores: ['Users'],\n\n    launch: function() {\n        <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('MyApp.view.Main');\n    }\n});\n</code></pre>\n\n<h3>Controllers</h3>\n\n<p>Just like with Model, Sencha Touch 2 expects your Controllers to be defined like any other class, so the Ext.regController function is deprecated. In 1.x we might have a controller like this:</p>\n\n<pre><code>Ext.regController(\"searches\", {\n    showSomething: function() {\n        alert('something');\n    }\n});\n</code></pre>\n\n<p>Which in 2.x becomes:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('MyApp.controller.Searches', {\n    extend: '<a href=\"#!/api/Ext.app.Controller\" rel=\"Ext.app.Controller\" class=\"docClass\">Ext.app.Controller</a>',\n\n    showSomething: function() {\n        alert('something');\n    }\n});\n</code></pre>\n\n<p>As mentioned above, if your 1.x controller defines additional model, view or store dependencies you should move these into the Application instead. The compatibility build will still attempt to load those dependencies but the non-compat build will not.</p>\n\n<h4>Routes</h4>\n\n<p>In Sencha Touch 1.x, a Controller was largely just a collection of functions that could be dispatched to externally. Often this would mean that an Application would call Ext.dispatch, specifying the Controller name, which function to call and which arguments to pass in to the function. Other times, the dispatching would be automatic, triggered by a change in the url picked up by the Router.</p>\n\n<p>In 2.x, the Controller becomes a lot more proactive, actively registering routes that it cares about inside its config block:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('MyApp.controller.Searches', {\n    config: {\n        routes: {\n            'search/:query': 'doSearch'\n        }\n    },\n\n    doSearch: function(query) {\n        alert('searching for ' + query);\n    }\n});\n</code></pre>\n\n<p>This bypasses the need for a separate routes file and allows the Controller to indicate that whenever the page url matches 'search/:query', the doSearch function will be called with the query. For example, if the page url is currently http://myapp.com/#searches/abc123, doSearch will be called with 'abc123'. If the page url later becomes '#searches/sencha', doSearch is called again with 'sencha'.</p>\n\n<h4>New Capabilities</h4>\n\n<p>Controllers gained a raft of new capabilities in Sencha Touch 2, the most powerful of which are refs and control. For more information check out the <a href=\"#!/guide/controllers\">controllers guide</a>.</p>\n\n<h2 id='upgrade_1_to_2-section-3'>Further Help</h2>\n\n<p>Once you've migrated everything you can based on this guide and updated all of your code so that there are no more console warnings, your app should be mostly functional. For any specific problems the best place to get help is on the <a href=\"http://www.sencha.com/forum/forumdisplay.php?89-Sencha-Touch-2.x-Forums\">Sencha Touch 2 Forums</a>.</p>\n"});