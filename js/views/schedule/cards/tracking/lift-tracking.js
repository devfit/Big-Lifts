"use strict";
Ext.define('biglifts.views.LiftTracking', {
    extend: 'Ext.form.Panel',
    recomputeOneRepMax: function () {
        var formValues = this.getValues();
        formValues['estimated-one-rep-max'] = util.formulas.estimateOneRepMax(formValues.weight, formValues.reps);
        this.setValues(formValues);
    },
    editNotes: function () {
        Ext.get('first-log-notes').addCls('tapped');
        Ext.getCmp('first-log-notes-editor')._setNotes(this.currentLiftNotes);
        Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('first-log-notes-editor'));
    },
    setNotes: function (notes) {
        this.currentLiftNotes = notes;
        biglifts.components.notesEditor.displayNotes('first-log-notes', this.currentLiftNotes);
    },
    showFor: function (formValues) {
        this.setNotes('');
        this.setValues(formValues);
        Ext.getCmp('lift-schedule').setActiveItem(this);
    },
    allLiftsAreCompleted: function () {
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
    },
    cancelLogTracking: function () {
        Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-template'));
    },
    logLift: function (data) {
        biglifts.stores.LiftLog.addLogEntry({
            liftName: data.liftName,
            reps: data.reps,
            expectedReps: biglifts.stores.lifts.LiftProgression.findExpectedRepsForWeek(data.week),
            notes: data.notes,
            week: data.week,
            weight: data.weight,
            cycle: data.cycle,
            timestamp: new Date().getTime(),
            date: null,
            units: biglifts.stores.GlobalSettings.getUnits(),
            lift_completion_id: data.lift_completion_id
        });
    },
    persistLiftCompletion: function () {
        var liftCompletion = biglifts.stores.lifts.LiftCompletion.findLiftCompletionByPropertyAndWeek(
            biglifts.liftSchedule.currentLiftProperty, biglifts.liftSchedule.currentWeek);
        liftCompletion.set('completed', true);
        liftCompletion.save();
        biglifts.stores.lifts.LiftCompletion.sync();

        return liftCompletion;
    },
    persistLog: function (liftCompletion) {
        var liftProgression = biglifts.stores.lifts.LiftProgression.findRecord('set', 6);
        var liftName = biglifts.stores.lifts.Lifts.findRecord('propertyName', biglifts.liftSchedule.currentLiftProperty).data.name;
        var expectedReps = liftProgression.get('reps');

        var formValues = Ext.getCmp('lift-tracking').getValues();
        var reps = formValues['reps'];
        var notes = this.currentLiftNotes;
        var week = Ext.getCmp('lift-template').getEffectiveWeek();
        var weight = formValues['weight'];
        var cycle = biglifts.stores.CurrentCycle.first().data.cycle;
        var units = biglifts.stores.w.Settings.first().data.units;

        this.logLift({liftName: liftName, reps: reps, notes: notes, week: week, weight: weight, cycle: cycle,
            units: units, expectedReps: expectedReps, lift_completion_id: liftCompletion.get('id')});
    },
    logAndShowTracking: function () {
        var liftCompletion = this.persistLiftCompletion();
        this.persistLog(liftCompletion);

        Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'));

        if (this.allLiftsAreCompleted()) {
            biglifts.liftSchedule.lastActiveTab = Ext.getCmp('lift-schedule').getActiveItem();
            Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('cycle-complete'));
        }
        else {
            if (this.asstToggle) {
                if (this.asstToggle.getValue()) {
                    this.goToAssistance();
                }
                else {
                    this.goToLog();
                }
            } else {
                this.goToLog();
            }
        }
    },
    goToLog: function () {
        Ext.getCmp('main-tab-panel').setActiveItem(Ext.getCmp('log'));
    },
    goToAssistance: function () {
        var lift = biglifts.stores.lifts.Lifts.findRecord('propertyName', biglifts.liftSchedule.currentLiftProperty);
        Ext.getCmp('assistance').doLastAssistanceFor(lift);
    },
    doAssistanceChanged: function (me, s, t, newValue) {
        biglifts.stores.assistance.DoAsstAfterLift.first().set('doAssistance', !!newValue);
        biglifts.stores.assistance.DoAsstAfterLift.sync();
    },
    config: {
        id: 'lift-tracking',
        scroll: 'vertical',
        listeners: {
            initialize: function () {
                var me = this;
                me.currentLiftNotes = '';
                var topToolbar = me.add({
                    docked: 'top',
                    xtype: 'toolbar',
                    title: 'Log'
                });
                topToolbar.add({
                    ui: 'back',
                    text: 'Back',
                    handler: Ext.bind(me.cancelLogTracking, me)
                });
                topToolbar.add({xtype: 'spacer'});
                topToolbar.add({
                    ui: 'confirm',
                    text: 'Save',
                    handler: Ext.bind(me.logAndShowTracking, me)
                });

                var fieldset = me.add({
                    xtype: 'fieldset',
                    style: 'margin-top: 0; margin-bottom:7px'
                });

                if (biglifts.toggles.Assistance) {
                    var doAssistance = biglifts.stores.assistance.DoAsstAfterLift.first().get('doAssistance');
                    this.asstToggle = fieldset.add({
                        xtype: 'togglefield',
                        labelWidth: '66%',
                        value: doAssistance ? 1 : 0,
                        label: 'Asst.',
                        listeners: {
                            change: Ext.bind(me.doAssistanceChanged, me)
                        }
                    });
                }

                fieldset.add({
                    labelWidth: '50%',
                    name: 'reps',
                    xtype: 'numberfield',
                    label: 'Reps',
                    listeners: {
                        change: Ext.bind(me.recomputeOneRepMax, me)
                    }
                });
                fieldset.add({
                    labelWidth: '50%',
                    name: 'weight',
                    xtype: 'numberfield',
                    label: 'Weight',
                    listeners: {
                        change: Ext.bind(me.recomputeOneRepMax, me)
                    }
                });

                fieldset.add({
                    labelWidth: '50%',
                    name: 'estimated-one-rep-max',
                    xtype: 'numberfield',
                    label: 'Estimated 1RM',
                    cls: 'one-rep-max-estimate',
                    readOnly: true
                });

                me.add({
                    xtype: 'panel',
                    bodyPadding: 0,
                    layout: 'fit',
                    html: '<div class="x-form-fieldset-title fieldset-title-no-margin">Notes</div>' +
                        '<div id="first-log-notes" class="log-notes"><div class="notes-empty-text">Tap to edit</div></div>',
                    listeners: {
                        painted: function () {
                            if (!this._painted) {
                                this._painted = true;
                                Ext.get('first-log-notes').addListener('tap', Ext.bind(me.editNotes, me));
                            }
                        }
                    }
                });
            },
            painted: function () {
                biglifts.navigation.setBackFunction(Ext.bind(this.cancelLogTracking, this));
                biglifts.components.notesEditor.displayNotes('first-log-notes', this.currentLiftNotes);
                Ext.get('first-log-notes').removeCls('tapped');
            }
        }
    }
});