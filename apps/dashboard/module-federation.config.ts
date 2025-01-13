import { ModuleFederationConfig } from '@nx/module-federation';

const remotes: (string | [remoteName: string, remoteUrl: string])[] = [];

if (process.env.NODE_ENV === 'production') {
  remotes.push(
    ['login', 'https://nagp-mfe-insurance-login.netlify.app/remoteEntry.mjs'],
    ['policyDetails', 'https://aquamarine-alfajores-8065ee.netlify.app/remoteEntry.mjs'],
    ['premiumPayment', 'https://rad-starburst-51bf24.netlify.app/remoteEntry.mjs']
  );
} else {
  remotes.push('login', 
    'policyDetails',
    'premiumPayment'
  );
}


const config: ModuleFederationConfig = {
  name: 'dashboard',
  /**
   * To use a remote that does not exist in your current Nx Workspace
   * You can use the tuple-syntax to define your remote
   *
   * remotes: [['my-external-remote', 'https://nx-angular-remote.netlify.app']]
   *
   * You _may_ need to add a `remotes.d.ts` file to your `src/` folder declaring the external remote for tsc, with the
   * following content:
   *
   * declare module 'my-external-remote';
   *
   */
  remotes
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
