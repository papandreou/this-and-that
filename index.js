const buckets = require('./build/buckets.json');
const data = {};

const bucketNameByLocaleId = {};
for (const bucketName of Object.keys(buckets)) {
  for (const localeId of buckets[bucketName]) {
    bucketNameByLocaleId[localeId] = bucketName;
  }
}

function findBucket(localeId) {
  const bucketName = bucketNameByLocaleId[localeId];
  if (bucketName) {
    return (data[bucketName] =
      data[bucketName] || require(`./build/${bucketName}.json`));
  }
}

/*
 * Replace - with _ and convert to lower case: en-GB => en_gb
 */
function normalizeLocaleId(localeId) {
  return localeId && localeId.replace(/-/g, '_').toLowerCase();
}

function findDataForLocale(localeId = 'en_us') {
  let bucket = findBucket(localeId);
  if (bucket) {
    return bucket[localeId];
  } else {
    const normalizedLocaleId = normalizeLocaleId(localeId);
    bucket = findBucket(normalizedLocaleId);
    if (bucket) {
      return bucket[normalizedLocaleId];
    } else {
      let strippedLocaleId = normalizedLocaleId;
      do {
        strippedLocaleId = strippedLocaleId.replace(/_[^_]*$/, '');
        bucket = findBucket(strippedLocaleId);
        if (bucket) {
          return bucket[strippedLocaleId];
        }
      } while (/_/.test(strippedLocaleId));
      return findBucket('root').root;
    }
  }
}

function renderPattern(pattern, placeholderValues) {
  return pattern.replace(
    /\{(\d+)\}|([^{]+)/g,
    ($0, placeHolderNumber, text) =>
      text || placeholderValues[placeHolderNumber]
  );
}

/**
 * Render a list of items as dictated by the locale. The formats
 * are extracted from CLDR (<a
 * href='http://cldr.unicode.org/development/development-process/design-proposals/list-formatting'>see
 * some examples</a>).
 *
 * Example invocation:
 * <pre><code>
 *   thisAndThat(["foo", "bar", "quux"]); // "foo, bar, and quux" (en-US).
 * </code></pre>
 * @param {String[]} list The list items.
 * @param {String[]} list The list type, either 'default', 'unit', 'unitShort', or 'unitNarrow'. Defaults to 'default'.
 * @return {String} The rendered list.
 */
function thisAndThat(list, localeId = 'en_us', type = 'default') {
  type = type || 'default';
  const patterns = findDataForLocale(localeId)[type];
  switch (list.length) {
    case 0:
      return '';
    case 1:
      return list[0];
    case 2:
      if ('2' in patterns) {
        return renderPattern(patterns['2'], list);
      }
    /* falls through */
    default: {
      let str = renderPattern(patterns.end || '{0}, {1}', list.slice(-2));
      for (let i = list.length - 3; i >= 0; i -= 1) {
        str = renderPattern(
          (!i && patterns.start) || patterns.middle || '{0}, {1}',
          [list[i], str]
        );
      }
      return str;
    }
  }
}

module.exports = thisAndThat;
