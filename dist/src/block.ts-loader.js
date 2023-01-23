(function () {
  'use strict';

  (async () => {
    if ("")
      await import(
        /* @vite-ignore */
        chrome.runtime.getURL("")
      );
    await import(
      /* @vite-ignore */
      chrome.runtime.getURL("vendor/vite-client.js")
    );
    await import(
      /* @vite-ignore */
      chrome.runtime.getURL("src/block.ts.js")
    );
  })().catch(console.error);

})();
