const path = require('path');
const fs = require('fs');
var request = require('request');
var token, token1;
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
  var body2 = JSON.parse(response.body);
  token =  body2["data"];
  var json1=[];
  for(var key in token){
    var n=token[key].name
    console.log("name"+n);
    json1.push( {
      name: n,
      value: n,
    });
    
  }
  console.log("json1==="+json1);
  console.log("token==="+token);
  //var body3=JSON.parse(token.name);
  //token1=body3["name"];
  //console.log("token1==="+body3);
  //console.log(response.body.data);
});
console.log("byeee")
  res.render('index', {
    title: 'Custom Activity',
    dropdownOptions: json1,
    
  });
};
