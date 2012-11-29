Ext.define('biglifts.views.RestTimer', {
    extend:'Ext.Panel',
    xtype:'resttimer',
    TIME_INTERVAL:60,
    setBackLocation:function (backLocation) {
        this.backLocation = backLocation;
    },
    addTime:function (seconds) {
        this.remainingSeconds += seconds;
        if (this.remainingSeconds < 0) {
            this.remainingSeconds = 0;
        }

        this.updateTimeDisplay();
    },
    startTimer:function () {
        var restTime = biglifts.stores.RestTime.first();
        restTime.set('restTimeInSeconds', biglifts.restTimer.remainingSeconds);
        biglifts.stores.RestTime.sync();

        var ONE_SECOND = 1000;
        this.timerId = setInterval(Ext.bind(this.timerTick, this), ONE_SECOND);
        Ext.getCmp('start-timer-button').hide();
        Ext.getCmp('stop-timer-button').show();
    },
    back:function () {
        Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp(this.backLocation));
    },
    checkIfSoundMuted:function () {
        if (window.AudioInfo) {
            var soundWontPlay = window.AudioInfo.getVolume() == 0 || window.AudioInfo.isMuted();
            Ext.getCmp('sound-muted-notice').setHidden(!soundWontPlay);
        }
    },
    convertSecondsForDisplay:function (totalSeconds) {
        var minutes = parseInt(totalSeconds / 60);
        var seconds = totalSeconds % 60;
        return minutes + ":" + (seconds >= 10 ? seconds : '0' + seconds);
    },
    updateTimeDisplay:function () {
        Ext.get('rest-timer-time').setHtml(this.convertSecondsForDisplay(this.remainingSeconds));
    },
    stopTimer:function () {
        clearTimeout(this.timerId);

        Ext.getCmp('stop-timer-button').hide();
        Ext.getCmp('start-timer-button').show();

        this.remainingSeconds = 0;
        this.updateTimeDisplay();
    },
    timerTick:function () {
        this.remainingSeconds--;
        if (this.remainingSeconds <= 0) {
            this.timerHasEnded();
        }
        else {
            this.updateTimeDisplay();
        }
    },
    playTimerEndSound:function () {
        if (typeof(Media) !== 'undefined') {
            if (Ext.os.is.Android) {
                window.Alert.playAlert();
            }
            else {
                cordova.exec(Ext.emptyFn, Ext.emptyFn, "Alarm", "alarm", []);
            }
        }
    },
    timerHasEnded:function () {
        this.stopTimer();
        this.playTimerEndSound();
        this.back();
    },
    config:{
        layout:'fit',
        listeners:{
            painted:function () {
                this.checkIfSoundMuted();
                if (this.remainingSeconds === 0) {
                    this.remainingSeconds = biglifts.stores.RestTime.first().get('restTimeInSeconds');
                    biglifts.restTimer.updateTimeDisplay();
                }
                biglifts.navigation.setBackFunction(Ext.bind(this.back, this));
            },
            initialize:function () {
                var me = this;
                me.add([
                    {
                        xtype:'toolbar',
                        title:'Rest',
                        docked:'top',
                        items:[
                            {
                                text:'Back',
                                ui:'back',
                                handler:Ext.bind(me.back, me)
                            }
                        ]
                    },
                    {
                        xtype:'container',
                        cls:'rest-timer-panel',
                        layout:{
                            type:'vbox',
                            align:'stretch'
                        },
                        items:[
                            {
                                xtype:'container',
                                flex:4,
                                layout:'vbox',
                                items:[
                                    {
                                        xtype:'container',
                                        padding:'10 0',
                                        layout:{
                                            type:'hbox'
                                        },
                                        defaults:{
                                            width:'50%'
                                        },
                                        items:[
                                            {
                                                padding:'0 5 0 10',
                                                xtype:'container',
                                                items:[
                                                    {
                                                        id:'rest-timer-decrement-button',
                                                        xtype:'button',
                                                        padding:'10 0',
                                                        ui:'decline',
                                                        width:'100%',
                                                        text:'-1',
                                                        handler:function () {
                                                            me.addTime(-1 * me.TIME_INTERVAL);
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                xtype:'container',
                                                padding:'0 10 0 5',
                                                items:[
                                                    {
                                                        id:'rest-timer-increment-button',
                                                        xtype:'button',
                                                        padding:'10 0',
                                                        ui:'confirm',
                                                        width:'100%',
                                                        text:'+1',
                                                        handler:function () {
                                                            me.addTime(me.TIME_INTERVAL);
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype:'container',
                                        padding:'0 10 0 10',
                                        items:[
                                            {
                                                id:'start-timer-button',
                                                xtype:'button',
                                                text:'Start',
                                                handler:Ext.bind(me.startTimer, me)
                                            },
                                            {
                                                id:'stop-timer-button',
                                                hidden:true,
                                                xtype:'button',
                                                text:'Stop',
                                                handler:Ext.bind(me.stopTimer, me)
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype:'panel',
                                flex:4,
                                padding:'0 5',
                                html:'<div id="rest-timer-time">0:00</div>'
                            },
                            {
                                id:'sound-muted-notice',
                                xtype:'panel',
                                flex:1,
                                hidden:true,
                                style:'color:gray',
                                html:'<div style="text-align:center">The volume is 0 or muted.</div>',
                                padding:'0 10'
                            }
                        ]
                    }
                ]);
            }
        }
    }
});

biglifts.views.liftSchedule.RestTimer = {
    id:'rest-timer',
    xtype:'resttimer'
};