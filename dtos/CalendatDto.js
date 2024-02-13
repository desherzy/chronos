module.exports = class CalendarDto {
    id;
    name;
    description;
    color;
    createdAt;
    permission;

    constructor(model, permission) {
        this.id = model.id;
        this.name = model.name;
        this.description = model.description;
        this.color = model.color;
        this.createdAt = model.createdAt;
        this.permission = permission;
    }
}