import webpack from 'webpack';
import path from 'path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const testUsers = [
  {name:'actual jwt', jwt:'', role:''},
  {name:'chris kummer', jwt:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjaHJpcy5rdW1tZXIiLCJCQVJTIjpbIlVzZXIiLCJHdWFyZCJdLCJDVFMiOiJVc2VyLWN3ayIsIlZMIjoiQWRtaW4iLCJpYXQiOjE0ODY0MjQxMjQsImV4cCI6MTk4NjQyNzcyNH0.CM-LgIbvGi0UXjMa2TtEnF2Q_meZxZqZmauLoYMas1w', role:'user, guard'},
  {name:'van vo', jwt:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkY2N0NTAiLCJCQVJTIjpbIlVzZXIiXSwiQ1RTIjoiVXNlci1jd2siLCJWTCI6IkFkbWluIiwiaWF0IjoxNDg2NDI0MTI0LCJleHAiOjE5ODY0Mjc3MjR9.OZoCzjbS4IfTWojImiz1va1ysOyJXTyySiniF8jTgiI', role: 'user'},
  {name:'conrad long', jwt:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbG9uZyIsIkJBUlMiOlsiVXNlciJdLCJDVFMiOiJVc2VyLWN3ayIsIlZMIjoiQWRtaW4iLCJpYXQiOjE0ODY0MjQxMjQsImV4cCI6MTk4NjQyNzcyNH0.zTwUEqmmvQcZE2ScAxz1Jdf5s8Fz_V-KwLLJjKQuudw', role: 'user'},
  {name:'conrad long sec', jwt:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbG9uZyIsIkJBUlMiOlsiVXNlciIsIlNlY3VyaXR5Il0sIkNUUyI6IlVzZXItY3drIiwiVkwiOiJBZG1pbiIsImlhdCI6MTQ4NjQyNDEyNCwiZXhwIjoxOTg2NDI3NzI0fQ.MCPk4PPNI-PBO-JXSIo0tqgtAUBbYHLyeFmQ7PeGjI8', role:'user, security'}
];

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('development'),
  'process.env.VERSION' : JSON.stringify(`D.${new Date().toISOString("en-US").substring(0,10).replace(/-/g, '.')}`),
  'process.env.API_ED' : JSON.stringify('http://testEDAPI/employees'),
  'process.env.API_BARS' : JSON.stringify('http://barsapi.technology.ca.gov/api/BadgeRequests'),
  'process.env.API_SEC' : JSON.stringify('https://sec.api.technology.ca.gov:3001/createToken'),
  'process.env.TEST_USERS': JSON.stringify(testUsers),
};

export default {
  debug: true,
  devtool: 'inline-source-map',
  noInfo: false,
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src')
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new webpack.HotModuleReplacementPlugin(),
    //new BundleAnalyzerPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      {test: /(\.less)$/, loaders: ['style', 'css', 'less']},
      {test: /(\.css)$/, loaders: ['style', 'css']},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
      {test: /\.(woff|woff2)$/, loader: "url?prefix=font/&limit=5000"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"},
      {test: /\.png(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/png"}
    ]
  }
};
