import { WebSocketServer } from 'ws';
import mysql from 'mariadb';
const pool = mysql.createPool({host:"db", port:3306, user:"root", password:"password", database:"websocket", connectionLimit: 200});
var connections = 0;
var clients = 0;
pool.on('connection', (stream) => {
  console.log(++connections+' database connected!');
});

pool.on('close', (stream) => { console.log('disconnected')})

async function asyncFunction(msg) {
  let conn;
  try {
	conn = await pool.getConnection();
	const res = await conn.query("INSERT INTO myTable (context) value (?)", msg);
	console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}
const wss = new WebSocketServer({ port: 9999 });
// var clients = [];
wss.on('connection', function connection(ws, req) {
  console.log(++clients+' connected');
  // clients.push(ws);
  // ws.on('message', function message(data) {
  //   console.log('received: %s', data);
  // });
  const msg = 'connected '+Date.now();
  pool.getConnection()
    .then(conn => {
    
      conn.query("INSERT INTO mytable (context) values (?)", msg)
        .then((res) => {
          // console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
          conn.end();
        })
        .catch(err => {
          //handle error
          console.log(err); 
          conn.end();
        });
        
    }).catch(err => {
      //not connected
      console.log(err);
    });
  // asyncFunction(msg);
  // console.log(msg);
  ws.on('pong', function(){console.log('pong');});

  ws.on('close', function close(){
    console.log(--clients+' connected');
  });
});