const path = require('path');
const fs = require('fs');
var request = require('request');
/**
 * Render Config
 * @param req
 * @param res
 */
exports.config = (req, res) => {
  const domain = req.headers.host || req.headers.origin;
  const file = path.join(__dirname, '..', 'public', 'config-template.json');

  const configTemplate = fs.readFileSync(file, 'utf-8');
  const config = JSON.parse(configTemplate.replace(/\$DOMAIN/g, domain));
  res.json(config);
};

/**
 * Render UI
 * @param req
 * @param res
 */

exports.ui = (req, res) => {
 console.log("hiiiiiii")
var options = {
  'method': 'GET',
  'url': 'https://stripo.email/emailgeneration/v1/emails',
  'headers': {
    'Stripo-Api-Auth': 'eyJhbGciOiJIUzI1NiJ9.eyJzZWN1cml0eUNvbnRleHQiOiJ7XCJhcGlLZXlcIjpcImZhNWM0N2M0LWNlOTktNDcwYi05ODU1LTgyMjhlOWUyNDY1YVwiLFwicHJvamVjdElkXCI6NTEwNzEwfSJ9.buqOPeNIT1Qcv4xF3Yya6cQyDJOwcDJUepjqsSvdn4g'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log("in the op")
  console.log(response.body);
  console.log(response.body.data);
});
console.log("byeee")
  res.render('index', {
    title: 'Custom Activity',
    dropdownOptions: [
      {
        name: 'Journey Entry',
        value: 'journeyEntry',
      },
      {
        name: 'Journey Exit',
        value: 'journeyExit',
      },
    ],
  });
};
