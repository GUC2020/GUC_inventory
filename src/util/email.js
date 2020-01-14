const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'GroundUpCafe2020@gmail.com',
    pass: 'GUC2020!'
  }
});



const sentEmail = (item) => 
    {
        const mailOptions = {
            from: 'GUC Inventory',
            to: 'hallchri@iu.edu',
            subject: 'Inventory Alert',
            text: item + ' is below the mininum amount'
          };    
        
    transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }

})};
// sentEmail()
exports.sentEmail = sentEmail