// Import server startup through a single index entry point

import './fixtures.js';
import './register-api.js';
import { connect } from 'sia.js'
// Using promises...
// connect to an already running Sia daemon on localhost:9980 and print its version
connect('localhost:9980')
  .then((siad) => {
    siad.call('/consensus').then((consensus)=>{
      console.log(consensus);
    });
    siad.call('/wallet/address').then((address)=>{
      console.log(address);
    }).catch((err,address) => {
      console.error(err);
      console.log(address);

    });
    siad.call({
      url: '/wallet/unlock',
      method: 'POST',
      qs: {
        encryptionpassword: 'duets coils eluded lexicon licks feel victim shackles guarded kidneys eight joining sieve ointment sidekick punch bested lexicon cavernous drowning olive hookup taboo mechanic general royal leech polar acumen',
      },
    }).then((result)=> {console.log(result)})
    .catch((err) => {
      console.error(err)
    });
    siad.call('/daemon/version').then((version) => {

      console.log(version);
    })
  })
  .catch((err) => {
    console.error(err)
  })
