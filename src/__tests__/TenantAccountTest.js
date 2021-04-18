const assert = require("assert");
const webdriver = require("selenium-webdriver"),
  By = webdriver.By,
  until = webdriver.until;

(async function TenantAccountTest() {
  const driver = await new webdriver.Builder().forBrowser("firefox").build();

  // test 1: login test
  await driver.get("http://localhost:3000");
  await driver
    .findElement(By.id("email"))
    .sendKeys("patrick@squidwardcommunitycollege.edu");
  await driver.findElement(By.id("password")).sendKeys("patrick");
  await driver.findElement(By.name("btnK")).click();

  await driver.sleep(3000);
  driver.quit();
})();
