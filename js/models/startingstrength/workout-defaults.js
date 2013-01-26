Ext.ns('biglifts.models.startingstrength.workouts');
//https://docs.google.com/spreadsheet/ccc?key=0AmWyzQPqnP1wcGxsU1FwNlpITmFBT1AzRVI0WENQSXc&hl=en#gid=0
biglifts.models.startingstrength.workouts.standard = {
    squat:[
        {sets:2, reps:5, name:'A', percentage:0, warmup:true, order:0},
        {sets:1, reps:5, name:'A', percentage:40, warmup:true, order:1},
        {sets:1, reps:3, name:'A', percentage:60, warmup:true, order:2},
        {sets:1, reps:2, name:'A', percentage:80, warmup:true, order:3},
        {sets:3, reps:5, name:'A', percentage:100, warmup:false, order:4},
        {sets:2, reps:5, name:'B', percentage:0, warmup:true, order:0},
        {sets:1, reps:5, name:'B', percentage:40, warmup:true, order:1},
        {sets:1, reps:3, name:'B', percentage:60, warmup:true, order:2},
        {sets:1, reps:2, name:'B', percentage:80, warmup:true, order:3},
        {sets:3, reps:5, name:'B', percentage:100, warmup:false, order:4}
    ],
    bench:[
        {sets:2, reps:5, name:'A', percentage:0, warmup:true, order:0},
        {sets:1, reps:5, name:'A', percentage:50, warmup:true, order:1},
        {sets:1, reps:3, name:'A', percentage:70, warmup:true, order:2},
        {sets:1, reps:2, name:'A', percentage:90, warmup:true, order:3},
        {sets:3, reps:5, name:'A', percentage:100, warmup:false, order:4}
    ],
    deadlift:[
        {sets:2, reps:5, name:'A', percentage:40, warmup:true, order:0},
        {sets:1, reps:3, name:'A', percentage:60, warmup:true, order:1},
        {sets:1, reps:2, name:'A', percentage:85, warmup:true, order:2},
        {sets:1, reps:2, name:'A', percentage:100, warmup:false, order:3}
    ],
    press:[
        {sets:2, reps:5, name:'B', percentage:0, warmup:true, order:0},
        {sets:1, reps:5, name:'B', percentage:55, warmup:true, order:1},
        {sets:1, reps:3, name:'B', percentage:70, warmup:true, order:2},
        {sets:1, reps:2, name:'B', percentage:85, warmup:true, order:3},
        {sets:1, reps:2, name:'B', percentage:100, warmup:false, order:4}
    ],
    powerclean:[
        {sets:2, reps:5, name:'B', percentage:0, warmup:true, order:0},
        {sets:1, reps:5, name:'B', percentage:55, warmup:true, order:1},
        {sets:1, reps:3, name:'B', percentage:70, warmup:true, order:2},
        {sets:1, reps:2, name:'B', percentage:85, warmup:true, order:3},
        {sets:5, reps:3, name:'B', percentage:85, warmup:false, order:4}
    ]
};

biglifts.models.startingstrength.workouts.novice = {
    squat:[
        {sets:2, reps:5, name:'A', percentage:0, warmup:true, order:0},
        {sets:1, reps:5, name:'A', percentage:40, warmup:true, order:1},
        {sets:1, reps:3, name:'A', percentage:60, warmup:true, order:2},
        {sets:1, reps:2, name:'A', percentage:80, warmup:true, order:3},
        {sets:3, reps:5, name:'A', percentage:100, warmup:false, order:4},
        {sets:2, reps:5, name:'B', percentage:0, warmup:true, order:0},
        {sets:1, reps:5, name:'B', percentage:40, warmup:true, order:1},
        {sets:1, reps:3, name:'B', percentage:60, warmup:true, order:2},
        {sets:1, reps:2, name:'B', percentage:80, warmup:true, order:3},
        {sets:3, reps:5, name:'B', percentage:100, warmup:false, order:4}
    ],
    bench:[
        {sets:2, reps:5, name:'A', percentage:0, warmup:true, order:0},
        {sets:1, reps:5, name:'A', percentage:50, warmup:true, order:1},
        {sets:1, reps:3, name:'A', percentage:70, warmup:true, order:2},
        {sets:1, reps:2, name:'A', percentage:90, warmup:true, order:3},
        {sets:3, reps:5, name:'A', percentage:100, warmup:false, order:4}
    ],
    press:[
        {sets:2, reps:5, name:'B', percentage:0, warmup:true, order:0},
        {sets:1, reps:5, name:'B', percentage:55, warmup:true, order:1},
        {sets:1, reps:3, name:'B', percentage:70, warmup:true, order:2},
        {sets:1, reps:2, name:'B', percentage:85, warmup:true, order:3},
        {sets:1, reps:2, name:'B', percentage:100, warmup:false, order:4}
    ],
    deadlift:[
        {sets:2, reps:5, name:'A', percentage:40, warmup:true, order:0},
        {sets:1, reps:3, name:'A', percentage:60, warmup:true, order:1},
        {sets:1, reps:2, name:'A', percentage:85, warmup:true, order:2},
        {sets:1, reps:2, name:'A', percentage:100, warmup:false, order:3},
        {sets:2, reps:5, name:'B', percentage:40, warmup:true, order:0},
        {sets:1, reps:3, name:'B', percentage:60, warmup:true, order:1},
        {sets:1, reps:2, name:'B', percentage:85, warmup:true, order:2},
        {sets:1, reps:2, name:'B', percentage:100, warmup:false, order:3}
    ]
};