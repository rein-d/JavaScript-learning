function Container(){
    this.id = "";
    this.className = "";
    this.htmlCode = "";

};

Container.prototype.render = function () {
  return this.htmlCode;
};

Container.prototype.remove = function () {
  delete this.htmlCode;
};

function Menu(my_id, my_class, my_items) {
  Container.call(this);
    this.id = my_id;
    this.className = my_class;
    this.items = my_items;
};

Menu.prototype.remove = function ( i = 0 ) {
    var elem = document.getElementById(this.id);
    elem.parentNode.removeChild(elem);
};

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;
Menu.prototype.render = function () {
    let result = '<ul class="' + this.className + '" id="' + this.id + '">';
for (let item in this.items) {
    if(this.items[item] instanceof MenuItem){
        result += this.items[item].render();
    };
};

result += '</ul>'
    return result;

};

function MenuItem(my_href, my_name, my_id) {
    Container.call(this);
    this.id = my_id;
    this.className = "menu-item";
    this.href = my_href;
    this.name = my_name;
};

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;
MenuItem.prototype.render = function () {
return '<li class=' + this.className + '>' + this.name + '</li>';
};

let m_item1 = new MenuItem("/", "Главная", 1);
let m_item2 = new MenuItem("/catalog", "Каталог", 2);
let m_item3 = new MenuItem("/gallery", "Галерея", 3);
let m_items = {0: m_item1, 1: m_item2, 2: m_item3};

let menu = new Menu("my_menu", "My_class", m_items);

document.write(menu.render());




