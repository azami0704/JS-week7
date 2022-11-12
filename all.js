
let data = [];
axios.get("https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json")
    .then(function (response) {
        data = response.data.data;
        init(data);
        initC3();
    }).catch(function (error) {
        console.log(error);
    });



const ticketGroup = document.querySelector('.ticket-group');
const filter = document.querySelector('#filter');
const filterTxT = document.querySelector('.txt');
//初始化function
function init(array) {
    let str = "";
    array.forEach(function (item) {
        let content = `<div class="ticket-item">
        <a href="#" class="card">
            <div class="top">
                <div class="area-tag">${item.area}</div>
                <div class="photo">
                    <img src=${item.imgUrl} alt="">
                </div>
                <div class="range">${item.rate}</div>
            </div>
            <div class="content">
                <h2 class="ticket-title">${item.name}</h2>
                <p class="ticket-description">
                    ${item.description}
                </p>
            </div>
            <div class="footer">
                <span class="material-icons">
                    error
                </span>
                <div class="last">剩下最後${item.group}組</div>
                <span class="small">TWD</span>
                <div class="price">$${(item.price).toLocaleString('en')}</div>
            </div>
        </a>
    </div>`
        str += content;
    })
    if (str.length == 0) {
        ticketGroup.innerHTML = `<img src="./images/no_found.png" alt="">`;
    } else {
        ticketGroup.innerHTML = str;
    }
    filterTxT.textContent = `本次搜尋共 ${array.length} 筆資料`;
}

//篩選器
filter.addEventListener("change", function (e) {
    let filteredData = [];
    if (filter.value === '全部') {
        filteredData = data;
    } else {
        filteredData = data.filter(function (item) {
            return item.area === filter.value;
        })
    }
    init(filteredData);
})


//新增資料
const ticketName = document.querySelector('#ticketName');
const ticketURL = document.querySelector('#ticketURL');
const ticketArea = document.querySelector('#ticketArea');
const ticketPrice = document.querySelector('#ticketPrice');
const ticketNum = document.querySelector('#ticketNum');
const ticketRange = document.querySelector('#ticketRange');
const ticketDes = document.querySelector('#ticketDes');
const input = document.querySelector('.input');

input.addEventListener("submit", function (e) {
    e.preventDefault();
    if (ticketName.value == '' || ticketURL.value == '' || ticketArea.value == '' || ticketNum.value == '' || ticketRange.value == '' || ticketPrice.value == '' || ticketDes.value == '') {
        alert('欄位不可為空');
        return;
    }
    obj = {};
    obj.id = data.length;
    obj.name = ticketName.value;
    obj.imgUrl = ticketURL.value;
    obj.area = ticketArea.value;
    obj.group = ticketNum.value;
    obj.rate = ticketRange.value;
    obj.price = ticketPrice.value;
    obj.description = ticketDes.value;
    data.push(obj);
    input.reset();
    init(data);
    initC3();
})

function initC3() {
    let dataForC3 = data.reduce(function (a, item) {
        if (a[item.area]) {
            a[item.area]++
        } else {
            a[item.area] = 1
        }
        return a;
    }, {})
    let dataForC3Arr = Object.entries(dataForC3);
    var chart = c3.generate({
        bindto: '#chart',
        data: {
            columns: dataForC3Arr,
            type: 'donut'
        },
        donut: {
            title: "套票地區比重",
            width: 10,
            label: {
                show: false
            }
        },
        size: {
            width: 160,
            height: 160
        },
        padding: {
            top: 0,
            bottom: 0,
        },
        color: {
            pattern: ['#26C0C7', '#5151D3', '#E68618']
        },
        interaction: {
            enabled: false
        }
    });
}


