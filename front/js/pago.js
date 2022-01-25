const base_url = "http://localhost:3000"
 
 var payment_btn = document.getElementById("mercadopago_btn");
 payment_btn.addEventListener('click', get_preference_id);
 
 function get_preference_id(e) {
   // paso 1. Preparar el pago (ir al backend y obtener un preference_id)
   // paso 2. Crear un botón que abre la ventana de MercadoPago.
   e.preventDefault();
   console.log("click");
 
   const payment_url = `${base_url}/mercadopago/pago`;
   let MERCADOPAGO_PUBLIC_KEY = 'APP_USR-18fe8622-b9bf-42a7-9fc8-3d0f321cf413';
 
   const data = {"amount": 1234}
 
   fetch(payment_url, {
       method: 'POST',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify(data),
     }
   )
   .then(response => response.json())
   .then(data => {
     console.log(data);
     const preference_id = data.preference_id;
     const url = data.url;
     const redirect = true;  // change this to have different views
 
     if (redirect){
       // use the URL if you want to redirect
       console.log(`Redireccionar a la url: ${url}`)
       window.location.href = url;
     }else{
       // Use preference_id to show a modal
         const mp = new MercadoPago(MERCADOPAGO_PUBLIC_KEY, {
           locale: 'es-AR'
         });
   
       // Inicializa el checkout
       mp.checkout({
           preference: {
             id: preference_id
           },
           render: {
             container: '.cho-container', // Indica el nombre de la clase donde se mostrará el botón de pago
             label: 'Pagar', // Cambia el texto del botón de pago (opcional)
           }
       }); 
     }
 
   });
}
 
var payment_btn2 = document.getElementById("paypal_btn");
payment_btn2.addEventListener('click', get_preference_paypal);
 
 function get_preference_paypal(e) {
   // paso 1. Preparar el pago (ir al backend y obtener un preference_id)
   // paso 2. Crear un botón que abre la ventana de MercadoPago.
   e.preventDefault();
   console.log("click");
 
  const payment_url = `${base_url}/paypal/pago`;
 
  // const data = {"amount": 300}
   const CLIENT_ID = 'AcwmArowUw1-dEea0gyivyX6WjZx5IM4SSW3-vzwVjEB6XnK9n75Mp4jCvJ7eUMTek_PrX0v3rdc8xPR';
   const CLIENT_SECRET = 'EHK_P6nUPQhxP1fLeDv0256_etesfwsB1ug1qIq4pj0o-_3uA31v6pDh0XAO41Nl_p-YmJnTxc2l-o7u';
   
   const usuario = { user: CLIENT_ID, pass: CLIENT_SECRET }
   const body_data = {
    intent: 'CAPTURE',
    purchase_units: [{
        amount: {
            currency_code: 'USD', //dolares codigo paypal
            value: '300' // Cobrará 300 dolares
        }
    }],
    application_context : {
        brand_name: 'PRUEBAS PAGO',
        landing_page: 'NO_PREFERENCE', // default
        user_action: 'PAY_NOW',
        return_url: `${base_url}/success`,
        cancel_url: `${base_url}/failure`,
    }
}
   fetch(payment_url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 
      auth: usuario},
       body: JSON.stringify(body_data),
     }
   )
   .then(response => response.json())
   .then(data => {
      console.log(data);
      const url = data.href;
      window.location.href = url;
   });
}