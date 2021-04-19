//const assert = require("assert");
const webdriver = require("selenium-webdriver"),
  By = webdriver.By,
  until = webdriver.until;

(async function DirectoryTest() {
  const driver = await new webdriver.Builder().forBrowser("firefox").build();

  // test 1: filter test
  await driver.get("http://localhost:3000/directory");
  await driver
    .findElement(By.id("filtertext"))
    //any oulet name given in textbox
    .sendKeys("Outlet_1");
    await driver
    .findElement(By.id("filtertext"))
    //clear the textbox
    .clear();
    //see any filtered result shown
    await driver.sleep(7000);


  // test 2: add outlet

  //await driver.findElement(By.id("password")).sendKeys("patrick");
  await driver.findElement(By.name("btnadd")).click();
  //click the drop down box
  await driver.findElement(By.name("institutionid")).click();
  //move the cursor to the first entry of the list of institution
  await driver.actions().keyDown(Key.DOWN).perform();
  //select the first one
  await driver.actions().keyDown(Key.ENTER).perform();              
  //if the selection of the drop down list (institutionid list) can not been done in the way above, 
  //we can set a default value for the dropdown list and delete the last 3 steps
  await driver.findElement(By.name("outletname")).sendKeys("Outlet_2");
  await driver.findElement(By.name("unitnumber")).sendKeys("133");
  await driver.findElement(By.name("email")).sendKeys("xs1250021699@gmail.com");
  //here i assume that there are default value for the calender, as shown as it is now
  await driver.findElement(By.name("submit")).click();

  await driver.sleep(3000);
  driver.quit();
})();