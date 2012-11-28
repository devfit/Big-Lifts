Ext.define('biglifts.views.ss.Track', {
    extend:'Ext.Panel',
    config:{
        id:'ss-track-tab',
        iconCls:'bookmarks',
        layout:'card',
        title:'Track',
        listeners:{
            initialize:function () {
                this.add({
                    html:'hello!'
                });

                this.setActiveItem(0);
            }
        }
    }
});