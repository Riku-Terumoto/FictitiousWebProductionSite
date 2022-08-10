'use strict'

{
    //header固定処理
    // const header = document.querySelector('header');
    // const target = document.querySelector('.header-js-kanshi');
    // function callback(entries) {  
    //     console.log(entries);     
    //     if (!entries[0].isIntersecting) {
    //         header.classList.add('header--position-fixed');
    //     } else {
    //         header.classList.remove('header--position-fixed');
    //     }
    // }

    // const options = {
    //     threshold: 0
    // }

    // const observer = new IntersectionObserver(callback, options);
    // observer.observe(target);


    //アコーディオン
    const dts = document.querySelectorAll('dt');


    dts.forEach(dt => {
        dt.addEventListener('click', () => {
            dt.parentNode.classList.toggle('accordion__body--active');
            dts.forEach(el => {
                if (dt !== el) {
                    el.parentNode.classList.remove('accordion__body--active');
                }
            });
        });
    });


    //スライドショー
    const mySwiper = new Swiper('.works .swiper' , {
        loop: true,
        loopAdditionalSlides: 5,
        allowTouchMove: true,
        speed: 1000,
        slidePerView: 'auto',
        spaceBetween: 56,
        centeredSlides: true,
        grabCursor: true,
        watchSlidesProgress: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        
    });


    //お問い合わせAjax（jQuery）

    //読み込み
    $(document).ready(function () {
        //form内の送信イベントが発生したら複数のvalue値をformDateに格納
        $('#form').submit(function (e) {
            let formData = $('#form').serialize();

            //Ajax通信
            $.ajax({
                url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSd6uYDNhC5RmyS3XIfbWoq75aezwXCfxZxfPb0BLWeBPBXUiw/formResponse",
                //ユーザが入力した値
                data: formData,
                //送信方式
                type: "POST",
                //データの種類
                dataType: "xml",
                //HTTPステータスコード
                statusCode: {
                    0: function () {
                        $(".end-message").slideDown();
                        $("#form").fadeOut();
                    },
                    400: function () {
                        $(".false-message").slideDown();
                        $("#form").fadeOut();
                    }
                }
            });
            e.preventDefault();
        });
    });


    // バリデーション
    const submitBtn = document.querySelector('#js-submit');
    const forms = document.querySelectorAll('input, textarea');
    forms.forEach(form => {
        form.addEventListener('change', () => {

            //formのvalue値が空だった場合(\Sは空文字)
            //またはチェックボックスにチェックが入っていない場合
            if (!form.value || !form.value.match(/\S/g) || !form.checked) {
                submitBtn.disabled = true;
            } else if (form.value && form.checked) {
                submitBtn.disabled = false;
            }
        });
    });
}