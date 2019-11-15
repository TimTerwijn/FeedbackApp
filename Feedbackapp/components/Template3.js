import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Button,
    Platform
} from 'react-native';
import StarRating from 'react-native-star-rating';
import DeviceInfo from "react-native-device-info";
import Constants from "../Constants";

var starMap = {};

class Template3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starCount: {},
            appName: props.appName,
            configData: props.config
        };
        this.sendFeedback = this.sendFeedback.bind(this);
    }

    componentDidMount() {
        starMap = {};
    }

    onStarPressed(rating, index, starQuestion) {
        starMap[index] = {
            star: rating,
            question: starQuestion
        };
        this.setState({starCount: starMap})

    }

    sendFeedback() {

        DeviceInfo.getModel().then(deviceModel => {
            // set the device info and os in state
            var deviceInfo = deviceModel;
            var deviceOs = Platform.OS;
            // post the user feedback to the api
            var starValues = this.state.starCount;
            var appName = this.state.appName;
            Object.keys(starValues).map(function (key) {
                fetch(Constants.url + 'post', {
                    method: 'POST',
                    body:
                        JSON.stringify({
                            feedback: "",
                            app: appName,
                            image: "",
                            smiley: "",
                            device: deviceInfo,
                            os: deviceOs,
                            category: "feedback",
                            stars: starValues[key].star,
                            rating: "",
                            feature: "",
                            starQuestion: starValues[key].question


                        })
                })
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            })
            this.props.navigation.navigate('Home');
        })

    }


    renderItem = ({item, index}) => {
        var starQuestion = item.starQuestion;
        return (
            <View style={{margin: 5}}>
                <Text style={styles.header}>{starQuestion}</Text>
                <StarRating starStyle={{color: 'orange'}}
                            disabled={false}
                            maxStars={5}
                            rating={this.state.starCount[index] ? this.state.starCount[index].star : 0}
                            selectedStar={(rating) => this.onStarPressed(rating, index, starQuestion)}/>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 4}}>
                    <FlatList numOfColumns={1}
                              horizontal={false}
                              contentContainerStyle={styles.list}
                              data={this.state.configData}
                              extractData={this.state}
                              renderItem={this.renderItem}/>
                </View>
                <Button title="Submit" onPress={this.sendFeedback}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 5,
        padding: 10,
        backgroundColor: '#313131'
    },
    header: {
        fontSize: 20,
        margin: 10,
        color: 'white',
        fontWeight: 'bold'
    },
    questionSection: {
        padding: 10
    },
    list: {
        // paddingBottom: 50,
        backgroundColor: '#313131',
        justifyContent: 'space-around',
    },
})

export default Template3
