Ext.ns('wendler.views.liftSchedule', 'wendler.restTimer.controller');
wendler.restTimer.controller.returnToLiftTemplate = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-template'));
};

wendler.restTimer.controller.remainingSeconds = 0;
wendler.restTimer.controller.timerId = null;
wendler.restTimer.controller.addTime = function (seconds) {
    wendler.restTimer.controller.remainingSeconds += seconds;
    if (wendler.restTimer.controller.remainingSeconds < 0) {
        wendler.restTimer.controller.remainingSeconds = 0;
    }

    wendler.restTimer.controller.updateTimeDisplay();
};

wendler.restTimer.controller.startTimer = function(){
    var ONE_SECOND = 1000;
    wendler.restTimer.controller.timerId = setInterval(wendler.restTimer.controller.timerTick, ONE_SECOND);
    Ext.getCmp('start-timer-button').hide();
    Ext.getCmp('stop-timer-button').show();
};

wendler.restTimer.controller.timerHasEnded = function(){
    wendler.restTimer.controller.stopTimer();
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-template'));
};

wendler.restTimer.controller.timerTick = function(){
    wendler.restTimer.controller.remainingSeconds--;
    if( wendler.restTimer.controller.remainingSeconds <= 0 ){
        wendler.restTimer.controller.timerHasEnded();
    }
    else{
        wendler.restTimer.controller.updateTimeDisplay();
    }
};

wendler.restTimer.controller.stopTimer = function(){
    clearTimeout(wendler.restTimer.controller.timerId);

    Ext.getCmp('stop-timer-button').hide();
    Ext.getCmp('start-timer-button').show();

    wendler.restTimer.controller.remainingSeconds = 0;
    wendler.restTimer.controller.updateTimeDisplay();
};

wendler.restTimer.controller.updateTimeDisplay = function () {
    Ext.get('rest-timer-time').setHtml(wendler.restTimer.controller.convertSecondsForDisplay(wendler.restTimer.controller.remainingSeconds));
};

wendler.restTimer.controller.convertSecondsForDisplay = function (totalSeconds) {
    var minutes = parseInt(totalSeconds / 60);
    var seconds = totalSeconds % 60;
    return minutes + ":" + (seconds >= 10 ? seconds : '0' + seconds);
};

wendler.restTimer.TIME_INTERVAL = 60;

wendler.views.liftSchedule.RestTimer = {
    id:'rest-timer',
    xtype:'panel',
    layout:'fit',
    items:[
        {
            xtype:'toolbar',
            title:'Rest',
            docked:'top',
            items:[
                {
                    text:'Back',
                    ui:'back',
                    handler:wendler.restTimer.controller.returnToLiftTemplate
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
                            padding: '10 0',
                            layout:{
                                type:'hbox'
                            },
                            defaults:{
                                width:'50%'
                            },
                            items:[
                                {
                                    padding: '0 5 0 10',
                                    xtype:'container',
                                    items:[
                                        {
                                            xtype:'button',
                                            padding:'10 0',
                                            ui:'decline',
                                            width:'100%',
                                            text:'-1',
                                            handler:function () {
                                                wendler.restTimer.controller.addTime(-1 * wendler.restTimer.TIME_INTERVAL);
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype:'container',
                                    padding: '0 10 0 5',
                                    items:[
                                        {
                                            xtype:'button',
                                            padding:'10 0',
                                            ui:'confirm',
                                            width:'100%',
                                            text:'+1',
                                            handler:function () {
                                                wendler.restTimer.controller.addTime(wendler.restTimer.TIME_INTERVAL);
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            padding: '0 10 0 10',
                            items:[
                                {
                                    id: 'start-timer-button',
                                    xtype: 'button',
                                    text: 'Start',
                                    handler: wendler.restTimer.controller.startTimer
                                },
                                {
                                    id: 'stop-timer-button',
                                    hidden: true,
                                    xtype: 'button',
                                    text: 'Stop',
                                    handler: wendler.restTimer.controller.stopTimer
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