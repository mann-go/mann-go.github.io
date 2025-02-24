import { hourObject } from "./hourObject";

export class dayObject {
    constructor(datetime, tempmax, tempmin, temp, feelslikemax, feelslikemin, feelslike, dew, humidity, precip, precipprob, precipcover, preciptype, sunrise, sunset, conditions, description, icon, hours = []) {
        this.datetime = datetime;
        this.tempmax = tempmax;
        this.tempmin = tempmin;
        this.temp = temp;
        this.feelslikemax = feelslikemax;
        this.feelslikemin = feelslikemin;
        this.feelslike = feelslike;
        this.dew = dew;
        this.humidity = humidity;
        this.precip = precip;
        this.precipprob = precipprob;
        this.precipcover = precipcover;
        this.preciptype = preciptype;
        this.sunrise = sunrise;
        this.sunset = sunset;
        this.conditions = conditions;
        this.description = description;
        this.icon = icon;
        this.hours = hours.map(hour => new hourObject(hour.datetime, hour.temp, hour.feelslike, hour.humidity, hour.conditions, hour.icon));
    }
}
