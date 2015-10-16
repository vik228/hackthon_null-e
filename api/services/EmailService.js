var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill(sails.config.API_KEY.MANDRILL);

var async = true;

module.exports.sendEmail = function(options, callback) {

    var message = {
            "subject": "Please verify your email address",
            "from_email": "nule@housing.com",
            "from_name": "Nulle",
            "to":[
                {"email": options.email, "name": options.name}
            ],
            "text": "Hi, "+options.name+",\nThis is a test email."
    };

    mandrill_client.messages.send({"message": message, "async": async}, function(result) {
        console.log(result);
        callback({
            status: 200,
            email: result.email,
            message: "Email Sent Successfully"
        });
        /*
        [{
                "email": "recipient.email@example.com",
                "status": "sent",
                "reject_reason": "hard-bounce",
                "_id": "abc123abc123abc123abc123abc123"
            }]
        */
    }, function(e) {
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        callback({
            status: 400,
            message: e.message
        });
    });
};