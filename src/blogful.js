require('dotenv').config()
const knex = require('knex')
// const ArticlesService = require('./articles-service')
const ShoppingListService = require('./shopping-list-service')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
})

// console.log(ArticlesService.getAllArticles())
console.log(ShoppingListService.getAllItems())