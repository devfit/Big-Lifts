describe("Meet Goals", function () {
    beforeEach(function () {
        this.lifts = biglifts.stores.lifts.Lifts;
        this.lifts.removeAll();
        this.meetGoals = biglifts.stores.lifts.MeetGoals;
        this.meetGoals.removeAll();

        this.lifts.sync();
        this.meetGoals.sync();
    });

    test("should sync to the available lifts, adding missing lifts and defaulting meetGoal to the one rep max", function () {
        this.lifts.add({propertyName: 'squat', max: 400});
        this.meetGoals.syncMeetGoalsToLifts();
        expect(this.meetGoals.getCount(),1);
        expect(this.meetGoals.first().get('weight'),400);
    });

    test("should not rewrite existing meet goals when syncing", function () {
        this.lifts.add({propertyName: 'squat', max: 400});
        this.lifts.sync();
        expect(this.meetGoals.getCount(),0);
        this.meetGoals.add({propertyName: 'squat', weight: 450});
        this.meetGoals.sync();

        this.meetGoals.syncMeetGoalsToLifts();
        expect(this.meetGoals.first().get('weight'),450);
    });

    test("should sync to the available lifts, removing missing lifts", function () {
        this.lifts.add({propertyName: 'squat'});
        this.meetGoals.add({propertyName: 'press'});
        this.meetGoals.syncMeetGoalsToLifts();
        expect(this.meetGoals.getCount(),1);
    });

    test("should sync lifts when the lifts store is modified", function () {
        this.lifts.add({propertyName: 'squat'});
        expect(this.meetGoals.getCount(),0);
        this.lifts.sync();

        this.meetGoals.syncMeetGoalsToLifts();
        expect(this.meetGoals.getCount(),1);
    });
});