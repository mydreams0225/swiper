let curIndex = 4;
let swiper = document.getElementsByClassName('swiper')[0];
let imgBox = document.getElementsByClassName('img__box')[0];
let dot = document.getElementsByClassName('dot')[0];
let dotLength = dot.children.length;
let imgLength = imgBox.children.length;
let imgWidth = swiper.offsetWidth;
let timer;
let startX = 0;
let moveX = 0;
let delayTime = 5000;
let flag = true; // true表示可以滑动
function onInit() {
    show(-curIndex * imgWidth, true);
    bindEvent();
    timer = setInterval(autoPlay, delayTime)
}

function show(translatex, isClearTransition) {
    if (!isClearTransition) {
        imgBox.style.transition = 'all .4s';
    } else {
        imgBox.style.transition = 'none';
    }
    imgBox.style.transform = 'translateX(' + translatex + 'px)'
    changeDotIndex(curIndex);
}

function bindEvent() {
    transitonend();
    touchStart();
    touchMove();
    touchEnd()
}

function transitonend() {
    imgBox.addEventListener('transitionend', () => {
        console.log('动画')
        if (curIndex >= imgLength - 1) {
            curIndex = dotLength - 1;
            show(-curIndex * imgWidth, true);
        } else if (curIndex === 0) {
            curIndex = dotLength;
            show(-curIndex * imgWidth, true);
        }
        // changeDotIndex(curIndex);
    })
}

function touchStart() {
    imgBox.addEventListener('touchstart', function (e) {
        clearInterval(timer);
        if (curIndex >= imgLength - 1) {
            curIndex = dotLength - 1;
            show(-curIndex * imgWidth, true);
        } else if (curIndex === 0) {
            curIndex = dotLength;
            show(-curIndex * imgWidth, true);
        }
        startX = e.targetTouches[0].pageX;
    })
}

function touchMove() {
    imgBox.addEventListener('touchmove', function (e) {
        e.preventDefault();
        if(timer){
            clearInterval(timer);
        }
        moveX = e.targetTouches[0].pageX - startX;
        
        // if (Math.abs(moveX) > imgWidth) {
        //     if (moveX < 0) {
        //         moveX = -imgWidth;
        //     } else {
        //         moveX = imgWidth;
        //     }

        // }
        let translateX = -curIndex * imgWidth + moveX;
        show(translateX, true);



    })
}

function touchEnd() {
    imgBox.addEventListener('touchend', () => {

        // 滑动图片超过图片的1/4
        if (Math.abs(moveX) > imgWidth / 4) {
            if (moveX > 0) { //  右滑
                curIndex--;
            } else {
                // 左滑
                curIndex++
            }
            show(-curIndex * imgWidth);
        } else {
            // 小于1/4就回弹
            show(-curIndex * imgWidth);
        }
        timer = setInterval(autoPlay, delayTime);

    })
}

function autoPlay() {
    // 5
    curIndex++;
    show(-curIndex * imgWidth);
}

function changeDotIndex(index) {
    console.log(imgBox.children[index],'indexx');
    if(!imgBox.children[index]) return 
    let trueIndex = imgBox.children[index].getAttribute('imgIndex');
    dot.querySelector('.active').classList.remove('active');
    // 给当前li添加current类
    dot.children[trueIndex].classList.add('active');
}

window.onload = function () {
    onInit();
}