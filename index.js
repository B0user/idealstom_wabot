const puppeteer = require("puppeteer");

// Login Function Logic
(async function main() {
  try {
    // Configures puppeteer
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );

    //Navigates to Whatsapp
    await page.goto("https://web.whatsapp.com/");

    await page.waitForSelector('._3j691', { timeout: 60000 }); // Set timeout to 60 seconds
    await delay(5000);

    //Change to contact you want to send messages to
    const contactName = "Ильдар";
    await page.click(`span[title='${contactName}']`);
    await page.waitForSelector("._1VZX7");

    //Finds the message bar and focuses on it
    const editor = await page.$("div[title='Введите сообщение']");
    await editor.focus();

    //Amount of messages you want to send
    const amountOfMessages = 500;

    //Loops through cycle of sending message
    for (var i = 0; i < amountOfMessages; i++) {
      await page.evaluate(() => {
        const message = "Салам братан :)";
        document.execCommand("insertText", false, message);
      });
      await page.click("span[data-icon='send']");
      await delay(500);
    }
  } catch (e) {
    console.error("error mine", e);
  }
})();

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}