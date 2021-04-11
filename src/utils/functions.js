import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';


export async function registerForPushNotificationsAsync(existingStatus) {
  
  const previousToken = await AsyncStorage.getItem('pushToken')

  if (!previousToken) {
    let finalStatus = existingStatus
  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = status
    } 
    if (finalStatus === 'granted' || finalStatus === 1) {
      const token = await Notifications.getExpoPushTokenAsync()
    }
    return null
  }
}

export const convertCollectDay = (data) => {
  const collectDay = new Date(data).getDay();
  switch (collectDay) {
    case 0:
      return "dimanche";
    case 1:
      return "lundi";
    case 2:
      return "mardi";
    case 3:
      return "mercredi";
    case 4:
      return "jeudi";
    case 5:
      return "vendredi";
    case 6:
      return "samedi";
    default:
      return ''
  }
};
