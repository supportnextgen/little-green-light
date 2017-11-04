# [SITENAME]

> Short description of the repositories purpose like "is an ExpressionEngine backed website for XYZ" or "provides a sanitized API for the DGRI website".

## Local Setup

### Requirements

The project assumes you have Node.js and Gulp already installed.

To get Nodje.s you can download it from [nodejs.org](https://nodejs.org/).

Once node is installed you can install Gulp and Bower by running the following commands:

```bash
npm install -g gulp
```

### Getting Started

1. Create a new project folder, clone the repo, and initialize a new repo. (Note: replace `projectname` with the name of your project)
    ```bash
    mkdir projectname
    cd projectname
    git clone git@github.com:mightyinthemidwest/starter-kit.git .
    rm -rf .git
    git init
    ```

2. This repo follows the [git-flow](http://nvie.com/posts/a-successful-git-branching-model/) workflow using the [default naming conventions](https://danielkummer.github.io/git-flow-cheatsheet/). If you don't have gitflow installed you can get it [here](https://github.com/nvie/gitflow/wiki/Installation).
    ```bash
    git flow init --defaults
    ```

3. If you have an empty repo created in Github (or another git service like Beanstalk), you can add it to your local repo by adding the git address. This will allow you to push changes to the remote repo for collaboration and deployments.
    ```bash
    git remote add origin git@github.com:mightyinthemidwest/example-project.git

    # Push up the repo and its refs for the first time
    git push -u origin --all

    # Push up any tags
    git push origin --tags
    ```

4. Install development dependencies
    ```bash
    npm install
    ```

5. Configure local CMS install
    ```bash
    # TBD: commands & files required to run CMS locally
    ```

6. (optional) Sync CMS asset uploads
    ```bash
    # Test it (the following assume SSH access to the server(s) in question, and that asset uploads are stored in public/uploads/)
    rsync -navPhz user@ip.address:www/public_html/public/uploads/ public/uploads/

    # Do it
    rsync -avPhz user@ip.address:www/public_html/public/uploads/ public/uploads/
    ```


### Development Commands

```bash
# Starts up development server and watches for changes
npm start

# Build files for production
npm run build
```

### Gulp Commands

```bash
# Cleans public asset folder
gulp clean

# Compiles stylesheets
gulp styles

# Runs gulp styles and builds criticalcss files
gulp criticalcss

# Compiles JavaScripts
gulp scripts

# Compiles and minifies images via imagemin
gulp images

# Moves static files to the public directory
gulp files

# Moves custom fonts from `src/fonts` to `public/assets/fonts`
gulp fonts

# Starts up an Express + Gulp + Browser Sync environment to serve up the files
gulp quick-server
```

### Install CMS [Remove section post-install]

See the [CMS Setup](https://github.com/mightyinthemidwest/starter-kit/wiki/CMS-Setup) section of the [Wiki](https://github.com/mightyinthemidwest/starter-kit/wiki).
