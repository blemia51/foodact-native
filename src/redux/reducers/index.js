import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'
//import storage from 'redux-persist/lib/storage'
// import authReducer from "./authReducer";
// import avatarReducer from "./avatarReducer";
// import cityPicReducer from "./cityPicReducer";
// import userReducer from "./userReducer";
// import travelsReducer from "./travelsReducer";
import favorites from "./favorites";
// import myTravelsReducer from "./myTravelsReducer";
import user from './user'
import paniers from './paniers'
import categories from './categories'
import fournisseurs from './fournisseurs'
//import travels from './travels'
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['favoritesState']
}

const rootReducers = combineReducers({
  userState: user,
  favoritesState: favorites,
  paniersState: paniers,
  categoriesState: categories,
  fournisseursState: fournisseurs,
});

export default persistReducer(persistConfig, rootReducers);

//export default rootReducers;
