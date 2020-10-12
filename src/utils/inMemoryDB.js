// const User = require('../resources/users/user.model');
// const Board = require('../resources/boards/board.model');
// const Task = require('../resources/tasks/task.model');

const db = {
  Users: [],
  Boards: [],
  Tasks: [],
  fixUsersStructure: user => {
    if (user) {
      db.Tasks.filter(task => task).forEach(task => {
        task.userId = task.userId === user.id ? null : task.userId;
      });
    }
  },
  fixBoardsStructure: board => {
    if (board) {
      db.Tasks.filter(task => task && task.boardId === board.id).forEach(task =>
        removeEntity('Tasks', task.id)
      );
    }
  },
  fixTasksStructure: () => {}
};
// function test() {
//   for (let i = 0; i < 3; i++) {
//     const user = new User();
//     const board = new Board();
//     db.Users.push(user);
//     db.Boards.push(board);
//     db.Tasks.push(
//       new Task({ boardId: board.id, userId: user.id }),
//       new Task({ boardId: board.id })
//     );
//   }

// const board2 = new Board({
//   title: 'test',
//   columns: [
//     { title: 'col1', order: 2 },
//     { title: 'col2', order: 3 }
//   ]
// });
// db.Boards.push(board2);
// db.Tasks.push(new Task({ boardId: board2.id }));
// }
// test();
const getAllEntities = tableName => {
  return db[tableName].filter(entity => entity);
};

const getEntity = (tableName, id) => {
  const entities = db[tableName]
    .filter(entity => entity)
    .filter(entity => entity.id === id);
  if (entities.length > 1) {
    console.error('db is damage');
    throw Error('db is wrong');
  }
  return entities[0];
};
const removeEntity = (tableName, id, borderId = null) => {
  let entity = getEntity(tableName, id);
  if (entity) {
    if (borderId) {
      if (borderId === entity.boardId) {
        db[`fix${tableName}Structure`](entity);
        const index = db[tableName].indexOf(entity);
        db[tableName].splice(index, 1);
      } else {
        entity = null;
      }
    } else {
      db[`fix${tableName}Structure`](entity);
      const index = db[tableName].indexOf(entity);
      db[tableName].splice(index, 1);
    }
  }
  return entity;
};

const saveEntity = (tableName, entity) => {
  db[tableName].push(entity);
  return getEntity(tableName, entity.id);
};
const updateEntity = async (tableName, id, entity, borderId = null) => {
  const oldEntity = getEntity(tableName, id);
  if (oldEntity) {
    if (borderId) {
      if (borderId === oldEntity.boardId) {
        db[tableName][db[tableName].indexOf(oldEntity)] = {
          ...oldEntity,
          ...entity
        };
      } else {
        return null;
      }
    } else {
      db[tableName][db[tableName].indexOf(oldEntity)] = {
        ...oldEntity,
        ...entity
      };
    }
  }
  return getEntity(tableName, id);
};

module.exports = {
  getAllEntities,
  getEntity,
  removeEntity,
  saveEntity,
  updateEntity
};
