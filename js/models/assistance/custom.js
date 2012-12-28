Ext.define('CustomMovement', {
    extend: 'Ext.data.Model',
    config: {
        identifier: 'uuid',
        fields: [
            {name: 'id', type: 'string'},
            {name: 'liftProperty', type: 'string'},
            {name: 'name', type: 'string'},
            {name: 'sets', type: 'integer'},
            {name: 'reps', type: 'integer'},
            {name: 'weight', type: 'integer', defaultValue: 0},
            {name: 'order', type: 'integer'}
        ]
    }
});