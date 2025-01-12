// Import necessary IndexedDB methods (if required)
import { openDB } from 'idb'; // Use idb for IndexedDB interactions if it's part of your environment

addEventListener('message', async ({ data }) => {
  const  policies: Array<any>  = data;

  if (policies != null && policies != undefined) {
    try {
      // Open IndexedDB and fetch policies (adjust this based on your IndexedDBService)
      //const db = await openDB('InsuranceDB', 1); // Replace with your DB name and version
      //const policies = await db.getAll('policies'); // Replace with your store name
      //const username = localStorage.getItem('loggedInUser');
      // Compute active and pending counts
      const activePolicies = policies.length;
      const pendingPayments = policies.filter(policy => !policy.isPaid ).length;

      // Send results back to the main thread
      postMessage({ activePolicies, pendingPayments });
      
    } catch (error) {
      console.error('Error in Web Worker:', error);
    }
  }
});
