const URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses"
const GOODS = "/catalogData.json"

const url = `${URL}${GOODS}`;

/**функция обращения на сервер за данными*/
function service(url) {
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = () => {
            const result = JSON.parse(xhr.response)
            resolve(result)
        };
    xhr.send();
    })
} 

const goods = [
    {title: 'Shirt', price: 150},
    {title: 'Socks', price: 50},
    {title: 'Jacket', price: 350},
    {title: 'Shoes', price: 250},
];

class GoodsItem {
    constructor ({product_name="", price=0 }) {
        this.product_name = product_name;
        this.price = price;
    }
    render() {
    return `<div class="goods-item">
    <h3>${this.product_name}</h3>
    <p>${this.price}</p>
    </div>`;
    } 
}

class GoodsList {
    items = [];
    /**добавили в фетч функцию service, чтобы получить данные в виде result и
    записать их в список data*/
    fetchGoods() {
        return new Promise((resolve) => {
            service(url).then((data) => {
                this.items = data;
                resolve();
        });
    })
    }

    calculatePrice() {
        return this.item.reduce((prev, item) => {
            return prev + item.price;
        }, 0)
    }
    render() {
    /** map - вызвает переданную функцию один раз для каждого элемента
     * массива, формируя новый массив из результатов вызова этой функции
     * join - объединяет элементы массива в строку с указанным разделителем 
     */
        const goods = this.items.map(item => {
            const goodItem = new GoodsItem(item);
            return goodItem.render();
        }).join('');
        document.querySelector('.goods-list').innerHTML = goods;
    }
}

const goodsList = new GoodsList();
goodsList.fetchGoods().then(() => {
    goodsList.render();
})
