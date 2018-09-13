const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');
const path = require('path');

function makePluginName(name) {
  let newName = _.kebabCase(name);

  if (name.indexOf('showdown-') !== 0) {
    newName = `showdown-${name}`;
  }
  return newName;
}

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the ace ${chalk.red('generator-showdown-extension')} generator!`),
    );

    const prompts = [{
      name: 'name',
      message: 'Your generator name',
      default: makePluginName(path.basename(process.cwd())),
    }];

    return this.prompt(prompts).then((props) => {
      this.props = props;
      this.props.shortName = props.name.replace(/^showdown-/, '');
    });
  }

  writing() {
    this.fs.writeJSON(this.destinationPath('package.json'),
      Object.assign({}, {
        name: this.props.name,
        main: `./lib/${this.props.name}.js`,
      }, this.fs.readJSON(this.templatePath('package.json'), {})));
  }

  projectfiles() {
    // dot files
    ['eslintrc.js', 'travis.yml', 'gitignore', 'babelrc'].forEach((file) => {
      this.fs.copy(
        this.templatePath(file),
        this.destinationPath(`.${file}`),
      );
    });

    // javascript files
    this.fs.copy(
      this.templatePath('app/**'),
      this.destinationPath('./'),
    );

    // main boilerplate
    this.fs.copyTpl(
      this.templatePath('showdown-extension-boilerplate.js'),
      this.destinationPath(`src/${this.props.name}.js`),
      {
        pluginName: this.props.shortName,
      },
    );

    this.fs.copyTpl(
      this.templatePath('_node-tests.js'),
      this.destinationPath('test/node-tests.js'),
      {
        name: this.props.name,
        pluginName: this.props.shortName,
      },
    );
  }

  install() {
    this.installDependencies({
      bower: false,
    });
  }

  end() {
    this.spawnCommand('git', ['init'])
      .on('exit', () => {
        this.spawnCommand('git', ['add', '--all'])
          .on('exit', () => {
            this.spawnCommand('git', ['commit', '-m', '"initial commit from generator"']);
          });
      });

    this.log(yosay('I believe we\'re done here.'));
  }
};
