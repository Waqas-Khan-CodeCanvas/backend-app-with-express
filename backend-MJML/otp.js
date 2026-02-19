const otpPage = () => {
  return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <h3 id="otp"></h3>
                <button id="btn">Get OTP</button>

               <script>
                    const otpElement = document.getElementById("otp");
                    const otpBtn = document.getElementById("btn");

                    const generateOTP = () => {
                        const array = new Uint32Array(1);
                        window.crypto.getRandomValues(array);
                        return 100000 + (array[0] % 900000);
                    }

                    otpBtn.addEventListener("click", () => {
                        const otp = generateOTP();
                        otpElement.textContent = otp;
                    });
                </script>

            </body>
            </html>`;
};

export default otpPage;
