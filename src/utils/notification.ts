// import { google } from 'google-auth-library';
// import axios from 'axios';
// import path from 'path';

// // Type for FCM Message
// interface FCMMessage {
//   message: {
//     token: string;
//     notification: {
//       title: string;
//       body: string;
//     };
//     android?: {
//       priority: string;
//     };
//     apns?: {
//       payload: {
//         aps: {
//           badge: number;
//           sound: string;
//         };
//       };
//     };
//   };
// }

// // Path to your service account key file
// const serviceAccountKeyFile: string = path.join(__dirname, '../../android/app/google-services.json');

// // Function to get OAuth2 token
// const getAccessToken = async (): Promise<string> => {
//   const auth = new google.auth.GoogleAuth({
//     keyFile: serviceAccountKeyFile,
//     scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
//   });

//   const authClient = await auth.getClient();
//   const accessToken = await authClient.getAccessToken();
//   return accessToken.token || '';
// };

// // Function to send FCM notification
// const sendFcmNotification = async (): Promise<void> => {
//   try {
//     const accessToken = await getAccessToken();

//     const message: FCMMessage = {
//       message: {
//         token: 'TARGET_DEVICE_FCM_TOKEN',  // Replace with the target device's FCM token
//         notification: {
//           title: 'New Message',
//           body: 'You have a new message!',
//         },
//         android: {
//           priority: 'HIGH',
//         },
//         apns: {
//           payload: {
//             aps: {
//               badge: 1,
//               sound: 'default',
//             },
//           },
//         },
//       },
//     };

//     const response = await axios.post(
//       `https://fcm.googleapis.com/v1/projects/YOUR_PROJECT_ID/messages:send`,  // Replace YOUR_PROJECT_ID
//       message,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     console.log('Notification sent successfully:', response.data);
//   } catch (error) {
//     console.error(
//       'Error sending notification:',
//       error.response ? error.response.data : error.message
//     );
//   }
// };

// // Run the function to send the notification
// sendFcmNotification();
