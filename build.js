const cldr = require('cldr');
const promisify = require('util').promisify;
const writeFileAsync = promisify(require('fs').writeFile);
const pathModule = require('path');
const commonLocaleIds = new Set(require('./commonLocaleIds.json'));

(async () => {
  const data = {
    common: {},
    rare: {}
  };
  for (const localeId of cldr.localeIds) {
    data[commonLocaleIds.has(localeId) ? 'common' : 'rare'][
      localeId
    ] = cldr.extractListPatterns(localeId);
  }
  const buckets = {};
  for (const bucketName of Object.keys(data)) {
    await writeFileAsync(
      pathModule.resolve(__dirname, `${bucketName}.json`),
      JSON.stringify(data[bucketName], undefined, '  ') + '\n'
    );
    buckets[bucketName] = Object.keys(data[bucketName]);
  }

  await writeFileAsync(
    pathModule.resolve(__dirname, `buckets.json`),
    JSON.stringify(buckets, undefined, '  ') + '\n'
  );
})();
