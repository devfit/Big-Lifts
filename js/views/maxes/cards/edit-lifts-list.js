Ext.ns('wendler.maxes.cards', 'wendler.maxes.edit', 'wendler.maxes.controller.editLiftsList');

wendler.maxes.controller.editLift = function (dataview, index, item, e) {
    var liftModel = wendler.stores.lifts.Lifts.getAt(index);
    var propertyName = liftModel.get('propertyName');

    wendler.maxes.controller.setupEditLift(propertyName);
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-edit-lift-panel'), {type:'slide', direction:'left'});
};

wendler.maxes.controller.deleteLift = function (dataview, index, item, e) {
    wendler.stores.lifts.Lifts.removeAt(index);
    wendler.stores.lifts.Lifts.sync();
    wendler.maxes.controller.rebuildMaxesList();
    Ext.getCmp('maxes-edit-lifts-list').refresh();
};

wendler.maxes.controller.doneWithEditing = function () {
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-form'), {type:'slide', direction:'right'});
};

wendler.maxes.controller.editLiftsDoneButtonPressed = function () {
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-form'));
};

wendler.maxes.controller.showArrangeLifts = function () {
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('arrange-lifts'));
};

wendler.maxes.controller.enableLiftChecked = function (checkbox, event) {
    var propertyName = checkbox.element.up('table').getAttribute('data-lift-property');
    var checked = checkbox.isChecked();
    var record = wendler.stores.lifts.Lifts.findRecord('propertyName', propertyName);
    record.set('enabled', checked);
    record.save();
    wendler.stores.lifts.Lifts.sync();

    wendler.maxes.controller.rerenderAllCheckboxes(Ext.getCmp('maxes-edit-lifts-list'));
    event.stopEvent();

};

wendler.maxes.controller.renderCheckboxForLift = function (lift, domElement) {
    Ext.field.Checkbox.create({
        renderTo:domElement,
        listeners:{
            check:wendler.maxes.controller.enableLiftChecked,
            uncheck:wendler.maxes.controller.enableLiftChecked
        },
        checked:lift.get('enabled')
    });
};

wendler.maxes.controller.rerenderAllCheckboxes = function (parent) {
    _.each(parent.element.query('.enable-lift-checkbox'), function (domElement) {
        if (Ext.get(domElement).down('.x-field-checkbox') == null) {
            var liftProperty = Ext.get(domElement).up('table').getAttribute('data-lift-property');
            var lift = wendler.stores.lifts.Lifts.findRecord('propertyName', liftProperty);
            wendler.maxes.controller.renderCheckboxForLift(lift, domElement);
        }
    });
};

wendler.maxes.edit.togglePlaceHolder = function (dataview, index, target, record, e) {
    var placeholder = Ext.get(Ext.get(target).findParent('.lift-list-row')).down('.placeholder');
    if (placeholder.hasCls('hidden')) {
        placeholder.removeCls('hidden');
    }
    else {
        placeholder.addCls('hidden');
    }
};

wendler.maxes.cards.editMaxesList = {
    id:'maxes-edit-lifts-panel',
    xtype:'panel',
    layout:'fit',
    items:[
        {
            xtype:'toolbar',
            docked:'top',
            title:"Edit Lifts",
            items:[
                {
                    id:'arrange-lifts-button',
                    xtype:'button',
                    text:'Arrange',
                    handler:wendler.maxes.controller.showArrangeLifts,
                    ui:'action'
                },
                {xtype:'spacer'},
                {
                    id:'edit-lifts-done-button',
                    text:'Done',
                    handler:wendler.maxes.controller.editLiftsDoneButtonPressed,
                    ui:'action'
                }
            ]
        },
        {
            xtype:'toolbar',
            docked:'top',
            ui:'light',
            items:[
                {
                    id:'edit-lifts-label',
                    xtype:'panel',
                    html:'Active?'
                },
                {xtype:'spacer'},
                {
                    xtype:'panel',
                    html:'<img id="active-lifts-help-image" src="images/question.png"/>',
                    listeners:{
                        painted:function () {
                            Ext.get('active-lifts-help-image').addListener('tap', function () {
                                Ext.Msg.alert("Inactive Lifts", "Inactive lifts will not appear in the lift list, and their maxes will not increase between cycles");
                            });
                        }
                    }
                }
            ]
        },
        {
            id:'maxes-edit-lifts-list',
            xtype:'list',
            selectedItemCls:'',
            store:wendler.stores.lifts.Lifts,
            itemCls:'lift-list-row',
            itemTpl:'<table data-lift-property="{propertyName}" width="100%"><tbody><tr>' +
                '<td width="20%" class="enable-lift-checkbox"></td>' +
                '<td width="40%"><span class="lift-name">{name}</span></td>' +
                '<td width="40%" class="placeholder"></td>' +
                '<td width="40%" class="delete-button-holder hidden"></td>' +
                '</tr></tbody></table>',
            onItemDisclosure:true,
            listeners:{
                initialize:function () {
                    wendler.components.addSwipeToDelete(this, wendler.maxes.controller.editLift, wendler.maxes.controller.deleteLift,
                        wendler.maxes.edit.togglePlaceHolder, '.x-list-disclosure');
                },
                painted:function () {
                    wendler.maxes.controller.rerenderAllCheckboxes(this);
                }
            }
        }
    ]
};