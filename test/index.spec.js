const expect = require('unexpected');

const thisAndThat = require('../');

describe('this-and-that', function() {
  it('should default to English and the "default" list pattern', function() {
    expect(
      thisAndThat(['foo', 'bar', 'quux']),
      'to equal',
      'foo, bar, and quux'
    );
  });

  it('should render a list in Danish', function() {
    expect(
      thisAndThat(['foo', 'bar', 'quux'], 'da'),
      'to equal',
      'foo, bar og quux'
    );
  });

  it('should render a list in Danish', function() {
    expect(
      thisAndThat(['foo', 'bar', 'quux'], 'da'),
      'to equal',
      'foo, bar og quux'
    );
  });

  it('should render a list in Danish', function() {
    expect(
      thisAndThat(['foo', 'bar', 'quux'], undefined, 'or'),
      'to equal',
      'foo, bar, or quux'
    );
  });

  it('should support dashes in locale ids', function() {
    expect(
      thisAndThat(['foo', 'bar', 'quux'], 'en-US'),
      'to equal',
      'foo, bar, and quux'
    );
  });

  it('should strip off locale id suffixes until there is a match', function() {
    expect(
      thisAndThat(['foo', 'bar', 'quux'], 'en-US-FOO-BAR'),
      'to equal',
      'foo, bar, and quux'
    );
  });

  it('should fall back to root if no match is found', function() {
    expect(
      thisAndThat(['foo', 'bar', 'quux'], 'foobarquux'),
      'to equal',
      'foo, bar, quux'
    );
  });

  it('should support an "uncommon" locale id', function() {
    expect(
      thisAndThat(['foo', 'bar', 'quux'], 'cy'),
      'to equal',
      'foo, bar, a(c) quux'
    );
  });
});
