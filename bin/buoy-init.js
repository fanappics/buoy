#!/usr/bin/env node
(async () => {
  const chalk = require('chalk')
  const fs = require('fs')
  const path = require('path')
  const Confirm = require('prompt-confirm')

  const source = fs.readFileSync(path.resolve(__dirname, './buoy.json'), 'utf8')
  const target = path.resolve(process.cwd(), './buoy.json')
  const prompt = new Confirm(`Do you want to overwrite ${target}`)

  if (fs.existsSync(target) === false || await prompt.run()) {
    createFile(source, target)
  }

  console.info(chalk.default.blueBright('Skipping creation of buoy.json'))

  function createFile (source, target) {
    try {
      fs.writeFileSync(target, source, 'utf8')
      console.info(chalk.default.greenBright('Initialization successful'))
      console.info(chalk.default.greenBright(`Configuration file written to ${target}`))
      process.exit(0)
    } catch (error) {
      console.error(chalk.default.redBright('Initialization failed'))
      console.error(chalk.default.redBright(error))
      process.exit(1)
    }
  }
})()
