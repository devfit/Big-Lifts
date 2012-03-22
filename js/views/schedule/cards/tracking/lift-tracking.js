"use strict";
Ext.ns('wendler.views.liftSchedule', 'wendler.controller.liftTracking');

wendler.controller.liftTracking.logLift = function (data) {
    wendler.stores.LiftLog.add(
        {
            liftName:data.liftName,
            reps:data.reps,
            notes:data.notes,
            week:data.week,
            weight:data.weight,
            cycle:data.cycle,
            date:null,
            timestamp:new Date().getTime(),
            units:wendler.stores.Settings.first().data.units
        });

    wendler.stores.LiftLog.sync();
};

wendler.liftSchedule.controller.allLiftsAreCompleted = function () {
    var completedUniques = _.uniq(_.map(wendler.stores.lifts.LiftCompletion.getRange(), function (r) {
        return r.data.completed;
    }));
    return completedUniques.length === 1 && completedUniques[0] === true;
};

wendler.controller.liftTracking.logAndShowTracking = function () {
    wendler.liftSchedule.controller.persistLiftCompletion();

    var liftProgression = wendler.stores.lifts.LiftProgression.findRecord('set', 6);
    var liftName = wendler.stores.lifts.Lifts.findRecord('propertyName', wendler.liftSchedule.currentLiftProperty).data.name;
    var expectedReps = liftProgression.data.reps;

    var formValues = Ext.getCmp('lift-tracking').getValues();
    var reps = formValues['reps'];
    var notes = wendler.controller.liftTracking.currentLiftNotes;
    var week = wendler.liftSchedule.currentWeek;
    var weight = formValues['weight'];
    var cycle = wendler.stores.CurrentCycle.first().data.cycle;
    var units = wendler.stores.Settings.first().data.units;

    wendler.controller.liftTracking.logLift({liftName:liftName, reps:reps, notes:notes, week:week, weight:weight, cycle:cycle, units:units, expectedReps:expectedReps});
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'));

    if (wendler.liftSchedule.controller.allLiftsAreCompleted()) {
        wendler.liftSchedule.controller.showLiftsCompletedScreen();
    }
    else {
        Ext.getCmp('main-tab-panel').setActiveItem(Ext.getCmp('log'));
    }
};

wendler.controller.liftTracking.recomputeOneRepMax = function () {
    var formValues = Ext.getCmp('lift-tracking').getValues();
    formValues['estimated-one-rep-max'] = util.formulas.estimateOneRepMax(formValues.weight, formValues.reps);
    Ext.getCmp('lift-tracking').setValues(formValues);
};

wendler.controller.liftTracking.showLiftTracking = function () {
    var liftProgression = wendler.stores.lifts.LiftProgression.findRecord('set', 6).data;
    var reps = liftProgression.reps;
    var weight = wendler.liftSchedule.controller.formatLiftWeight(wendler.liftSchedule.currentShowingMax, liftProgression.percentage);
    var formValues = {
        'reps':reps,
        'weight':weight,
        'estimated-one-rep-max':util.formulas.estimateOneRepMax(weight, reps),
        'notes':''
    };

    Ext.getCmp('lift-tracking').setValues(formValues);
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-tracking'), {type:'slide', direction:'left'});
};

wendler.controller.liftTracking.currentLiftNotes = '';
wendler.controller.liftTracking.editNotes = function () {
    Ext.get('first-log-notes').addCls('tapped');
    Ext.getCmp('first-log-notes-editor')._setNotes(wendler.controller.liftTracking.currentLiftNotes);
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('first-log-notes-editor'), {type:'slide', direction:'left'});
};

wendler.controller.liftTracking.displayNotes = function (notes) {
    var displayableNotes = null;
    if (notes === "") {
        displayableNotes = "<div class='notes-empty-text'>Tap to edit</div>";
    }
    else {
        displayableNotes = wendler.controller.components.notesEditor.sanitizeForDisplay(notes);
    }
    Ext.get('first-log-notes').setHtml(displayableNotes);
};

wendler.controller.liftTracking.cancelLogTracking = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-template'), {type:'slide', direction:'right'});
};

wendler.views.liftSchedule.LiftTracking = {
    xtype:'formpanel',
    id:'lift-tracking',
    scroll:'vertical',
    listeners:{
        show:function () {
            wendler.navigation.setBackFunction(wendler.controller.liftTracking.cancelLogTracking);
        },
        show:function () {
            wendler.controller.liftTracking.currentLiftNotes = '';
            wendler.controller.liftTracking.displayNotes('');
        }
    },
    items:[
        {
            docked:'top',
            xtype:'toolbar',
            title:'Log',
            items:[
                {
                    id:'log-lift-back-button',
                    ui:'back',
                    text:'Back',
                    handler:wendler.controller.liftTracking.cancelLogTracking
                },
                {xtype:'spacer'},
                {
                    id:'log-lift-save-button',
                    ui:'confirm',
                    text:'Save',
                    handler:wendler.controller.liftTracking.logAndShowTracking
                }
            ]
        },
        {
            xtype:'fieldset',
            style:'margin-top: 0; margin-bottom:7px',
            items:[
                {
                    labelWidth:'50%',
                    name:'reps',
                    xtype:'numberfield',
                    label:'Last set reps',
                    listeners:{
                        change:wendler.controller.liftTracking.recomputeOneRepMax
                    }
                },
                {
                    labelWidth:'50%',
                    name:'weight',
                    xtype:'numberfield',
                    label:'Weight',
                    listeners:{
                        change:wendler.controller.liftTracking.recomputeOneRepMax
                    }
                },
                {
                    labelWidth:'50%',
                    name:'estimated-one-rep-max',
                    xtype:'numberfield',
                    label:'Estimated 1RM',
                    cls:'one-rep-max-estimate',
                    readOnly:true
                }
            ]
        },
        {
            xtype:'panel',
            bodyPadding:0,
            layout:'fit',
            html:'<div class="x-form-fieldset-title fieldset-title-no-margin">Notes</div>' +
                '<div id="first-log-notes" class="log-notes"><div class="notes-empty-text">Tap to edit</div></div>',
            listeners:{
                painted:function () {
                    Ext.get('first-log-notes').addListener('tap', wendler.controller.liftTracking.editNotes);
                }
            }
        }
    ]
};