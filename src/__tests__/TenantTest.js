const assert = require("assert");
const webdriver = require("selenium-webdriver"),
  By = webdriver.By,
  until = webdriver.until;

(async function TenantAccountTest() {
  const driver = await new webdriver.Builder().forBrowser("firefox").build();

  // test 1: search tenant test
  await driver.get("http://localhost:3000/tenants");
  await driver
    .findElement(By.id("searchtenants"))
    .sendKeys("Tenant_03");
 //see any result shown below after typing in "Tenant_03"
  await driver.sleep(7000);

  //test 2: add tenants
  
  await driver.findElement(By.id("addtenants")).click(); 
  await driver.findElement(By.name("UserName")).sendKeys("Tenant_04");
  await driver.findElement(By.name("Email")).sendKeys("xs1250021699@gmail.com");
  await driver.findElement(By.name("Password")).sendKeys("1234567890");
  await driver.findElement(By.id("submitform")).click();
  await driver.sleep(3000);
  driver.quit();
})();
