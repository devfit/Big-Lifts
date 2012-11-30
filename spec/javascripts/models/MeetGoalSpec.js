describe("Meet Goals", function () {
    beforeEach(function(){
        this.lifts = biglifts.stores.lifts.Lifts;
        this.lifts.removeAll();
        this.meetGoals = biglifts.stores.lifts.MeetGoals;
        this.meetGoals.removeAll();

        this.lifts.sync();
        this.meetGoals.sync();
    });

    it("should sync to the available lifts, adding missing lifts and defaulting meetGoal to the one rep max", function () {
        this.lifts.add({propertyName:'squat', max: 400});
        biglifts.stores.lifts.syncMeetGoalsToLifts();
        expect(this.meetGoals.getCount()).toEqual(1);
        expect(this.meetGoals.first().get('weight')).toEqual(400);
    });

    it("should sync to the available lifts, removing missing lifts", function () {
        this.lifts.add({propertyName:'squat'});
        this.meetGoals.add({propertyName:'press'});
        biglifts.stores.lifts.syncMeetGoalsToLifts();
        expect(this.meetGoals.getCount()).toEqual(1);
    });

    it("should sync lifts when the lifts store is modified", function(){
        this.lifts.add({propertyName:'squat'});
        expect(this.meetGoals.getCount()).toEqual(0);
        this.lifts.sync();

        biglifts.stores.lifts.syncMeetGoalsToLifts();
        expect(this.meetGoals.getCount()).toEqual(1);
    });
});