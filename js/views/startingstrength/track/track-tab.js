Ext.define('biglifts.views.ss.Track', {
    extend:'Ext.Panel',
    config:{
        id:'ss-track-tab',
        iconCls:'bookmarks',
        layout:'card',
        title:'Track',
        items:[
            {
                xtype:'toolbar',
                docked:'top',
                title:'Track'
            }
        ],
        listeners:{
            initialize:function () {
                this.add({
                    xtype:'list',
                    store:biglifts.stores.ss.Log,
                    itemTpl:new Ext.XTemplate("{name} {sets}x{reps} {weight}{units} {[this.convertTimestamp(values.timestamp)]}", {
                        convertTimestamp:function (timestamp) {
                            return new Date(timestamp).toString(biglifts.stores.Settings.first().get('dateFormat'));
                        }
                    })
                });

                this.setActiveItem(0);
            }
        }
    }
});