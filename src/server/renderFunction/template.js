// html skeleton provider

export default function template(title, content = "") {
   let scripts = `
                  <script src="/bundle.js" defer></script>
                  `
   let page = `<!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="utf-8">
                  <meta name=viewport content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
                  <title> ${title} </title>
                  <link rel="stylesheet" href="/css/main.css">
                  <link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
  crossorigin="anonymous"
/>
                </head>
                <body>
                  <div class="content">
                     <div id="app" class="wrap-inner">
                        <!--- magic happens here -->  ${content}
                     </div>
                  </div>
                    ${scripts}
                    <div class="loader-wrapper">
                    <svg version="1.1" id="L5" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
  <circle fill="#fff" stroke="none" cx="6" cy="50" r="6" transform="translate(0 0.853919)">
    <animateTransform attributeName="transform" dur="1s" type="translate" values="0 15 ; 0 -15; 0 15" repeatCount="indefinite" begin="0.1"></animateTransform>
  </circle>
  <circle fill="#fff" stroke="none" cx="30" cy="50" r="6" transform="translate(0 -3.43072)">
    <animateTransform attributeName="transform" dur="1s" type="translate" values="0 10 ; 0 -10; 0 10" repeatCount="indefinite" begin="0.2"></animateTransform>
  </circle>
  <circle fill="#fff" stroke="none" cx="54" cy="50" r="6" transform="translate(0 -3.71536)">
    <animateTransform attributeName="transform" dur="1s" type="translate" values="0 5 ; 0 -5; 0 5" repeatCount="indefinite" begin="0.3"></animateTransform>
  </circle>
</svg>
                    </div>
                </body>
                </html>
                `;
   return page;
}