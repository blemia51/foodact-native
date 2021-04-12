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


export const updateDate = (data, creneaux) => {
  let newDate = new Date(data);
  let collectDay = convertCollectDay(data)
  
  const getCollectTimeByDay = (creneaux) => {
    let collectTime = ''
    switch (collectDay) {
      case 'lundi':
        return collectTime = creneaux && creneaux.lundi && new Date(creneaux.lundi.end).getTime() / 3600 / 1000;
      case 'mardi':
        return collectTime = creneaux && creneaux.mardi && new Date(creneaux.mardi.end).getTime() / 3600 / 1000;
      case 'mercredi':
        return collectTime = creneaux && creneaux.mercredi && new Date(creneaux.mercredi.end).getTime() / 3600 / 1000;
      case 'jeudi':
        return collectTime = creneaux && creneaux.jeudi && new Date(creneaux.jeudi.end).getTime() / 3600 / 1000;
      case 'vendredi':
        return collectTime = creneaux && creneaux.vendredi && new Date(creneaux.vendredi.end).getTime() / 3600 / 1000;
      case 'samedi':
        return collectTime = creneaux && creneaux.samedi && new Date(creneaux.samedi.end).getTime() / 3600 / 1000;
      case 'dimanche':
        return collectTime = creneaux && creneaux.dimanche && new Date(creneaux.dimanche.end).getTime() / 3600 / 1000;
      default:
        return ''
    }
  }

  let collectTimeEnd = getCollectTimeByDay(creneaux)

  return (newDate = newDate
    .setTime(newDate.getTime() + (collectTimeEnd + 1) * 3600 * 1000)
    .toString());
};