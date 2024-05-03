import React from "react";
import { Helmet } from "react-helmet";

const GlobalSiteTags = () => {
  return (
    <Helmet
      script={[
        {
          type: "text/javascript",
          innerHTML: `
                
          
                gtag('event', 'conversion', {
                    'allow_custom_scripts': true,
                    'send_to': 'DC-14545902/[activityGroupTagString]/[activityTagString]+standard'
                });
            `,
        },
      ]}
      noscript={[
        {
          innerHTML: `<img src="https://ad.doubleclick.net/ddm/activity/src=14545902;type=;cat=;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${"${"}GDPR${"}"};gdpr_consent=${"${"}GDPR_CONSENT_755${"}"};ord=1?" width="1" height="1" alt=""/>`,
        },
      ]}
    />
  );
};

export default GlobalSiteTags;
