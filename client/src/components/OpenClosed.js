import React, {Component} from 'react';

class OpenClosed extends Component{
  isRestaurantOpen(hours){
    console.log("hours",hours);
    let d = new Date();
    let day = d.getDay();
    let hour = d.getHours();
    hour = hour*100
    let minutes = d.getMinutes()
    let time = hour + minutes

    let businessClosedAt = hours[0].open[day].end
    let businessOpenAt = hours[0].open[day].start
    businessClosedAt = parseInt(businessClosedAt, 10)
    businessOpenAt = parseInt(businessOpenAt, 10)
    console.log("time", time);
    if (businessClosedAt < businessOpenAt) {
      businessClosedAt = businessClosedAt +2400;
      console.log("businessOpenAt", businessOpenAt);
      console.log("businessClosedAt", businessClosedAt);
      if (time <= (businessClosedAt -2400)) {
        time = time +2400

      }
      if (time < businessClosedAt && time > businessOpenAt) {
        console.log("Open (time)", time);

        return "Open"
      } else {
        console.log("1st else");
        console.log("closed (time)", time);

        return "Closed"
      }
    } else if (time < businessClosedAt && time > businessOpenAt) {
      console.log("elseif");
      // console.log("businessOpenAt", businessOpenAt);
      // console.log("businessClosedAt", businessClosedAt);
      console.log("Open (time)", time);

      return "Open"

    } else {
      console.log("2nd else");
      console.log(" Closed(time)", time);
      // console.log("businessOpenAt", businessOpenAt);
      // console.log("businessClosedAt", businessClosedAt);

      return "Closed"
    }
  }
  render(){
    return  (

        <div className="OpenClosed-container">
          <div className="openClosed-openClosed">{this.isRestaurantOpen(this.props.hours)}</div>
        </div>

    )
  }
}

export default OpenClosed
