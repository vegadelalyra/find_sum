const util = require('util');
const execAsync = util.promisify(require('child_process').exec);
const os = require('os');

async function getDeviceName() {
  try {
    const platform = os.platform().toLowerCase();

    if (platform === 'win32') {
      const { stdout } = await execAsync('hostname');
      return stdout.trim();
    } else if (platform === 'darwin') {
      const { stdout } = await execAsync('scutil --get ComputerName');
      return stdout.trim();
    } else if (platform === 'linux') {
      const { stdout } = await execAsync('hostname');
      return stdout.trim();
    } else {
      throw new Error('Unsupported operating system');
    }
  } catch (error) {
    throw new Error(error.stderr || error.message);
  }
}

module.exports = {
    getDeviceName
}