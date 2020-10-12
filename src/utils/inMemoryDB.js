const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const db = {
  Users: [],
  Boards: [],
  Tasks: [],
  fixUserStructure: user => {
    if (user) {
      db.Tasks.filter(task => task).forEach(task => {
        task.userId = task.userId === user.id ? null : task.userId;
      });
    }
  },
  fixBoardsStructure: board => {
    if (board) {
      db.Tasks.filter(task => task && task.boardId === board.id).forEach(
        task => (db.Task[db.Tasks.indexOf(task)] = undefined)
      );
    }
  },
  fixTaskStructure: () => {}
};

// init bd with mock data;
function test() {
  for (let i = 0; i < 3; i++) {
    db.Users.push(new User());
  }
  const board = new Board();
  db.Boards.push(board);
  db.Tasks.push(
    new Task({ boardId: board.id }),
    new Task({ boardId: board.id })
  );
  const board2 = new Board({
    title: 'test',
    columns: [
      { title: 'col1', order: 2 },
      { title: 'col2', order: 3 }
    ]
  });
  db.Boards.push(board2);
  db.Tasks.push(new Task({ boardId: board2.id }));
}
test();
const getAllEntities = tableName => {
  return db[tableName].filter(entity => entity);
};

const getEntity = (tableName, id) => {
  const entities = db[tableName]
    .filter(entity => entity)
    .fiter(entity => entity.id === id);
  if (entities.length > 1) {
    console.error('db is damage');
    throw Error('db is wrong');
  }
  return entities[0];
};
const removeEntity = (tableName, id) => {
  const entity = getEntity(tableName, id);
  if (entity) {
    db[`fix${tableName}Structure`](entity);
    const index = db[tableName].indexOf(entity);
    db[tableName] = [
      ...db[tableName].slice(0, index),
      ...(db[tableName].length > index + 1)
    ];
  }
};

const saveEntity = (tableName, entity) => {
  db[tableName].push(entity);
  return getEntity(tableName, entity.id);
};
const updateEntity = async (tableName, id, entity) => {
  const oldEntity = getEntity(tableName, id);
  if (oldEntity) {
    db[tableName][db[tableName].indexOf(oldEntity)] = { ...entity };
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
