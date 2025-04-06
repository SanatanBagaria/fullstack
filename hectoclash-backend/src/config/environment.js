// Load environment variables based on NODE_ENV
const loadEnvironment = () => {
    const environment = process.env.NODE_ENV || 'development';
    
    console.log(`Loading ${environment} environment configuration`);
    
    // You could add additional environment-specific logic here
    // For example, different validation rules, feature flags, etc.
    
    return {
      isProduction: environment === 'production',
      isDevelopment: environment === 'development',
      isTest: environment === 'test'
    };
  };
  
  module.exports = loadEnvironment();
  