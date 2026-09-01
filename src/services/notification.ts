import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";

export async function registerForPushNotificationsAsync() {
  try {
    // Android notification channel
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "Default",
        importance: Notifications.AndroidImportance.MAX,
        sound: "default",
      });
    }

    // Check notification permission
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    // Ask for permission
    if (existingStatus !== "granted") {
      const { status } =
        await Notifications.requestPermissionsAsync();

      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Notification permission denied");
      return null;
    }

    // Get Expo Project ID
    const projectId =
      Constants.expoConfig?.extra?.eas?.projectId;

    if (!projectId) {
      console.log("Expo Project ID not found");
      return null;
    }

    console.log("Project ID:", projectId);

    // Get Expo Push Token
    const token =
      await Notifications.getExpoPushTokenAsync({
        projectId: projectId,
      });

    console.log("================================");
    console.log("EXPO PUSH TOKEN:");
    console.log(token.data);
    console.log("================================");

    return token.data;

  } catch (error) {
    console.log("Push notification error:", error);
    return null;
  }
}