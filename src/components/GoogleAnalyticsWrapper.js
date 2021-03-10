import ReactGA from 'react-ga';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import config from '../config';

// Based on the open target implementation
// https://github.com/opentargets/platform-app/blob/main/src/components/GoogleAnalyticsWrapper.js
function GoogleAnalyticsWrapper({
  gaId = config.analytics_id,
  children,
  debug = false,
  testMode = false
}) {
  const history = useHistory();

  useEffect(() => {
    ReactGA.initialize(gaId, { debug: debug, testMode: testMode });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => {
      const unlisten = history.listen(location => {
        ReactGA.set({ page: location.pathname });
        ReactGA.pageview(location.pathname);
      });

      return () => {
        unlisten();
      };
    },
    [history]
  );

  return children;
}

export default GoogleAnalyticsWrapper;