
# Google Search Scraper

This repository contains a Node.js script that uses Puppeteer to scrape services from Google Search. The script extracts data such as the name, phone number, address, services offered, rating, and reviews, and saves it into a CSV file.

It can be used to scrape various types of services. For example, you can scrape all restaurants in London with the following details:

- Service name
- Phone number
- Address
- Services offered
- Rating
- Number of reviews

## Features

- Scrapes data from Google Search.
- Extracts the following details:
  - Service name
  - Phone number
  - Address
  - Services offered
  - Rating
  - Number of reviews
- Saves the scraped data to a CSV file.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or above recommended)
- [Puppeteer](https://pptr.dev/) or [puppeteer-core](https://github.com/puppeteer/puppeteer#puppeteer-core) (browser installation required if using `puppeteer-core`)

## Installation

### Install the dependencies:

```bash
npm install
```

If you are using `puppeteer-core`, install the Chrome browser:

```bash
npx puppeteer browsers install chrome
```

## Usage

To run the script, you'll need to pass a URL to a Google Local Services search results page and specify the output CSV filename.

### Example:

```javascript
const url = 'https://www.google.com/localservices/prolist?...';
const filename = 'services.csv';
```

1. Open `index.js` and update the `url` and `filename` variables with the desired values.
2. Run the script:

```bash
npm start
```

## Output

The script will output a CSV file containing the following columns:

- `name`: The name of the service.
- `phoneNumber`: The phone number of the service.
- `address`: The address of the service.
- `services`: The services offered by the service.
- `rating`: The Google rating of the service.
- `reviews`: The number of reviews.

## Troubleshooting

If you encounter an error like:

```bash
Error: Could not find Chrome (ver. 125.0.6422.78)...
```

Make sure to install the Chrome browser for Puppeteer with:

```bash
npx puppeteer browsers install chrome
```

## Dependencies

- **Puppeteer** - A Node.js library to control headless Chrome.
- **json2csv** - Converts JSON data into CSV format.

## Contributing

If you'd like to contribute, feel free to fork the repository and submit a pull request!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.