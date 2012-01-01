Ext.ns('wendler.views.liftSchedule', 'wendler.controller.liftSchedule');
wendler.liftSchedule.controller.returnToLiftSelectFromSettings = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'), {type:'slide', direction:'up'});
};

wendler.liftSchedule.controller.setupExamplePercentagesTable = function () {
    var percentagesByWeek = wendler.liftSchedule.controller.getLiftPercentagesByWeek();
    var innerHtml = "";
    for (var i in percentagesByWeek) {
        innerHtml += "<tr>";
        innerHtml += "<td>" + i + "</td>";
        innerHtml += "<td>" + percentagesByWeek[i].join(',') + "</td>";
        innerHtml += "</tr>";
    }
    Ext.get('example-precentages-table').setHTML(innerHtml);
};

wendler.liftSchedule.controller.getLiftPercentagesByWeek = function () {
    var percentagesByWeek = {};
    wendler.stores.lifts.LiftProgression.filterBy(function (r) {
        return r.data.set > 3;
    });

    wendler.stores.lifts.LiftProgression.each(function (r) {
        var week = r.data.week;
        percentagesByWeek[week] = typeof(percentagesByWeek[week]) === 'undefined' ? []
            : percentagesByWeek[week];

        percentagesByWeek[week].push(r.data.percentage);
    });

    wendler.stores.lifts.LiftProgression.clearFilter();
    return percentagesByWeek;
};


wendler.views.liftSchedule.LiftSettings = {
    id:'lift-settings',
    xtype:'formpanel',
    style:'margin-top: 0px',
    bodyPadding:0,
    listeners:{
        afterlayout:wendler.liftSchedule.controller.setupExamplePercentagesTable
    },
    items:[
        {
            html:'The Wendler 5/3/1 book offers two lift progressions with different percentages'
        },
        {
            xtype:'selectfield',
            options:[
                {text:'1', value:'1'},
                {text:'2', value:'2'}
            ],
            label:'Option'
        },
        {
            xtype: 'panel',
//            bodyPadding: 0,
            html:'<div id="example-percentages">' +
                '<table>' +
                '<thead><tr><th>Week</th><th>Percentages</th></tr></thead>' +
                '<tbody id="example-precentages-table"></tbody>' +
                '</table>' +
                '</div>'
        }
    ],
    dockedItems:[
        {
            xtype:'toolbar',
            title:'Config',
            items:[
                {
                    text:'Back',
                    ui:'back',
                    handler:wendler.liftSchedule.controller.returnToLiftSelectFromSettings
                }
            ]
        }
    ]
};