import React from 'react';
import { View, Button } from 'react-native';
import notifee, { AndroidStyle } from '@notifee/react-native';

function Screen() {
    async function onDisplayNotification() {
       
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        // Display a notification
        notifee.displayNotification({
            title: 'Current Location Successfully Fetched',
            body: 'Successfully current locattion fetched, and displayed in app',
            android: {
              channelId,
              style: { type: AndroidStyle.BIGTEXT, text: 'Successfully current locattion fetched, and displayed in app' },
              autoCancel: true, // Dismiss the notification when tapped
            //   importance: notifee.importance.HIGH,
            },
          }).then((data) => console.log(data))
            .catch((err) => console.log(err))
    }

    return (
        <View>
            <Button title="Display Notification" onPress={() => onDisplayNotification()} />
        </View>
    );
}


export default Screen;