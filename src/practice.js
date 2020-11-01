const knex = require('knex')
require('dotenv').config()
const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
})

function mostPopularVideosForDays(days) {
    knexInstance
      .select('video_name', 'region')
      .count('date_viewed AS views')
      .where(
        'date_viewed',
        '>',
        knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
      )
      .from('whopipe_video_views')
      .groupBy('video_name', 'region')
      .orderBy([
        { column: 'region', order: 'ASC' },
        { column: 'views', order: 'DESC' },
      ])
      .then(result => {
        console.log(result)
      })
  }
  
mostPopularVideosForDays(30)

function getProductsWithImages(){
    knexInstance
        .select('product_id', 'name', 'price', 'category', 'image')
        .from('amazong_products')
        .whereNotNull('image')
        .then(result => {
            console.log(result)
        })
}

getProductsWithImages()

function paginateProducts(page) {
    const productsPerPage = 10
    const offset = productsPerPage * (page - 1)
    knexInstance
        .select('product_id', 'name', 'price', 'category')
        .from('amazong_products')
        .limit(productsPerPage)
        .offset(offset)
        .then(result => {
            console.log('here are the results: ', result)
        })
}

paginateProducts(2)

const searchTerm = 'holo'

function searchByProductName(searchTerm) {
    knexInstance
        .from('amazong_products')
        .select('product_id', 'name', 'price', 'category')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result)
    })
}

searchByProductName(searchTerm)