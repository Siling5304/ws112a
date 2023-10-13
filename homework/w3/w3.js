import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as render from './render.js'

const contacts = [
  {id:0, name:'Mandy', tel:'0984567846'},
  {id:1, name:'Keven', tel:'0964594135'}
];

const router = new Router();

router.get('/', list)
  .get('/contact/new', add)
  .get('/contact/:id', show)
  .post('/contact', create);

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

async function list(ctx) {
  ctx.response.body = await render.list(contacts);
}

async function add(ctx) {
  ctx.response.body = await render.newcontact();
}

async function show(ctx) {
  const id = ctx.params.id;
  const contact = contacts[id];
  if (!contact) ctx.throw(404, 'invalid contact id');
  ctx.response.body = await render.show(contact);
}

async function create(ctx) {
  const body = ctx.request.body();
  if (body.type === "form") {
    const pairs = await body.value();
    const contact = {};
    for (const [key, value] of pairs) {
      contact[key] = value;
    }
    console.log('contact=', contact)
    const id = contacts.push(contact) - 1;
    contact.created_at = new Date();
    contact.id = id;
    ctx.response.redirect('/');
  }
}

console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 });