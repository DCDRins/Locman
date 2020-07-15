import { createAction } from 'typesafe-actions'
import { Message, ErrorReply } from '../.types/types';
import { IContext } from '../models/system';

export const somethingIsLoading = createAction("@system/something/loading")();
export const somethingIsSuccessfullyLoaded = createAction("@system/something/loaded")<Message>();
export const somethingIsThrowException = createAction("@system/something/failure")<ErrorReply>();

// export const openDatePicker = createAction("@context/open")<IContext>();
// export const closeDatePicker = createAction("@context/close")();

export const openContext = createAction("@context/open")<IContext>();
export const closeContext = createAction("@context/close")();
