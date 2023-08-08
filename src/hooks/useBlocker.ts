import * as React from "react";
import { History, Blocker, Transition } from "history";
import history from "../../utils/hisotry";

export function useBlocker(blocker: Blocker, when: boolean): void {
  React.useEffect(() => {
    if (!when) return;

    const unblock = history.block((tx: Transition) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };

      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [navigator, blocker, when]);
}
