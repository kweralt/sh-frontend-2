const loadtest = require('loadtest');

const img1 = require("/testImages/image1.jpg");
const img2 = require("/testImages/image2.jpg");



Test for uploading of images
const images = [img1, img2];
for (let concUser = 5; concUser <= 50; concUser++){
  const options = {
    url: 'http://localhost:8000/actions/submit',
    maxRequests: 1000,
    maxSeconds: 20,
    requestsPerSecond: 30,
    concurrency: concUser,
    method: "POST",
    body: images
  }

  loadtest.loadTest(options, function (error, result) {
    if (error) {
      return console.error('Got an error: %s', error);
    }
    console.log('Load test ran with %s concurrent users and %s request/s', concUser, result.rps);
    console.log('Mean Latency in ms: ', result.meanLatencyMs);
  });
};


//Test for DDos logging in with invalid credentials
const credentials = {
  email: "thisis^&*()`~notavaliduser@mail.com",
  password: "invaliduser",
};
for (let concUser = 10; concUser <= 50; concUser++) {
  const options = {
    url: 'http://localhost:8000/auth',
    maxRequests: 1000,
    maxSeconds: 20,
    requestsPerSecond: 30,
    concurrency: concUser,
    method: "POST",
    body: JSON.stringify(credentials)
  }

  loadtest.loadTest(options, function (error, result) {
    if (error) {
      return console.error('Got an error: %s', error);
    }
    console.log('Load test ran with %s concurrent users and %s request/s', concUser, result.rps);
    console.log('Total Request: ', result.totalRequests);
    console.log('Mean Latency in ms: ', result.meanLatencyMs);

  });
};


