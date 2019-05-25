curl https://fcm.googleapis.com/fcm/send \
     -H "Content-Type: application/json" \
     -H "Authorization: key=AAAAcY-B8ms:APA91bGy2AVZhJB9_IPFE8N4QmBozTJb4U-fX4Y8xTgDX7JzkC0ygDe_5G5Z4kD7_6nn0E0fmLEQ-JnuwrRHFWQLH4YFB4-rD6zBOx_-k4fbovF6F9x2s7aLfD1vxdxBs40dHyyN0FzN" \
     -d '{ "notification": {"title": "Notificacion Push desde Linux", "body": "<h1>Bienvenido a Giglo Pronto escucharas mas de nsotros</h1>", "click_action" : "https://angularfirebase.com"},"to" : "e52eh68VJFU:APA91bEKiCLp1s_0P3c6Ny1iXIsrgghdmltFpp99ZytqxCTojqMoT0fO0__zndpUj1EcEp2jKeSwiKP4zD_wg2jIseytJ4xdMoGJbTPmP_unuysCMHcZj66hGZpa1f4HRZ-Wui33PduC"}'
