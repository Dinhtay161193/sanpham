// khai báo mảng
var products = [{
        handle: "ega-botconn",
        id: 1,
        title: "egaBotConn",
        vendor: "EGANY",
        tags: "platform__cross-platform, type__apps, doc__ega-botconn, demo__https://egany.com",
        image: {
            id: 11,
            src: "https://picsum.photos/id/14/600",
        },
        variants: [{
            id: 111,
            sku: "egabotconn",
            price: "0",
            compare_at_price: "0",
            inventory_management: null,
            inventory_policy: "deny",
            inventory_quantity: 1,
        }, ],
    },
    {
        handle: "ega-shop",
        id: 2,
        title: "egaShop",
        vendor: "EGANY",
        tags: "platform__haravan_sapo_cross-platform, type__apps, doc__ega-shop, demo__https://egany.com",
        image: {
            id: 22,
            src: "https://picsum.photos/id/15/600",
        },
        variants: [{
            id: 222,
            sku: "egashop",
            price: "149000",
            compare_at_price: "199000",
            inventory_management: null,
            inventory_policy: "deny",
            inventory_quantity: 1,
        }, ],
    },
    {
        handle: "ega-countdown",
        id: 3,
        title: "egaCountdown",
        vendor: "EGANY",
        tags: "platform__haravan_cross-platform, type__apps, doc__ega-countdown, demo__https://egany.com",
        image: {
            id: 33,
            src: "https://picsum.photos/id/16/600",
        },
        variants: [{
            id: 333,
            sku: "egabotconn",
            price: "99000",
            compare_at_price: "149000",
            inventory_management: "manual",
            inventory_policy: "allow",
            inventory_quantity: 0,
        }, ],
    },
    {
        handle: "ega-salebox",
        id: 4,
        title: "egaSaleBox",
        vendor: "EGANY",
        tags: "platform__haravan_cross-platform, type__apps, doc__ega-salebox, demo__https://egany.com",
        image: {
            id: 44,
            src: "https://picsum.photos/id/14/600",
        },
        variants: [{
            id: 444,
            sku: "egasalebox",
            price: "99000",
            compare_at_price: "149000",
            inventory_management: "manual",
            inventory_policy: "allow",
            inventory_quantity: -1,
        }, ],
    },
    {
        handle: "ega-cro",
        id: 5,
        title: "egaCRO",
        vendor: "EGANY",
        tags: "platform__haravan_cross-platform_sapo, type__apps, doc__ega-salebox, demo__https://egany.com",
        image: {
            id: 55,
            src: "https://picsum.photos/id/14/600",
        },
        variants: [{
            id: 555,
            sku: "egasalebox",
            price: "99000",
            compare_at_price: "149000",
            inventory_management: null,
            inventory_policy: "deny",
            inventory_quantity: 10,
        }, ],
    },
];

// get hàm
function getEle(id) {
    return document.getElementById(id);
}

// duyệt tìm đối tượng có id cần tìm
function checkId(id) {
    for (var index = 0; index < products.length; index++) {
        if (products[index].id === id) {
            return index;
        }
    }
    return -1;
}

// tim kiem
function handleSubmit(event) {
    event.preventDefault();
    // khởi tạo mảng lưu product cần tìm
    var result = [];
    // get giá trị value từ ô input
    var keyword = getEle("txtSearch").value;
    // người dùng không nhập
    if (keyword === "") {
        swal("Bạn chưa nhập");
    } else if (keyword !== "") {
        for (var index = 0; index < products.length; index++) {
            // tìm theo tên hoặc mật khẩu
            var fullName = products[index].title;
            fullName = nonAccentVietnamese(fullName);
            keyword = nonAccentVietnamese(keyword).trim();
            if (products[index].id == keyword || fullName.indexOf(keyword) !== -1) {
                result.push(products[index]);
            }
        }
    }
    renderProduct(result);
}

// biên dịch về
function nonAccentVietnamese(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
}

// chạy và in ra màn hình mảng 2 taskMySelf
function renderProduct(data) {
    var htmlContentTable = "";
    var htmlContentCart = "";
    var htmlContentTables = "";
    for (var index = 0; index < data.length; index++) {
        const indexPruduct = data[index];
        for (var index1 = 0; index1 < indexPruduct.variants.length; index1++) {
            const indexPruduct1 = indexPruduct.variants[index1];

            if (indexPruduct1.inventory_management === null) {
                getEle(
                    "order"
                ).innerHTML = `<p>Cho phép mua bất kể số lượng (inventory_management === null)</p>`;
            } else {
                getEle(
                    "order"
                ).innerHTML = `<p>Cho phép mua với một số lượng nhất định (inventory_management !== null)</p>`;
            }

            if (parseFloat(indexPruduct1.compare_at_price) === 0) {
                htmlContentTable += `<tr>
            <td>${indexPruduct.title}</td>
            <td>${indexPruduct1.price}</td>
            <td>chưa đặt giá</td>
            <td>  
                0%
            </td>
            <td>${indexPruduct1.inventory_quantity}</td>
               </tr>`;
            } else if (parseFloat(indexPruduct1.price) === 0) {
                htmlContentTable += `<tr>
              <td>${indexPruduct.title}</td>
              <td>${indexPruduct1.price}</td>
              <td>${indexPruduct1.compare_at_price}</td>
              <td>  
                   0%
              </td>
              `;
            } else if (
                parseFloat(indexPruduct1.price) >
                parseFloat(indexPruduct1.compare_at_price)
            ) {
                htmlContentTable += `<tr>
              <td>${indexPruduct.title}</td>
              <td>${indexPruduct1.price}</td>
              <td>${indexPruduct1.compare_at_price}</td>
              <td>  
                  0%(giá tăng thêm)
              </td>
              `;
            } else {
                htmlContentTable += `<tr>
              <td>${indexPruduct.title}</td>
              <td>${indexPruduct1.price}</td>
              <td>${indexPruduct1.compare_at_price}</td>
              <td>  
                    ${
                      100 -
                      (parseFloat(indexPruduct1.price) /
                        parseFloat(indexPruduct1.compare_at_price)) *
                        100
                    }%
              </td>
              `;
            }

            htmlContentTables += `<tr>
                <td id="management">${indexPruduct1.inventory_management}</td>
                <td>${indexPruduct1.inventory_policy}</td>
                <td>${indexPruduct1.inventory_quantity}</td>
            </tr>`;
            htmlContentCart += `<img class="card-img-top" src=${indexPruduct.image.src} alt="Card image">`;
        }
        getEle("cart").style.display = "block";
    }
    getEle("tbodyProduct").innerHTML = htmlContentTable;
    getEle("cartProduct").innerHTML = htmlContentCart;
    getEle("tbodyProducts").innerHTML = htmlContentTables;
}