import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: 'tests',
    use: {
        browserName: 'chromium',
        headless: true,
    },
    reporter: [['html', { outputFile: 'test-results/report.html' }]],
});