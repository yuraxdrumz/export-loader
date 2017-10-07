# export-loader
a webpack loader that allows to write Golang style exports: all uppercase declarations get exported automatically for you.

## usage
`npm i -D export-loader`
make sure you put export-loader before babel. Webpack reads loaders from right to left, so be sure to put it last as it will start first in order.
![instructions usage in webpack](https://i.imgur.com/mbwL1j0.png)

### now you can use golang style imports:
![exmaple usage in js](https://i.imgur.com/n9zYIoS.png)
## what about exisitng exports and export default?
export default remains the same, if you want export default you have to explicitly write it.
existing export definitions will remain untouched.
### the loader will transform all uppercased variables to exports and simply append it to EOF
![end result](https://i.imgur.com/ghyPKbC.png)
