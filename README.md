# Google Local Services Scraper

This repository contains a Node.js script that uses Puppeteer to scrape local services (like laundry services) from Google Local Services. The script extracts data such as the name, phone number, address, services, rating, and reviews, and saves it into a CSV file.

## Features

- Scrapes data from Google Local Services.
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

1. Clone the repository:
   ```bash
   git clone https://github.com/siddhantkhariwal/google-search-scraper.git
   cd google-search-scraper