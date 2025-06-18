// PM2 configuration for the Next.js server
module.exports = {
  apps: [
    {
      name: 'slf1',
      // Launch Next.js in production mode:
      script: 'node_modules/.bin/next',
      args: 'start -p ' + (process.env.PORT || 3000),

      // Run in cluster mode across all CPUs:
      exec_mode: 'cluster',
      instances: 'max',

      // Make sure PM2 uses your project root as cwd:
      cwd: __dirname,

      // Pass any env-vars your app needs:
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3000,
        // For example, default season:
        SEASON_ID: process.env.SEASON_ID || 3,
      },

      // Optional: restart on file change (disable in prod!)
      // watch: false,
      // ignore_watch: ['node_modules', '.next', 'out'],
    },
  ],
};
