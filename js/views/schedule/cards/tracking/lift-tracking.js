"use strict";
Ext.ns('biglifts.views.liftSchedule', 'biglifts.liftSchedule.liftTracking', 'biglifts.liftTracking');

biglifts.liftSchedule.liftTracking.logLift = function (data) {
    var expectedRepsByWeek = biglifts.stores.lifts.findExpectedRepsForWeek(data.week);
    biglifts.stores.LiftLog.add(
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
            units:biglifts.stores.Settings.first().data.units
        });

    biglifts.stores.LiftLog.sync();
};

biglifts.liftSchedule.liftTracking.allLiftsAreCompleted = function () {
    var enabledLifts = [];
    biglifts.stores.lifts.Lifts.each(function (lift) {
        if (lift.get('enabled')) {
            enabledLifts.push(lift.get('propertyName'));
        }
    });
    var completedUniques = _.uniq(_.map(biglifts.stores.lifts.LiftCompletion.getRange(), function (r) {
        if (_.indexOf(enabledLifts, r.get('liftPropertyName')) !== -1) {
            return r.data.completed;
        }
        else {
            return true;
        }
    }));
    return completedUniques.length === 1 && completedUniques[0] === true;
};

biglifts.liftSchedule.liftTracking.persistLog = function () {
    var liftProgression = biglifts.stores.lifts.LiftProgression.findRecord('set', 6);
    var liftName = biglifts.stores.lifts.Lifts.findRecord('propertyName', biglifts.liftSchedule.currentLiftProperty).data.name;
    var expectedReps = liftProgression.data.reps;

    var formValues = Ext.getCmp('lift-tracking').getValues();
    var reps = formValues['reps'];
    var notes = biglifts.liftTracking.currentLiftNotes;
    var week = biglifts.liftSchedule.liftTemplate.getEffectiveWeek();
    var weight = formValues['weight'];
    var cycle = biglifts.stores.CurrentCycle.first().data.cycle;
    var units = biglifts.stores.Settings.first().data.units;

    biglifts.liftSchedule.liftTracking.logLift({liftName:liftName, reps:reps, notes:notes, week:week, weight:weight, cycle:cycle, units:units, expectedReps:expectedReps});
};

biglifts.liftSchedule.liftTracking.persistLiftCompletion = function () {
    var liftCompletion = biglifts.stores.lifts.findLiftCompletionByPropertyAndWeek(biglifts.liftSchedule.currentLiftProperty, biglifts.liftSchedule.currentWeek);
    liftCompletion.set('completed', true);
    biglifts.stores.lifts.LiftCompletion.sync();
};

biglifts.liftSchedule.liftTracking.logAndShowTracking = function () {
    biglifts.liftSchedule.liftTracking.persistLiftCompletion();
    biglifts.liftSchedule.liftTracking.persistLog();

    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'));

    if (biglifts.liftSchedule.liftTracking.allLiftsAreCompleted()) {
        biglifts.liftSchedule.liftSelector.showLiftsCompletedScreen();
    }
    else {
        Ext.getCmp('main-tab-panel').setActiveItem(Ext.getCmp('log'));
    }
};

biglifts.liftSchedule.liftTracking.recomputeOneRepMax = function () {
    var formValues = Ext.getCmp('lift-tracking').getValues();
    formValues['estimated-one-rep-max'] = util.formulas.estimateOneRepMax(formValues.weight, formValues.reps);
    Ext.getCmp('lift-tracking').setValues(formValues);
};

biglifts.liftTracking.currentLiftNotes = '';
biglifts.liftSchedule.liftTracking.editNotes = function () {
    Ext.get('first-log-notes').addCls('tapped');
    Ext.getCmp('first-log-notes-editor')._setNotes(biglifts.liftTracking.currentLiftNotes);
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('first-log-notes-editor'), {type:'slide', direction:'left'});
};

biglifts.liftSchedule.liftTracking.cancelLogTracking = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-template'), {type:'slide', direction:'right'});
};

biglifts.views.liftSchedule.LiftTracking = {
    xtype:'formpanel',
    id:'lift-tracking',
    scroll:'vertical',
    listeners:{
        show:function () {
            biglifts.navigation.setBackFunction(biglifts.liftSchedule.liftTracking.cancelLogTracking);
            biglifts.liftTracking.currentLiftNotes = '';
            biglifts.components.notesEditor.displayNotes('first-log-notes', '');
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
                    handler:biglifts.liftSchedule.liftTracking.cancelLogTracking
                },
                {xtype:'spacer'},
                {
                    id:'log-lift-save-button',
                    ui:'confirm',
                    text:'Save',
                    handler:biglifts.liftSchedule.liftTracking.logAndShowTracking
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
                        change:biglifts.liftSchedule.liftTracking.recomputeOneRepMax
                    }
                },
                {
                    labelWidth:'50%',
                    name:'weight',
                    xtype:'numberfield',
                    label:'Weight',
                    listeners:{
                        change:biglifts.liftSchedule.liftTracking.recomputeOneRepMax
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
                    if (!this._painted) {
                        this._painted = true;
                        Ext.get('first-log-notes').addListener('tap', biglifts.liftSchedule.liftTracking.editNotes);
                    }
                }
            }
        }
    ]
};