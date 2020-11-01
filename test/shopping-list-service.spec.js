const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe(`shoppinglist service obj`, function () {
  let db
  let testItems = [
    {
      id: 1,
      checked: false,
      name: 'First test item!',
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      price: '12.00',
      category: 'Main'
    },
    {
      id: 2,
      checked: false,
      name: 'Second test item!',
      date_added: new Date('2100-05-22T16:28:32.615Z'),
      price: '21.00',
      category: 'Snack'
    },
    {
      id: 3,
      checked: false,
      name: 'Third test item!',
      date_added: new Date('1919-12-22T16:28:32.615Z'),
      price: '3.00',
      category: 'Lunch'
    },
    {
      id: 4,
      name: 'Fourth test item!',
      checked: false,
      date_added: new Date('1919-12-22T16:28:32.615Z'),
      price: '0.99',
      category: 'Breakfast'
    },
  ];
  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
  })
  before(() => db('shopping_list').truncate())
  afterEach(() => db('shopping_list').truncate())
  after(() => db.destroy())
   context(`Given 'shopping_list' has data`, () => {
     before(() => {
       return db
        .into('shopping_list')
        .insert(testItems)
     })
     it(`getallitems resolves all item from shopping_list`, () => {
      return ShoppingListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql(testItems)
        })
     })
   })
   context(`given shopping_list has no data`, () => {
     it(`getAllItems() resolves an empty array`, () => {
       return ShoppingListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql([])
        })
     })
     it(`insertitem works`, () => {
       const newItem =     {
        checked: false,
        name: 'insert test item!',
        date_added: new Date('2029-01-22T16:28:32.615Z'),
        price: '12.00',
        category: 'Main'
      }
      return ShoppingListService.getAllItems(db, newItem)
        .then(actual => {
          expect(actual).to.eql({
              id: 1,
              checked: false,
              name: 'insert test item!',
              date_added: new Date(newItem.date_added),
              price: '12.00',
              category: 'Main'
          })
        })
     })
   })
})