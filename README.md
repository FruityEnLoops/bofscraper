# bofscraper

A script written in node using node-fetch and cheerio to gather information of BOF events entries.
This **only** works with events following [this style of page formatting](https://manbow.nothing.sh/event/event.cgi?action=List_def&event=133).
This is **not** meant to be a modular script that works with everything. There are a lot of hardcoded CSS selectors in there.

### Usage

```bash
# Install dependencies
npm i
# Run the script
node index.js <event number>
```

### Features

- Getting all BMS urls for an event
- Getting information from a BMS url

Goals :
- Automatically creating folder structures based on team, artist and song title data
- Automatically downloading files / allowing the user to choose when multiple links are available
- GUI?