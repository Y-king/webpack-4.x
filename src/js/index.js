/** 
 * @author  739423210@qq.com  king900714@126.com
 * @date    2018-05-10
 * @description  webpack4.x打包常规项目的入口文件
 * @filename 
 * @aboutfilename 
 */

//引入css样式
import "../css/master.css";
//引入jq
import $ from "jquery";
//引入swiper
import Swiper from 'swiper';

$(function() {
    swiper1();
    swiper2();
});

//全局滑屏swiper
function swiper1(){
    var mySwiper = new Swiper ('.swiper-container1', {
        direction: 'vertical',
        noSwiping : true,
        nextButton: '.swiper-button-next1',
        prevButton: '.swiper-button-prev1',
        onSlideChangeStart : function(){
            var index = parseInt(mySwiper.activeIndex);
            switch(index){
                case 7 : 
                    $('.btn').show();
                break;
                default: 
                    $('.btn').hide();
                break;
            }
        },
        loop:false               
    });
};
//第六屏滑屏swiper
function swiper2(){
    var mySwiper = new Swiper ('.swiper-container2', {
        direction: 'horizontal',
        nextButton: '.swiper-button-next2',
        prevButton: '.swiper-button-prev2',
        loop:true               
    });
};
