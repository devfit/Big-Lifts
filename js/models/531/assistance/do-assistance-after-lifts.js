Ext.ns('biglifts.stores.assistance');
Ext.define('DoAssistanceAfterLift', {
    extend:'Ext.data.Model',
    config:{
        identifier:'uuid',
        fields:[
            {name:'id', type:'string'},
            {name:'doAssistance', type:'boolean'}
        ],
        proxy:{
            type:'localstorage',
            id:'do-asst-after-lift-proxy'
        }
    }
});

Ext.define('DoAssistanceAfterLiftStore', {
    extend:'Ext.data.Store',
    config:{
        model:'DoAssistanceAfterLift',
        listeners:{
            load:function () {
                if (this.getCount() === 0) {
                    this.add({doAssistance:true});
                    this.sync();
                }
            }
        }
    }
});

biglifts.stores.assistance.DoAsstAfterLift = Ext.create('DoAssistanceAfterLiftStore');
biglifts.stores.push(biglifts.stores.assistance.DoAsstAfterLift);