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

export const updateCategories = (data) => {
  const categories =
    data &&
    data.filter((data) => data.isActive && data.id !== 22)
    .sort((a, b) => a.orderCategory - b.orderCategory)
  return (
    categories
  )
}

export const optimiseCreneaux = (datas) => {
  const weekCreneaux =
    datas &&
    datas.map((value) => ({
      id: value.id,
      lundi: {
        dayName: 'lundi',
        id: 1,
        isActive: value.lunIsActive,
        start: value.lunStart,
        end: value.lunEnd,
        marche: value.marcheLun,
      },
      mardi: {
        dayName: 'mardi',
        id: 2,
        isActive: value.marIsActive,
        start: value.marStart,
        end: value.marEnd,
        marche: value.marcheMar,
      },
      mercredi: {
        dayName: 'mercredi',
        id: 3,
        isActive: value.merIsActive,
        start: value.merStart,
        end: value.merEnd,
        marche: value.marcheMer,
      },
      jeudi: {
        dayName: 'jeudi',
        id: 4,
        isActive: value.jeuIsActive,
        start: value.jeuStart,
        end: value.jeuEnd,
        marche: value.marcheJeu,
      },
      vendredi: {
        dayName: 'vendredi',
        id: 5,
        isActive: value.venIsActive,
        start: value.venStart,
        end: value.venEnd,
        marche: value.marcheVen,
      },
      samedi: {
        dayName: 'samedi',
        id: 6,
        isActive: value.samIsActive,
        start: value.samStart,
        end: value.samEnd,
        marche: value.marcheSam,
      },
      dimanche: {
        dayName: 'dimanche',
        id: 0,
        isActive: value.dimIsActive,
        start: value.dimStart,
        end: value.dimEnd,
        marche: value.marcheDim,
      }
    }));
  //console.log("week creneaux", weekCreneaux);
  return weekCreneaux
};


export function getHoursFromDate(date) {
  return getTwoDigits(new Date(date).getHours())
}

export function getMinutesFromDate(date) {
  return getTwoDigits(new Date(date).getMinutes())
}

// Get time in french ie. 18h00
export function getTimeFromDate(date) {
  return `${getHoursFromDate(date)}h${getMinutesFromDate(date)}`
}

export function getTwoDigits(number) {
  return (number < 10 ? '0' : '') + number
}

export function getDayFromDate(date) {
  return getTwoDigits(new Date(date).getDate())
}

export function getMonthFromDate(date) {
  return getTwoDigits(new Date(date).getMonth() + 1)
}

export function getFullYearFromDate(date) {
  return new Date(date).getFullYear()
}


export function getLongDate(date) {
  
  return `${getDayFromDate(date)}/${getMonthFromDate(date)}/${getFullYearFromDate(date)}`
}