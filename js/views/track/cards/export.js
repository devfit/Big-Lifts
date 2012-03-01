Ext.ns('wendler.views.log.cards', 'wendler.controller.log.export');

wendler.controller.log.export.returnToTrackingList = function () {
    Ext.getCmp('log').setActiveItem(Ext.getCmp('log-list'), {type:'slide', direction:'right'});
};

wendler.controller.log.export.exportLog = function () {
    var data = wendler.controller.log.export.buildCsvToExport();
    var email = Ext.getCmp('export-log').getValues().email;
    wendler.controller.log.export.ajaxEmailRequest(email, data);
};

wendler.controller.log.export.buildCsvToExport = function () {
    var objects = Ext.pluck(wendler.stores.LiftLog.data.items, 'data');

    var csvKeyMapper = {
        'liftName':'name',
        'reps':'reps',
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
            return wendler.controller.log.formatDate(object.timestamp);
        }
    };

    var csvObjects = _.map(objects, wendler.controller.log.export.createCsvTransformer(csvKeyMapper, csvValueMapper));

    return Ext.encode(csvObjects);
};

wendler.controller.log.export.createCsvTransformer = function (nameMapper, valueMapper) {
    var transformer = function (object) {
        var csvObject = {};
        for (var property in nameMapper) {
            var keyReplacement = nameMapper[property];

            var value = object[property];
            if (valueMapper.hasOwnProperty(property)) {
                value = valueMapper[property](object);
            }

            csvObject[keyReplacement] = value;
        }
        return csvObject;
    };

    return transformer;
};

wendler.controller.log.export.ajaxEmailRequest = function (email, data) {
    var loadingMask = new Ext.LoadMask(Ext.getCmp('export-log').getEl(), {msg:"Exporting..."});
    loadingMask.show();
    Ext.Ajax.request({
        url:'http://wendler.herokuapp.com/email',
        method:'POST',
        params:{
            email:email,
            data:data
        },
        success:function () {
            Ext.Msg.alert("Success", "Email sent!");
            loadingMask.hide();
        },
        failure:function () {
            Ext.Msg.alert("Error", "Error exporting. Please try again later.");
            loadingMask.hide();
        }
    });
};

wendler.controller.log.export.loadPreviousExportEmail = function () {
    var settings = wendler.stores.Settings.first();
    Ext.getCmp('export-log').setValues({email:settings.data.exportEmail});
};

wendler.views.log.cards.Export = {
    id:'export-log',
    xtype:'formpanel',
    scroll:'vertical',
    style:'padding-top:0px',
    listeners:{
        beforeshow:function () {
            wendler.navigation.setBackFunction(wendler.controller.log.export.returnToTrackingList);
            wendler.controller.log.export.loadPreviousExportEmail();
        }
    },
    dockedItems:[
        {
            xtype:'toolbar',
            title:'Export',
            items:[
                {
                    xtype:'button',
                    ui:'back',
                    text:'Back',
                    handler:wendler.controller.log.export.returnToTrackingList
                },
                {xtype:'spacer'},
                {
                    id:'send-email-export-log-button',
                    xtype:'button',
                    ui:'confirm',
                    text:'Send',
                    handler:wendler.controller.log.export.exportLog
                }

            ]
        }
    ],
    items:[
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