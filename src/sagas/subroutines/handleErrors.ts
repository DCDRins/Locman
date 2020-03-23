import { forget } from "../../lib/localStorage";
import history from "../../services";
import { appRoutes } from "../../common/dictionaries/routes";

export default function* handleErrors(errorCode) {
  if (!errorCode) return;
  switch (errorCode) {
    case 401:
      yield forget('client')
      history.push(appRoutes.MAIN_PAGE.absolutePath)
  }
}