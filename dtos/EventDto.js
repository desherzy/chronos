module.exports = class EventDto {
    id;
    name;
    startTime;
    endTime;
    description;
    color;
    createdAt;

    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.startTime = model.start_time;
        this.endTime = model.end_time;
        this.description = model.description;
        this.color = model.color;
        this.createdAt = nodel.createdAt;
    }
}