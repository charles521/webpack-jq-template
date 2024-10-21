module.exports = {
    extends :["eslint:recommended"],
    env:{
        es6:true,
        node:true, 
        browser:true, 
    },
    parserOptions:{
        ecmaVersion:6,
        sourceType:"module",
    },
    rules:{
        "no-var":1,
        "no-unused-vars":1
    },
    plugins:["import"],
}