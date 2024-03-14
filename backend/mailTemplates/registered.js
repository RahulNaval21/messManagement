exports.registered = (email, name, mealType) => {
    return `<!DOCTYPE html>
      <html>
      
      <head>
          <meta charset="UTF-8">
          <title>Password Update Confirmation</title>
          <style>
              body {
                  background-color: #ffffff;
                  font-family: Arial, sans-serif;
                  font-size: 16px;
                  line-height: 1.4;
                  color: #333333;
                  margin: 0;
                  padding: 0;
              }
      
      
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  text-align: center;
              }
      
            
      
              .message {
                  font-size: 18px;
                  font-weight: bold;
                  margin-bottom: 20px;
              }
      
              .body {
                  font-size: 16px;
                  margin-bottom: 20px;
              }
      
              .support {
                  font-size: 14px;
                  color: #999999;
                  margin-top: 20px;
              }
      
              .highlight {
                  font-weight: bold;
              }
          </style>
      
      </head>
      
      <body>
          <div class="container">
               <div class="message">Password Update Confirmation</div>
              <div class="body">
                  <p>Hey ${name},</p>
                  <p>You have booked your meal for ${mealType} successfully<span class="highlight">${email}</span>.
                  </p>
                  <p>If you did not request for registering meal, please contact us immediately to secure your account.</p>
              </div>
              <div class="support">If you have any questions or need further assistance, please feel free to reach out to us
                  at
                  <a href="mailto:info@AngryBits.com">info@AngryBits.com</a>. We are here to help!
              </div>
          </div>
      </body>
      
      </html>`;
  };
  