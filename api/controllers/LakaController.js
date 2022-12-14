'use strict'
const axios = require('axios');

function post(url, data, headers) {
    return axios
        .post(url, data, {
            headers: headers
        })
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.log(err);
        });
}

async function sent_message(data_body, is_sent_back = false) {

    if (!data_body) {
        return false;
    }

    let url_sent = 'https://laka.lampart-vn.com:9443/api/v2/message/sent';
    let data_post = {
        message_id: null,
        message: data_body.message,
        status:0,
        room_id: data_body.room_id,
        timestamp: Date.now(),
        reaction:[],
        user_info: {
            id:69,
            name:'Phan Tien Anh [PG]',
            nick_name:null,
            cover_img:null,
            company:'LAMPART Co., Ltd.',
            phone:'',
            address:'',
            email:'tien_anh@lampart-vn.com',
            icon_img:'https://laka-pub.s3-ap-southeast-1.amazonaws.com/public_file/f62edf6e70d0a1df0e29490b3d3a4afd',
            email_verified_at:'2020-06-26 09:42:49',
            token_file:'108917155963777f04ea0749.09627736',
            permission:0,
            is_bot:0,
            user_type:0,
            disabled:0,
            deleted_at:null,
            company_id:1
        },
        key_replace:69_69_1,
        new_day: false
    };
    let headers = {
        "accept" : "application/json",
        "authorization" : "Bearer " + data_body.token,
        "accept-language" : "en-US,en;q=0.9,ja;q=0.8,vi;q=0.7",
        "content-type" : "application/json;charset=UTF-8",
        "sec-ch-ua" : "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
        "sec-ch-ua-mobile" : "?0",
        "sec-ch-ua-platform" : "\"Windows\"",
        "sec-fetch-dest" : "empty",
        "sec-fetch-mode" : "cors",
        "sec-fetch-site" : "same-site",
        "Referer" : "https://laka.lampart-vn.com/",
        "Referrer-Policy" : "strict-origin-when-cross-origin"
    };
    post(url_sent, data_post , headers).then((response) => {

        if (response.error_code === 0) {
            console.log(response.data);
        } else {
            if (!is_sent_back) {
                // Login and ReSent
                laka_login_and_sent_back(data_body);
            }
        }
    });
}

async function laka_login_and_sent_back(data_body) {

    let url_login = 'https://laka.lampart-vn.com:9443/api/v1/user/login';
    let data_post = {
        email: data_body.email,
        password: data_body.password,
    };
    let headers = {
        "accept" : "application/json",
        "accept-language" : "en-US,en;q=0.9,ja;q=0.8,vi;q=0.7",
        "content-type" : "application/json;charset=UTF-8",
        "sec-ch-ua" : "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
        "sec-ch-ua-mobile" : "?0",
        "sec-ch-ua-platform" : "\"Windows\"",
        "sec-fetch-dest" : "empty",
        "sec-fetch-mode" : "cors",
        "sec-fetch-site" : "same-site",
        "Referer" : "https://laka.lampart-vn.com/",
        "Referrer-Policy" : "strict-origin-when-cross-origin"
    };
    post(url_login, data_post , headers).then((response) => {
        if (response.error_code === 0) {
            data_body.token = response.data.token
            sent_message(data_body, true);
        }
    });
}

module.exports = {
    get: (req, res) => {
        res.json({message: 'Success!'})
    },
    store: (req, res) => {
        const {token, message, room_id, email, password} = req.body
        if (!token || !message || !room_id || !email || !password) {
            return false;
        }
        let data = {
            token: token,
            message: message,
            room_id: room_id,
            email: email,
            password: password,
        };
        
        sent_message(data);

        res.json({message: 'Success!'})
    },
}