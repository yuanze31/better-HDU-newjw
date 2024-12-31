// ==UserScript==
// @name         HDU-newjw移除禁止频繁切换页签
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  移除快速切换页签时弹窗禁止function
// @author       yuanze31
// @match        *://newjw.webvpn.hdu.edu.cn/*
// @match        *://newjw.hdu.edu.cn/*
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    // 等待页面加载完成
    window.addEventListener("load", () => {
        console.log("better-HDU-newjw加载");

        const scriptElement = document.createElement("script");
        scriptElement.textContent = `
            // 重写 queryCourse 函数，移除禁止频繁切换页签部分
            function queryCourse(a_element, kklxdm, xkkz_id, njdm_id, zyh_id) {
                var oldID = $("#nav_tab").find("li.active").find("a").attr("id");
                var newID = $(a_element).attr("id");
                if (oldID == newID) {
                    return false;
                }
                // 移除时间间隔相关逻辑
                tabChangeTime = Date.now();
                tabChangeFlag = 1;

                // 原始函数剩余逻辑
                $("#nav_tab").find("li").removeClass("active");
                $(a_element).parent().addClass("active");
                $("#kklxdm").val(kklxdm);
                $("#kklxmc").val($("#tab_kklx_" + kklxdm).text());
                $("#xkkz_id").val(xkkz_id);
                $("#njdm_id").val(njdm_id);
                $("#zyh_id").val(zyh_id);
                $("#more").hide(); //隐藏点击查看更多
                $("#endsign").hide(); //隐藏到达最后一页提示
                initCxtj(kklxdm);
                $("#displayBox").load(_path + "/xsxk/zzxkyzb_cxZzxkYzbDisplay.html", {
                    "xkkz_id": $("#xkkz_id").val(),
                    "xszxzt": jQuery("#xszxzt").val(),
                    "njdm_id": jQuery("#njdm_id").val(),
                    "zyh_id": jQuery("#zyh_id").val(),
                    "kspage": 0,
                    "jspage": 0
                }, function () {
                    setTimeout("$('#searchBox').trigger('searchResult')", 100); // 延迟加载
                });
            }
        `;
        document.head.appendChild(scriptElement);
    });
})();
