// Script to clear user data and ensure app starts from login
console.log('Clearing user data...');

// Clear localStorage
if (typeof localStorage !== 'undefined') {
  localStorage.removeItem('walmartUser');
  console.log('Cleared walmartUser from localStorage');
}

// Clear sessionStorage
if (typeof sessionStorage !== 'undefined') {
  sessionStorage.clear();
  console.log('Cleared sessionStorage');
}

console.log('User data cleared. App will now start from login page.');
