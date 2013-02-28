Ext.define('RotatingWeekEntry', {
    extend: 'Ext.data.Model',
    config: {
        identifier: 'uuid',
        fields: [
            {name: 'id', type: 'string'},
            {name: 'name', type: 'string'},
            {name: 'liftProperty', type: 'string'},
            {name: 'week', type: 'integer'}
        ],
        proxy: {
            type: 'memory',
            id: 'rotating-week-list-proxy'
        }
    }
});

Ext.define("RotatingWeekStore", {
    extend: 'Ext.data.Store',
    WEEK_ORDER: [1, 2, 3, 4],
    rotateWeeks: function () {
        var store = this;
        store.each(function (r) {
            var currentIndex = _.indexOf(store.WEEK_ORDER, r.get('week'));
            currentIndex = (currentIndex + 1) % store.WEEK_ORDER.length;
            r.set('week', store.WEEK_ORDER[currentIndex]);
        });
        store.sync();
    },
    addEntryForEachLift: function () {
        var me = this;

        me.removeAll();
        me.sync();

        var i = 0;
        biglifts.stores.lifts.Lifts.each(function (r) {
            me.add({name: r.get('name'), week: me.WEEK_ORDER[i], liftProperty: r.get('propertyName')});
            i = (i + 1) % me.WEEK_ORDER.length;
        });

        me.sync();
    },
    setupDefaultData: function () {
        util.withLoadedStore(biglifts.stores.lifts.Lifts, Ext.bind(this.addEntryForEachLift, this));
    },
    config: {
        model: 'RotatingWeekEntry',
        listeners: {
            load: function () {
                this.setupDefaultData();
                biglifts.stores.lifts.Lifts.addListener('beforesync', Ext.bind(this.addEntryForEachLift, this));
            }
        }
    }
});

Ext.define('biglifts.views.templates.Rotating', {
    extend: 'biglifts.views.templates.Base',
    constructor: function () {
        this.callParent(arguments);
        var me = this;

        this.rotatingWeekStore = Ext.create('RotatingWeekStore');
        this.rotatingWeekStore.load();

        this.add({
            xtype: 'toolbar',
            docked: 'top',
            title: "Rotating",
            items: [
                {
                    text: 'Back',
                    ui: 'back',
                    handler: Ext.bind(me.carouselBack, me)
                },
                {xtype: 'spacer'},
                {
                    text: 'Next',
                    ui: 'forward',
                    handler: Ext.bind(me.carouselForward, me)
                }
            ]
        });

        this.add({
            xtype: 'toolbar',
            docked: 'top',
            ui: 'light',
            items: [
                {xtype: 'spacer'},
                {
                    xtype: 'button',
                    ui: 'confirm',
                    text: 'Use',
                    handler: Ext.bind(me.useRotatingTemplate, me)
                }
            ]
        });

        this.add({
            html: '<p>Like "fresher", but lifts are staggered by week</p>'
        });

        this.liftListContainer = this.add({
            xtype: 'container',
            layout: 'fit',
            listeners: {
                initialize: function () {
                    var listHeight = 52 * me.rotatingWeekStore.getCount();
                    this.setHeight(listHeight);
                }
            }
        });

        this.liftList = this.liftListContainer.add({
            padding: 0,
            xtype: 'list',
            store: me.rotatingWeekStore,
            itemTpl: '<table><tr><td class="name">{name}</td>' +
                '<td class="week">{[biglifts.liftSettings.templates.getDisplayForWeek(values.week)]}</td></tr></table>'
        });

        this.add({
            xtype: 'button',
            text: 'Rotate',
            handler: function () {
                me.rotatingWeekStore.rotateWeeks();
            }
        });
    },
    setupWeekRotation: function () {
        this.rotatingWeekStore.each(function (r) {
            biglifts.stores.WeekRotation.add({liftProperty: r.get('liftProperty'), startingWeek: r.get('week')});
        });
        biglifts.stores.WeekRotation.sync();
    },
    useRotatingTemplate: function () {
        this.setupLiftScheme("fresher");
        this.setupWeekRotation();
    },
    getDisplayForWeek: function (week) {
        var weekDisplayMapping = {1: '5/5/5', 2: '3/3/3', 3: '5/3/1', 4: 'deload'};
        return weekDisplayMapping[week];
    },
    config: {
        id: 'rotating-template',
        listeners: {
            painted: function () {
                if (!this._painted) {
                    this._painted = true;
                    this.rotatingWeekStore.addListener('beforesync', function () {
                        this.liftList.refresh();
                    }, this);
                }
            }
        }
    }
});