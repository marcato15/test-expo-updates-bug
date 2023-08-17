import {useEffect} from "react";
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Updates from 'expo-updates';

export default function App() {
   const { currentlyRunning, isUpdateAvailable, isUpdatePending } =
     Updates.useUpdates();

   // If true, we show the button to download and run the update
   const showDownloadButton = isUpdateAvailable;

   useEffect(() => {
     if (isUpdatePending) {
       // Update has been successfully downloaded,
       // so reload with the new update bundle
       Updates.reloadAsync();
     }
   }, [isUpdatePending]);

   // Show whether or not we are running embedded code or an update
   const runTypeMessage = currentlyRunning.isEmbeddedLaunch
     ? "This app is running from built-in code"
     : "This app is running an update";


  const UpdateButton = () => ( 
     <View>
        <Text>{runTypeMessage}</Text>
        <Button
          pressHandler={() => Updates.checkForUpdateAsync()}
          title="Check manually for updates"
        />
        {showDownloadButton && (
          <Button
            pressHandler={() => Updates.fetchUpdateAsync()}
            title="Download and run update"
          />
        )}
      </View>
    );

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <UpdateButton />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
