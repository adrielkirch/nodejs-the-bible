/**
 * Set the environment to development
 */
function useDev() {
    process.env['NODE_ENV'] = 'dev';
    console.log('Using environment: ' + process.env['NODE_ENV']);
}

/**
 * Set the environment to production
 */
function useProd() {
    process.env['NODE_ENV'] = 'production';
    console.log('Using environment: ' + process.env['NODE_ENV']);
}

/**
 * Set the environment to test
 */
function useTest() {
    process.env['NODE_ENV'] = 'test';
    console.log('Using environment: ' + process.env['NODE_ENV']);
}

/**
 * Return if in prod ambient
 * @returns true if is in production mode

*/
function isProd() {
    return process.env['NODE_ENV'] == 'qa';
}


/**
 * Check if the env is dev
 * @returns true if env is set to dev
 */
function isDev() {
    return process.env['NODE_ENV'] == 'development';
}

/**
 * Set the environment by the command line argument
 * Arguments: --test (test), --prod (production) or --dev (development)
 */
function setEnvByCommandLineParam() {
    if (!process.argv.length) {
        useDev();
        return;
    }
    let env = process.argv[2];
    if (env == '--development') {
        require('dotenv').config({ path: `${__dirname}\\..\\..\\.env.development` });
        useDev();
    } else if (env == '--production') {
        require('dotenv').config({ path: `${__dirname}\\..\\..\\.env.production` });
        useProd();
    } 
}

/**
 * Exports
 */
module.exports = {
    setEnvByCommandLineParam,
    useDev,
    useProd,
    useTest,
    isProd,
    isDev
};