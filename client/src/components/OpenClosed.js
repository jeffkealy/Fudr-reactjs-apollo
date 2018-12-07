import React, {Component} from 'react';
const openClosedLogs = false
class OpenClosed extends Component{
  constructor(){
    super()
    this.state={};
    this.dayOfTheWeek = this.dayOfTheWeek.bind(this);
  }


  isRestaurantOpen(hours, restaurant){
    if(openClosedLogs)console.log("-------"+restaurant+"--------");
    let d = new Date();
    let today = d.getDay();
    let hour = d.getHours();
    let businessNotClosed = false;
    let businessClosedAt = 0;
    let businessOpenAt = 0;
    let setsOfHours = 1;
    let setSetsOfHours = false;
    let hoursCollected = false
    let firstSetEndTime = 0;
    let minutes = d.getMinutes();
    hour = hour*100;
    let time = hour + minutes;
    today= today-1;
    if (today < 0) {today = 6 }
    let day = this.dayOfTheWeek(today)
    if(openClosedLogs)console.log("TIME", time);
    if(openClosedLogs)console.log("day: " + day );
    for (var i = 0; i < hours[0].open.length; i++) {
      if (today === hours[0].open[i].day) {
        if(openClosedLogs)console.log("(((((If in loop, hours[0].open.length: ", hours[0].open.length);
        // Checks to see how many sets of hours for the day
        if ( i < hours[0].open.length-1 && hours[0].open[i].day === hours[0].open[i+1].day ) {
          setsOfHours = setsOfHours+1;
          firstSetEndTime = parseInt(hours[0].open[i].end, 10);
          if(openClosedLogs)console.log(restaurant + " has "+setsOfHours+" Sets of hours. the first set ends at " + firstSetEndTime);
          if(openClosedLogs)console.log("multiple hours", time, firstSetEndTime );
          // handle if more than 1 set
          if (setsOfHours > 1 && setSetsOfHours === false && time > firstSetEndTime) {
              if(openClosedLogs)console.log("Later hours. Index", i );
              businessClosedAt = hours[0].open[i+1].end;
              businessOpenAt = hours[0].open[i+1].start;
              setSetsOfHours = true
              hoursCollected = true
              if(openClosedLogs)console.log("Later hours to be show. Open at: "+businessOpenAt+ " Close at: "+businessClosedAt );

            } else {
              if(openClosedLogs)console.log("Earlier hours. Index", i );
              businessClosedAt = hours[0].open[i].end;
              businessOpenAt = hours[0].open[i].start;
              setSetsOfHours = true
              hoursCollected = true
              if(openClosedLogs)console.log("Earlier hours to be show. Open at: "+businessOpenAt+ " Close at: "+businessClosedAt );

            }

        } else if (!hoursCollected) {
            if(openClosedLogs)console.log("index", i);
            businessClosedAt = hours[0].open[i].end;
            businessOpenAt = hours[0].open[i].start;
            businessNotClosed = true;
            hoursCollected = true;
            if(openClosedLogs)console.log("else. Buisess hours. Open: " +businessOpenAt + "Close: " + businessClosedAt);
        }

      }

    }

    if(openClosedLogs)console.log("after for loop");

    for ( i = 0; i < hours[0].open.length; i++) {
      if (today === hours[0].open[i].day) {
         businessNotClosed = true
      }

    }


    if (businessNotClosed) {
      if(openClosedLogs)console.log(restaurant + " businessNotClosed is " + businessNotClosed );
      // let businessClosedAt = hours[0].open[day].end
      // let businessOpenAt = hours[0].open[day].start
      businessClosedAt = parseInt(businessClosedAt, 10)
      businessOpenAt = parseInt(businessOpenAt, 10)
      if(openClosedLogs)console.log("time", time);
      if(openClosedLogs)console.log("businessOpenAt", businessOpenAt);
      if(openClosedLogs)console.log("businessClosedAt", businessClosedAt);

      if (businessClosedAt < businessOpenAt) {
        businessClosedAt = businessClosedAt +2400;
        // if(openClosedLogs)console.log("businessOpenAt", businessOpenAt);
        // if(openClosedLogs)console.log("businessClosedAt", businessClosedAt);
        if (time <= (businessClosedAt -2400)) {
          time = time +2400

        }
        if (time < businessClosedAt && time > businessOpenAt) {
          if(openClosedLogs)console.log("Open: If time < businessClosedAt && time > businessOpenAt:", time);

          return "Open"
        } else {
          if(openClosedLogs)console.log("closed (time)", time);

          return "Closed"
        }
      } else if (time < businessClosedAt && time > businessOpenAt) {
        if(openClosedLogs)console.log("Open (time) elseif", time);

        return "Open"

      } else {
        if(openClosedLogs)console.log(" Closed(time) 2nd else", time);
        // if(openClosedLogs)console.log("businessOpenAt", businessOpenAt);
        // console.log("businessClosedAt", businessClosedAt);

        return "Closed"
      }
    } else {
        if(openClosedLogs)console.log(restaurant + " is CLOSED therefore businessNotClosed is " + businessNotClosed );
      return "Closed"
    }

  }
  dayOfTheWeek(day) {
            switch (day) {
          case 0:
            return "Monday";
          case 1:
            return "Tuesday";
          case 2:
            return "Wednesday";
          case 3:
            return "Thursday";
          case 4:
            return "Friday";
          case 5:
            return "Saturday";
          case 6:
            return "Sunday";
          default:
            return "error"
          }
  }


  render(){

    if (this.props.showOpenClosed) {
      return  (
        <div>
          <div className="OpenClosed-container">
            <div className="openClosed-openClosed">{this.isRestaurantOpen(this.props.hours, this.props.restaurant)}</div>
          </div>
        </div>
      )
    } else {
      return null;
    }

  }
}

export default OpenClosed
