"use strict";
Ext.ns('biglifts.stores.ss');

Ext.define('biglifts.models.startingstrength.Lift', {
    extend:'Ext.data.Model',
    config:{
        identifier:'uuid',
        fields:[
            {name:'id', type:'string'},
            {name:'name', type:'string'},
            {name:'weight', type:'float'},
            {name:'increase', type:'float'}
        ],
        proxy:{
            type:'localstorage',
            id:'ss-lift-proxy'
        }
    }
});

Ext.define('biglifts.models.startingstrength.LiftStore', {
    extend:'Ext.data.Store',
    DEFAULT_LIFTS_LB:[
        {
            name:'Squat',
            weight:200,
            increase:10
        },
        {
            name:'Bench',
            weight:135,
            increase:5
        },
        {
            name:'Deadlift',
            weight:225,
            increase:5
        },
        {
            name:'Press',
            weight:100,
            increase:5
        },
        {
            name:'Power Clean',
            weight:135,
            increase:5
        }
    ],
    config:{
        model:'biglifts.models.startingstrength.Lift',
        listeners:{
            load:function () {
                if (this.getCount() === 0) {
                    this.add(this.DEFAULT_LIFTS_LB);
                    this.sync();
                }
            }
        },
        sorters:[
            {
                property:'name',
                direction:'ASC'
            }
        ]
    }
});

biglifts.stores.ss.Lifts = Ext.create('biglifts.models.startingstrength.LiftStore');
biglifts.stores.push(biglifts.stores.ss.Lifts);