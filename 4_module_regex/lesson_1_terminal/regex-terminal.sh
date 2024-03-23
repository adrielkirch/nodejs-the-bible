# Find all files with the .test.js extension
find . -name *.test.js

# Find all files with the .test.js extension excluding those in node_modules
find . -name *.test.js -not -path '*node_modules**'

# Find all JavaScript files excluding those in node_modules
find . -name *.js -not -path '*node_modules**'

# Install the ipt package globally
npm i -g ipt

# Find all JavaScript files excluding those in node_modules and use ipt to interactively select files
find . -name *.js -not -path '*node_modules**' | ipt

# From this module's directory

# XARGS executes a command for each item returned by FIND
# IPT creates an interactive interface to select an element
CONTENT="'use strict';\n"
find . -name *.js -not -path '*node_modules**' \
| ipt -o \
| xargs -I '{file}' sed -i {file} -e '1s/^/\'"$CONTENT"'\n/g'
