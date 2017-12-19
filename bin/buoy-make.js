#!/usr/bin/env node

const chalk = require('chalk').default
const commander = require('commander')
const fs = require('fs')
var mkdirp = require('mkdirp')
const path = require('path')

const config = (require(path.resolve(__dirname, '../buoy.json'))).make

commander
  .description('Create buoy vue component.')
  .usage('<component name>')
  .arguments('<name>')
  .action(createComponent)
  .parse(process.argv)

if (!process.argv.slice(2).length) {
  commander.outputHelp()
}

function createComponent (name) {
  let hasErrors = false
  const sourceDir = path.resolve(process.cwd(), config.source)
  const targetDir = path.resolve(process.cwd(), config.target, name)
  if (fs.existsSync(targetDir) === false) {
    try {
      console.info(chalk.greenBright(`Creating target directory: ${targetDir}`))
      mkdirp.sync(targetDir, 0o755)
    } catch (error) {
      console.error(chalk.default.redBright('Failed to create target directory'))
      console.error(chalk.default.redBright(error))
      process.exit(1)
    }
  } else {
    console.info(chalk.blueBright(`Target directory found: ${targetDir}`))
  }

  const stubList = fs.readdirSync(sourceDir)
  for (const stubFile of stubList) {
    const file = fs.readFileSync(path.resolve(process.cwd(), config.source, stubFile), 'utf8').replace(/%name%/g, name)
    const newFile = path.resolve(process.cwd(), config.target, name, stubFile.replace(/%name%/g, name)).replace('.stub', '')
    try {
      fs.writeFileSync(newFile, file, 'utf8')
      console.info(chalk.greenBright(`Created file ${newFile}`))
    } catch (error) {
      hasErrors = true
      console.error(chalk.default.redBright(`File ${newFile} creation failed`))
      console.error(chalk.default.redBright(error))
    }
  }

  const indexSource = path.resolve(process.cwd(), config.target, './index.js')
  try {
    fs.appendFileSync(indexSource, `export { default as ${name} } from '${name}'\n`, 'utf8')
    console.info(chalk.greenBright(`Appended component export into ${indexSource}`))
  } catch (error) {
    hasErrors = true
    console.error(chalk.default.redBright(`Appending component into ${indexSource}  failed`))
    console.error(chalk.default.redBright(error))
  }

  process.exit(hasErrors ? 1 : 0)
}
