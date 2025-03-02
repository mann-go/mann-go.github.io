export class hourObject {
    constructor(datetime, temp, feelslike, humidity, precip, precipprob, conditions, icon) {
        this.datetime = datetime;
        this.temp = temp;
        this.feelslike = feelslike;
        this.humidity = humidity;
        this.precip = precip;
        this.precipprob = precipprob,
        this.conditions = conditions;
        this.icon = icon;
    } 
}