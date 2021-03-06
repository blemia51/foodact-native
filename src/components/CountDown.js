import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { View, Text, StyleSheet } from "react-native";
//import { formatFullDate } from '../utils/dateUtils'
import { EvilIcons } from "@expo/vector-icons";

class CountDown extends PureComponent {

  state = {
    days: 0,
    hours: "00",
    minutes: "00",
    seconds: "00",
    timeUp: false,
  };

  updateClock = () => {
    const { date, quantity } = this.props;
    //console.log("Date props", date)
    
    //const eventDate = Date.parse(date);
    const eventDate = date
    //console.log("eventDate", eventDate)
    const remainingTime = eventDate - new Date();

    if (remainingTime < 1 || quantity < 1) {
      this.setState(prevState => ({ ...prevState, timeUp: true }));
    } else {
      let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      let hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
      let minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
      let seconds = Math.floor((remainingTime / 1000) % 60);
      this.setState(prevState => ({
        ...prevState,
        hours: hours > 9 ? hours : `0${hours}`,
        minutes: minutes > 9 ? minutes : `0${minutes}`,
        seconds: seconds > 9 ? seconds : `0${seconds}`,
        days,
      }));
    }
  };

  componentDidMount() {
    this.updateClock();
    let intervalId = setInterval(this.updateClock, 1000);
    this.setState(prevState => ({ ...prevState, intervalId: intervalId }))
    //console.log(formatFullDate(new Date))
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state !== prevState) {
  //     console.log('brrrrrrrrrrrrrrrrrrrrrrrrrr')
  //     this.updateClock();
  //   let intervalId = setInterval(this.updateClock, 1000);
  //   this.setState(prevState => ({ ...prevState, intervalId: intervalId }))
  //   }
  // }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    const { days, hours, minutes, seconds, timeUp } = this.state;

    return timeUp ? (
      <View>
        <View style={styles.container}>
          {/* <EvilIcons name="clock" size={24} color="black" /> */}
          <Text style={styles.time}>Epuis??</Text>
        </View>
      </View>
    ) : (
      <View>
        <View style={styles.container}>
          <EvilIcons name="clock" size={24} color="black" />
          {/* <Text style={{ backgroundColor:'white', color:'grey'}}>{`${days}j`}</Text> */}
          <Text style={styles.time}>
            {days > 0
              ? `${days}j ${hours}:${minutes}:${seconds}`
              : `${hours}:${minutes}:${seconds}`}
          </Text>
        </View>
        {/* <p>{`${days} ${dayString} ${hours} hours ${minutes}  minutes ${seconds} seconds`}</p> */}
      </View>
    );
  }
}

CountDown.propTypes = {
  date: PropTypes.string,
};

export default CountDown;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: 'center',
    position: "absolute",
    left: 10,
    bottom: 10,
    paddingHorizontal: 8,
    backgroundColor: "white",
    //width: "48%",
    paddingVertical: 2,
    borderRadius: 5,
  },
  time: {
    //backgroundColor: "white",
    color: "grey",
  },
});
