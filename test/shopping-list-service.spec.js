const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')


describe('getList', () =>  {
    let db
    let testList = [
        {
          id: 1,
          name: 'First test item!',
          date_added: new Date('2029-01-22T16:28:32.615Z'),
          price: '12.00',
          category: 'Main'
        },
        {
          id: 2,
          name: 'Second test item!',
          date_added: new Date('2100-05-22T16:28:32.615Z'),
          price: '21.00',
          category: 'Snack'
        },
        {
          id: 3,
          name: 'Third test item!',
          date_added: new Date('1919-12-22T16:28:32.615Z'),
          price: '3.00',
          category: 'Lunch'
        },
        {
          id: 4,
          name: 'Third test item!',
          date_added: new Date('1919-12-22T16:28:32.615Z'),
          price: '0.99',
          category: 'Breakfast'
        },
      ];
    before(() => {
        db = knex ({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
    })
    before(() => {
        return db
            .into('shopping_list')
            .insert('testList')
    })
    after(() => db.destroy())
    it(`getList`, () => {
        return ShoppingListService.getList()
            .then(actual => {
                expect(actual).to.eql(testList)
            })
    })
})