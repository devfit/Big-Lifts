Ext.ns('biglifts.views.log.cards', 'biglifts.log.emailExport');

biglifts.log.emailExport.returnToTrackingList = function () {
    Ext.getCmp('log').setActiveItem(Ext.getCmp('log-list'));
};

biglifts.log.emailExport.exportLog = function () {
    var data = biglifts.log.emailExport.buildCsvToExport();
    var email = Ext.getCmp('export-log').getValues().email;
    biglifts.log.emailExport.ajaxEmailRequest(email, data);
};

biglifts.log.emailExport.buildCsvToExport = function () {
    var objects = Ext.pluck(biglifts.stores.LiftLog.data.items, 'data');

    var csvKeyMapper = {
        'liftName':'name',
        'reps':'reps',
        'expectedReps':'expected reps',
        'notes':'notes',
        'week':'week',
        'weight':'weight',
        'estimatedOneRepMax':'estimated one rep max',
        'cycle':'cycle',
        'date':'date',
        'timestamp':'timestamp',
        'units':'units'
    };

    var csvValueMapper = {
        'date':function (object) {
            return biglifts.log.formatDate(object.timestamp);
        },
        'estimatedOneRepMax':function (object) {
            return util.formulas.estimateOneRepMax(object.weight, object.reps);
        }
    };

    var csvObjects = _.map(objects, biglifts.log.emailExport.createCsvTransformer(csvKeyMapper, csvValueMapper));

    return Ext.encode(csvObjects);
};

biglifts.log.emailExport.createCsvTransformer = function (nameMapper, valueMapper) {
    return function (object) {
        var csvObject = {};
        for (var property in nameMapper) {
            var keyReplacement = nameMapper[property];

            var value = null;
            if (_.has(valueMapper, property)) {
                value = valueMapper[property](object);
            }
            else {
                value = object[property];
            }

            csvObject[keyReplacement] = value;
        }
        return csvObject;
    };
};

biglifts.log.emailExport.saveUsedEmail = function (email) {
    var settings = biglifts.stores.Settings.first();
    settings.set('exportEmail', email);
    biglifts.stores.Settings.sync();
};
biglifts.log.emailExport.ajaxEmailRequest = function (email, data) {
    biglifts.log.emailExport.saveUsedEmail(email);
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

biglifts.log.emailExport.loadPreviousExportEmail = function () {
    var settings = biglifts.stores.Settings.first();
    Ext.getCmp('export-log').down('[name=email]').setValue(settings.get('exportEmail'));
};

biglifts.views.log.cards.Export = {
    id:'export-log',
    xtype:'formpanel',
    scroll:'vertical',
    style:'padding-top:0px',
    listeners:{
        painted:function () {
            biglifts.log.emailExport.loadPreviousExportEmail();
            biglifts.navigation.setBackFunction(biglifts.log.emailExport.returnToTrackingList);
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
                    handler:biglifts.log.emailExport.returnToTrackingList
                },
                {xtype:'spacer'},
                {
                    id:'send-email-export-log-button',
                    xtype:'button',
                    ui:'confirm',
                    text:'Send',
                    handler:biglifts.log.emailExport.exportLog
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
                    label:'Email'
                }
            ]
        }
    ]
};