// ================================================== исключение по наименованию страницы
// const contactsPage = window.location.pathname == '/contacts.html'
// if(contactsPage){
//     ...
// }


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ПРОКРУТКА, ШАПКА
// document.addEventListener('DOMContentLoaded', function () {
//     // СКРОЛЛ К НУЖНОЙ СЕКЦИИ ПО КЛИКУ НА ПУНКТАХ МЕНЮ
//     $('.menu__link').click(function () {
//         var scroll_elem = $(this).attr('href');
//         $('html, body').animate({
//             scrollTop: $(scroll_elem).offset().top
//         }, 1000);
//     });
//     // ДОБАВЛЯЕМ АКТИВНЫЙ КЛАСС ШАПКЕ
//     function headerActiveToggle() {
//         const scrollSize = window.pageYOffset
//         scrollSize > 1 ? header.classList.add('active') : header.classList.remove('active')
//     }
//     window.addEventListener('load', headerActiveToggle) // ПРИ ПЕРЕЗАГРУЗКЕ СТРАНИЦЫ ЕСЛИ СТРАНИЦА УЖЕ ПРОСКРОЛЛЕНА
//     window.addEventListener('scroll', headerActiveToggle) // ПРИ СКРОЛЛЕ
// });

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ МАСКА ДЛЯ ИНПУТОВ (https://github.com/RobinHerbots/Inputmask)
const inputMask = () => {
    $(".js-maskPhone").inputmask({
        mask: "+ 7 (999) 999-99-99",
        clearIncomplete: true
    });
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ СЛАЙДЕР SWIPER (https://swiperjs.com/get-started) 
const sliders = () => {
function setSize(){
    let diffBegin = 1920
    let viewWidth = window.innerWidth
    let percent = (viewWidth * 70) / diffBegin
    console.log(percent)
    return percent 
}
let resPer = setSize()
setSize()
window.addEventListener('resize', setSize)
window.onresize = setSize


    const swiper = new Swiper('.js-sliderReview', {
        
        slidesPerView: 1,
        spaceBetween: 1,
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.reviews-slider__arrow',
        },
        breakpoints: {
            769: {
                slidesPerView: 4,
                spaceBetween: resPer,
            }
        }
    });

}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SELECT
const customSelect = () => {
    document.querySelectorAll('.select').forEach( select => {
    
        let selectHeader = select.querySelectorAll('.select__header'),
            selectItem = select.querySelectorAll('.select__item'),
            currentItem = select.querySelector('.select__current'),
            selectInput = select.querySelector('.select__value');
    
        selectHeader.forEach( item => {
            item.addEventListener('click', selectToggle);
        });
    
        selectItem.forEach( item => {
            item.addEventListener('click', selectChoose);
        });
    
        function selectToggle(){
            this.parentElement.classList.toggle('is-active');
        }
    
        function selectChoose(){
            let selectOption = this.innerText,
                thisSelect = this.closest('.select');
            currentItem.innerHTML = selectOption;
            selectInput.value = selectOption;
            thisSelect.classList.remove('is-active');
            //console.log(selectInput.value);
        }
    
        document.addEventListener('click', (e) => {
            if( !select.contains(e.target) ){
                select.classList.remove('is-active');
            }
        });
    
    });
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ POPUP
const popup = ()=> {
    const popup = document.querySelectorAll('.popup')
    const popupBtn = document.querySelectorAll("[data-popup='popup']")
    popup.forEach(item => {
      item.addEventListener('click', function(e){
        let itsBody = e.target == item.querySelector('.popup__body') || item.querySelector('.popup__body').contains(e.target)
        let itsClose = e.target.closest('.js-popupClose')
        if(!itsBody || itsClose){
          item.querySelector('.popup__body').classList.remove('animate__zoomIn')
          item.querySelector('.popup__body').classList.add('animate__zoomOut')
          setTimeout(()=> {
            item.classList.remove('is-open')
          },500)
        }
      })
    })
    popupBtn.forEach(item => {
        item.addEventListener('click', function(e){
            e.preventDefault()
            const hrefPopupBtn = item.getAttribute('href') || item.getAttribute('data-src')
            document.documentElement.classList.add('popup-open')
            popup.forEach(item => {
                item.classList.remove('is-open')
            })
            document.querySelector(hrefPopupBtn).classList.add('is-open')
            document.querySelector(hrefPopupBtn).querySelector('.popup__body').classList.add('animate__zoomIn')
            document.querySelector(hrefPopupBtn).querySelector('.popup__body').classList.remove('animate__zoomOut')
        })
    })
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ КАРТА, ОТЛОЖЕННАЯ ЗАГРУЗКА (ЧТОБЫ УЛУЧШИТЬ ПОКАЗАТЕЛИ - PageSpeed Insights)
const map = () => {

    setTimeout(function() {
        var headID = document.getElementsByTagName("body")[0];         
        var newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
        headID.appendChild(newScript);
    }, 3000);
    setTimeout(function() {
            var myMap = new ymaps.Map("map", {
            center: [55.917879, 37.806326],
            zoom: 13,
            controls: ['smallMapDefaultSet']
        }, {
            searchControlProvider: 'yandex#search'
        });

        myGeoObject = new ymaps.GeoObject({
            geometry: {
                type: "Point"
            },
        });
        myMap.geoObjects
            .add(myGeoObject)
            .add(new ymaps.Placemark([55.917879, 37.806326], {
                balloonContent: '<strong></strong>',
                iconCaption: 'М.О., г. Королев, ул. Ленина 12'
            }, {
                preset: 'islands#blueCircleDotIconWithCaption',
                iconCaptionMaxWidth: '200'
            }));

        myMap.setType('yandex#publicMap');

        myMap.behaviors.disable('scrollZoom');
        //на мобильных устройствах... (проверяем по userAgent браузера)
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            //... отключаем перетаскивание карты
            myMap.behaviors.disable('drag');
        }
    }, 4000);

}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ INIT
inputMask()
sliders()
customSelect()
popup()

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/* иногда карта не загружается таким образом (например в битриксе)
 тогда надо сделать обращение к ней как это указано в документации, через ymaps.ready - https://yandex.ru/dev/maps/jsapi/doc/2.1/quick-start/index.html?from=techmapsmain

ymaps.ready(init);

function init(){

    var myMap = new ymaps.Map("map", {
        center: [56.745981, 37.179787],
        zoom: 13,
        controls: ['smallMapDefaultSet']
    }, {
        searchControlProvider: 'yandex#search'
    });

    myGeoObject = new ymaps.GeoObject({
        geometry: {
            type: "Point"
        },
    });
    myMap.geoObjects
        .add(myGeoObject)
        .add(new ymaps.Placemark([56.745981, 37.179787], {
            balloonContent: '<strong></strong>',
            iconCaption: 'М.О., г. Королев, ул. Ленина 12'
        }, {
            preset: 'islands#blueCircleDotIconWithCaption',
            iconCaptionMaxWidth: '200'
        }));

    myMap.setType('yandex#publicMap');
    // отключаем масштабирование скроллом       
    myMap.behaviors.disable('scrollZoom');
    // на мобильных устройствах... (проверяем по userAgent браузера)
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //... отключаем перетаскивание карты
        myMap.behaviors.disable('drag');
    }
        
}
*/
