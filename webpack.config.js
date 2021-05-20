const HtmlWebpackPlugin  = require('html-webpack-plugin')
const {CleanWebpackPlugin}  = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode:'development',
    devtool:'source-map',
     watch:true,
    output:{
        filename:'js/index.js',
        publicPath:'/dist/'
    },
    module:{
        rules:[
            {
                test:/\.(less)|(css)$/,
                use:[MiniCssExtractPlugin.loader,'css-loader','less-loader']
            },{
                test:/\.(img)|(jpg)|(png)$/,
                loader:'file-loader',
                options:{
                    name:'images/[name][hash:3].[ext]'
                }
               
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
        template:'./src/html/index.html',
        filename:'html/index.html'
    }),
            new MiniCssExtractPlugin({               
                    filename:'css/[name].css'      
            }),
            new CopyWebpackPlugin({
                patterns:[
                    {
                        from:'./src/public',
                        to:"./public",
                        globOptions:{
                            //忽视掉复制的目录
                            ignore:['**/images/**']
                        }
                    }
                ]
               
            }),
            new CleanWebpackPlugin()

]
}