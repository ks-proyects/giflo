curl https://fcm.googleapis.com/fcm/send \
     -H "Content-Type: application/json" \
     -H "Authorization: key=AAAAcY-B8ms:APA91bGy2AVZhJB9_IPFE8N4QmBozTJb4U-fX4Y8xTgDX7JzkC0ygDe_5G5Z4kD7_6nn0E0fmLEQ-JnuwrRHFWQLH4YFB4-rD6zBOx_-k4fbovF6F9x2s7aLfD1vxdxBs40dHyyN0FzN" \
     -d '{ "notification": {"title": "Test title", "body": "Hola", "click_action" : "https://angularfirebase.com"},"to" : "fat8IOgIIWc:APA91bFcYQEYtpR1UATpoOzgnFyBFsb9oNywUKGoqNECG43L9jta-YqOesxIcPMOEgk6vM0qB0gFFKckPflee-byrg0AwO08sMiTIO3Ybprb-HFXwP_FH25nHDva4zaBbB8UjDmsvG8v"}'
