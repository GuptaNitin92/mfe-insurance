# MFE Insurance Application

This repository contains a micro-frontend application built using NX and Angular. The project consists of multiple micro-frontends (MFEs) for managing insurance features, including Login, Policy Details, Premium Payment, and a Container Dashboard.

---

## Prerequisites

Ensure you have the following installed on your machine:
- Node.js (v16 or later)
- Yarn (v1.22 or later)
- NX CLI: `npm install -g nx@latest`

---

## Steps to Run Locally

1. **Clone the Repository**  
   Clone the repository to your local machine:
   ```bash
   git clone <REPO_URL>
   cd mfe-insurance
   ```

2. **Install Dependencies**  
   Install the project dependencies using Yarn:
   ```bash
   yarn install
   ```

3. **Run the Applications**  
   Start the container application (`dashboard`) along with the micro-frontends (`login`, `policyDetails`, and `premiumPayment`) using the following command:
   ```bash
   nx serve dashboard --devRemotes='login,policyDetails,premiumPayment'
   ```

4. **Access the Application**  
   Open the browser and navigate to:
   ```
   http://localhost:4200
   ```

   - **Dashboard**: The container application.
   - Other MFEs (`login`, `policyDetails`, `premiumPayment`) will load dynamically when accessed from the Dashboard.

5. **Available Users credentials**   
   const sampleUsers = [
      { username: 'user1', password: 'pass1' },
      { username: 'user2', password: 'pass2' },
    ];

    Please use one of these to login. 

---

## Deployment to Netlify

### Application has been deployed on Netlify

**Application Link**: 
```
https://dashboard-nagp-mfe-insurance.netlify.app/
```

**MFE Link:**
-	***Login:*** 
```
[login](https://nagp-mfe-insurance-login.netlify.app/)
```

-	***Policy Details: ***
```
[policyDetails](https://aquamarine-alfajores-8065ee.netlify.app/)
```
-	***Premium Payment: ***
```
[premiumPayment](https://rad-starburst-51bf24.netlify.app/)
```

***Available User credentials:***

Any one of the username & password can be used to login in application:
      ```  
      { username: 'user1', password: 'pass1' }
      { username: 'user2', password: 'pass2' }
      ```


If you wish to deploy the applications to Netlify, use the following steps:

1. Install the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Build the applications:
   ```bash
   nx build <app-name> --prod
   ```

   Replace `<app-name>` with:
   - `dashboard`
   - `login`
   - `policyDetails`
   - `premiumPayment`

3. Deploy each application to Netlify:
   ```bash
   netlify deploy --prod --dir=dist/apps/<app-name>
   ```

   Replace `<app-name>` with the respective application name.

---

## Features Implemented

1. **Dynamic Module Federation**:  
   Each micro-frontend is dynamically loaded into the container application.

2. **IndexedDB**:  
   Data is persisted locally using IndexedDB for offline capabilities.

3. **Web Worker**:  
   A web worker is used for policy computation tasks in the `dashboard` application.

4. **Shared Services**:  
   Shared services (`IndexedDBService`, `PolicyEventService`) are utilized across MFEs using the `shared/data-access-user` library.

5. **OWASP Implementation**:  
   Implemented the `Strict-Transport-Security` (HSTS) header for improved security.

---