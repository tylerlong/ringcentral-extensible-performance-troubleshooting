import RingCentral from '@rc-ex/core';
import SDK from '@ringcentral/sdk';
import RcSdkExtension from '@rc-ex/rcsdk';

const sdk = new SDK({
  clientId: process.env.RINGCENTRAL_CLIENT_ID!,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET!,
  server: process.env.RINGCENTRAL_SERVER_URL!,
});
(async () => {
  await sdk.login({
    username: process.env.RINGCENTRAL_USERNAME!,
    extension: process.env.RINGCENTRAL_EXTENSION!,
    password: process.env.RINGCENTRAL_PASSWORD!,
  });
  const rc = new RingCentral();
  const rcSdkExtension = new RcSdkExtension({rcSdk: sdk});
  await rc.installExtension(rcSdkExtension);
  const extInfo = await rc.restapi().account().extension().get();
  console.log(extInfo);
  await rc.revoke();
})();
