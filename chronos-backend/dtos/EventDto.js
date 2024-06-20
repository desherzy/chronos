module.exports = class EventDto {
    id;
    name;
    startTime;
    endTime;
    description;
    category;
    color;
    createdAt;

    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.startTime = model.start_time;
        this.endTime = model.end_time;
        this.category = model.category;
        this.description = model.description;
        this.color = model.color;
        this.createdAt = model.createdAt;
    }
}