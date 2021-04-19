const assert = require("assert");
const webdriver = require("selenium-webdriver"),
  By = webdriver.By,
  until = webdriver.until;

(async function ReportTest() {
  const driver = await new webdriver.Builder().forBrowser("firefox").build();

  // test 1: button click test
  await driver.get("http://localhost:3000/reports");
  
  // Get elements with class="MuiButtonBase-root MuiButton-root MuiButton-text sc-fotPbf fFSBUl"
  let elements = driver.findElements(By.className("MuiButtonBase-root MuiButton-root MuiButton-text sc-fotPbf fFSBUl"));

  // click all the radio button one by one
  
  for(let e of elements) {
     await e.click();
     await driver.sleep(300);
  }

  await driver.sleep(3000);
  //click the COMPLETE button
  await driver.findElement(By.className("MuiButtonBase-root MuiButton-root MuiButton-text")).click();
  driver.quit();
})();