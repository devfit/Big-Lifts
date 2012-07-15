Ext.ns('wendler.views.log.cards', 'wendler.log.emailExport');

wendler.log.emailExport.returnToTrackingList = function () {
    Ext.getCmp('log').setActiveItem(Ext.getCmp('log-list'), {type:'slide', direction:'right'});
};

wendler.log.emailExport.exportLog = function () {
    var data = wendler.log.emailExport.buildCsvToExport();
    var email = Ext.getCmp('export-log').getValues().email;
    wendler.log.emailExport.ajaxEmailRequest(email, data);
};

wendler.log.emailExport.buildCsvToExport = function () {
    var objects = Ext.pluck(wendler.stores.LiftLog.data.items, 'data');

    var csvKeyMapper = {
        'liftName':'name',
        'reps':'reps',
        'expectedReps':'expected reps',
        'notes':'notes',
        'week':'week',
        'weight':'weight',
        'cycle':'cycle',
        'date':'date',
        'timestamp':'timestamp',
        'units':'units'
    };

    var csvValueMapper = {
        'date':function (object) {
            return wendler.log.formatDate(object.timestamp);
        }
    };

    var csvObjects = _.map(objects, wendler.log.emailExport.createCsvTransformer(csvKeyMapper, csvValueMapper));

    return Ext.encode(csvObjects);
};

wendler.log.emailExport.createCsvTransformer = function (nameMapper, valueMapper) {
    var transformer = function (object) {
        var csvObject = {};
        for (var property in nameMapper) {
            var keyReplacement = nameMapper[property];

            var value = object[property];
            if (_.has(valueMapper, property)) {
                value = valueMapper[property](object);
            }

            csvObject[keyReplacement] = value;
        }
        return csvObject;
    };

    return transformer;
};

wendler.log.emailExport.ajaxEmailRequest = function (email, data) {
    Ext.Viewport.setMasked({
        xtype:'loadmask',
        message:'Exporting...'
    });
    Ext.Ajax.request({
        url:'http://wendler.herokuapp.com/email',
        method:'POST',
        params:{
            email:email,
            data:data
        },
        success:function () {
            Ext.Msg.alert("Success", "Email sent!");
            Ext.Viewport.setMasked(false);
        },
        failure:function () {
            Ext.Msg.alert("Error", "Error exporting. Please try again later.");
            Ext.Viewport.setMasked(false);
        }
    });
};

wendler.log.emailExport.loadPreviousExportEmail = function () {
    var settings = wendler.stores.Settings.first();
    Ext.getCmp('export-log').setRecord({email:settings.data.exportEmail});
};

wendler.views.log.cards.Export = {
    id:'export-log',
    xtype:'formpanel',
    scroll:'vertical',
    style:'padding-top:0px',
    listeners:{
        show:function () {
            wendler.navigation.setBackFunction(wendler.log.emailExport.returnToTrackingList);
        },
        initialize:function () {
            wendler.log.emailExport.loadPreviousExportEmail();
        }
    },
    items:[
        {
            docked:'top',
            xtype:'toolbar',
            title:'Export',
            items:[
                {
                    xtype:'button',
                    ui:'back',
                    text:'Back',
                    handler:wendler.log.emailExport.returnToTrackingList
                },
                {xtype:'spacer'},
                {
                    id:'send-email-export-log-button',
                    xtype:'button',
                    ui:'confirm',
                    text:'Send',
                    handler:wendler.log.emailExport.exportLog
                }

            ]
        },
        {
            xtype:'fieldset',
            cls:'fieldset-no-margin',
            items:[
                {
                    name:'email',
                    xtype:'emailfield',
                    label:'Email',
                    listeners:{
                        change:function (c, value) {
                            var settings = wendler.stores.Settings.first();
                            settings.set('exportEmail', value);
                            settings.save();
                        }
                    }
                }
            ]
        }
    ]
};