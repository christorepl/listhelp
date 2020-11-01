const knex = require('knex')
require('dotenv').config()
const knexInstance = knex ({
    client: 'pg',
    connection: process.env.DB_URL
})

// const searchTerm = 'burg'

// function searchProductByName (searchTerm) {
//     knexInstance
//         .from('shopping_list')
//         .select('name')
//         .where('name', 'ILIKE', `%${searchTerm}%`)
//         .then(result => {
//             console.log('searchterm results: ', result)
//         })
// }

// searchProductByName(searchTerm)

// function paginateProducts(pageNumber) {
//     const productsPerPage = 6
//     const offset = productsPerPage * (pageNumber - 1)
//     knexInstance
//         .select('name')
//         .from('shopping_list')
//         .limit(productsPerPage)
//         .offset(offset)
//         .then(result => {
//             console.log('paginate results: ', result)
//         })
// }

// paginateProducts(1)

// let days = 2

// function addedAfterDate(daysAgo) {
//     knexInstance
//         .select('name', 'date_added')
//         .from('shopping_list')
//         .where('date_added', '>', knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo) 
//         )
//         .then(result => {
//             console.log(result)
//         })
// }

// addedAfterDate(days)

function totalCost(){
    knexInstance
        .from('shopping_list')
        .select('category')
        .groupBy('category')
        .sum('price AS total price')
        .then(result => {
            console.log('total costs: ', result)
        })

}

totalCost()