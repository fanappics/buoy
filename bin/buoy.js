#!/usr/bin/env node

const path = require('path')
const commander = require('commander')

const version = (require(path.resolve(__dirname, '../package.json'))).version

commander
  .version(version)
  .description('Toolkit for the bouy UI library')

commander
  .command('init', 'Configure rogue and create a bouy.json file.').alias('i')
  .command('make <name> [description...]', 'Scaffold an new component').alias('m')
commander
  .parse(process.argv)

if (!process.argv.slice(2).length) {
  commander.outputHelp()
}
