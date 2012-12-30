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
        var expectedRepsByWeek = biglifts.stores.lifts.LiftProgression.findExpectedRepsForWeek(data.week);
        biglifts.stores.LiftLog.add(
            {
                liftName: data.liftName,
                reps: data.reps,
                expectedReps: expectedRepsByWeek,
                notes: data.notes,
                week: data.week,
                weight: data.weight,
                cycle: data.cycle,
                date: null,
                timestamp: new Date().getTime(),
                units: biglifts.stores.GlobalSettings.getUnits()
            });

        biglifts.stores.LiftLog.sync();
    },
    persistLiftCompletion: function () {
        var liftCompletion = biglifts.stores.lifts.LiftCompletion.findLiftCompletionByPropertyAndWeek(
            biglifts.liftSchedule.currentLiftProperty, biglifts.liftSchedule.currentWeek);
        liftCompletion.set('completed', true);
        biglifts.stores.lifts.LiftCompletion.sync();
    },
    persistLog: function () {
        var liftProgression = biglifts.stores.lifts.LiftProgression.findRecord('set', 6);
        var liftName = biglifts.stores.lifts.Lifts.findRecord('propertyName', biglifts.liftSchedule.currentLiftProperty).data.name;
        var expectedReps = liftProgression.data.reps;

        var formValues = Ext.getCmp('lift-tracking').getValues();
        var reps = formValues['reps'];
        var notes = this.currentLiftNotes;
        var week = biglifts.liftSchedule.liftTemplate.getEffectiveWeek();
        var weight = formValues['weight'];
        var cycle = biglifts.stores.CurrentCycle.first().data.cycle;
        var units = biglifts.stores.w.Settings.first().data.units;

        this.logLift({liftName: liftName, reps: reps, notes: notes, week: week, weight: weight, cycle: cycle, units: units, expectedReps: expectedReps});
    },
    logAndShowTracking: function () {
        this.persistLiftCompletion();
        this.persistLog();

        Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'));

        if (this.allLiftsAreCompleted()) {
            biglifts.liftSchedule.liftSelector.showLiftsCompletedScreen();
        }
        else {
            Ext.getCmp('main-tab-panel').setActiveItem(Ext.getCmp('log'));
        }
    },
    config: {
        id: 'lift-tracking',
        scroll: 'vertical',
        listeners: {
            initialize: function () {
                var me = this;
                me.currentLiftNotes = '';
                me.add([
                    {
                        docked: 'top',
                        xtype: 'toolbar',
                        title: 'Log',
                        items: [
                            {
                                ui: 'back',
                                text: 'Back',
                                handler: Ext.bind(me.cancelLogTracking, me)
                            },
                            {xtype: 'spacer'},
                            {
                                ui: 'confirm',
                                text: 'Save',
                                handler: Ext.bind(me.logAndShowTracking, me)
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        style: 'margin-top: 0; margin-bottom:7px',
                        items: [
                            {
                                labelWidth: '50%',
                                name: 'reps',
                                xtype: 'numberfield',
                                label: 'Last set reps',
                                listeners: {
                                    change: Ext.bind(me.recomputeOneRepMax, me)
                                }
                            },
                            {
                                labelWidth: '50%',
                                name: 'weight',
                                xtype: 'numberfield',
                                label: 'Weight',
                                listeners: {
                                    change: Ext.bind(me.recomputeOneRepMax, me)
                                }
                            },
                            {
                                labelWidth: '50%',
                                name: 'estimated-one-rep-max',
                                xtype: 'numberfield',
                                label: 'Estimated 1RM',
                                cls: 'one-rep-max-estimate',
                                readOnly: true
                            }
                        ]
                    },
                    {
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
                    }
                ]);
            },
            painted: function () {
                biglifts.navigation.setBackFunction(Ext.bind(this.cancelLogTracking, this));
                biglifts.components.notesEditor.displayNotes('first-log-notes', this.currentLiftNotes);
                Ext.get('first-log-notes').removeCls('tapped');
            }
        }
    }
});