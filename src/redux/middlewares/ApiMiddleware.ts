import { MiddlewareAPI, Dispatch, AnyAction } from '@reduxjs/toolkit';
import ToastConatiner from '@components/common/Toast/ToastConatiner';

export const apiErrorMiddleware =
  (storeAPI: MiddlewareAPI) =>
  (next: Dispatch<AnyAction>) =>
  (action: AnyAction) => {
    if (action.type.endsWith('rejected')) {
      if (action.payload && action.payload?.data) {
        ToastConatiner.showError(`${action.payload.data}`);
      }
    }
    return next(action);
  };
