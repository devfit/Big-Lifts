"use strict";
Ext.ns('wendler.views.liftSchedule', 'wendler.liftSchedule.liftTracking', 'wendler.liftTracking');

wendler.liftSchedule.liftTracking.logLift = function (data) {
    var expectedRepsByWeek = wendler.stores.lifts.findExpectedRepsForWeek(data.week);
    wendler.stores.LiftLog.add(
        {
            liftName:data.liftName,
            reps:data.reps,
            expectedReps:expectedRepsByWeek,
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

wendler.liftSchedule.liftTracking.allLiftsAreCompleted = function () {
    var enabledLifts = [];
    wendler.stores.lifts.Lifts.each(function (lift) {
        if (lift.get('enabled')) {
            enabledLifts.push(lift.get('propertyName'));
        }
    });
    var completedUniques = _.uniq(_.map(wendler.stores.lifts.LiftCompletion.getRange(), function (r) {
        if (_.indexOf(enabledLifts, r.get('liftPropertyName')) !== -1) {
            return r.data.completed;
        }
        else {
            return true;
        }
    }));
    return completedUniques.length === 1 && completedUniques[0] === true;
};

wendler.liftSchedule.liftTracking.persistLog = function () {
    var liftProgression = wendler.stores.lifts.LiftProgression.findRecord('set', 6);
    var liftName = wendler.stores.lifts.Lifts.findRecord('propertyName', wendler.liftSchedule.currentLiftProperty).data.name;
    var expectedReps = liftProgression.data.reps;

    var formValues = Ext.getCmp('lift-tracking').getValues();
    var reps = formValues['reps'];
    var notes = wendler.liftTracking.currentLiftNotes;
    var week = wendler.liftSchedule.currentWeek;
    var weight = formValues['weight'];
    var cycle = wendler.stores.CurrentCycle.first().data.cycle;
    var units = wendler.stores.Settings.first().data.units;

    wendler.liftSchedule.liftTracking.logLift({liftName:liftName, reps:reps, notes:notes, week:week, weight:weight, cycle:cycle, units:units, expectedReps:expectedReps});
};

wendler.liftSchedule.liftTracking.persistLiftCompletion = function () {
    var liftCompletion = wendler.stores.lifts.findLiftCompletionByPropertyAndWeek(wendler.liftSchedule.currentLiftProperty, wendler.liftSchedule.currentWeek);
    liftCompletion.set('completed', true);
    liftCompletion.save();
    wendler.stores.lifts.LiftCompletion.sync();
};

wendler.liftSchedule.liftTracking.logAndShowTracking = function () {
    wendler.liftSchedule.liftTracking.persistLiftCompletion();
    wendler.liftSchedule.liftTracking.persistLog();

    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'));

    if (wendler.liftSchedule.liftTracking.allLiftsAreCompleted()) {
        wendler.liftSchedule.liftSelector.showLiftsCompletedScreen();
    }
    else {
        if (wendler.toggles.Assistance) {
            Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('assistance-chooser'));
        }
        else {
            Ext.getCmp('main-tab-panel').setActiveItem(Ext.getCmp('log'));
        }
    }
};

wendler.liftSchedule.liftTracking.recomputeOneRepMax = function () {
    var formValues = Ext.getCmp('lift-tracking').getValues();
    formValues['estimated-one-rep-max'] = util.formulas.estimateOneRepMax(formValues.weight, formValues.reps);
    Ext.getCmp('lift-tracking').setValues(formValues);
};

wendler.liftTracking.currentLiftNotes = '';
wendler.liftSchedule.liftTracking.editNotes = function () {
    Ext.get('first-log-notes').addCls('tapped');
    Ext.getCmp('first-log-notes-editor')._setNotes(wendler.liftTracking.currentLiftNotes);
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('first-log-notes-editor'), {type:'slide', direction:'left'});
};

wendler.liftSchedule.liftTracking.cancelLogTracking = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-template'), {type:'slide', direction:'right'});
};

wendler.views.liftSchedule.LiftTracking = {
    xtype:'formpanel',
    id:'lift-tracking',
    scroll:'vertical',
    listeners:{
        show:function () {
            wendler.navigation.setBackFunction(wendler.liftSchedule.liftTracking.cancelLogTracking);
            wendler.liftTracking.currentLiftNotes = '';
            wendler.components.notesEditor.displayNotes('first-log-notes', '');
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
                    handler:wendler.liftSchedule.liftTracking.cancelLogTracking
                },
                {xtype:'spacer'},
                {
                    id:'log-lift-save-button',
                    ui:'confirm',
                    text:'Save',
                    handler:wendler.liftSchedule.liftTracking.logAndShowTracking
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
                        change:wendler.liftSchedule.liftTracking.recomputeOneRepMax
                    }
                },
                {
                    labelWidth:'50%',
                    name:'weight',
                    xtype:'numberfield',
                    label:'Weight',
                    listeners:{
                        change:wendler.liftSchedule.liftTracking.recomputeOneRepMax
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
                    Ext.get('first-log-notes').addListener('tap', wendler.liftSchedule.liftTracking.editNotes);
                }
            }
        }
    ]
};