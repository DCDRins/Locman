import { forget, recall } from "../../lib/localStorage";
import history from "../../services";
import { appRoutes } from "../../common/dictionaries/routes";

export default function* handleErrors(errorCode) {
  if (!errorCode) return;
  switch (errorCode) {
    case 401:
      const client = yield recall('client')
      if (client) {
        yield forget('client')
        window.location.reload()
      }
  }
}