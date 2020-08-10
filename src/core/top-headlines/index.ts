import { defaultModel, loading, resolvePayloadModel } from "../common/model";
import { ActionTypes, Actions } from "./actions";

const initialState = defaultModel([]);

export const topHeadlinesReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.GetTopHeadlines:
      return loading([]);
    case ActionTypes.SetTopHeadlines:
      return resolvePayloadModel(action);
    default:
      return state;
  }
};

export * from "./actions";
export * from "./model";
export * from "./api";
export * from "./epic";
