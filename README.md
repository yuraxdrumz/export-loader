a webpack loader that allowes to write Golang style imports, a.k.a, all uppercase declarations get exported automatically for you.

## usage
`npm i -S export-loader`
make sure you put export-loader before babel. Webpack reads loaders from right to left, so be sure to put it last as it will start first in order.
![instructions usage in webpack](https://i.imgur.com/mbwL1j0.png)
### now you can use golang style imports:
variables like : Utilizer, ThisIsNotPrivate and Public will be exported because they are uppercased.
export default remains the same, if you want export default you have to expicitly write it
![exmaple usage in js](https://i.imgur.com/8wguTXH.png)

### the loader will transform all uppercased variables to exports and simply append it to EOF
![end result](https://i.imgur.com/ghyPKbC.png)
