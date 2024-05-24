
    const http = require("http")
    const PaytmChecksum = require('paytmchecksum')
    
      
    export default function handler(req, res) {
      if(req.method=='POST'){
      
        // Sandbox Credentials
        let mid = ""; 
        let mkey = ""; 
        var paytmParams = {};

        paytmParams.body = {
          requestType: "Payment",
          mid: mid,
          websiteName: "WEBSTAGING",
          orderId: orderId,
          callbackUrl: "https://merchant.com/callback",
          txnAmount: {
            value: 100,
            currency: "INR",
          },
          userInfo: {
            custId: "1001",
          },
        };
      
        PaytmChecksum.generateSignature(
          JSON.stringify(paytmParams.body),
          mkey
        ).then(function (checksum) {
          console.log(checksum);
          paytmParams.head = {
            signature: checksum,
          };
      
          var post_data = JSON.stringify(paytmParams);
      
          var options = {
            /* for Staging */
            // hostname: "securegw-stage.paytm.in" /* for Production */,
      
            hostname: "securegw.paytm.in",
      
            port: 443,
            path: `/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Content-Length": post_data.length,
            },
          };
      
          var response = "";
          var post_req = https.request(options, function (post_res) {
            post_res.on("data", function (chunk) {
              response += chunk;
            });
            post_res.on("end", function () {
              console.log("Response: ", response);
              // res.json({data: JSON.parse(response), orderId: orderId, mid: mid, amount: amount});
              setPaymentData({
                ...paymentData,
                token: JSON.parse(response).body.txnToken,
                order: orderId,
                mid: mid,
                amount: 100,
              });
            });
          });
      
          post_req.write(post_data);
          post_req.end();
        });
    }

  return (
    <div>pretransaction</div>
  )
  }
