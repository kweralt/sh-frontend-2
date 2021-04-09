const assert = require("assert");
const { Builder, Key, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

(async function TenantAccountTest() {
  chrome.setDefaultService(
    new chrome.ServiceBuilder("../chromedriver.exe").build()
  );
  let driver = await new Builder().forBrowser("chrome").build();

  driver.manage().window().maximize();

  // test 1: assert if(!token){return <Login />}
  console.log("TESTING: Enter homepage without login, redirected to login");
  await driver.get("http://localhost:3000");
  // try to go to tenants page without login token
  await driver.get("http://localhost:3000/tenants");
  driver.sleep(9000);
  let currentURL = await driver.getCurrentUrl();
  assert.equal(currentURL, "http://localhost:3000");
  console.log("great success");

  await driver.sleep(3000);
  driver.quit();
})();
