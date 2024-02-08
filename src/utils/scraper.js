const puppeteer = require("puppeteer");
const fs = require("fs");
const { default: mongoose } = require("mongoose");
const Character = require("../api/models/character");
const { insertCharacters } = require("../api/controllers/character");

const arrayImg = [];

const scraper = async (url) => {

  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ['--start-maximized'],
    });

    const page = await browser.newPage();
    await page.goto(url)

    const linkSelector = '[data-title="Characters"] > a';
    await page.waitForSelector(linkSelector, { timeout: 10000 });
    await page.$eval(linkSelector, (el) => el.click());

    const btnShowMore = ".show_more.button.large.section-color.underline"
    let visible = true
    while (visible) {
      try {
        await page.waitForTimeout(1000)
        await page.click(btnShowMore)
      } catch (error) {
        visible = false
      }
    }

    const arrayDivSelector = "ul.active > li.building-block-config.databank-content.sixth.image-top.ratio-1x1.short.mob-width-half.mob-image-top";
    await page.waitForSelector(arrayDivSelector, { timeout: 10000 });
    const arrayDivs = await page.$$(arrayDivSelector)

    for (const div of arrayDivs) {
      const character = {
        image: "",
        title: "",
        description: "",
      }

      let img = await div.$eval(".thumb.reserved-ratio", (e) => e.src);
      character.image = img;
      let title = await div.$eval(".long-title", (e) => e.textContent)
      character.title = title;
      let description = await div.$eval(".desc", (e) => e.textContent)
      character.description = description;
      arrayImg.push(character)
    }
    console.log(arrayImg)

    await mongoose.connect(process.env.URL_DB)

    await Character.insertMany(arrayImg);
    console.log("Datos insertados en la BBDD");

    fs.writeFile("character.json", JSON.stringify(arrayImg), () => {
      console.log("Archivo escrito")
    })

    await mongoose.disconnect();

    await browser.close();

  } catch (error) {
    console.log(error);
  }
}


module.exports = { scraper };