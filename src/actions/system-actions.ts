import { createAction } from 'typesafe-actions'
import { Message, ErrorReply } from '../.types/types';

export const somethingIsLoading = createAction("@system/something/loading")();
export const somethingIsSuccessfullyLoaded = createAction("@system/something/loaded")<Message>();
export const somethingIsThrowException = createAction("@system/something/failure")<ErrorReply>();
