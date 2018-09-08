# 环境准备

```bash
npm init

# 如果是在中国，使用以下alias创建一个cnpm命令。然后所有npm命令替换为cnpm，安装速度会快很多。 see http://npm.taobao.org/
# alias cnpm="npm --registry=https://registry.npm.taobao.org \
#     --cache=$HOME/.npm/.cache/cnpm \
#     --disturl=https://npm.taobao.org/dist \
#     --userconfig=$HOME/.cnpmrc"

npm install --save typescript

# 安装typescript后， 还需要手动安装@types/react, @types/react-dom
npm install react react-dom --save
npm install @types/react @types/react-dom --save

npm install react-router react-router-dom --save

# 安装webpack
npm install webpack webpack-cli --save-dev
npm install webpack-dev-server --save-dev

# 安装 bebel
npm install --save-dev @babel/core @babel/cli @babel/preset-env
npm install --save @babel/polyfill
npm install --save-dev @babel/preset-react
npm install --save-dev babel-loader

npm install --save ts-loader

# 其他
npm install --save @material-ui/core @material-ui/icons  # meterial ui
```
