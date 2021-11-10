const fetch = require("node-fetch");
const cheerio = require("cheerio");
const fs = require('fs')

const baseurl = "https://manbow.nothing.sh/event/";

let data = [];
const output = [];

(async () => {
    const cliargs = process.argv.slice(2);
    
    await fetch(baseurl + "event.cgi?action=List_def&event=" + cliargs[0])
        .then((response) => response.textConverted())
        .then((body) => {
            const $ = cheerio.load(body);
            $(".pricing-title > div > h4 > strong > a").each(function (index, element) {
                data.push(baseurl + $(element).attr("href"));
            });

        });

    console.log("fetching bms urls done; total " + data.length + " bms were found for this event.")
    
    let count = 0;
    for (let element of data) {
        count++;
        console.log("starting dl for " + element + " (" + count + "/" + data.length + ")");
        await fetch(element)
            .then((response) => response.textConverted())
            .then((body) => {
                const $ = cheerio.load(body);

                // get all links from description
                dlUrls = [];
                $("blockquote > p > a").each(function(index, element) {
                    dlUrls.push($(element).attr("href"));
                })

                // format everything into a nice object
                output.push({
                    url: element,
                    title: $(".nobottommargin > h2").text(),
                    artist: $(".nobottommargin > h3").text(),
                    team: $(".table > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)").text(),
                    genre: $(".nobottommargin > h4").text(),
                    detail: $("blockquote > p").text(),
                    downloadUrls: dlUrls
                });
            })
            .catch(err => console.error(err));
    }

    fs.writeFileSync('output.json', JSON.stringify(output));
})();