Ext.ns('wendler.views.liftSchedule', 'wendler.restTimer');

wendler.restTimer.remainingSeconds = 0;
wendler.restTimer.timerId = null;
wendler.restTimer.backLocation = '';

wendler.restTimer.back = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp(wendler.restTimer.backLocation));
};


wendler.restTimer.addTime = function (seconds) {
    wendler.restTimer.remainingSeconds += seconds;
    if (wendler.restTimer.remainingSeconds < 0) {
        wendler.restTimer.remainingSeconds = 0;
    }

    wendler.restTimer.updateTimeDisplay();
};

wendler.restTimer.startTimer = function () {
    var ONE_SECOND = 1000;
    wendler.restTimer.timerId = setInterval(wendler.restTimer.timerTick, ONE_SECOND);
    Ext.getCmp('start-timer-button').hide();
    Ext.getCmp('stop-timer-button').show();
};

wendler.restTimer.timerHasEnded = function () {
    wendler.restTimer.stopTimer();
    wendler.restTimer.playTimerEndSound();
    wendler.restTimer.back();
};

wendler.restTimer.playTimerEndSound = function () {
    if (typeof(Media) !== 'undefined') {
        var soundPath = util.phonegap.getResourcesPath() + "/sounds/1khz_1_5s.mp3";
        var restSound = new Media(soundPath,
            function () {
            }, function (error) {
                console.log(error);
            });
        restSound.play();
    }
};

wendler.restTimer.timerTick = function () {
    wendler.restTimer.remainingSeconds--;
    if (wendler.restTimer.remainingSeconds <= 0) {
        wendler.restTimer.timerHasEnded();
    }
    else {
        wendler.restTimer.updateTimeDisplay();
    }
};

wendler.restTimer.stopTimer = function () {
    clearTimeout(wendler.restTimer.timerId);

    Ext.getCmp('stop-timer-button').hide();
    Ext.getCmp('start-timer-button').show();

    wendler.restTimer.remainingSeconds = 0;
    wendler.restTimer.updateTimeDisplay();
};

wendler.restTimer.updateTimeDisplay = function () {
    Ext.get('rest-timer-time').setHtml(wendler.restTimer.convertSecondsForDisplay(wendler.restTimer.remainingSeconds));
};

wendler.restTimer.convertSecondsForDisplay = function (totalSeconds) {
    var minutes = parseInt(totalSeconds / 60);
    var seconds = totalSeconds % 60;
    return minutes + ":" + (seconds >= 10 ? seconds : '0' + seconds);
};

wendler.restTimer.TIME_INTERVAL = 60;

wendler.views.liftSchedule.RestTimer = {
    id:'rest-timer',
    xtype:'panel',
    layout:'fit',
    listeners:{
        show:function () {
            wendler.navigation.setBackFunction(wendler.restTimer.back);
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
                    handler:wendler.restTimer.back
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
                    flex:1,
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
                                                wendler.restTimer.addTime(-1 * wendler.restTimer.TIME_INTERVAL);
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
                                                wendler.restTimer.addTime(wendler.restTimer.TIME_INTERVAL);
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
                                    handler:wendler.restTimer.startTimer
                                },
                                {
                                    id:'stop-timer-button',
                                    hidden:true,
                                    xtype:'button',
                                    text:'Stop',
                                    handler:wendler.restTimer.stopTimer
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype:'panel',
                    flex:1,
                    padding:'0 5',
                    html:'<div id="rest-timer-time">0:00</div>'
                }
            ]
        }
    ]
};