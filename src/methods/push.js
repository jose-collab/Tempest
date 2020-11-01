// Require Packages
const get = require('lodash/get');
const set = require('lodash/set');

module.exports = function(db, params, options) {
  
  // Fetch entry
  let fetched = db.prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`).get(params.id);
  
  // If not found, create empty row
  if (!fetched) {
    db.prepare(`INSERT INTO ${options.table} (ID,json) VALUES (?,?)`).run(params.id, '{}');
    fetched = db.prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`).get(params.id); 
  }
  
  // Check if a target was supplied
  if (params.ops.target) {
    fetched = JSON.parse(fetched.json);
    try { fetched = JSON.parse(fetched) } catch (e) {}
    params.data = JSON.parse(params.data);
    if (typeof fetched !== 'object') throw new TypeError('Não pode push para um não-objeto.');
    let oldArray = get(fetched, params.ops.target);
    if (oldArray === undefined) oldArray = [];
    else if (!Array.isArray(oldArray)) throw new TypeError('O destino não é uma array');
    oldArray.push(params.data)
    params.data = set(fetched, params.ops.target, oldArray);
  } else {
    if (fetched.json === '{}') fetched.json = [];
    else fetched.json = JSON.parse(fetched.json);
    try { fetched.json = JSON.parse(fetched.json) } catch (e) {}
    params.data = JSON.parse(params.data);
    if (!Array.isArray(fetched.json)) throw new TypeError('O destino não é uma array');
    fetched.json.push(params.data);
    params.data = fetched.json;
  }
  
  // Stringify data
  params.data = JSON.stringify(params.data);

  // Update entry with new data
  db.prepare(`UPDATE ${options.table} SET json = (?) WHERE ID = (?)`).run(params.data, params.id);
  
  // Fetch & return new data
  let newData = db.prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`).get(params.id).json;
  if (newData === '{}') return null;
  else {
    newData = JSON.parse(newData)
    try { newData = JSON.parse(newData) } catch (e) {}
    return newData
  }
  
}
