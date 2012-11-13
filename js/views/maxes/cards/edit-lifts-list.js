Ext.ns('biglifts.maxes.cards', 'biglifts.maxes.edit', 'biglifts.maxes.controller.editLiftsList');

biglifts.maxes.controller.editLift = function (dataview, index, item, e) {
    var liftModel = biglifts.stores.lifts.Lifts.getAt(index);
    var propertyName = liftModel.get('propertyName');

    biglifts.maxes.controller.setupEditLift(propertyName);
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-edit-lift-panel'), {type:'slide', direction:'left'});
};

biglifts.maxes.controller.deleteLift = function (dataview, index, item, e) {
    biglifts.stores.lifts.Lifts.removeAt(index);
    biglifts.stores.lifts.Lifts.sync();
    biglifts.maxes.controller.rebuildMaxesList();
    Ext.getCmp('maxes-edit-lifts-list').refresh();
};

biglifts.maxes.controller.editLiftsDoneButtonPressed = function () {
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-form'));
};

biglifts.maxes.controller.showArrangeLifts = function () {
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('arrange-lifts'));
};

biglifts.maxes.controller.enableLiftChecked = function (checkbox, event) {
    var propertyName = checkbox.element.up('table').getAttribute('data-lift-property');
    var checked = checkbox.isChecked();
    var record = biglifts.stores.lifts.Lifts.findRecord('propertyName', propertyName);
    record.set('enabled', checked);
    record.save();
    biglifts.stores.lifts.Lifts.sync();

    biglifts.maxes.controller.rerenderAllCheckboxes(Ext.getCmp('maxes-edit-lifts-list'));
    event.stopEvent();
};

biglifts.maxes.controller.renderCheckboxForLift = function (lift, domElement) {
    Ext.field.Checkbox.create({
        renderTo:domElement,
        listeners:{
            check:biglifts.maxes.controller.enableLiftChecked,
            uncheck:biglifts.maxes.controller.enableLiftChecked
        },
        checked:lift.get('enabled')
    });
};

biglifts.maxes.controller.rerenderAllCheckboxes = function (list) {
    var checkboxes = list.element.query('.enable-lift-checkbox');
    _.each(checkboxes, function (domElement) {
        if (Ext.get(domElement).down('.x-field-checkbox') == null) {
            var liftProperty = Ext.get(domElement).up('table').getAttribute('data-lift-property');
            var lift = biglifts.stores.lifts.Lifts.findRecord('propertyName', liftProperty);
            biglifts.maxes.controller.renderCheckboxForLift(lift, domElement);
        }
    });
};

biglifts.maxes.edit.togglePlaceHolder = function (dataview, index, target, record, e) {
    var placeholder = Ext.get(Ext.get(target).findParent('.lift-list-row')).down('.placeholder');
    if (placeholder.hasCls('hidden')) {
        placeholder.removeCls('hidden');
    }
    else {
        placeholder.addCls('hidden');
    }
};

biglifts.maxes.cards.editMaxesList = {
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
                    handler:biglifts.maxes.controller.showArrangeLifts,
                    ui:'action'
                },
                {xtype:'spacer'},
                {
                    id:'edit-lifts-done-button',
                    text:'Done',
                    handler:biglifts.maxes.controller.editLiftsDoneButtonPressed,
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
                            if (!this._painted) {
                                this._painted = true;
                                Ext.get('active-lifts-help-image').addListener('tap', function () {
                                    Ext.Msg.alert("Inactive Lifts", "Inactive lifts will not appear in the lift list, and their maxes will not increase between cycles");
                                });
                            }
                        }
                    }
                }
            ]
        },
        {
            id:'maxes-edit-lifts-list',
            xtype:'list',
            selectedItemCls:'',
            store:biglifts.stores.lifts.Lifts,
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
                    biglifts.components.addSwipeToDelete(this, biglifts.maxes.controller.editLift, biglifts.maxes.controller.deleteLift,
                        biglifts.maxes.edit.togglePlaceHolder, '.x-list-disclosure');
                },
                resize:{
                    fn:function () {
                        biglifts.maxes.controller.rerenderAllCheckboxes(this);
                    }, order:'after'
                }
            }
        }
    ]
};