const { Chromeless } = require('chromeless')
const sites = [
    {site : 'google', url : 'https://wwww.google.com'},
    {site : 'gmail', url : 'https://wwww.gmail.com'}
]


    sites.map((site) => {
        run(site.url).catch(console.error.bind(console))
    })


async function run(url) {
  const chromeless = new Chromeless({
    'launchChrome' : true
  })

  const screenshot = await chromeless
    // .goto('https://flextronics365.sharepoint.com/sites/br_project/smart_replenishment/SitePages/Home.aspx')
    .goto(url)
    // .type('chromeless', 'input[name="q"]')
    // .press(13)
    // .wait('#resultStats')
    .screenshot()

  console.log(screenshot) // prints local file path or S3 url

  await chromeless.end()
}

// run().catch(console.error.bind(console))