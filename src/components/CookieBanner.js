import React from 'react';
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import CookieConsent from "react-cookie-consent";

const CookieBanner = () => {
    return(
        <CookieConsent
          location="bottom"
          buttonText="I agree, dismiss banner"
          style={{ background: "#d9d9d9", color: "#000" }}
          buttonStyle={{
            background: "#1c54b2",
            color: "#fff",
            borderRadius: '6px'
          }}
          debug
        >
            <Typography>
                This website requires cookies and the limited processing of your personal data in order to function. By using the site you are agreeing to this as outlined in the EBI <Link href='https://www.ebi.ac.uk/data-protection/privacy-notice/embl-ebi-public-website' target='_blank'>Privacy Notice</Link> and <Link href='https://www.ebi.ac.uk/about/terms-of-use/'>Terms of Use.</Link>
            </Typography>
        </CookieConsent>
    )
}

export default CookieBanner