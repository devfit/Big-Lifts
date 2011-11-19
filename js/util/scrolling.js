Ext.ns('util.scrolling');
util.scrolling.lockVertical = function(item) {
    if (item.offset.y > 0) {
        item.scrollTo({x:0,y:0});
    }
};

util.scrolling.lockedVerticalScroller = {
    direction: 'vertical',
    listeners: {
        scroll:util.scrolling.lockVertical
    }
};