const assert = require("assert");
const webdriver = require("selenium-webdriver"),
  By = webdriver.By,
  until = webdriver.until;

(async function StaffAccountTest() {
  const driver = await new webdriver.Builder().forBrowser("firefox").build();

  // test 1: login test
  await driver.get("http://localhost:3000");
  await driver.sleep(3000);
  await driver
    .findElement(By.id("email"))
    .sendKeys("patrick@squidwardcommunitycollege.edu");
  await driver.findElement(By.id("password")).sendKeys("patrick");
  await driver.sleep(3000);
  await driver.findElement(By.name("btnK")).click();
  await driver.sleep(3000);

  // tenant test 1: search tenant test
  await driver.get("http://localhost:3000/tenants");
  await driver.sleep(3000);
  await driver.findElement(By.id("searchtenants")).sendKeys("Elon");
  await driver.sleep(5000);

  // tenant test 2: add tenants
  await driver.findElement(By.id("addtenants")).click();
  await driver.sleep(3000);

  // fields
  await driver.findElement(By.name("UserName")).sendKeys("Xu Song");
  await driver.findElement(By.name("Email")).sendKeys("xs1250021699@gmail.com");
  await driver.findElement(By.name("Password")).sendKeys("1234567890");
  await driver.sleep(3000);

  // submit
  await driver.findElement(By.id("submitform")).click();
  await driver.sleep(3000);

  // directory test 1: search outlet test
  await driver.get("http://localhost:3000/directory");
  await driver.sleep(3000);
  await driver.findElement(By.id("filtertext")).sendKeys("Sub");
  await driver.sleep(5000);

  // directory test 2: add outlet
  await driver.findElement(By.name("btnadd")).click();
  await driver.sleep(3000);

  // institution
  await driver
    .findElement(
      By.xpath(
        "/html/body/div[3]/div[3]/div/div[2]/form/div/div[1]/div[1]/div/div"
      )
    )
    .click();
  await driver
    .findElement(By.xpath("/html/body/div[4]/div[3]/ul/li[3]"))
    .click();
  // fields
  await driver.findElement(By.name("outletname")).sendKeys("Outlet_2");
  await driver.findElement(By.name("unitnumber")).sendKeys("133");
  await driver.findElement(By.name("email")).sendKeys("xs1250021699@gmail.com");
  // outlet type
  await driver
    .findElement(
      By.xpath(
        "/html/body/div[3]/div[3]/div/div[2]/form/div/div[2]/div[1]/div/label[2]/span[1]/span[1]/input"
      )
    )
    .click();
  // open tenancy end datepicker
  await driver
    .findElement(
      By.xpath(
        "/html/body/div[3]/div[3]/div/div[2]/form/div/div[2]/div[3]/div/div/button"
      )
    )
    .click();

  // pick date
  await driver
    .findElement(
      By.xpath(
        "/html/body/div[4]/div[3]/div/div/div[2]/div/div[5]/div[5]/button"
      )
    )
    .click();

  // click out of datepicker?
  await driver.findElement(By.xpath("//html")).click();
  await driver.sleep(3000);

  // reset form
  await driver
    .findElement(
      By.xpath(
        "/html/body/div[3]/div[3]/div/div[2]/form/div/div[3]/div/button[2]"
      )
    )
    .click();
  await driver.sleep(3000);

  // click close popup button
  await driver
    .findElement(By.xpath("/html/body/div[3]/div[3]/div/div[1]/h2/div/button"))
    .click();
  await driver.sleep(3000);

  // report test 1: button click test
  await driver.get("http://localhost:3000/reports");
  await driver.sleep(3000);

  // click checklisttypes
  await driver
    .findElement(
      By.className(
        "MuiButtonBase-root MuiButton-root MuiButton-text sc-jrQzUz ibwTFU"
      )
    )
    .click();

  // click the complete button to choose checklist
  await driver
    .findElement(
      By.xpath(
        "/html/body/div[1]/div/div[2]/main/div/div/div[2]/div/div[2]/button"
      )
    )
    .click();
  await driver.sleep(3000);

  // enter tenantid
  await driver.findElement(By.name("tenantid")).sendKeys("21");
  await driver.sleep(3000);

  // get all questions
  let questions = await driver.findElements(
    By.className(
      "MuiButtonBase-root MuiIconButton-root PrivateSwitchBase-root-41 MuiRadio-root MuiRadio-colorSecondary MuiIconButton-colorSecondary"
    )
  );

  // questions MuiButtonBase-root MuiIconButton-root PrivateSwitchBase-root-41 MuiRadio-root MuiRadio-colorSecondary MuiIconButton-colorSecondary
  // checklisttype MuiButtonBase-root MuiIconButton-root PrivateSwitchBase-root-41 MuiRadio-root MuiRadio-colorSecondary PrivateSwitchBase-checked-42 Mui-checked MuiIconButton-colorSecondary
  // click through all radio buttons
  for (let q of questions) {
    await q.click();
    await driver.sleep(300);
  }

  driver.quit();
})();
