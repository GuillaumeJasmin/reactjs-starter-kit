const { hostname } = window.location;

const envEntry = Object.entries(process.env.CLIENT_ENVS).find(([envName, envValue]) => {
  if (!envValue.hostname) {
    console.error(`hostname is missing in env/${envName}`);
    return false;
  }

  return (
    (typeof envValue.hostname === 'string' && envValue.hostname === hostname)
    || (Array.isArray(envValue.hostname) && envValue.hostname.includes(hostname))
  );
});

if (!envEntry) {
  throw new Error('No env matched');
}

const env = envEntry[1];

export default env;
