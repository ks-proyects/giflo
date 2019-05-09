curl https://fcm.googleapis.com/fcm/send \
     -H "Content-Type: application/json" \
     -H "Authorization: key=AAAAcY-B8ms:APA91bGy2AVZhJB9_IPFE8N4QmBozTJb4U-fX4Y8xTgDX7JzkC0ygDe_5G5Z4kD7_6nn0E0fmLEQ-JnuwrRHFWQLH4YFB4-rD6zBOx_-k4fbovF6F9x2s7aLfD1vxdxBs40dHyyN0FzN" \
     -d '{ "notification": {"title": "Test title", "body": "Hola", "click_action" : "https://angularfirebase.com"},"to" : "eseNBu1tyRI:APA91bGRhL3aFRTUMNF-WB4TLKZnE0tp3JzAHgevji0U2eyDxEwR8i2BYhUhNJ-9gwRAiT1F3qm9AL1bO7z2d5fPPMl_Wu7s6OJTHjlHzKSXqh-l2vKaGBQVjSt5NN0Az9Ex1wQkrejt"}'
