const cldr = require('cldr');
const promisify = require('util').promisify;
const writeFileAsync = promisify(require('fs').writeFile);
const mkdirp = require('mkdirp');
const pathModule = require('path');
const commonLocaleIds = new Set(require('./commonLocaleIds.json'));

const outputDir = pathModule.resolve(__dirname, 'build');
(async () => {
  try {
    const data = {
      common: {},
      rare: {},
    };
    for (const localeId of cldr.localeIds) {
      data[commonLocaleIds.has(localeId) ? 'common' : 'rare'][
        localeId
      ] = cldr.extractListPatterns(localeId);
    }

    await mkdirp(outputDir);

    const buckets = {};
    for (const bucketName of Object.keys(data)) {
      await writeFileAsync(
        pathModule.resolve(outputDir, `${bucketName}.json`),
        `${JSON.stringify(data[bucketName], undefined, '  ')}\n`
      );
      buckets[bucketName] = Object.keys(data[bucketName]);
    }

    await writeFileAsync(
      pathModule.resolve(outputDir, `buckets.json`),
      `${JSON.stringify(buckets, undefined, '  ')}\n`
    );
  } catch (err) {
    console.log(err.stack);
    process.exit(1);
  }
})();
