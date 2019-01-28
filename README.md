This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
## extra feature

### Location

Display the location for each move in the format (col, row) in the move history list.<br>
**思路：**
1. 位置号/3，整数部分是行坐标，余数部分是列坐标。
### Bold current item

Bold the currently selected item in the move list.<br>
**思路：**
1. 使用style直接表示
2. ~~使用添加className，在css中写具体样式，优点是样式分离~~

### Double loop

Rewrite Board to use two loops to make the squares instead of hardcoding them.<br>
**思路：**
1. 使用map
2. 使用for循环
3. 两个循环，不一定是嵌套循环，map或者for皆可实现

### Sort

Add a toggle button that lets you sort the moves in either ascending or descending order.

### Hignlight squares

When someone wins, highlight the three squares that caused the win.
**思路**
1. 在game组件中设置winner对象，包含胜利方和胜利格子index数组两个属性
2. 以后将变量名称再规范一下

### Display draw

When no one wins, display a message about the result being a draw.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
