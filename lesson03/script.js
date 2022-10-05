/* const goods = [
    {title: 'Shirt', price: 150},
    {title: 'Socks', price: 50},
    {title: 'Jacket', price: 350},
    {title: 'Shoes', price: 250},
];
*/ 

const BASE_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/";
const GET_GOODS_ITEMS = `${BASE_URL}catalogData.json`
const GET_BASKET_GOODS_ITEMS = `${BASE_URL}getBasket.json`

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

function init() {
    const app = new Vue({
        el: '#root',
        data: {
            items: [],
            search: '',
            filterItems: [],
            isVisibleCart: false
        },
        methods: {
            fetchGoods() {
                setTimeout(() => {
                    service(GET_GOODS_ITEMS).then((data) => {
                        this.items = data;
                        this.filteredItems = data;
                    });
                }, 2000)
            },
            setVisibleCard() {
                this.isVisibleCart = !this.isVisibleCart;
            }
        },
        computed: {
            calculatePrice() {
                return this.filteredItems.reduce((prev, { price }) => {
                    return prev + price;
                }, 0)
            },
            filteredItems() {
                return this.items.filter((item) => {
                    const regExp = new RegExp(this.search);
                    return regExp.test(item.product_name)
                });
            },
        },
        mounted() {
            this.fetchGoods();
        }
    })
}
window.onload = init


/*class GoodsItem {
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
*/

/*class GoodsList {
    items = [];
    /**добавили в фетч функцию service, чтобы получить данные в виде result и записать их в список data*/
    
    /*fetchGoods() {
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
     * join - объединяет элементы массива в строку с указанным разделителем */
    
    /*const goods = this.items.map(item => {
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
*/
