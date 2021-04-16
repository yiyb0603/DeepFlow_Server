import * as admin from 'firebase-admin';
import { FCMOptions } from 'types/fcm.types';
import { stringEllipsis } from './stringEllipsis';

const logo: string = 'https://user-images.githubusercontent.com/50941453/114956971-f9ead100-9e9a-11eb-93fb-2883e88075c1.png';

export const sendFCM = (fcmOptions: FCMOptions): void => {
  const { token, title, body, icon, link } = fcmOptions;

  const message = {
    token,
    webpush: {
      notification: {
        title,
        body: stringEllipsis(body, 15),
        icon: icon || logo,
        click_action: link,
      },
    },
  };

  admin.messaging().send(message);
}