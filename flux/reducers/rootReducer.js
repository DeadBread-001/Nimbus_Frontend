import { combineReducers } from "../redux-lite.js";
import { profileReducer } from "./profile.js";
import { filmsReducer } from "./filmsAll.js";
import { filmReducer } from "./film.js";
import { loginReducer } from "./auth.js";
import { actorReducer } from "./actor.js";
import { commentReducer } from "./comment.js";

/**
 * Объединенный редюсер для управления состоянием всего приложения.
 * @constant
 * @type {Function}
 */
export const rootReducer = combineReducers({
  profile: profileReducer,
  films: filmsReducer,
  film: filmReducer,
  login: loginReducer,
  actor: actorReducer,
  comment: commentReducer,
});
