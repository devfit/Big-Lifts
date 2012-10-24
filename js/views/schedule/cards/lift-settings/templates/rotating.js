Ext.ns('biglifts.liftSettings.templates');

Ext.define('RotatingWeekEntry', {
    extend:'Ext.data.Model',
    config:{
        identifier:'uuid',
        fields:[
            {name:'id', type:'string'},
            {name:'name', type:'string'},
            {name:'liftProperty', type:'string'},
            {name:'week', type:'integer'}
        ],
        proxy:{
            type:'memory',
            id:'rotating-week-list-proxy'
        }
    }
});

Ext.define("RotatingWeekStore", {
    extend:'Ext.data.Store',
    WEEK_ORDER:[1, 2, 3, 4],
    rotateWeeks:function () {
        var store = this;
        store.each(function (r) {
            var currentIndex = _.indexOf(store.WEEK_ORDER, r.get('week'));
            currentIndex = (currentIndex + 1) % store.WEEK_ORDER.length;
            r.set('week', store.WEEK_ORDER[currentIndex]);
        });
        store.sync();
    },
    config:{
        listeners:{
            load:function (store) {
                if (this.getCount() === 0) {
                    var i = 0;
                    biglifts.stores.lifts.Lifts.each(function (r) {
                        store.add({name:r.get('name'), week:store.WEEK_ORDER[i], liftProperty:r.get('propertyName')});
                        i = (i + 1) % store.WEEK_ORDER.length;
                    });
                }
            }
        },
        model:'RotatingWeekEntry'
    }
});
biglifts.liftSettings.templates.rotatingWeekStore = Ext.create('RotatingWeekStore');
biglifts.liftSettings.templates.rotatingWeekStore.addListener('beforesync', function () {
    var rotatingList = Ext.getCmp('rotating-lift-list');
    if (rotatingList) {
        Ext.getCmp('rotating-lift-list').refresh();
    }
});

biglifts.liftSettings.templates.getDisplayForWeek = function (week) {
    var weekDisplayMapping = {1:'5/5/5', 2:'3/3/3', 3:'5/3/1', 4:'deload'};
    return weekDisplayMapping[week];
};

biglifts.liftSettings.templates.setupWeekRotation = function () {
    biglifts.liftSettings.templates.rotatingWeekStore.each(function (r) {
        console.log("Adding records");
        biglifts.stores.WeekRotation.add({liftProperty:r.get('liftProperty'), startingWeek:r.get('week')});
    });
    biglifts.stores.WeekRotation.sync();
};

biglifts.liftSettings.templates.rotating = {
    id:'rotating-template',
    listeners:{
        painted:function (panel) {
            biglifts.liftSettings.templates.rotatingWeekStore.load({
                callback:function () {
                    var listHeight = (panel.element.down('.x-list-item').getHeight() + 1) * biglifts.liftSettings.templates.rotatingWeekStore.getCount();
                    panel.getComponent('lift-list-container').setHeight(listHeight);
                }
            });
        }
    },
    padding:5,
    items:[
        {
            xtype:'toolbar',
            docked:'top',
            title:"Rotating",
            items:[
                {
                    text:'Back',
                    ui:'back',
                    handler:biglifts.liftSettings.carouselBack
                },
                {xtype:'spacer'},
                {
                    text:'Next',
                    ui:'forward',
                    handler:biglifts.liftSettings.carouselForward
                }
            ]
        },
        {
            html:'<p>Like "fresher", but lifts are staggered by week</p>'
        },
        {
            itemId:'lift-list-container',
            xtype:'container',
            layout:'fit',
            items:[
                {
                    id:'rotating-lift-list',
                    padding:0,
                    xtype:'list',
                    store:biglifts.liftSettings.templates.rotatingWeekStore,
                    itemTpl:'<table><tr><td class="name">{name}</td>' +
                        '<td class="week">{[biglifts.liftSettings.templates.getDisplayForWeek(values.week)]}</td></tr></table>'
                }
            ]
        },
        {
            xtype:'button',
            text:'Rotate',
            handler:function () {
                biglifts.liftSettings.templates.rotatingWeekStore.rotateWeeks();
            }
        },
        {
            id:'use-rotating-template-button',
            xtype:'button',
            ui:'confirm',
            text:'Use',
            handler:function () {
                biglifts.liftSettings.setupLiftScheme("fresher");
                biglifts.liftSettings.templates.setupWeekRotation();
            }
        }
    ]
};