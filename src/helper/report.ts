const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: 'test-results',
  reportPath: './',
  reportName: 'Playwright Automation Report',
  pageTitle: 'App test report',
  displayDuration: false,
  metadata: {
    browser: {
      name: 'chrome',
      version: '120',
    },
    device: 'Theu - PC',
    platform: {
      name: 'Windows',
      version: '11',
    },
  },
  customData: {
    title: 'Test Info',
    data: [
      { label: 'Project', value: 'App' },
      { label: 'Release', value: '1.2.3' },
      { label: 'Cycle', value: 'Smoke-1' },
    ],
  },
});