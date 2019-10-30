import React, { Component } from 'react';
import {
    Text,
    TouchableHighlight,
    View,
    Alert,
    TextInput,
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class ImagePickerButton extends Component {

    constructor() {
        super();
        this.state = {
            
        };
        
        this.imagePickerHandler = this.imagePickerHandler.bind(this);
    }

    imagePickerHandler() {
        const options = {
            title: "Select Screenshot",
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };

                this.props.setImage(source);
            }
        });
    }

    render() {
        return (
            <TouchableHighlight style={[styles.button, { backgroundColor: 'orange' }]}
                onPress={this.imagePickerHandler}
                underlayColor="#74b9ff">
                <Text style={styles.btnText}>Choose Photo</Text>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        marginBottom: 20,
        padding: 10,
        alignSelf: 'center',
        width: Dimensions.get('window').width - 50,
        borderRadius: 10,
    },
    btnText: {
        textAlign: 'center',
        fontSize: 17,
        color: 'white'
    },
});