import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import * as Location from "expo-location";

export default function MapScreen({ navigation, route }) {
  const [location, setLocation] = useState(null);
  const { latitude, longitude } = route.params.location;

  useEffect(() => {
    setLocation({
      latitude,
      longitude,
    });
  }, []);

  // (async () => {
  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== "granted") {
  //     console.log("Permission to access location was denied");
  //   }
  //   let location = await Location.getCurrentPositionAsync({});
  //   const coords = {
  //     latitude: location.coords.latitude,
  //     longitude: location.coords.longitude,
  //   };
  //   setLocation(coords);
  // })();

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {location && (
          <Marker title="I am here" coordinate={location} description="Hello" />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
