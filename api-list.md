# Expense Recorder App

## API List

---

### Users

1. POST /signup 
2. POST /login
3. GET /profile Authorization

### Categories

1. GET /categories Authorization
2. POST /categories Authorization
3. DELETE /categories/:cid Authorization

### Expenses

1. POST /expenses Authorization
2. GET  /expenses Authorization (Last x Expenses)
3. DELETE /expenses/:eid Authorization
4. GET /expenses/filter?cid=123&from=2026-01-01&to=2026-01-31 Authorization
5. PUT /expenses Authorization