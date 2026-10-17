const test = require('node:test');
const assert = require('node:assert');
const { load } = require('./helpers');

test('every blog post has Bangla author, date, read time and tags', () => {
  const evaluate = load(['data.js', 'blog.js']);
  const bad = evaluate(`DEFAULT_BLOG_POSTS.flatMap(p => [p.author, p.date, p.readTime, ...p.tags]
    .filter(f => !(f && f.en && f.bn && /[\\u0980-\\u09FF]/.test(f.bn))).map(() => p.id))`);
  assert.strictEqual(bad.join(), '');
});
