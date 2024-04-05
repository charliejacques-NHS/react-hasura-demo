import fs from 'fs';

const BASE_PATH = './src/assets/translations';

// Read CSV file
const csvFilePath = `${BASE_PATH}/translations.csv`; // Change this to your CSV file path
fs.readFile(csvFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading CSV file:', err);
    return;
  }

  // Split CSV data into lines
  const lines = data.trim().split('\n');

  // Extract header and locales
  const header = lines.shift().split(',');
  const locales = header.slice(1);

  // Process each line and generate JSON files
  const translations = {};
  lines.forEach(line => {
    const parts = line.split(',');
    const translationKey = parts[0];

    locales.forEach((locale, index) => {
      const translation = parts[index + 1];
      if (!translations[locale]) {
        translations[locale] = {};
      }
      translations[locale][translationKey] = translation;
    });
  });

  // Write JSON files for each locale
  locales.forEach(locale => {
    const jsonData = translations[locale];
    const filename = `${BASE_PATH}/${locale}.json`;
    fs.writeFileSync(filename, JSON.stringify(jsonData, null, 2));
    console.log(`Generated ${filename}`);
  });
});
