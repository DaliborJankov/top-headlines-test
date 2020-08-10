import { AnyAction } from "redux";
import { AjaxError } from "rxjs/ajax";

import { ServerErrorResponse, isAjaxErrorOnly } from "./errors";

export enum OperationState {
  Default = "default",
  Pending = "pending",
  Success = "success",
  Error = "error",
}

export enum ModelState {
  Loading = "loading",
  Loaded = "loaded",
  Error = "error",
  Default = "default",
}

export interface Loadable {
  readonly state: any;
  readonly value?: any;
}

export interface DefaultModel<T> extends Loadable {
  readonly state: ModelState.Default;
  value?: T;
}

export interface LoadingModel<T> extends Loadable {
  readonly state: ModelState.Loading;
  readonly value?: T;
}

export interface LoadedModel<T> extends Loadable {
  readonly state: ModelState.Loaded;
  readonly value: T;
}

export interface ErrorModel<T> extends Loadable {
  readonly state: ModelState.Error;
  readonly value: AjaxError;
}

export type LoadableModel<T> =
  | LoadingModel<T>
  | LoadedModel<T>
  | ErrorModel<T>
  | DefaultModel<T>;

export function isLoading<T>(
  model: LoadableModel<T> | DefaultModel<T>
): model is LoadingModel<T> {
  return model.state === ModelState.Loading;
}

export function isDefaultModel<T>(
  model: LoadableModel<T> | DefaultModel<T>
): model is DefaultModel<T> {
  return model.state === ModelState.Default;
}

export function isLoaded<T>(
  model: LoadableModel<T> | DefaultModel<T>
): model is LoadedModel<T> {
  return model.state === ModelState.Loaded;
}

export function isFailed<T>(
  model: LoadableModel<T> | DefaultModel<T>
): model is ErrorModel<T> {
  return model.state === ModelState.Error;
}

export function loading<T>(value?: T): LoadingModel<T> {
  return { state: ModelState.Loading, value };
}

export function defaultModel<T>(value?: T): DefaultModel<T> {
  return { state: ModelState.Default, value };
}

export function loaded<T extends R, R = T>(value: T): LoadedModel<R> {
  return { state: ModelState.Loaded, value };
}

export function failed<T extends R, R = T>(
  value: ServerErrorResponse
): ErrorModel<R> {
  return { state: ModelState.Error, value };
}

export function resolvePayloadModel(action: AnyAction) {
  return isAjaxErrorOnly(action.payload)
    ? failed(action.payload)
    : loaded(action.payload);
}
