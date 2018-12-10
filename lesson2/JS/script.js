function Container(){
    this.id = "";
    this.className = "";
    this.htmlCode = "";

};

Container.prototype.render = function () {
  return this.htmlCode;
};

Container.prototype.remove = function () {
    let elem = document.getElementById(this.id);
    elem.parentNode.removeChild(elem);
    console.log(elem);
};

function Menu(my_id, my_class, my_items) {
  Container.call(this);
    this.id = my_id;
    this.className = my_class;
    this.items = my_items;
}
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

function MenuItem(my_id, my_href, my_name) {
    Container.call(this);
    this.id = my_id;
    this.className = "menu-item";
    this.href = my_href;
    this.name = my_name;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;
MenuItem.prototype.render = function () {
return '<li class=' + this.className + ' id' + this.id + '>' + this.name + '</li>';
};


function SubMenu (my_id, my_class, my_items){
    Container.call(this);
    this.id = my_id;
    this.className = my_class;
    this.items = my_items;
}
SubMenu.prototype = Object.create(Container.prototype);
SubMenu.prototype.constructor =SubMenu;
SubMenu.prototype.render = function(){
    let result = '<ul class="' +this.className + '" id="' + this.id + '">';
    for(let item in this.items){
        if(this.items[item] instanceof Menu){
            result +=this.items[item].render();
            result +='</ul>';
            } else {
                console.log(this.items[item]);
                for (let subitem in this.items[item]){
                    console.log(this.items[item][subitem]);
                    result += this.items[item][subitem].render();
                }
            }
    }
    result += '</ul>';
    return result;
};

/*
let m_item1 = new MenuItem("1", "/", "Главная");
let m_item2 = new MenuItem("2", "/catalog", "Каталог");
let m_item3 = new MenuItem("3", "/gallery", "Галерея");
let m_items = {0: m_item1, 1: m_item2, 2: m_item3};
*/

//let menu = new Menu("my_menu", "menu_class", m_items);
//let submenu = new SubMenu("menu_main", "sub_menu", [m_items,menu]);
//console.log(submenu);
// document.write(submenu.render());

function fillMenuContents(xhr) {
    let m_items = {};

    if (xhr.readyState ==4) {
        if (xhr.status == 200) {
            let items = JSON.parse(xhr.responseText);

            for (let currentitem of items.menu_items){
                m_items[currentitem.title] = new MenuItem(currentitem.id ,currentitem.href, currentitem.title);
            }

            let menu = new Menu("my_menu", "My_class", m_items);
            let submenu = new SubMenu("menu_main", "sub_menu", [m_items,menu]);
            document.write(submenu.render());
        }
    } else {
        alert("ошибка выполнения запроса!");
    }
};


let xhr;

if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
    if (window.overrideMimeType) {
        xhr.overrideMimeType('application/json');
    }
} else if (window.ActiveXObject) {
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
}

if (!xhr) {
    console.log("Невозможно создать запрос!");
}

xhr.onreadystatechange = function() { fillMenuContents(xhr); };
xhr.ontimeout = function() {console.log("Превышего время ожидание запроса!");};
xhr.open('GET', 'menu.json', true);
xhr.send(null);