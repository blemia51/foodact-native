import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'
//import storage from 'redux-persist/lib/storage'
// import authReducer from "./authReducer";
// import avatarReducer from "./avatarReducer";
// import cityPicReducer from "./cityPicReducer";
// import userReducer from "./userReducer";
// import travelsReducer from "./travelsReducer";
import favorites from "./favorites";
import favoritesDatas from './favoritesDatas'
import location from './location'
// import myTravelsReducer from "./myTravelsReducer";
import user from './user'
import paniers from './paniers'
import categories from './categories'
import fournisseurs from './fournisseurs'
import order from "./order";
//import travels from './travels'
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['favoritesState', 'userState', 'locationState']
}

const userPersistConfig = {
  key: 'userState',
  storage: AsyncStorage,
  blacklist: ['passwordForgotten']
};

const rootReducers = combineReducers({
  userState: (user),
  favoritesState: favorites,
  favoritesDatasState: favoritesDatas,
  paniersState: paniers,
  categoriesState: categories,
  fournisseursState: fournisseurs,
  locationState: location,
  orderState: order
});

export default persistReducer(persistConfig, rootReducers);

//export default rootReducers;
