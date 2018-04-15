import React, {Component} from 'react';

class OpenClosed extends Component{
  isRestaurantOpen(hours, restaurant){
    console.log("----restaurant", restaurant);
    console.log("hours",hours);
    let d = new Date();
    let today = d.getDay();
    let hour = d.getHours();
    let businessOpen = false
    let businessClosedAt = 0
    let businessOpenAt = 0
    let setsOfHours = 1
    let firstSetEndTime = 0;
    let minutes = d.getMinutes()
    today = today-1
    hour = hour*100
    let time = hour + minutes

    for (var i = 0; i < hours[0].open.length; i++) {
      if (today === hours[0].open[i].day) {
        console.log("index", i);
        businessClosedAt = hours[0].open[i].end;
        businessOpenAt = hours[0].open[i].start;
        businessOpen = true;
        console.log("(((((If in loop, day: ", today);
        if ( i< hours[0].open.length && hours[0].open[i].day === hours[0].open[i+1].day ) {
          setsOfHours = setsOfHours+1;
          firstSetEndTime = hours[0].open[i].end;
          console.log(restaurant + " has "+setsOfHours+" Sets of hours. the first set ends at " + firstSetEndTime);

        }
        if (setsOfHours > 1) {
          let endTime = parseInt(firstSetEndTime, 10)
          console.log("multiple hours", time, endTime );

          if ( time > endTime  ) {
            console.log("Switch multiple hours",  time, endTime );
            businessClosedAt = hours[0].open[i].end;
            businessOpenAt = hours[0].open[i].start;
          }
          else {
            businessClosedAt = hours[0].open[i+1].end;
            businessOpenAt = hours[0].open[i+1].start;
          }
        }

      }

    }

    console.log("Sets of hours", setsOfHours);

    for ( i = 0; i < hours[0].open.length; i++) {
      if (today === hours[0].open[i].day) {
         businessOpen = true
      }

    }


    if (businessOpen) {
      console.log(restaurant + " is OPEN therefore businessOpen is " + businessOpen );
      // let businessClosedAt = hours[0].open[day].end
      // let businessOpenAt = hours[0].open[day].start
      businessClosedAt = parseInt(businessClosedAt, 10)
      businessOpenAt = parseInt(businessOpenAt, 10)
      console.log("time", time);
      console.log("businessOpenAt", businessOpenAt);
      console.log("businessClosedAt", businessClosedAt);

      if (businessClosedAt < businessOpenAt) {
        businessClosedAt = businessClosedAt +2400;
        // console.log("businessOpenAt", businessOpenAt);
        // console.log("businessClosedAt", businessClosedAt);
        if (time <= (businessClosedAt -2400)) {
          time = time +2400

        }
        if (time < businessClosedAt && time > businessOpenAt) {
          console.log("Open (time)", time);

          return "Open"
        } else {
          console.log("closed (time)", time);

          return "Closed"
        }
      } else if (time < businessClosedAt && time > businessOpenAt) {
        console.log("Open (time) elseif", time);

        return "Open"

      } else {
        console.log(" Closed(time) 2nd else", time);
        // console.log("businessOpenAt", businessOpenAt);
        // console.log("businessClosedAt", businessClosedAt);

        return "Closed"
      }
    } else {
      console.log(restaurant + " is CLOSED therefore businessOpen is " + businessOpen );
      return "Closed"
    }

  }
  render(){
    return  (

        <div className="OpenClosed-container">
          <div className="openClosed-openClosed">{this.isRestaurantOpen(this.props.hours, this.props.restaurant)}</div>
        </div>

    )
  }
}

export default OpenClosed
