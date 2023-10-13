export function layout(name, tel) {
    return `
    <html>
    <head>
      <title>${name}</title>
      <style>
        body {
          padding: 80px;
          font: 16px Helvetica, Arial;
        }
    
        h1 {
          font-size: 2em;
        }
    
        h2 {
          font-size: 1.2em;
        }
    
        #contacts {
          margin: 0;
          padding: 0;
        }
    
        #contacts li {
          margin: 40px 0;
          padding: 0;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
          list-style: none;
        }
    
        #contacts li:last-child {
          border-bottom: none;
        }
    
        textarea {
          width: 500px;
          height: 300px;
        }
    
        input[type=text],
        textarea {
          border: 1px solid #eee;
          border-top-color: #ddd;
          border-left-color: #ddd;
          border-radius: 2px;
          padding: 15px;
          font-size: .8em;
        }
    
        input[type=text] {
          width: 500px;
        }
      </style>
    </head>
    <body>
      <section id="tel">
        ${tel}
      </section>
    </body>
    </html>
    `
  }
  
  export function list(contacts) {
    let list = []
    for (let contact of contacts) {
      list.push(`
      <li>
        <h2>${ contact.name }</h2>
        <p><a href="/contact/${contact.id}">開啟聯絡人資料</a></p>
      </li>
      `)
    }
    let tel = `
    <h1>通訊錄</h1>
    <p>你有 <strong>${contacts.length}</strong> 個聯絡人!</p>
    <p><a href="/contact/new">新增聯絡人</a></p>
    <ul id="contacts">
      ${list.join('\n')}
    </ul>
    `
    return layout('contacts', tel)
  }
  
  export function newcontact() {
    return layout('New contact', `
    <h1>新聯絡人</h1>
    <p>新增聯絡人資料</p>
    <form action="/contact" method="post">
      <p><input type="text" placeholder="名字" name="name"></p>
      <p><textarea placeholder="電話" name="tel"></textarea></p>
      <p><input type="submit" value="確認"></p>
    </form>
    `)
  }
  
  export function show(contact) {
    return layout(contact.name, `
      <h1>${contact.name}</h1>
      <pre>${contact.tel}</pre>
    `)
  }