Ext.ns('biglifts.views.liftSchedule', 'biglifts.restTimer');

biglifts.restTimer.remainingSeconds = 0;
biglifts.restTimer.timerId = null;
biglifts.restTimer.backLocation = '';

biglifts.restTimer.back = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp(biglifts.restTimer.backLocation));
};

biglifts.restTimer.addTime = function (seconds) {
    biglifts.restTimer.remainingSeconds += seconds;
    if (biglifts.restTimer.remainingSeconds < 0) {
        biglifts.restTimer.remainingSeconds = 0;
    }

    biglifts.restTimer.updateTimeDisplay();
};

biglifts.restTimer.startTimer = function () {
    var restTime = biglifts.stores.RestTime.first();
    restTime.set('restTimeInSeconds', biglifts.restTimer.remainingSeconds);
    restTime.save();

    var ONE_SECOND = 1000;
    biglifts.restTimer.timerId = setInterval(biglifts.restTimer.timerTick, ONE_SECOND);
    Ext.getCmp('start-timer-button').hide();
    Ext.getCmp('stop-timer-button').show();
};

biglifts.restTimer.timerHasEnded = function () {
    biglifts.restTimer.stopTimer();
    biglifts.restTimer.playTimerEndSound();
    biglifts.restTimer.back();
};

biglifts.restTimer.checkIfSoundMuted = function () {
    if (window.AudioInfo) {
        var soundWontPlay = window.AudioInfo.getVolume() == 0 || window.AudioInfo.isMuted();
        Ext.getCmp('sound-muted-notice').setHidden(!soundWontPlay);
    }
};

biglifts.restTimer.playTimerEndSound = function () {
    if (typeof(Media) !== 'undefined') {
        if (Ext.os.is.Android) {
            window.Alert.playAlert();
        }
        else {
            cordova.exec(Ext.emptyFn, Ext.emptyFn, "Alarm", "alarm", []);
        }
    }
};

biglifts.restTimer.timerTick = function () {
    biglifts.restTimer.remainingSeconds--;
    if (biglifts.restTimer.remainingSeconds <= 0) {
        biglifts.restTimer.timerHasEnded();
    }
    else {
        biglifts.restTimer.updateTimeDisplay();
    }
};

biglifts.restTimer.stopTimer = function () {
    clearTimeout(biglifts.restTimer.timerId);

    Ext.getCmp('stop-timer-button').hide();
    Ext.getCmp('start-timer-button').show();

    biglifts.restTimer.remainingSeconds = 0;
    biglifts.restTimer.updateTimeDisplay();
};

biglifts.restTimer.updateTimeDisplay = function () {
    Ext.get('rest-timer-time').setHtml(biglifts.restTimer.convertSecondsForDisplay(biglifts.restTimer.remainingSeconds));
};

biglifts.restTimer.convertSecondsForDisplay = function (totalSeconds) {
    var minutes = parseInt(totalSeconds / 60);
    var seconds = totalSeconds % 60;
    return minutes + ":" + (seconds >= 10 ? seconds : '0' + seconds);
};

biglifts.restTimer.TIME_INTERVAL = 60;

biglifts.views.liftSchedule.RestTimer = {
    id:'rest-timer',
    xtype:'panel',
    layout:'fit',
    listeners:{
        show:function () {
            biglifts.restTimer.checkIfSoundMuted();
            if (biglifts.restTimer.remainingSeconds === 0) {
                biglifts.restTimer.remainingSeconds = biglifts.stores.RestTime.first().get('restTimeInSeconds');
                biglifts.restTimer.updateTimeDisplay();
            }
            biglifts.navigation.setBackFunction(biglifts.restTimer.back);
        }
    },
    items:[
        {
            xtype:'toolbar',
            title:'Rest',
            docked:'top',
            items:[
                {
                    text:'Back',
                    ui:'back',
                    handler:biglifts.restTimer.back
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
                                                biglifts.restTimer.addTime(-1 * biglifts.restTimer.TIME_INTERVAL);
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
                                                biglifts.restTimer.addTime(biglifts.restTimer.TIME_INTERVAL);
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
                                    handler:biglifts.restTimer.startTimer
                                },
                                {
                                    id:'stop-timer-button',
                                    hidden:true,
                                    xtype:'button',
                                    text:'Stop',
                                    handler:biglifts.restTimer.stopTimer
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
    ]
};