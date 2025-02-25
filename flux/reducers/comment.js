import {
  COMMENT_ERROR,
  COMMENT_REQUEST,
  COMMENT_SUCCESS,
} from "../actions/comment.js";

const initialState = {
  commentRequest: false,
  commentSuccess: false,
  commentError: false,
  error: null,
  data: null,
};

export const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENT_REQUEST:
      return { ...state, commentRequest: true };
    case COMMENT_SUCCESS:
      return {
        ...state,
        commentRequest: false,
        data: action.payload,
        commentSuccess: true,
        commentError: false,
        error: null,
      };
    case COMMENT_ERROR:
      return {
        ...state,
        commentRequest: false,
        commentSuccess: false,
        commentError: true,
      };
    default:
      return state;
  }
};
