require('chai').should();
const showdown = require('showdown');
require('../lib/<%= name %>.js');

const fs = require('fs');

const converter = new showdown.Converter({ extensions: ['<%= pluginName %>'] });

function filter() {
  return function filterFile(file) {
    const ext = file.slice(-3);
    return (ext === '.md');
  };
}

function map(dir) {
  return function mapFile(file) {
    const name = file.replace('.md', '');


    const htmlPath = `${dir + name}.html`;


    const html = fs.readFileSync(htmlPath, 'utf8');


    const mdPath = `${dir + name}.md`;


    const md = fs.readFileSync(mdPath, 'utf8');

    return {
      name,
      input: md,
      expected: html,
    };
  };
}

// Normalize input/output
function normalize(testCase) {
  // Normalize line returns
  testCase.expected = testCase.expected.replace(/\r/g, '');
  testCase.actual = testCase.actual.replace(/\r/g, '');

  // Ignore all leading/trailing whitespace
  testCase.expected = testCase.expected.split('\n').map((x) => {
    return x.trim();
  }).join('\n');
  testCase.actual = testCase.actual.split('\n').map((x) => {
    return x.trim();
  }).join('\n');

  // Remove extra lines
  testCase.expected = testCase.expected.trim();

  // Convert whitespace to a visible character so that it shows up on error reports
  testCase.expected = testCase.expected.replace(/ /g, '·');
  testCase.expected = testCase.expected.replace(/\n/g, '•\n');
  testCase.actual = testCase.actual.replace(/ /g, '·');
  testCase.actual = testCase.actual.replace(/\n/g, '•\n');

  return testCase;
}

function assertion(testCase) {
  return function assertionCase() {
    testCase.actual = converter.makeHtml(testCase.input);
    testCase = normalize(testCase);

    // Compare
    testCase.actual.should.equal(testCase.expected);
  };
}

const cases = fs.readdirSync('test/cases/')
  .filter(filter())
  .map(map('test/cases/'));

describe('<%= pluginName %> simple testcases', () => {
  cases.forEach((testCase) => {
    it(`Test Case: ${testCase.name}`, assertion(testCase));
  });
});
