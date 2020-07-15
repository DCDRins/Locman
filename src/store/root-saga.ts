
import { all, fork } from 'redux-saga/effects'
import sagas from '../sagas'

export default function* rootSaga() {
  yield all([
    fork(sagas.clientSaga),
    fork(sagas.knowledgeSaga),
    fork(sagas.eventSaga),
    fork(sagas.organizationSaga),
    fork(sagas.catalogSaga),
    fork(sagas.newsSaga),
    fork(sagas.routeSaga),
  ])
}