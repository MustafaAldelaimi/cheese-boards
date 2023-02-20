const {sequelize, Sequelize} = require('./db')
const {User, Board, Cheese} = require('./index')

describe('User, Board and Cheese', () => {
          /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
          // the 'sync' method will create tables based on the model class
          // by setting 'force:true' the tables are recreated each time the 
          // test suite is run
          await sequelize.sync({ force: true });
  
          user1 = await User.create({name: 'Bob', email: 'abcd@example.com'});
          user2 = await User.create({name: 'Joe', email: 'efgh@examplo.com'});
          
          board1 = await Board.create({type: 'Oak', description: 'very very square', rating: 3});
          board2 = await Board.create({type: 'Mahogany', description: 'not very rectangular', rating: 5});
  
          cheese1 = await Cheese.create({title: 'Chedder', description: 'very cheddery'});
          cheese2 = await Cheese.create({title: 'Mozzerlla', description: 'very mozzerly'});
      })
  
      test('can create a User', async () => {
          // TODO - test creating a band
          expect(user1).toBeInstanceOf(User);
      })
  
      test('can create a Board', async () => {
          // TODO - test creating a musician
          expect(board1).toBeInstanceOf(Board)
      })
  
      test('can create a Cheese', async () => {
          // TODO - test creating a song
          expect(cheese1).toBeInstanceOf(Cheese);
      })
  
      test('a User can have many Boards', async () => {
          user1.addBoard([board1, board2]);
          const boards = await user1.getBoards();
          expect(boards.length).toEqual(2);
          expect(boards[0].type).toEqual('Oak');
          expect(boards[1].type).toEqual('Mahogany');
      })
  
      test('a Board can only belong to one User', async () => {
          await board1.setUser(user1);
          let users = await board1.getUser();
          expect(users.name).toEqual('Bob');
  
          await board1.setUser([user1, user2]).catch(err => {
              expect(err.message).toEqual('SQLITE_CONSTRAINT: FOREIGN KEY constraint failed')
          });
      })
  
      test('a board can have lots of cheese', async () => {
          await board1.addCheese([cheese1, cheese2]);
          const cheeses = await board1.getCheese();
          expect(cheeses.length).toBe(2);
          expect(cheeses[0].title).toEqual('Chedder');
          expect(cheeses[1].title).toEqual('Mozzerlla');
      })
  
      test('cheese can belong to many boards', async () => {
          await cheese1.addBoards([board1,board2]);
          const boards = await cheese1.getBoards();
          expect(boards.length).toBe(2);
          expect(boards[0].type).toBe('Oak');
          expect(boards[1].type).toBe('Mahogany');
      })
  
      // Test for eager loading: Board with its cheeses
          it('should eager load a board with its cheeses', async () => {
          const board = await Board.findOne({
            where: { type: 'Oak' },
            include: [
                    {
                              model: Cheese,
                              as: 'cheese'
                    }
          ]
          });
          expect(board).toHaveProperty('type', 'Oak');
          expect(board.cheese).toHaveLength(2);
          });
        
          // Test for eager loading: User with its boards
          it('should load a user with its boards', async () => {
          const user = await User.findOne({
            where: { name: 'Bob' },
            include: [{model: Board, as: 'boards'}]
          });
          expect(user).toHaveProperty('name', 'Bob');
          expect(user.boards).toHaveLength(2);
          });
        
          // Test for eager loading: Cheese with its board data
          it('should load a cheese with its board data', async () => {
          const cheese = await Cheese.findOne({
            where: { title: 'Chedder' },
            include: [{model: Board, as: 'boards'}]
          });
          expect(cheese).toHaveProperty('title', 'Chedder');
          expect(cheese.boards).toHaveLength(2);
        });
})